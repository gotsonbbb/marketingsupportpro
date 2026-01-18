
import React, { useState, useEffect } from 'react';
import { generateProductVisual } from '../geminiService';

interface ImageGeneratorProps {
  productName: string;
  onImageGenerated?: (url: string) => void;
  initialImageUrl?: string;
  sourceImage?: { data: string; mimeType: string };
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ productName, onImageGenerated, initialImageUrl, sourceImage }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await generateProductVisual(productName, sourceImage);
      setImageUrl(url);
      if (onImageGenerated) onImageGenerated(url);
    } catch (e: any) {
      setError("AI Image Service Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl mt-6 relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-center mb-6 relative">
        <h3 className="font-black text-xl flex items-center gap-3">
          <span className="bg-indigo-100 p-2 rounded-xl text-indigo-600">🖼️</span>
          AI Creative Visual
        </h3>
        {imageUrl && !loading && (
          <button 
            onClick={handleGenerate} 
            className="text-[10px] font-black text-indigo-600 uppercase hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all border border-indigo-100"
          >
            Regenerate
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center bg-slate-50 rounded-[2rem] animate-pulse border-2 border-slate-100">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="font-black text-slate-900 tracking-tight">AI Artist is painting your product...</p>
        </div>
      ) : imageUrl ? (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl group ring-1 ring-slate-100 bg-slate-50">
            <img src={imageUrl} className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" alt="AI Visual" />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
               <a 
                 href={imageUrl} 
                 download={`${productName}.png`} 
                 className="bg-white text-slate-900 px-8 py-4 rounded-2xl text-xs font-black shadow-2xl hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110"
               >
                 DOWNLOAD AS PNG
               </a>
            </div>
          </div>
          <p className="text-center mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Generated visual for your store
          </p>
        </div>
      ) : (
        <div className="py-16 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-indigo-300 transition-colors">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-3xl">🎨</div>
          <p className="text-slate-500 font-bold mb-8">AI-powered studio lighting product photography</p>
          <button 
            onClick={handleGenerate} 
            disabled={!productName} 
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl text-xs font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 active:scale-95"
          >
            Create Visual Now
          </button>
        </div>
      )}
      {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-bold text-center border border-red-100 animate-shake">⚠️ {error}</div>}
    </div>
  );
};

export default ImageGenerator;
