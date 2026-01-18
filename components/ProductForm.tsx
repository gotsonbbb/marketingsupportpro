
import React, { useState, useRef } from 'react';

interface ProductFormProps {
  onSubmit: (data: { link?: string; image?: { data: string; mimeType: string }; price?: string; phone?: string; }) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading }) => {
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!link && !selectedImage) {
      alert("Link သို့မဟုတ် ပုံတစ်ခုခု ထည့်သွင်းပေးပါ။");
      return;
    }
    onSubmit({ link, image: selectedImage ? { data: selectedImage.data, mimeType: selectedImage.mimeType } : undefined, price, phone });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({ data: (reader.result as string).split(',')[1], mimeType: file.type, name: file.name });
        setLink('');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-indigo-500 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 ring-4 ring-indigo-500/10 transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Generate Strategy</h2>
          <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.2em] opacity-80">AI Market Intelligence</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="relative">
            <label className="text-[11px] font-black text-indigo-200 uppercase tracking-widest ml-1 mb-3 block">Product Source</label>
            {selectedImage ? (
              <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-4 border border-white/10 group animate-in fade-in zoom-in-95">
                <img src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} className="w-14 h-14 rounded-xl object-cover shadow-2xl ring-2 ring-white/10" alt="Preview" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-white font-bold truncate block">{selectedImage.name}</span>
                  <span className="text-[10px] text-indigo-300 font-medium">Image attached</span>
                </div>
                <button type="button" onClick={() => setSelectedImage(null)} className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all">✕</button>
              </div>
            ) : (
              <div className="flex gap-3">
                <input 
                  value={link} 
                  onChange={(e) => setLink(e.target.value)} 
                  placeholder="Paste link here..." 
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 text-white placeholder:text-white/20 text-sm font-bold border border-white/10 focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-400 outline-none transition-all shadow-inner" 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="w-16 bg-white/10 hover:bg-white/20 rounded-2xl text-white flex items-center justify-center transition-all active:scale-90 border border-white/10"
                >
                  <span className="text-xl">📷</span>
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" accept="image/*" />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-[11px] font-black text-indigo-200 uppercase tracking-widest ml-1 mb-3 block">Price (Ks)</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="15,000" className="w-full px-6 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:bg-white focus:text-slate-900 outline-none transition-all text-sm font-bold placeholder:text-white/20 shadow-inner" />
            </div>
            <div>
              <label className="text-[11px] font-black text-indigo-200 uppercase tracking-widest ml-1 mb-3 block">Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09..." className="w-full px-6 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:bg-white focus:text-slate-900 outline-none transition-all text-sm font-bold placeholder:text-white/20 shadow-inner" />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full py-5 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-2xl shadow-2xl shadow-indigo-900/40 transition-all disabled:opacity-30 uppercase text-xs tracking-[0.25em] active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
               Analyzing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              Generate Sales Package
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
