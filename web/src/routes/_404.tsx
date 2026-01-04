// src/routes/_404.tsx
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div>
      <h1>404 Introuvable</h1>
      <p>La page que vous recherchez n’existe pas.</p>
      <a href="/">Retour à l’accueil</a>
    </div>
  );
});
