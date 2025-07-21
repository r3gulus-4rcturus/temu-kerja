import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";
import { getCurrentUser } from "../../lib/auth";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
