/**
 * Envoi de secours par e-mail (Web3Forms), depuis le navigateur, quand
 * CADP Connect n'a pas pu enregistrer la demande (voir ./actions.ts).
 */
const WEB3FORMS_KEY = "71bda4ba-4321-4e90-bc67-28642b72f8a3";

export async function envoyerParEmail(champs: Record<string, string>): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...champs, botcheck: "" }),
    });
    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch {
    return false;
  }
}
