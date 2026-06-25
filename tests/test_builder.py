from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from presentation_factory.builder import (
    build_package,
    presentation_slugs,
    validate_repository,
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
            [
                "ia-parceria-produtividade",
                "ia-setor-bancario-brasil",
                "ibm-ai-document-review",
                "ibm-discovery-workshop",
                "lorem-ipsum-demo",
            ],
        )

    def test_builds_package_with_selected_model(self) -> None:
        destination = build_package(
            self.repository,
            "ibm-discovery-workshop",
            model_alias="alternate",
            output=self.output / "package",
        )
        manifest = json.loads(
            (destination / "manifest.json").read_text(encoding="utf-8")
        )

        self.assertEqual(manifest["schema_version"], 2)
        self.assertEqual(manifest["model"]["alias"], "alternate")
        self.assertNotIn("model_id", manifest["model"])
        self.assertEqual(manifest["owner"]["slug"], "ibm-enterprise")
        self.assertTrue((destination / "workspace/index.html").is_file())
        self.assertTrue(
            (destination / "workspace/assets/brand/styles.css").is_file()
        )
        self.assertTrue(
            (destination / "workspace/assets/partner/logo-dark.svg").is_file()
        )

    def test_builds_ibm_owned_presentation(self) -> None:
        destination = build_package(
            self.repository,
            "ia-parceria-produtividade",
            output=self.output / "ibm-package",
        )
        manifest = json.loads(
            (destination / "manifest.json").read_text(encoding="utf-8")
        )

        self.assertEqual(manifest["owner"]["slug"], "ibm")
        self.assertEqual(
            manifest["template"],
            "organizations/ibm/templates/ia-productivity-deck",
        )
        self.assertTrue((destination / "workspace/index.html").is_file())

    def test_rejects_unknown_model(self) -> None:
        with self.assertRaises(ConfigurationError):
            build_package(
                self.repository,
                "ibm-discovery-workshop",
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
            ROOT / "clients/ibm-enterprise/entity.toml",
            ROOT / "organizations/ibm/entity.toml",
        ]
        self.assertTrue(all(path.is_file() for path in expected))

    def test_all_presentation_directories_are_registered(self) -> None:
        self.assertEqual(validate_repository(self.repository), [])

    def test_presentations_are_always_light(self) -> None:
        sources = [
            *ROOT.glob("clients/**/*.css"),
            *ROOT.glob("clients/**/templates/**/*.html"),
            *ROOT.glob("organizations/**/*.css"),
            *ROOT.glob("organizations/**/templates/**/*.html"),
            *ROOT.glob("organizations/**/presentations/**/*.html"),
        ]
        for path in sources:
            content = path.read_text(encoding="utf-8")
            self.assertNotIn(
                "prefers-color-scheme: dark",
                content,
                msg=str(path.relative_to(ROOT)),
            )

        template = (
            ROOT
            / "clients/ibm-enterprise/templates/standard-deck/index.html"
        ).read_text(encoding="utf-8")
        self.assertIn('name="color-scheme" content="light"', template)

    def test_presentation_body_base_is_18px(self) -> None:
        stylesheets = [
            ROOT / "clients/ibm-enterprise/assets/css/styles.css",
            ROOT / "organizations/ibm/assets/css/styles.css",
        ]
        for path in stylesheets:
            content = path.read_text(encoding="utf-8")
            self.assertIn(
                "font-size: 18px;",
                content,
                msg=str(path.relative_to(ROOT)),
            )


if __name__ == "__main__":
    unittest.main()
