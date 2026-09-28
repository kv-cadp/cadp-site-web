import DatingRegistrationPage from "@/components/dating/DatingRegistrationPage";
import { buildDatingPageMetadata } from "@/lib/dating/metadata";

// Adresse imprimée (invitation, QR code) : ne pas renommer.
const PATH = "/dating-guilherand";

export function generateMetadata() {
  return buildDatingPageMetadata(PATH, "employeur");
}

export default function Page() {
  return <DatingRegistrationPage path={PATH} audience="employeur" />;
}
