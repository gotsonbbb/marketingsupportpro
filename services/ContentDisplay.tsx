
import React from 'react';
import { MarketingPlan, WorkStatus } from '../types';

interface ContentDisplayProps {
  plan: MarketingPlan;
  status: WorkStatus;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ plan, status }) => {
  
  const disclosureText = "\n\n(မှတ်ချက် - ဤလင့်ခ်မှာ Amazon Affiliate Link ဖြစ်ပြီး ဝယ်ယူမှုရှိပါက ကျွန်ုပ်တို့မှ ကော်မရှင် အနည်းငယ် ရရှိနိုင်ပါသည်။)";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("စာသားများကို Copy ကူးယူပြီးပါပြီ။");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
      {/* Facebook Post Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden group">
        <div className="bg-blue-600 px-8 py-5 flex justify-between items-center">
          <h3 className="text-white font-black text-lg flex items-center gap-3">
             <div className="bg-white/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
             </div>
             FB Optimized Post
          </h3>
          {status === 'APPROVED' && (
            <button 
              onClick={() => copyToClipboard(`${plan.postCaption}${disclosureText}\n\n${plan.hashtags.join(' ')}`)}
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-lg"
            >
              COPY ALL
            </button>
          )}
        </div>
        <div className="p-8">
          <div className="relative">
             <p className="whitespace-pre-line text-slate-700 leading-relaxed font-medium mb-6">{plan.postCaption}</p>
             <p className="text-[10px] text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
               {disclosureText}
             </p>
          </div>
          
          <div className="flex flex-wrap gap-2 my-6">
            {plan.hashtags.map((tag, i) => (
              <span key={i} className="text-blue-600 text-[10px] font-black bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="bg-orange-50 border-2 border-orange-100 p-5 rounded-3xl flex items-start gap-4">
             <div className="bg-white p-2 rounded-xl shadow-sm text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <div>
                <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-1">Posting Schedule</h4>
                <p className="text-slate-600 text-sm font-bold">{plan.postingTimeSuggestion}</p>
             </div>
          </div>

          {/* Search Grounding Sources Display */}
          {plan.sources && plan.sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Verification Sources</h4>
              <ul className="space-y-1.5">
                {plan.sources.map((url, idx) => (
                  <li key={idx} className="truncate">
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-blue-500 hover:text-blue-700 hover:underline font-bold"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Strategy & Video Script */}
      <div className="space-y-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8">
          <h3 className="text-slate-800 font-black text-xl mb-4 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-xl text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            AI Sales Strategy
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">{plan.strategyAdvice}</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-800 font-black text-xl flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-xl text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              Short Video Script
            </h3>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
             <p className="whitespace-pre-line text-slate-700 text-xs font-mono leading-loose">{plan.videoScript}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDisplay;
