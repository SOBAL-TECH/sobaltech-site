import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";

export const metadata = {
  title: {
    default: "Admin Dashboard",
    template: "Admin | %s",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <AdminSidebar user={session.user} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader user={session.user} />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
