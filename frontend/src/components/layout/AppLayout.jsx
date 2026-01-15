import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">
      <Sidebar />
      <main className="flex-1 px-8 py-6">
        <TopBar />
        {children}
      </main>
    </div>
  );
}
