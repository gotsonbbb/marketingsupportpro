
import React, { useState } from 'react';
import { MarketingPlan } from '../types';

const ContentDisplay: React.FC<{ plan: MarketingPlan }> = ({ plan }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const disclosureText = "\n\n(မှတ်ချက် - ဤလင့်ခ်မှာ Amazon Affiliate Link ဖြစ်ပြီး ဝယ်ယူမှုရှိပါက ကျွန်ုပ်တို့မှ ကော်မရှင် အနည်းငယ် ရရှိနိုင်ပါသည်။)";

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-indigo-100 ring-4 ring-indigo-50/50">
             <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
             AI Intelligence Report
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">{plan.productName}</h2>
        </div>
        <button 
          onClick={() => copy(`${plan.postCaption}${disclosureText}\n\n${plan.hashtags.join(' ')}`, 'all')} 
          className={`px-8 py-5 ${copiedId === 'all' ? 'bg-emerald-600 shadow-emerald-200' : 'bg-slate-900 shadow-slate-200'} text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center gap-3 border border-white/10`}
        >
          {copiedId === 'all' ? (
            <><span>✓</span> COPIED</>
          ) : (
            <><span>📋</span> COPY ALL CONTENT</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden ring-1 ring-slate-100">
             <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-100">FB</div>
                  <h4 className="font-black text-sm text-slate-800 tracking-tight">Optimized Sales Copy</h4>
                </div>
                <button 
                  onClick={() => copy(plan.postCaption, 'caption')}
                  className={`text-[10px] font-black ${copiedId === 'caption' ? 'text-emerald-600' : 'text-slate-400 hover:text-indigo-600'} transition-colors uppercase tracking-widest`}
                >
                  {copiedId === 'caption' ? 'Copied' : 'Copy Post'}
                </button>
             </div>
             <div className="p-8 sm:p-10">
                <p className="whitespace-pre-line text-slate-700 font-medium leading-[1.8] mb-10 text-[16px] selection:bg-indigo-100">{plan.postCaption}</p>
                
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-5">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold italic leading-relaxed">
                    {disclosureText.trim()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {plan.hashtags.map((h, i) => (
                    <span key={i} className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-4 py-2.5 rounded-xl border border-indigo-100/50 hover:bg-indigo-600 hover:text-white transition-all cursor-default">
                      {h}
                    </span>
                  ))}
                </div>
             </div>
          </div>

          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
             <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 text-3xl shadow-inner border border-amber-100 group-hover:scale-110 transition-transform">⏰</div>
             <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Peak Engagement Window</h4>
                <p className="text-slate-900 font-black text-lg">{plan.postingTimeSuggestion}</p>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden ring-1 ring-white/10 group">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-all"></div>
             <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
               Strategic Advisor
             </h4>
             <div className="text-slate-300 text-[15px] font-medium leading-relaxed italic border-l-4 border-indigo-500/30 pl-6 py-1">
               {plan.strategyAdvice}
             </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group">
             <div className="flex justify-between items-center mb-6">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Viral Script Concept</h4>
               <span className="text-2xl group-hover:rotate-12 transition-transform">🎬</span>
             </div>
             <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <p className="text-slate-600 text-xs font-mono leading-[2] whitespace-pre-line selection:bg-indigo-200">{plan.videoScript}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDisplay;
