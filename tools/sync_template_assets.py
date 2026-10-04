"""Assemble standalone IBM templates. Use --check to detect unsynchronized copies."""
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[1]
source = root / 'tools/template-assets'
ibm = root / 'organizations/ibm'
check = '--check' in sys.argv
stale = []
for slug in ('ibm-template', 'ibm-brief-template', 'ibm-edge-template'):
    assets = ibm / 'templates' / slug / 'assets'
    outputs = {
        'styles.css': (source / 'base.css').read_text() + '\n' + (source / 'expressive.css').read_text() + '\n' + (source / f'{slug}.css').read_text(),
        'deck.js': (ibm / 'assets/js/deck.js').read_text(),
    }
    for filename, content in outputs.items():
        target = assets / filename
        if check:
            if not target.is_file() or target.read_text() != content:
                stale.append(str(target.relative_to(root)))
        else:
            target.write_text(content)
# Standard workshop template also remains directly openable and builder-compatible.
standard_css = (source / 'base.css').read_text() + '\n' + (source / 'expressive.css').read_text() + '\n' + (source / 'standard-deck.css').read_text()
standard = root / 'clients/ibm-enterprise/templates/standard-deck'
for target, content in {
    root / 'clients/ibm-enterprise/assets/css/styles.css': standard_css,
    standard / 'assets/brand/styles.css': standard_css,
    standard / 'assets/js/deck.js': (ibm / 'assets/js/deck.js').read_text(),
}.items():
    if check:
        if not target.is_file() or target.read_text() != content:
            stale.append(str(target.relative_to(root)))
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content)
if stale:
    raise SystemExit('Unsynchronized template assets:\n' + '\n'.join(stale))
print('Template assets verified.' if check else 'Template assets synchronized.')
