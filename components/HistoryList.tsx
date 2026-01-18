
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelectItem, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-6 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No records found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-10">
      <div className="flex justify-between items-center px-1 mb-6">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{history.length} Tasks Recorded</span>
        <button onClick={onClear} className="text-[10px] font-black text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest">Clear All</button>
      </div>
      
      {history.map((item) => (
        <div 
          key={item.id}
          onClick={() => onSelectItem(item)}
          className="bg-white border border-slate-100 rounded-[1.5rem] p-4 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all flex items-center gap-4 group active:scale-[0.98] ring-1 ring-slate-100"
        >
          <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-200 text-xl">
                📦
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-black text-slate-800 group-hover:text-indigo-600 transition truncate text-sm mb-1">
              {item.productName}
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                item.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
              }`}>{item.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
