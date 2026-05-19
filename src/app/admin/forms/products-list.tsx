"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit2, Trash2, X, Save } from "lucide-react";
import toast from "react-hot-toast";

type Variant = { label: string; price: number };
type Thumbnail = { url: string; order: number };
type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  badge: string | null;
  description: string;
  order: number;
  variants: Variant[];
  thumbnails: Thumbnail[];
};

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("semua");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/cms/products")
      .then((res) => res.json())
      .then((d) => {
        setProducts(d);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setCategory("semua");
    setBadge("");
    setDescription("");
    setThumbnails([]);
    setVariants([]);
  };

  const openAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setSlug(p.slug);
    setCategory(p.category);
    setBadge(p.badge || "");
    setDescription(p.description);
    setThumbnails(p.thumbnails.map(t => t.url));
    setVariants(p.variants.map(v => ({ label: v.label, price: v.price })));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    try {
      const res = await fetch(`/api/cms/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Produk dihapus");
        fetchProducts();
      } else {
        toast.error("Gagal menghapus produk");
      }
    } catch {
      toast.error("Kesalahan jaringan");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = {
      name, slug, category, description,
      badge: badge || null,
      thumbnails,
      variants,
    };
    try {
      const url = editingId ? `/api/cms/products/${editingId}` : "/api/cms/products";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast.success("Produk disimpan");
        setIsModalOpen(false);
        fetchProducts();
      } else {
        toast.error("Gagal menyimpan produk");
      }
    } catch {
      toast.error("Kesalahan jaringan");
    } finally {
      setSaving(false);
    }
  };

  if (loading && products.length === 0) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-condensed text-2xl uppercase tracking-widest text-foreground">Produk</h2>
          <p className="mt-1 text-xs font-light text-muted-foreground uppercase tracking-[0.1em]">Kelola Katalog AI Store</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-background transition-colors hover:bg-transparent hover:text-foreground">
          <Plus className="h-4 w-4" />
          Tambah Produk
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border border-border p-4 flex gap-4 bg-card">
            <div className="w-20 h-20 bg-muted flex-shrink-0">
              {p.thumbnails[0] && <img src={p.thumbnails[0].url} alt={p.name} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">{p.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{p.category}</p>
              <p className="text-xs text-foreground mt-2">{p.variants.length} Varian</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => openEdit(p)} className="p-2 border border-border text-foreground hover:bg-border"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 border border-border text-destructive hover:bg-border"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-2xl bg-card border border-border flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-condensed text-xl uppercase tracking-widest">{editingId ? "Edit Produk" : "Tambah Produk"}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Nama Produk</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="h-10 w-full border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" required />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Slug (URL)</label>
                  <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="h-10 w-full border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Kategori</label>
                  <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="h-10 w-full border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" required />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Badge (Opsional)</label>
                  <input type="text" value={badge} onChange={e => setBadge(e.target.value)} className="h-10 w-full border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Deskripsi (Markdown/HTML)</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-border bg-transparent p-3 text-xs text-foreground focus:border-foreground focus:outline-none min-h-[100px]" required />
              </div>

              {/* Thumbnails */}
              <div className="border border-border p-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Thumbnails (URLs)</label>
                  <button type="button" onClick={() => setThumbnails([...thumbnails, ""])} className="text-[10px] text-foreground border border-border px-2 py-1">+ Tambah</button>
                </div>
                <div className="space-y-2">
                  {thumbnails.map((t, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={t} onChange={e => {
                        const nt = [...thumbnails];
                        nt[i] = e.target.value;
                        setThumbnails(nt);
                      }} className="h-8 flex-1 border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" placeholder="https://..." required />
                      <button type="button" onClick={() => setThumbnails(thumbnails.filter((_, idx) => idx !== i))} className="px-2 border border-border text-destructive">X</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variants */}
              <div className="border border-border p-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">Varian Harga</label>
                  <button type="button" onClick={() => setVariants([...variants, { label: "", price: 0 }])} className="text-[10px] text-foreground border border-border px-2 py-1">+ Tambah</button>
                </div>
                <div className="space-y-2">
                  {variants.map((v, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={v.label} onChange={e => {
                        const nv = [...variants];
                        nv[i].label = e.target.value;
                        setVariants(nv);
                      }} className="h-8 flex-1 border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" placeholder="1 Bulan" required />
                      <input type="number" value={v.price || ""} onChange={e => {
                        const nv = [...variants];
                        nv[i].price = Number(e.target.value);
                        setVariants(nv);
                      }} className="h-8 w-32 border border-border bg-transparent px-3 text-xs text-foreground focus:border-foreground focus:outline-none" placeholder="Rp" required />
                      <button type="button" onClick={() => setVariants(variants.filter((_, idx) => idx !== i))} className="px-2 border border-border text-destructive">X</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-border">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">Batal</button>
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 border border-foreground bg-foreground py-3 text-xs font-bold uppercase tracking-widest text-background hover:bg-transparent hover:text-foreground disabled:opacity-50">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
