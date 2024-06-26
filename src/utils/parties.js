const parties = [
  {
    label: 'PSD',
    description: 'Partido Social Democrata',
    value: 'PSD',
  },
  { label: 'PS', description: 'Partido Socialista', value: 'PS' },
  { label: 'CH', description: 'Chega!', value: 'CH' },
  { label: 'IL', description: 'Iniciativa Liberal', value: 'IL' },
  { label: 'BE', description: 'Bloco de Esquerda', value: 'BE' },
  { label: 'PCP', description: 'Partido Comunista Português', value: 'PCP' },
  { label: 'L', description: 'Livre', value: 'L' },
  { label: 'CDS-PP', description: 'CDS - Partido Popular', value: 'CDS_PP' },
  { label: 'PAN', description: 'Pessoas Animais Natureza', value: 'PAN' },
  {
    label: 'ADN',
    description: 'Alternativa Democrática Nacional',
    value: 'ADN',
  },
  { label: 'RIR', description: 'Reagir Incluir Reciclar', value: 'RIR' },
  { label: 'JPP', description: 'Juntos Pelo Povo', value: 'JPP' },
  { label: 'ND', description: 'Nova Direita', value: 'ND' },
  {
    label: 'PCTP/MRPP',
    description: 'Partido Comunista dos Trabalhadores Portugueses',
    value: 'PCTP',
  },
  { label: 'VP', description: 'Volt Portugal', value: 'VP' },
  { label: 'E', description: 'Ergue-te', value: 'E' },
  { label: 'MPT', description: 'Partido da Terra', value: 'MPT' },
  { label: 'A', description: 'Aliança', value: 'A' },
  { label: 'PTP', description: 'Partido Trabalhista Português', value: 'PTP' },
  { label: 'NC', description: 'Nós Cidadãos', value: 'NC' },
  { label: 'PPM', description: 'Partido Popular Monárquico', value: 'PPM' },
  { label: 'PEV', description: 'Partido Ecologista "Os Verdes"', value: 'PEV' },
];

const roles = Object.freeze({
  PSD: '1242042978973909042',
  PS: '1242042897965121556',
  CH: '1242043031742578738',
  IL: '1242043180027871294',
  BE: '1242043783160270928',
  PCP: '1242043790647230485',
  L: '1242043791951794226',
  CDS_PP: '1242044081694052476',
  PAN: '1242043793377853440',
  ADN: '1242044145112059934',
  RIR: '1242044355364130877',
  JPP: '1242044508565274676',
  ND: '1242044568959058011',
  PCTP: '1242044653419757630',
  VP: '1242044698428706917',
  E: '1242044717785546793',
  MPT: '1242044739432218647',
  A: '1242044785980735550',
  PTP: '1242044821980319907',
  NC: '1242044875550101568',
  PPM: '1242044949307068486',
  PEV: '1242045056328925204',
});

module.exports = { parties, roles };
