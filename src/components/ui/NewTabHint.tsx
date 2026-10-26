/**
 * Mention lue par les lecteurs d'écran à la fin d'un lien qui ouvre un nouvel
 * onglet (target="_blank"), invisible à l'écran (B7, 26/10/2026).
 */
export default function NewTabHint() {
  return <span className="sr-only">{" (nouvel onglet)"}</span>;
}
