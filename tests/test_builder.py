from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from presentation_factory.builder import (
    build_package,
    presentation_slugs,
    workspace_target,
)
from presentation_factory.config import ConfigurationError, Repository


ROOT = Path(__file__).resolve().parents[1]


class BuilderTest(unittest.TestCase):
    def setUp(self) -> None:
        self.repository = Repository(ROOT)
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.output = Path(self.temporary_directory.name)

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    def test_lists_registered_presentations(self) -> None:
        self.assertEqual(
            presentation_slugs(self.repository),
            ["bb-dijur-sentencas", "bb-dirco-workshop"],
        )

    def test_builds_package_with_selected_model(self) -> None:
        destination = build_package(
            self.repository,
            "bb-dirco-workshop",
            model_alias="alternate",
            output=self.output / "package",
        )
        manifest = json.loads(
            (destination / "manifest.json").read_text(encoding="utf-8")
        )

        self.assertEqual(manifest["schema_version"], 2)
        self.assertEqual(manifest["model"]["alias"], "alternate")
        self.assertNotIn("model_id", manifest["model"])
        self.assertEqual(manifest["owner"]["slug"], "banco-do-brasil")
        self.assertTrue((destination / "workspace/index.html").is_file())
        self.assertTrue(
            (destination / "workspace/assets/brand/styles.css").is_file()
        )
        self.assertTrue(
            (destination / "workspace/assets/partner/logo-dark.svg").is_file()
        )

    def test_rejects_unknown_model(self) -> None:
        with self.assertRaises(ConfigurationError):
            build_package(
                self.repository,
                "bb-dirco-workshop",
                model_alias="missing",
                output=self.output / "package",
            )

    def test_rejects_path_outside_repository(self) -> None:
        with self.assertRaises(ConfigurationError):
            self.repository.resolve("../outside")

    def test_rejects_asset_target_outside_workspace(self) -> None:
        with self.assertRaises(ConfigurationError):
            workspace_target(self.output / "workspace", "../../outside")

    def test_entities_own_their_assets(self) -> None:
        expected = [
            ROOT / "clients/banco-do-brasil/entity.toml",
            ROOT / "clients/caixa/entity.toml",
            ROOT / "organizations/ibm/entity.toml",
        ]
        self.assertTrue(all(path.is_file() for path in expected))


if __name__ == "__main__":
    unittest.main()
