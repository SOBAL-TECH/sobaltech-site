import type { Metadata } from "next";

// Metadata only — no auth check here.
// Auth is enforced by app/admin/(protected)/layout.tsx for all
// protected pages. The login page inherits this layout and remains
// publicly accessible.
export const metadata: Metadata = {
  title: {
    default: "Admin — SobalTech",
    template: "Admin | %s — SobalTech",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
