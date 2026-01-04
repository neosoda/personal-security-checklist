import { component$, useResource$, Resource } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Icon from "~/components/core/icon";
import { projects, socials, intro, contributing, license } from './about-content';
import { marked } from "marked";

export default component$(() => {

  interface Contributor {
    login: string;
    avatar_url: string;
    avatarUrl: string;
    html_url: string;
    contributions: number;
    name: string;
  }

  const parseMarkdown = (text: string | undefined): string => {
    return marked.parse(text || '', { async: false }) as string || '';
  };

  const contributorsResource = useResource$<Contributor[]>(async () => {
    const url = 'https://api.github.com/repos/lissy93/personal-security-checklist/contributors?per_page=100';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Échec de la récupération des contributeurs');
    }
    return await response.json();
  });

  const sponsorsResource = useResource$<Contributor[]>(async () => {
    const url = 'https://github-sponsors.as93.workers.dev/lissy93';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Échec de la récupération des sponsors');
    }
    return await response.json();
  });


  return (
    <div class="m-4 md:mx-16">
      <article class="bg-back p-8 mx-auto max-w-[1200px] m-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2">À propos de la checklist de sécurité</h2>
        {intro.map((paragraph, index) => (
          <p class="mb-2" key={index}>{paragraph}</p>
        ))}        
      </article>
      <div class="divider"></div>

      <article class="bg-back p-8 mx-auto max-w-[1200px] m-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2">Contribuer</h2>
        {contributing.map((paragraph, index) => (
          <p class="mb-2" key={index} dangerouslySetInnerHTML={parseMarkdown(paragraph)}></p>
        ))}        
      </article>
      <div class="divider"></div>

      <article class="bg-back p-8 mx-auto max-w-[1200px] m-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2">Remerciements</h2>


        <h3 class="text-2xl mb-2">Sponsors</h3>

        <p>
          Un immense merci aux sponsors suivants pour leur soutien continu 💖
        </p>

        <div class="flex flex-wrap gap-4 my-4 mx-auto">
          <Resource
              value={sponsorsResource}
              onPending={() => <p>Chargement...</p>}
              onResolved={(contributors: Contributor[]) => (
                contributors.map((contributor: Contributor) => (
                  <a
                    class="w-16 tooltip tooltip-bottom"
                    href={contributor.html_url || `https://github.com/${contributor.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={contributor.login}
                    data-tip={`Merci @${contributor.login}`}
                  >
                    <img
                      class="avatar rounded"
                      width="64" height="64"
                      src={contributor.avatar_url || contributor.avatarUrl}
                      alt={contributor.login}
                    />
                    <p
                      class="text-ellipsis overflow-hidden w-max-16 mx-auto line-clamp-2"
                    >{contributor.name || contributor.login}</p>
                  </a>
                ))
              )}
            />
          </div>

        <div class="divider"></div>

        <h3 class="text-2xl mb-2">Contributeurs</h3>
        <p>
          Ce projet existe grâce à toutes les personnes qui ont aidé à le construire et à le maintenir.<br />
          Merci tout particulièrement aux 100 principaux contributeurs 🌟
        </p>
        <div class="flex flex-wrap gap-4 my-4 mx-auto">
          <Resource
            value={contributorsResource}
            onPending={() => <p>Chargement...</p>}
            onResolved={(contributors: Contributor[]) => (
              contributors.map((contributor: Contributor) => (
                <a
                  class="w-16 tooltip tooltip-bottom"
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={contributor.login}
                  data-tip={`@${contributor.login} a contribué ${contributor.contributions} fois\n\nCliquez pour voir son profil`}
                >
                  <img
                    class="avatar rounded"
                    width="64" height="64"
                    src={contributor.avatar_url}
                    alt={contributor.login}
                  />
                  <p
                    class="text-ellipsis overflow-hidden w-max-16 mx-auto"
                  >{contributor.login}</p>
                </a>
              ))
            )}
          />
        </div>

      </article>
      <div class="divider"></div>

      <article class="bg-back p-8 mx-auto max-w-[1200px] my-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2" id="author">À propos de l’autrice</h2>
          <p>
            Ce projet a été initialement lancé par
            moi, <a href="https://aliciasykes.com" class="link link-primary">Alicia Sykes</a>,
            avec beaucoup d’aide de la communauté.
          </p>
          <br />
          <div class="ml-4 float-right">
            <img class="rounded-lg" width="180" height="240" alt="Alicia Sykes" src="https://i.ibb.co/fq10qhL/DSC-0597.jpg" />
            <div class="flex gap-2 my-2 justify-between">
              {
                socials.map((social, index) => (
                  <a key={index} href={social.link}>
                    <Icon icon={social.icon} width={24} height={24} />
                  </a>
                ))
              }
            </div>
          </div>
          <p class="text-lg italic font-thin">
            Je crée des apps qui aident à <b>échapper aux géants du numérique, sécuriser ses données et protéger sa vie privée</b>.
          </p>
          <br />
          <p>
            J’ai un intérêt particulier pour l’auto-hébergement, Linux, la sécurité et l’OSINT.<br />
            Si ce type de sujet vous intéresse, voici d’autres projets :
          </p>
          <ul class="list-disc pl-8">
            {
              projects.map((project, index) => (
                <li key={index}>
                  <img class="rounded inline mr-1" width="20" height="20" alt={project.title} src={project.icon} />
                  <a href={project.link} class="link link-secondary" target="_blank" rel="noreferrer">
                    {project.title}
                  </a> - {project.description}
                </li>
              ))
            }
          </ul>
          <br />
          <p>
            Pour découvrir davantage d’apps open source que j’ai publiées,
            see <a href="https://apps.aliciasykes.com/" class="link link-primary">apps.aliciasykes.com</a>,
            ou <a href="https://github.com/lissy93" class="link link-primary">suivez-moi sur GitHub</a>
          </p>

      </article>

      <div class="divider"></div>

      <article class="bg-back p-8 mx-auto max-w-[1200px] m-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2">Licence</h2>
        <p>
          Ce projet est sous double licence, avec le contenu de la checklist (situé
          dans <a class="link" href="https://github.com/Lissy93/personal-security-checklist/blob/HEAD/personal-security-checklist.yml">
            <code>personal-security-checklist.yml</code>
          </a>) being licensed
          under <b><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a></b>.
          Et tout le reste (y compris tout le code) est sous licence
          under <b><a href="https://gist.github.com/Lissy93/143d2ee01ccc5c052a17">MIT</a></b>.
        </p>
        <pre class="bg-front whitespace-break-spaces rounded text-xs my-2 mx-auto p-2">
          {license}
        </pre>
        <details class="collapse">
          <summary class="collapse-title">
            <h3 class="mt-2">Qu’est-ce que cela signifie pour vous ?</h3>
          </summary>
          <div class="collapse-content">
            <p class="mb-2">
              Cela signifie que pour tout (sauf le fichier YAML de la checklist), vous avez une liberté quasi illimitée pour
              utiliser, copier, modifier, fusionner, publier, distribuer, concéder des sous-licences et/ou vendre des copies de ce logiciel.
              Nous demandons simplement d’inclure l’avis de copyright et l’avis de permission d’origine dans toute copie du logiciel.
            </p>
            <p class="mb-2">
              Et pour le contenu de la checklist, vous pouvez le partager et l’adapter tant que vous créditez correctement,
              n’en faites pas un usage commercial et publiez vos contributions sous la même licence.
            </p>
          </div>
        </details>

      </article>

    </div>
  );
});

export const head: DocumentHead = {
  title: "À propos | Défense numérique",
  meta: [
    {
      name: "description",
      content: "Ce projet vise à fournir des conseils pratiques pour améliorer votre sécurité numérique et protéger votre vie privée en ligne",
    },
  ],
};
