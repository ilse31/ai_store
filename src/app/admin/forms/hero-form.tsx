"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

export function HeroForm() {
  const [data, setData] = useState({
    eyebrow: "",
    headline1: "",
    headline2: "",
    headline3: "",
    subcopy: "",
    alurText: "",
    ctaLabel: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cms/hero")
      .then((res) => res.json())
      .then((d) => {
        if (d && !d.error) setData(d);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/cms/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success("Hero content berhasil disimpan");
      else toast.error("Gagal menyimpan hero content");
    } catch {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-condensed text-2xl uppercase tracking-widest text-foreground">Hero Content</h2>
        <p className="mt-1 text-xs font-light text-muted-foreground uppercase tracking-[0.1em]">Ubah Teks di Bagian Paling Atas Web</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Eyebrow (Label Kecil)</label>
          <input type="text" value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} className="h-12 w-full border border-border bg-transparent px-4 text-sm text-foreground focus:border-foreground focus:outline-none" required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Headline 1</label>
            <input type="text" value={data.headline1} onChange={(e) => setData({ ...data, headline1: e.target.value })} className="h-12 w-full border border-border bg-transparent px-4 text-sm text-foreground focus:border-foreground focus:outline-none" required />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Headline 2</label>
            <input type="text" value={data.headline2} onChange={(e) => setData({ ...data, headline2: e.target.value })} className="h-12 w-full border border-border bg-transparent px-4 text-sm text-foreground focus:border-foreground focus:outline-none" required />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Headline 3</label>
            <input type="text" value={data.headline3} onChange={(e) => setData({ ...data, headline3: e.target.value })} className="h-12 w-full border border-border bg-transparent px-4 text-sm text-foreground focus:border-foreground focus:outline-none" required />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Subcopy</label>
          <textarea value={data.subcopy} onChange={(e) => setData({ ...data, subcopy: e.target.value })} className="w-full border border-border bg-transparent p-4 text-sm text-foreground focus:border-foreground focus:outline-none min-h-[100px]" required />
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Alur Text</label>
          <input type="text" value={data.alurText} onChange={(e) => setData({ ...data, alurText: e.target.value })} className="h-12 w-full border border-border bg-transparent px-4 text-sm text-foreground focus:border-foreground focus:outline-none" required />
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">CTA Label</label>
          <input type="text" value={data.ctaLabel} onChange={(e) => setData({ ...data, ctaLabel: e.target.value })} className="h-12 w-full border border-border bg-transparent px-4 text-sm text-foreground focus:border-foreground focus:outline-none" required />
        </div>
      </div>

      <button type="submit" disabled={saving} className="flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-background transition-colors hover:bg-transparent hover:text-foreground disabled:opacity-50">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Simpan
      </button>
    </form>
  );
}
