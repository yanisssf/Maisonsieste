// Single source of truth for product facts (from the Maison Sieste project notes).
// Anything marked "à confirmer" in the notes stays flagged in the footer.

export type PackId = 'solo' | 'duo'

const IMG = `${import.meta.env.BASE_URL}img/`
export const img = (name: string) => `${IMG}${name}.webp`

// Coloris proposés par le fournisseur (à confirmer avec la commande d'échantillons).
export type ColorId = 'marine' | 'ciel' | 'rose' | 'sable' | 'gris'
export const COLORS: { id: ColorId; name: string; hex: string; src: string }[] = [
  { id: 'marine', name: 'Bleu nuit', hex: '#2F3F72', src: img('pillow-marine') },
  { id: 'ciel', name: 'Bleu ciel', hex: '#B4CBF0', src: img('pillow-ciel') },
  { id: 'rose', name: 'Rose poudré', hex: '#F2C9D0', src: img('pillow-rose') },
  { id: 'sable', name: 'Sable', hex: '#F4E1A1', src: img('pillow-sable') },
  { id: 'gris', name: 'Gris perle', hex: '#B9BDC4', src: img('pillow-gris') },
]
export const colorOf = (id: ColorId) => COLORS.find((c) => c.id === id)!
export const PHOTO_LIT = img('sieste-lit')
export const SIZE = '69 × 38 cm'

export const PACKS: Record<PackId, { id: PackId; name: string; sub: string; price: number; was?: number; pillows: number }> = {
  solo: { id: 'solo', name: '1 Cloud Pillow', sub: 'Pour toi', price: 49, pillows: 1 },
  duo: { id: 'duo', name: 'Le duo', sub: '2 Cloud Pillow · 39,50 € l’oreiller', price: 79, was: 98, pillows: 2 },
}

export const TRUST = ['Essai 30 nuits', 'Livré en France', 'Paiement sécurisé'] as const

export const TICKER = [
  'Mousse à mémoire de forme',
  'Double face, double hauteur',
  '5 coloris',
  'Housse amovible et lavable',
  'Livré roulé sous vide',
  'Essai 30 nuits',
]

export const MOMENTS = [
  { time: 'Dimanche, 14 h 30', title: 'La sieste officielle', text: 'Volets mi-clos, téléphone retourné. Tu t’allonges « cinq minutes ».' },
  { time: 'Mardi, 23 h 10', title: 'Le dernier épisode', text: 'Calé contre le côté haut, la série continue, la nuque suit.' },
  { time: 'Samedi, 9 h', title: 'La grasse mat’ à deux', text: 'Deux nuages, zéro dispute pour le meilleur oreiller.' },
  { time: 'Lundi, 13 h', title: 'Pause télétravail', text: 'Vingt minutes entre deux visios. Personne n’a besoin de savoir.' },
  { time: 'Mercredi, 7 h 02', title: 'Le réveil qui sonne trop tôt', text: 'Encore une minute. Le nuage a gardé ta forme, toi aussi.' },
  { time: 'Vendredi, minuit', title: 'Retour de soirée', text: 'Tu ne retrouves plus tes clés, mais tu retrouves ton oreiller.' },
]

export const FAQ = [
  {
    q: 'C’est quoi, un oreiller « nuage » ?',
    a: 'Un oreiller en mousse à mémoire de forme, avec une forme douce et arrondie. Il soutient la nuque comme un oreiller ergonomique, sans le look rigide et médical.',
  },
  {
    q: 'Pourquoi deux hauteurs ?',
    a: 'Un côté bas, un côté haut. Sur le dos, ta tête a besoin de peu de hauteur ; sur le côté, il faut combler l’espace entre l’épaule et la tête. Tu le tournes selon ta position.',
  },
  {
    q: 'Comment fonctionne l’essai 30 nuits ?',
    a: 'Tu dors dessus pendant 30 nuits. S’il ne te convient pas, tu nous contactes et on organise le retour. Laisse-toi quelques nuits d’adaptation : c’est normal avec une mousse à mémoire de forme.',
  },
  {
    q: 'Il arrive tout plat, c’est normal ?',
    a: 'Oui. Il est compressé sous vide pour le transport. Sors-le de son emballage et laisse-le reprendre sa forme quelques heures avant la première nuit.',
  },
  {
    q: 'Comment je le lave ?',
    a: 'La housse s’enlève et se lave en machine. La mousse, elle, ne se lave pas : il suffit de l’aérer de temps en temps.',
  },
  {
    q: 'Il est fabriqué où ?',
    a: 'Il est conçu par Maison Sieste et fabriqué par un partenaire sélectionné. On te donnera tous les détails (matières, certifications) sur la fiche produit avant le lancement.',
  },
]
