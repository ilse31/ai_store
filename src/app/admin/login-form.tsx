"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh(); // This will re-run the server component and show the dashboard
      } else {
        const data = await res.json();
        setError(data.error || "Login gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm border border-border bg-card p-8 shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="font-condensed text-3xl uppercase tracking-widest text-foreground">
          Admin Login
        </h1>
        <p className="mt-2 text-xs font-light text-muted-foreground uppercase tracking-[0.15em]">
          AI Store CMS
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full border border-border bg-transparent px-4 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
            placeholder="Masukkan password admin"
            required
          />
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 border border-foreground bg-foreground text-xs font-bold uppercase tracking-[0.15em] text-background transition-colors hover:bg-transparent hover:text-foreground disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Masuk
        </button>
      </form>
    </div>
  );
}
