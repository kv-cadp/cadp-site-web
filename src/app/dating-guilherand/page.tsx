import DatingLanding from "@/components/dating/DatingLanding";
import { buildDatingPageMetadata } from "@/lib/dating/metadata";

// Adresse imprimée en clair sur les affiches : ne pas renommer.
const PATH = "/dating-guilherand";

export function generateMetadata() {
  return buildDatingPageMetadata(PATH, "lieu");
}

export default function Page() {
  return <DatingLanding path={PATH} />;
}
