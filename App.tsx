
import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ContentDisplay from './components/ContentDisplay';
import ImageGenerator from './components/ImageGenerator';
import LogoGenerator from './components/LogoGenerator';
import HistoryList from './components/HistoryList';
import ActivityLog from './components/ActivityLog';
import GmailSettings from './components/GmailSettings';
import { MarketingPlan, LoadingState, HistoryItem } from './types';
import { generateMarketingContent } from './geminiService';

const App: React.FC = () => {
  const [marketingPlan, setMarketingPlan] = useState<MarketingPlan | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [sourceImage, setSourceImage] = useState<{ data: string; mimeType: string } | undefined>();
  const [logs, setLogs] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGmailOpen, setIsGmailOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app_history_v2');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      setHistory([]);
    }
    const savedEmail = localStorage.getItem('rehit_user_gmail');
    if (savedEmail) setEmail(savedEmail);
    addLog("✨ Marketing Assistant v4.0 Online.");
  }, []);

  const addLog = (msg: string) => setLogs(p => [`${new Date().toLocaleTimeString()} - ${msg}`, ...p.slice(0, 19)]);

  const handleFormSubmit = async (input: { link?: string; image?: { data: string; mimeType: string }; price?: string; phone?: string; }) => {
    setLoadingState(LoadingState.ANALYZING);
    setMarketingPlan(null);
    setImageUrl(undefined);
    setSourceImage(input.image);
    addLog(`🚀 Analyzing Product...`);

    try {
      const plan = await generateMarketingContent(input);
      setMarketingPlan(plan);
      addLog("✅ Generation successful.");
      
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        productName: plan.productName,
        productLink: input.link || '',
        plan,
        status: 'DRAFT'
      };
      
      const updatedHistory = [newItem, ...history.slice(0, 19)];
      setHistory(updatedHistory);
      localStorage.setItem('app_history_v2', JSON.stringify(updatedHistory));
      setLoadingState(LoadingState.COMPLETE);
    } catch (error) {
      setLoadingState(LoadingState.ERROR);
      addLog("❌ Error: Generation failed.");
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50 selection:bg-indigo-100">
      <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:bg-indigo-600 transition-all active:scale-90">
               <span className="text-xl font-black">M</span>
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none text-slate-900">Marketing Support</h1>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">Premium AI</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsGmailOpen(true)}
              className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            >
              ⚙️
            </button>
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl shadow-xl hover:bg-indigo-600 transition-all active:scale-95 text-xs font-black uppercase tracking-wider flex items-center gap-2"
            >
              <span>History</span>
              <span className="bg-white/20 px-1.5 rounded-md">{history.length}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4 space-y-8">
          <section className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl ring-1 ring-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
            <ProductForm onSubmit={handleFormSubmit} isLoading={loadingState === LoadingState.ANALYZING} />
          </section>
          
          <LogoGenerator />
          <ActivityLog logs={logs} />
        </aside>

        <section className="lg:col-span-8">
          {marketingPlan ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <ContentDisplay plan={marketingPlan} />
              <ImageGenerator 
                productName={marketingPlan.productName} 
                initialImageUrl={imageUrl}
                sourceImage={sourceImage}
                onImageGenerated={(url) => {
                  setImageUrl(url);
                  const newHistory = history.map(h => 
                    h.productName === marketingPlan.productName ? { ...h, imageUrl: url } : h
                  );
                  setHistory(newHistory);
                  localStorage.setItem('app_history_v2', JSON.stringify(newHistory));
                }}
              />
            </div>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group transition-all hover:shadow-xl">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
               <div className="relative">
                 <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-5xl mb-10 animate-float shadow-xl border border-slate-50">
                    🛍️
                 </div>
                 <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">ရောင်းအားတက်ဖို့ AI သုံးကြစို့</h2>
                 <p className="text-slate-400 font-medium max-w-md mx-auto leading-relaxed mb-8">
                   Link ထည့်ပါ ဒါမှမဟုတ် ပစ္စည်းဓါတ်ပုံတင်ပြီး AI ရဲ့ ဆန်းသစ်တဲ့ Strategy တွေကို ရယူလိုက်ပါ။
                 </p>
                 <div className="flex flex-wrap justify-center gap-3">
                   <span className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100">Smart Analysis</span>
                   <span className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100">Visual Creation</span>
                 </div>
               </div>
            </div>
          )}
        </section>
      </main>

      {isHistoryOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsHistoryOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
             <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Task Records</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Previous generations</p>
                </div>
                <button onClick={() => setIsHistoryOpen(false)} className="w-12 h-12 flex items-center justify-center hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all">✕</button>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
               <HistoryList 
                 history={history} 
                 onSelectItem={(item) => {
                   setMarketingPlan(item.plan);
                   setImageUrl(item.imageUrl);
                   setIsHistoryOpen(false);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }} 
                 onClear={() => {
                   if(confirm('မှတ်တမ်းများကို ဖျက်လိုပါသလား?')) {
                     setHistory([]);
                     localStorage.removeItem('app_history_v2');
                     addLog("🗑️ History cleared.");
                   }
                 }} 
               />
             </div>
          </div>
        </div>
      )}

      {isGmailOpen && (
        <GmailSettings onEmailChange={setEmail} onClose={() => setIsGmailOpen(false)} />
      )}
      
      <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-slate-200/60 mt-20 text-center opacity-40">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">© 2025 Marketing Support Pro • Built with Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
