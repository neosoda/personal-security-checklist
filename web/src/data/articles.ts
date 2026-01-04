
interface Article {
  title: string;
  description: string;
  slug: string;
  markdown: string;
  warningMessage?: string;
}

const articles: Article[] = [
  {
    title: 'Pourquoi la sécurité compte ?',
    description: 'Pourquoi votre sécurité numérique et votre vie privée doivent être prises au sérieux.',
    slug: 'importance-of-digital-security',
    markdown: 'https://raw.githubusercontent.com/Lissy93/personal-security-checklist/old-version/0_Why_It_Matters.md',
  },
  {
    title: 'Checklist de sécurité : version courte',
    description: 'Liste principale trop longue ? Voici le résumé',
    slug: 'short-list',
    markdown: 'https://raw.githubusercontent.com/Lissy93/personal-security-checklist/old-version/2_TLDR_Short_List.md',
  },
  {
    title: 'Liens utiles',
    description: 'Répertoire de liens vers des outils, ressources et informations complémentaires.',
    slug: 'helpful-links',
    markdown: 'https://raw.githubusercontent.com/Lissy93/personal-security-checklist/old-version/4_Privacy_And_Security_Links.md',
    warningMessage: 'Cet article a été rédigé en 2020 et nécessite une mise à jour.',
  },
  {
    title: 'Gadgets de sécurité',
    description: 'Matériel utile pour protéger votre vie privée et votre sécurité.',
    slug: 'privacy-gadgets',
    markdown: 'https://raw.githubusercontent.com/Lissy93/personal-security-checklist/old-version/6_Privacy_and-Security_Gadgets.md',
    warningMessage: 'Cet article est obsolète et peut contenir des informations incorrectes. '
      +'Il est recommandé de vérifier les informations avant d’utiliser les produits listés.',
  },
  {
    title: 'Logiciels respectueux de la vie privée',
    description: 'La liste ultime d’alternatives respectueuses de la vie privée aux apps et services populaires.',
    slug: 'awesome-privacy',
    markdown: 'https://raw.githubusercontent.com/Lissy93/awesome-privacy/main/README.md',
    warningMessage: 'Cette ressource a déménagé ! Vous pouvez désormais y accéder sur github.com/Lissy93/awesome-privacy',
  },
];

export default articles;
