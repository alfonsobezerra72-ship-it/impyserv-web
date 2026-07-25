import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <AdminNav />
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
