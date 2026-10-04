"""Generate review copies with explicitly illustrative content, preserving source tokens."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1] / 'organizations/ibm/templates'
names = {'ibm-template': 'Executive', 'ibm-brief-template': 'Brief', 'ibm-edge-template': 'Edge'}
values = {
    'TITULO': 'Tecnologia que transforma', 'CLIENTE': 'IBM',
    'DESCRICAO': 'Demonstração visual do template IBM. Conteúdo e métricas ilustrativos.',
    'AREA_OU_SERVICO': 'IBM Consulting', 'DOC_REF': 'DEMO / 2026',
    'TITULO_LINHA_1': 'Transforme ideias.', 'TITULO_LINHA_2': 'Crie impacto.',
    'EYEBROW_COVER': 'IBM / Estratégia e tecnologia',
    'LEDE_COVER': 'Uma perspectiva clara sobre as possibilidades da inteligência artificial para o seu negócio.',
    'LABEL_BARRA': 'IBM / Perspectivas', 'CLASSIFICACAO': 'Demonstração', 'DATA_COVER': 'Outubro 2026',
    'TAG_1': 'Estratégia', 'TAG_2': 'Tecnologia', 'TAG_3': 'Impacto',
    'CLOSING_LINHA_1': 'O próximo passo', 'CLOSING_LINHA_2': 'começa aqui.',
    'CLOSING_SUB': 'Vamos construir, juntos, uma nova possibilidade para o seu negócio.',
    'CITACAO_PARTE_1': 'O valor da tecnologia está nas', 'CITACAO_DESTAQUE': 'possibilidades que criamos',
    'CITACAO_PARTE_2': 'para as pessoas.', 'CITACAO_AUTOR': 'Uma visão de futuro', 'CITACAO_CARGO': 'Texto ilustrativo do template',
    'ARIA_SPLIT_LIST': 'Princípios de transformação', 'APRESENTADORES_KICKER': 'Equipe de trabalho',
    'COL_CRITERIO_HEADER': 'Dimensão', 'COL_A_HEADER': 'Cenário atual', 'COL_B_HEADER': 'Visão futura',
    'ANTES_LABEL': 'Cenário atual', 'DEPOIS_LABEL': 'Visão futura', 'TRANSICAO_LABEL': 'Evolução',
    'PANEL_A_TITULO': 'Entenda o contexto', 'PANEL_B_TITULO': 'Desenhe o futuro',
    'PANEL_A_TEXTO': 'Conecte os desafios do negócio às necessidades de quem utiliza a solução todos os dias.',
    'PANEL_B_TEXTO': 'Transforme oportunidades em experiências úteis, com objetivos claros e resultados mensuráveis.',
}
titles = {
'ibm-template': ['','Um novo contexto. Novas possibilidades.','Da oportunidade ao impacto.','O que aprendemos até aqui.','Inteligência aplicada ao negócio.','Uma nova forma de trabalhar.','Veja a transformação acontecer.','Resultados que orientam decisões.','Mais autonomia para as equipes.','Flexibilidade para crescer.','Um caminho claro para avançar.','Vamos construir o próximo capítulo.'],
'ibm-brief-template': ['','Uma perspectiva, cinco dimensões.','Sinais de transformação.','O contexto por trás dos números.','Da descoberta à entrega.','Uma evolução em cada dimensão.','', ''],
'ibm-edge-template': ['','O impacto, em perspectiva.','Duas perspectivas. Um objetivo.','Uma jornada de possibilidades.','Ideias em movimento.','Projetado para fazer a diferença.','Tecnologia com propósito.','']
}

def replacement(key, slug):
    if key in values: return values[key]
    m=re.fullmatch(r'TITULO_S(\d+)',key)
    if m: return titles[slug][int(m[1])-1] or 'O próximo capítulo.'
    if 'EYEBROW' in key: return 'Perspectivas / Demonstração'
    if 'SUBTITULO' in key or 'LEAD' in key: return 'Conecte estratégia, pessoas e tecnologia para transformar possibilidades em resultados.'
    if key.endswith('_ALT'): return 'Área reservada para uma imagem da apresentação'
    if key.endswith('_EMAIL'): return 'equipe@example.com'
    if key.endswith('_NOME'): return 'Equipe IBM'
    if key.endswith('_CARGO'): return 'Estratégia e tecnologia'
    if key.endswith('_VALOR'): return '32%' if any(x in key for x in ['METRIC','STAT','RESULTADO','BENEFICIO']) else 'Visão de futuro'
    if key.endswith('_DELTA'): return 'Exemplo ilustrativo'
    if key.endswith('_NUM'): return '01'
    if key.endswith('_TITULO') or re.match(r'LINHA_\d_LABEL',key):
        n=re.search(r'_(\d)',key)
        return ['Descobrir','Conectar','Experimentar','Evoluir'][(int(n[1])-1)%4] if n else 'Próximas possibilidades'
    if key.endswith('_LABEL') or key.endswith('_FASE') or 'KICKER' in key: return 'Demonstração'
    if key.endswith('_SUB') or key.endswith('_PERIODO'): return 'Outubro / 2026'
    if re.match(r'LINHA_\d_A',key): return 'Processos manuais'
    if re.match(r'LINHA_\d_B',key): return 'Fluxos integrados'
    if 'PILL' in key: return 'Impacto positivo'
    if 'FOOTER' in key: return 'IBM / Conteúdo ilustrativo'
    if key.startswith('NOTA'): return 'Valide premissas e evidências com sua equipe.'
    if key.startswith('CORPO_S4'): return 'A transformação começa com uma compreensão compartilhada do desafio. Ao combinar conhecimento do negócio e tecnologia, as equipes identificam oportunidades e definem prioridades com mais clareza.'
    return 'Conecte pessoas e tecnologia para gerar valor, com clareza em cada etapa.'

for slug, name in names.items():
    directory=root/slug
    source=(directory/'index.html').read_text()
    result=re.sub(r'\{\{([A-Z0-9_]+)\}\}',lambda m: replacement(m[1],slug),source)
    result=re.sub(r'      <div class="brand-mark brand-mark-client">.*?</div>', '', result, flags=re.S)
    result=result.replace('<title>Tecnologia que transforma',f'<title>Preview {name} — Tecnologia que transforma')
    (directory/'preview.html').write_text(result)
print('Three illustrative previews generated.')
