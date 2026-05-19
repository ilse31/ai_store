"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

type Spec = {
  id: number;
  order: number;
  value: string;
  unit: string;
  label: string;
  note: string;
};

export function SpecsForm() {
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cms/specs")
      .then((res) => res.json())
      .then((d) => {
        if (Array.isArray(d)) setSpecs(d);
        setLoading(false);
      });
  }, []);

  const handleChange = (index: number, field: keyof Spec, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/cms/specs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specs),
      });
      if (res.ok) toast.success("Fitur & Spesifikasi berhasil disimpan");
      else toast.error("Gagal menyimpan data");
    } catch {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-condensed text-2xl uppercase tracking-widest text-foreground">Fitur & Specs</h2>
        <p className="mt-1 text-xs font-light text-muted-foreground uppercase tracking-[0.1em]">3 Kotak Fitur Utama (Mengapa AI Store)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {specs.map((spec, index) => (
          <div key={spec.id} className="border border-border p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Kotak {index + 1}</h3>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Angka Besar</label>
              <input type="text" value={spec.value} onChange={(e) => handleChange(index, "value", e.target.value)} className="h-10 w-full border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" required />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Unit (Misal: %)</label>
              <input type="text" value={spec.unit} onChange={(e) => handleChange(index, "unit", e.target.value)} className="h-10 w-full border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Label</label>
              <input type="text" value={spec.label} onChange={(e) => handleChange(index, "label", e.target.value)} className="h-10 w-full border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" required />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Deskripsi Kecil</label>
              <textarea value={spec.note} onChange={(e) => handleChange(index, "note", e.target.value)} className="w-full border border-border bg-transparent p-3 text-xs text-foreground focus:border-foreground focus:outline-none min-h-[80px]" required />
            </div>
          </div>
        ))}
      </div>

      <button type="submit" disabled={saving} className="flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-background transition-colors hover:bg-transparent hover:text-foreground disabled:opacity-50">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Simpan Semua
      </button>
    </form>
  );
}
