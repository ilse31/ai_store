"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  /** Optional label override */
  label?: string;
  /** If provided, show a preview of this URL as the current image */
  currentUrl?: string;
  /** Extra class names on the root wrapper */
  className?: string;
}

export function ImageUpload({
  onUpload,
  label = "Upload Gambar",
  currentUrl,
  className = "",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Hanya file gambar yang diperbolehkan.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5 MB.");
      return;
    }

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Upload gagal.");
        setPreview(currentUrl ?? null);
        return;
      }

      toast.success("Gambar berhasil diupload.");
      setPreview(data.url);
      onUpload(data.url);
    } catch {
      toast.error("Kesalahan jaringan saat upload.");
      setPreview(currentUrl ?? null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clearPreview = () => {
    setPreview(null);
    onUpload("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Drop zone / trigger */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={[
          "relative flex flex-col items-center justify-center gap-2 border border-dashed border-border",
          "cursor-pointer transition-colors hover:border-foreground",
          preview ? "h-40" : "h-28",
          uploading ? "pointer-events-none opacity-60" : "",
        ].join(" ")}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="preview"
              className="h-full w-full object-contain p-2"
            />
            {/* Clear button */}
            {!uploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearPreview();
                }}
                className="absolute right-1 top-1 rounded-none border border-border bg-card p-0.5 text-destructive hover:bg-border"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </>
        ) : (
          <>
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              {label}
            </span>
            <span className="text-[9px] text-muted-foreground/60">
              Drag &amp; drop atau klik · Maks 5 MB
            </span>
          </>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Loader2 className="h-5 w-5 animate-spin text-foreground" />
          </div>
        )}
      </div>

      {/* Upload button (secondary trigger) */}
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-1.5 border border-border py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-border disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Upload className="h-3 w-3" />
        )}
        {uploading ? "Mengupload..." : "Pilih File"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}
