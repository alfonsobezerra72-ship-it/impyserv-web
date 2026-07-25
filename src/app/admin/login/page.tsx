import { LoginForm } from "@/components/admin/LoginForm";
import { BRAND } from "@/lib/constants";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-center text-lg font-bold text-primary">
          Panel de administración — {BRAND.name}
        </h1>
        <p className="mt-1 text-center text-sm text-muted">Acceso solo para el administrador.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
