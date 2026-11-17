"""Assemble standalone IBM templates. Use --check to detect unsynchronized copies.

Each template receives base.css + expressive.css + its own composition CSS. Custom
properties declared in `:root` that the template never references (in its CSS or HTML)
are pruned, so no template ships unused design tokens.
"""
from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
source = root / 'tools/template-assets'
ibm = root / 'organizations/ibm'
check = '--check' in sys.argv
stale = []

# Only the multi-line, top-level block: indented or one-line `:root {...}` rules inside
# @media queries must be left untouched.
ROOT_BLOCK = re.compile(r'^:root \{\n(.*?)\n\}', re.S | re.M)
DECLARATION = re.compile(r'--[\w-]+\s*:[^;]+;')


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def prune_unused_tokens(css: str, html: str) -> str:
    """Drop `:root` custom properties that nothing references, until stable."""
    while True:
        usage = css + html
        removed = False

        def prune_block(match):
            nonlocal removed
            lines = []
            for line in match.group(1).split('\n'):
                kept = []
                for declaration in DECLARATION.findall(line):
                    name = declaration.split(':', 1)[0].strip()
                    if re.search(rf'var\(\s*{re.escape(name)}\b', usage):
                        kept.append(declaration)
                    else:
                        removed = True
                if kept:
                    lines.append('  ' + ' '.join(kept))
                elif not DECLARATION.search(line) and line.strip():
                    lines.append(line.rstrip())  # non-token lines such as color-scheme
            return ':root {\n' + '\n'.join(lines) + '\n}'

        css = ROOT_BLOCK.sub(prune_block, css)
        if not removed:
            return css


def assemble(composition: str, html_path: Path) -> str:
    css = '\n'.join(read(source / name) for name in ('base.css', 'expressive.css', composition))
    return prune_unused_tokens(css, read(html_path))


def sync(target: Path, content: str) -> None:
    if check:
        if not target.is_file() or read(target) != content:
            stale.append(str(target.relative_to(root)))
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding='utf-8', newline='\n')


deck_js = read(ibm / 'assets/js/deck.js')

for slug in ('ibm-template', 'ibm-brief-template', 'ibm-edge-template'):
    template = ibm / 'templates' / slug
    sync(template / 'assets/styles.css', assemble(f'{slug}.css', template / 'index.html'))
    sync(template / 'assets/deck.js', deck_js)

# Standard workshop template also remains directly openable and builder-compatible.
standard = root / 'clients/ibm-enterprise/templates/standard-deck'
standard_css = assemble('standard-deck.css', standard / 'index.html')
sync(root / 'clients/ibm-enterprise/assets/css/styles.css', standard_css)
sync(standard / 'assets/brand/styles.css', standard_css)
sync(standard / 'assets/js/deck.js', deck_js)

if stale:
    raise SystemExit('Unsynchronized template assets:\n' + '\n'.join(stale))
print('Template assets verified.' if check else 'Template assets synchronized.')
