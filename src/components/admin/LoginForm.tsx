"use client";

import { useActionState } from "react";
import { signIn, type AuthActionState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";

const initialState: AuthActionState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-text">Correo</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-text">Contraseña</label>
        <input
          type="password"
          name="password"
          required
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" variant="dark" disabled={pending} className="w-full">
        {pending ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}
