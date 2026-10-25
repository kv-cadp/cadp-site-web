This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Garde-fous de build

`npm run build` lance deux contrôles autour de `next build`. Une erreur arrête le build, donc le déploiement :

- `npm run check:fraicheur` (avant le build) : la rentrée annoncée dans `src/data/rentree.ts` est passée, ou un texte vend une rentrée, une ouverture ou des pré-inscriptions d'une saison passée (blog exclu). Avertit aussi en septembre et quand aucun événement daté n'est à venir. Pour tester une date : `CADP_TODAY=2027-10-01 npm run check:fraicheur`.
- `npm run check:mots-colles` (après le build) : mots collés dans le HTML généré, par exemple « financée— Aucun ». Cause : dans un texte JSX qui contient une entité (`&apos;`), l'espace qui suit une balise ou une expression disparaît. Correctif : `{" "}` explicite.

En cas d'urgence seulement : `CADP_SKIP_GARDE_FOUS=1 npm run build`.
