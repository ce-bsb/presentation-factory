from __future__ import annotations

import tomllib
from dataclasses import dataclass
from pathlib import Path


class ConfigurationError(ValueError):
    """Raised when repository configuration is invalid."""


@dataclass(frozen=True)
class Repository:
    root: Path

    @property
    def model_catalog(self) -> Path:
        return self.root / "catalog/models.toml"

    @property
    def prompt(self) -> Path:
        return self.root / "src/presentation_factory/prompt.md"

    def presentation_configs(self) -> list[Path]:
        configs: list[Path] = []
        for namespace in ("clients", "organizations"):
            configs.extend(
                self.root.glob(
                    f"{namespace}/*/presentations/*/presentation.toml"
                )
            )
        return sorted(configs)

    def entity_configs(self) -> list[Path]:
        configs: list[Path] = []
        for namespace in ("clients", "organizations"):
            configs.extend(self.root.glob(f"{namespace}/*/entity.toml"))
        return sorted(configs)

    def presentation_directories(self) -> list[Path]:
        directories: list[Path] = []
        for entity_config in self.entity_configs():
            presentations = entity_config.parent / "presentations"
            if presentations.is_dir():
                directories.extend(
                    path for path in presentations.iterdir() if path.is_dir()
                )
        return sorted(directories)

    def entity_config_for(self, path: Path) -> Path:
        resolved = path.resolve()
        for entity_config in self.entity_configs():
            entity_dir = entity_config.parent.resolve()
            if resolved == entity_dir or entity_dir in resolved.parents:
                return entity_config
        raise ConfigurationError(
            f"Entidade responsável não encontrada para: {path}"
        )

    def resolve(self, relative_path: str) -> Path:
        path = (self.root / relative_path).resolve()
        try:
            path.relative_to(self.root)
        except ValueError as exc:
            raise ConfigurationError(
                f"Caminho fora do repositório: {relative_path}"
            ) from exc
        return path


def discover_repository(start: Path | None = None) -> Repository:
    current = (start or Path.cwd()).resolve()
    for candidate in (current, *current.parents):
        if (candidate / "catalog/models.toml").is_file() and (
            candidate / "pyproject.toml"
        ).is_file():
            return Repository(candidate)
    raise ConfigurationError("Raiz do Presentation Factory não encontrada")


def load_toml(path: Path) -> dict:
    if not path.is_file():
        raise ConfigurationError(f"Arquivo não encontrado: {path}")
    with path.open("rb") as handle:
        return tomllib.load(handle)
