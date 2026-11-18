from __future__ import annotations

import json
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from presentation_factory.builder import (
    build_package,
    presentation_slugs,
    rebase_css_urls,
    validate_repository,
    workspace_target,
)
from presentation_factory.config import ConfigurationError, Repository, load_toml


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
            (destination / "workspace/assets/js/deck.js").is_file()
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
            "organizations/ibm/templates/ibm-template",
        )
        self.assertTrue((destination / "workspace/index.html").is_file())

    def test_template_assets_are_packaged(self) -> None:
        destination = build_package(
            self.repository,
            "ia-setor-bancario-brasil",
            output=self.output / "banking-package",
        )

        self.assertTrue(
            (destination / "workspace/assets/ibm-logo.svg").is_file()
        )
        index = (destination / "workspace/index.html").read_text(
            encoding="utf-8"
        )
        self.assertIn("<style>", index)
        self.assertIn("<script>", index)
        self.assertFalse(
            (destination / "workspace/template.toml").exists()
        )

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
            if "font-size: 100%;" in content:
                # 1.125rem at the browser's default 16px root is 18px, while
                # respecting larger user font preferences and browser zoom.
                self.assertIn("--text-18: 1.125rem;", content)
                self.assertIn("font: var(--text-18)/1.5 var(--font-sans)", content)
            else:
                self.assertIn("font-size: 18px;", content,
                              msg=str(path.relative_to(ROOT)))

    def test_rebases_relative_css_urls_when_inlining(self) -> None:
        css = (
            ".a { mask-image: url('pictograms/cloud.svg'); }"
            ' .b { background: url("icons/x.svg"); }'
            " .c { background: url(data:image/png;base64,AAAA); }"
            " .d { background: url(https://example.com/a.png); }"
            " .e { background: url('assets/already.svg'); }"
            " .f { background: url(#fragment); }"
        )
        rebased = rebase_css_urls(css)
        self.assertIn("url('assets/pictograms/cloud.svg')", rebased)
        self.assertIn('url("assets/icons/x.svg")', rebased)
        self.assertIn("url(data:image/png;base64,AAAA)", rebased)
        self.assertIn("url(https://example.com/a.png)", rebased)
        self.assertIn("url('assets/already.svg')", rebased)
        self.assertIn("url(#fragment)", rebased)

    def test_compiled_index_has_no_broken_css_asset_urls(self) -> None:
        for slug in presentation_slugs(self.repository):
            destination = build_package(
                self.repository, slug, output=self.output / slug
            )
            workspace = destination / "workspace"
            index = (workspace / "index.html").read_text(encoding="utf-8")
            for reference in re.findall(r"url\(['\"]?([^'\")]+)['\"]?\)", index):
                if reference.startswith(("data:", "http", "#")):
                    continue
                self.assertTrue(
                    (workspace / reference).is_file(),
                    msg=f"{slug}: {reference} not found relative to index.html",
                )

    def test_generated_template_css_keeps_media_query_root_overrides(self) -> None:
        # Regression: pruning unused tokens must not mangle `:root` rules nested in
        # @media blocks (it once dropped a closing brace and hid slides in print).
        stylesheets = [
            *(ROOT / "organizations/ibm/templates").glob("*/assets/styles.css"),
            ROOT / "clients/ibm-enterprise/assets/css/styles.css",
        ]
        self.assertTrue(stylesheets)
        for path in stylesheets:
            content = re.sub(
                r"/\*.*?\*/", "", path.read_text(encoding="utf-8"), flags=re.S
            )
            name = str(path.relative_to(ROOT))
            self.assertEqual(content.count("{"), content.count("}"), msg=name)
            self.assertIn(":root { --page-pad: var(--u-5); }", content, msg=name)
            declared = set(re.findall(r"(--[\w-]+)\s*:", content))
            used = set(re.findall(r"var\(\s*(--[\w-]+)", content))
            self.assertFalse(
                {v for v in used if v not in declared}
                - {"--i", "--n", "--value", "--reveal-delay"},
                msg=f"{name}: undefined custom properties",
            )

    def test_inline_icons_use_official_carbon_artboards(self) -> None:
        # Carbon ships 16/20/24/32 px icon artboards; never scale a 32 px icon down.
        official = {16, 20, 24, 32}
        templates = [
            *(ROOT / "organizations/ibm/templates").glob("*/index.html"),
            ROOT / "clients/ibm-enterprise/templates/standard-deck/index.html",
        ]
        for path in templates:
            html = path.read_text(encoding="utf-8")
            for tag in re.findall(r"<svg\b[^>]*>", html):
                width = re.search(r'width="(\d+)"', tag)
                box = re.search(r'viewBox="0 0 (\d+) (\d+)"', tag)
                name = str(path.relative_to(ROOT))
                self.assertIsNotNone(width, msg=f"{name}: {tag}")
                self.assertIsNotNone(box, msg=f"{name}: {tag}")
                self.assertIn(int(width.group(1)), official, msg=f"{name}: {tag}")
                self.assertEqual(
                    int(width.group(1)), int(box.group(1)), msg=f"{name}: {tag}"
                )
                self.assertIn('aria-hidden="true"', tag, msg=f"{name}: {tag}")
                self.assertIn('focusable="false"', tag, msg=f"{name}: {tag}")

    def test_navigation_targets_are_at_least_44px(self) -> None:
        css = (ROOT / "tools/template-assets/base.css").read_text(encoding="utf-8")
        for width in re.findall(r"\n\s*\.dot \{ width: ([\d.]+)rem", css):
            self.assertGreaterEqual(float(width) * 16, 44, msg=".dot touch target")
        self.assertIn(".dot { flex-shrink: 0; width: 2.75rem; height: 2.75rem;", css)

    def test_template_mask_images_are_inlined_for_file_protocol(self) -> None:
        for slug in ("ibm-template", "ibm-brief-template", "ibm-edge-template"):
            css = (
                ROOT / f"organizations/ibm/templates/{slug}/assets/styles.css"
            ).read_text(encoding="utf-8")
            self.assertNotRegex(css, r"url\(\s*['\"]?(?:icons|pictograms)/", msg=slug)

    def test_status_deltas_do_not_rely_on_color_alone(self) -> None:
        html = (
            ROOT / "organizations/ibm/templates/ibm-brief-template/index.html"
        ).read_text(encoding="utf-8")
        deltas = re.findall(
            r'<span class="metric__delta metric__delta--(?:up|down)">(.*?)</span></span>',
            html,
            flags=re.S,
        )
        self.assertEqual(len(deltas), 4)
        for delta in deltas:
            self.assertIn("<svg", delta)

    def test_accent_colors_keep_contrast_with_white_icons(self) -> None:
        def luminance(hex_color: str) -> float:
            channels = [int(hex_color[i : i + 2], 16) / 255 for i in (0, 2, 4)]
            linear = [
                c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
                for c in channels
            ]
            return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]

        css = (ROOT / "tools/template-assets/base.css").read_text(encoding="utf-8")
        for token in ("--ibm-cyan", "--ibm-teal", "--ibm-blue", "--gray-60"):
            value = re.search(rf"{token}: #([0-9a-f]{{6}})", css).group(1)
            ratio = 1.05 / (luminance(value) + 0.05)
            self.assertGreaterEqual(ratio, 4.5, msg=f"{token} #{value}: {ratio:.2f}:1")

    def test_bar_chart_exposes_visible_values_and_labels(self) -> None:
        html = (
            ROOT / "organizations/ibm/templates/ibm-template/index.html"
        ).read_text(encoding="utf-8")
        bars = re.findall(r'<li class="chart-row__bar"[^>]*>(.*?)</li>', html, re.S)
        self.assertGreaterEqual(len(bars), 2)
        for bar in bars:
            self.assertIn("chart-row__value", bar)
            self.assertIn("chart-row__label", bar)

    def test_malformed_toml_reports_configuration_error(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            broken = Path(directory) / "broken.toml"
            broken.write_text("slug = \n", encoding="utf-8")
            with self.assertRaises(ConfigurationError):
                load_toml(broken)


    def test_new_deck_script_fills_tokens_and_keeps_only_used_assets(self) -> None:
        script = str(ROOT / "tools/new_deck.py")
        with tempfile.TemporaryDirectory() as directory:
            content = Path(directory) / "content.json"
            content.write_text(
                json.dumps({"TITULO": 'A & "B"', "CLIENTE": "Acme", "EXTRA": "x"}),
                encoding="utf-8",
            )
            out = Path(directory) / "deck"
            result = subprocess.run(
                [sys.executable, script, "create", "edge", "deck", str(content), "--out", str(out)],
                capture_output=True, text=True, check=True,
            )
            page = (out / "index.html").read_text(encoding="utf-8")
            self.assertNotRegex(page, r"\{\{[A-Z0-9_]+\}\}")
            self.assertIn("A &amp; &quot;B&quot;", page)
            self.assertIn("[A confirmar]", page)
            self.assertNotIn("image-placeholder", page)
            self.assertIn("EXTRA", result.stdout)
            names = {path.name for path in (out / "assets").rglob("*") if path.is_file()}
            self.assertNotIn("image-placeholder.svg", names)
            self.assertNotIn("logo-light.svg", names)
            self.assertTrue({"styles.css", "deck.js", "ibm-logo.svg"} <= names)

            inside = subprocess.run(
                [sys.executable, script, "create", "edge", "x", str(content), "--out", str(ROOT / "x")],
                capture_output=True, text=True,
            )
            self.assertNotEqual(inside.returncode, 0)
            self.assertIn("fora de presentation-factory", inside.stderr)
            self.assertFalse((ROOT / "x").exists())


if __name__ == "__main__":
    unittest.main()
