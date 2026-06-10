from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from presentation_factory.config import (
    ConfigurationError,
    Repository,
    load_toml,
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(65536), b""):
            digest.update(chunk)
    return digest.hexdigest()


def git_revision(repository: Repository) -> str | None:
    result = subprocess.run(
        ["git", "rev-parse", "HEAD"],
        cwd=repository.root,
        capture_output=True,
        text=True,
        check=False,
    )
    return result.stdout.strip() if result.returncode == 0 else None


def presentation_slugs(repository: Repository) -> list[str]:
    return sorted(path.parent.name for path in repository.presentation_configs())


def presentation_config(repository: Repository, slug: str) -> Path:
    matches = [
        path
        for path in repository.presentation_configs()
        if path.parent.name == slug
    ]
    if not matches:
        raise ConfigurationError(f"Apresentação não encontrada: {slug}")
    if len(matches) > 1:
        rendered = ", ".join(str(path.relative_to(repository.root)) for path in matches)
        raise ConfigurationError(
            f"Slug de apresentação ambíguo: {slug}. Ocorrências: {rendered}"
        )
    return matches[0]


def workspace_target(workspace: Path, relative_path: str) -> Path:
    target = (workspace / relative_path).resolve()
    try:
        target.relative_to(workspace.resolve())
    except ValueError as exc:
        raise ConfigurationError(
            f"Destino de asset fora do workspace: {relative_path}"
        ) from exc
    return target


def build_package(
    repository: Repository,
    presentation_slug: str,
    model_alias: str | None = None,
    output: Path | None = None,
) -> Path:
    config_path = presentation_config(repository, presentation_slug)
    presentation_dir = config_path.parent
    presentation = load_toml(config_path)
    catalog = load_toml(repository.model_catalog)
    entity = load_toml(repository.entity_config_for(presentation_dir))

    selected_model = (
        model_alias
        or presentation.get("default_model")
        or catalog.get("default")
    )
    models = catalog.get("models", {})
    if selected_model not in models:
        available = ", ".join(sorted(models)) or "(nenhum)"
        raise ConfigurationError(
            f"Modelo desconhecido: {selected_model}. Disponíveis: {available}"
        )
    model = models[selected_model]

    template_dir = repository.resolve(presentation["template"])
    brief_path = repository.resolve(presentation["brief"])
    assets = {
        target: repository.resolve(source)
        for target, source in presentation.get("assets", {}).items()
    }

    required = [
        template_dir / "index.html",
        repository.prompt,
        brief_path,
        *assets.values(),
    ]
    missing = [path for path in required if not path.exists()]
    if missing:
        rendered = ", ".join(str(path) for path in missing)
        raise ConfigurationError(f"Referências ausentes: {rendered}")

    destination = (
        output.resolve()
        if output
        else repository.root / "dist" / presentation_slug / selected_model
    )
    if destination.exists():
        shutil.rmtree(destination)

    workspace = destination / "workspace"
    shutil.copytree(
        template_dir,
        workspace,
        ignore=shutil.ignore_patterns(".DS_Store", "__MACOSX"),
    )
    for target, source in assets.items():
        target_path = workspace_target(workspace, target)
        target_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target_path)
    shutil.copy2(brief_path, destination / "brief.md")

    prompt = "\n\n".join(
        [
            repository.prompt.read_text(encoding="utf-8").strip(),
            "## Associação resolvida",
            f"- Apresentação: {presentation['name']}",
            f"- Responsável: {entity['name']} ({entity['kind']})",
            f"- Template: `{presentation['template']}`",
            f"- Roteiro: `{presentation['brief']}`",
            (
                f"- Modelo: `{selected_model}` "
                f"({model['provider']}, variável `{model['model_id_env']}`)"
            ),
            "- Diretório de trabalho: `workspace/`",
            "## Roteiro",
            brief_path.read_text(encoding="utf-8").strip(),
        ]
    )
    (destination / "prompt.md").write_text(prompt + "\n", encoding="utf-8")

    manifest = {
        "schema_version": 2,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "git_revision": git_revision(repository),
        "presentation": {
            "slug": presentation_slug,
            "name": presentation["name"],
            "brief": presentation["brief"],
            "brief_sha256": sha256(brief_path),
        },
        "owner": {
            "slug": entity["slug"],
            "name": entity["name"],
            "kind": entity["kind"],
        },
        "template": presentation["template"],
        "model": {
            "alias": selected_model,
            "provider": model["provider"],
            "model_id_env": model["model_id_env"],
        },
    }
    (destination / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return destination


def validate_repository(repository: Repository) -> list[str]:
    errors: list[str] = []
    unmanaged = [
        path
        for path in repository.presentation_directories()
        if not (path / "presentation.toml").is_file()
    ]
    errors.extend(
        "apresentação sem presentation.toml: "
        f"{path.relative_to(repository.root)}"
        for path in unmanaged
    )

    slugs = presentation_slugs(repository)
    if not slugs:
        errors.append("nenhuma apresentação cadastrada")
        return errors

    for slug in slugs:
        try:
            build_package(
                repository,
                slug,
                output=Path("/tmp/presentation-factory-validation") / slug,
            )
        except (KeyError, ConfigurationError) as error:
            errors.append(f"{slug}: {error}")
    return errors
