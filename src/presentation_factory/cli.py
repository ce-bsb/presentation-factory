from __future__ import annotations

import argparse
import sys
from pathlib import Path

from presentation_factory.builder import (
    build_package,
    presentation_slugs,
    validate_repository,
)
from presentation_factory.config import ConfigurationError, discover_repository


def parser() -> argparse.ArgumentParser:
    command = argparse.ArgumentParser(prog="presentation-factory")
    subcommands = command.add_subparsers(dest="command", required=True)

    build = subcommands.add_parser("build", help="Monta um pacote reproduzível")
    build.add_argument("presentation", help="Slug da apresentação")
    build.add_argument("--model", help="Alias do modelo")
    build.add_argument("--output", type=Path, help="Diretório de saída")

    subcommands.add_parser("validate", help="Valida todas as associações")
    subcommands.add_parser("list", help="Lista apresentações cadastradas")
    return command


def main(argv: list[str] | None = None) -> int:
    args = parser().parse_args(argv)
    try:
        repository = discover_repository()
        if args.command == "build":
            output = build_package(
                repository,
                args.presentation,
                model_alias=args.model,
                output=args.output,
            )
            print(output)
            return 0
        if args.command == "list":
            print("\n".join(presentation_slugs(repository)))
            return 0

        errors = validate_repository(repository)
        if errors:
            for error in errors:
                print(f"erro: {error}", file=sys.stderr)
            return 1
        print(f"{len(presentation_slugs(repository))} apresentações validadas")
        return 0
    except (KeyError, ConfigurationError) as error:
        print(f"erro: {error}", file=sys.stderr)
        return 2
