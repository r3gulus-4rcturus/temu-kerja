import Footer from "../../components/shared/Footer";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex overflow-hidden">{children}</div>
      <Footer />
    </div>
  );
}
