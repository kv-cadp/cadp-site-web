import DatingRegistrationPage from "@/components/dating/DatingRegistrationPage";
import { buildDatingPageMetadata } from "@/lib/dating/metadata";

// Adresse imprimée (affiche, QR code) : ne pas renommer.
const PATH = "/dating-guilherand";

export function generateMetadata() {
  return buildDatingPageMetadata(PATH, "candidat");
}

export default function Page() {
  return <DatingRegistrationPage path={PATH} audience="candidat" />;
}
