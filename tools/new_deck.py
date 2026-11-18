"""Create a deck from an IBM template without reading or rewriting its HTML.

  python3 tools/new_deck.py tokens edge
  python3 tools/new_deck.py create edge my-deck content.json [--client-logo logo.png]

`tokens` prints the {{PLACEHOLDERS}} of a template grouped by slide.
`create` copies index.html + assets/ to a sibling folder of the factory, fills every
token from a flat JSON object ({"TITULO": "...", ...}), HTML-escapes the values and
fills what is missing with "[A confirmar]". Only the files the deck references are kept.
"""
from pathlib import Path
import argparse
import html
import json
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = ROOT / 'organizations/ibm/templates'
ALIASES = {'ibm': 'ibm-template', 'brief': 'ibm-brief-template', 'edge': 'ibm-edge-template'}
TOKEN = re.compile(r'\{\{([A-Z0-9_]+)\}\}')
CLIENT_MARK = re.compile(r'[ \t]*<div class="brand-mark brand-mark-client">.*?</div>\n?', re.S)
MISSING = '[A confirmar]'
SLUG = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')


def template_dir(name: str) -> Path:
    slug = ALIASES.get(name, name)
    path = TEMPLATES / slug
    if not (path / 'index.html').is_file():
        raise SystemExit(f'Template desconhecido: {name}. Use: {", ".join(ALIASES)}')
    return path


def tokens_by_slide(page: str) -> list[tuple[str, list[str]]]:
    spans = [(m.start(), m.end()) for m in re.finditer(r'<section\b.*?</section>', page, re.S)]
    groups: list[tuple[str, list[str]]] = [('Geral', [])]
    seen: set[str] = set()

    def collect(chunk: str) -> list[str]:
        found = [t for t in TOKEN.findall(chunk) if t not in seen]
        seen.update(found)
        return list(dict.fromkeys(found))

    cursor = 0
    for number, (start, end) in enumerate(spans, 1):
        groups[0][1].extend(collect(page[cursor:start]))
        groups.append((f'Slide {number}', collect(page[start:end])))
        cursor = end
    groups[0][1].extend(collect(page[cursor:]))
    return [group for group in groups if group[1]]


def cmd_tokens(args) -> None:
    path = template_dir(args.template)
    print(f'{path.name}: preencha com JSON plano {{"TOKEN": "texto"}}; ausente = "{MISSING}"')
    for label, names in tokens_by_slide((path / 'index.html').read_text(encoding='utf-8')):
        print(f'{label}: ' + ' '.join(names))


def referenced(name: str, text: str) -> bool:
    return name in text


def cmd_create(args) -> None:
    source = template_dir(args.template)
    if not SLUG.match(args.slug):
        raise SystemExit(f'Slug inválido (use kebab-case): {args.slug}')
    values = json.loads(Path(args.content).read_text(encoding='utf-8'))
    if not isinstance(values, dict):
        raise SystemExit('O conteúdo deve ser um objeto JSON plano.')
    out = Path(args.out).resolve() if args.out else ROOT.parent / args.slug
    if ROOT in (out, *out.parents):
        raise SystemExit('Crie o deck fora de presentation-factory/.')
    if out.exists() and not args.force:
        raise SystemExit(f'{out} já existe (use --force para sobrescrever).')

    page = (source / 'index.html').read_text(encoding='utf-8')
    names = set(TOKEN.findall(page))
    unknown = sorted(set(values) - names)
    missing = sorted(names - set(values))

    client_logo = Path(args.client_logo).resolve() if args.client_logo else None
    if client_logo:
        if not client_logo.is_file():
            raise SystemExit(f'Logo do cliente não encontrado: {client_logo}')
        page = page.replace('assets/image-placeholder.svg" alt="{{CLIENTE}}"',
                            f'assets/client-logo{client_logo.suffix.lower()}" alt="{{{{CLIENTE}}}}"', 1)
    else:
        page = CLIENT_MARK.sub('', page, count=1)
    page = TOKEN.sub(lambda m: html.escape(str(values.get(m[1], MISSING)), quote=True), page)

    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(source / 'assets', out / 'assets')
    (out / 'index.html').write_text(page, encoding='utf-8', newline='\n')
    if client_logo:
        shutil.copy2(client_logo, out / 'assets' / f'client-logo{client_logo.suffix.lower()}')

    css = (out / 'assets/styles.css').read_text(encoding='utf-8')
    for file in sorted((out / 'assets').rglob('*')):
        if file.is_file() and file.name not in ('styles.css', 'deck.js') \
                and not referenced(file.name, page + css):
            file.unlink()
    for folder in sorted((out / 'assets').rglob('*'), reverse=True):
        if folder.is_dir() and not any(folder.iterdir()):
            folder.rmdir()

    print(f'Deck criado em {out}')
    print(f'Abra {out / "index.html"} no navegador.')
    if missing:
        print(f'Preenchidos com "{MISSING}": ' + ' '.join(missing))
    if unknown:
        print('Chaves ignoradas (não existem no template): ' + ' '.join(unknown))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawTextHelpFormatter)
    sub = parser.add_subparsers(dest='command', required=True)
    tokens = sub.add_parser('tokens', help='lista os tokens do template por slide')
    tokens.add_argument('template', help=f'{" | ".join(ALIASES)} ou o slug completo')
    tokens.set_defaults(run=cmd_tokens)
    create = sub.add_parser('create', help='cria o deck a partir do template e do JSON')
    create.add_argument('template')
    create.add_argument('slug')
    create.add_argument('content', help='arquivo JSON com {"TOKEN": "texto"}')
    create.add_argument('--out', help='pasta de saída (padrão: irmã de presentation-factory/)')
    create.add_argument('--client-logo', help='arquivo oficial do logo do cliente')
    create.add_argument('--force', action='store_true', help='sobrescreve a pasta de saída')
    create.set_defaults(run=cmd_create)
    args = parser.parse_args()
    args.run(args)


if __name__ == '__main__':
    sys.exit(main())
