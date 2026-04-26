"use client";
import React, { useState } from 'react';
import { Target, Zap, X, MessageCircle, DollarSign, Loader2, CheckCircle2 } from 'lucide-react';

export default function Page() {
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [budget, setBudget] = useState('10');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const phoneNumber = "9647510386174";

  const allLocations = [
    "هەموو کوردستان", "سلێمانی", "هەولێر", "دهۆک", "کەرکوک", "هەڵەبجە",
    "ڕانیە", "قەڵادزێ", "سۆران", "زاخۆ", "ئاکرێ", "کەلار", "کفری", "چەمچماڵ"
  ];

  const addLocation = (loc: string) => {
    if (!selectedLocations.includes(loc)) {
      setSelectedLocations([...selectedLocations, loc]);
      setLocationQuery('');
    }
  };

  const handleStartAds = async () => {
    if (selectedLocations.length === 0) return alert("تکایە شارێک هەڵبژێرە");
    
    setLoading(true);
    setStatus(null);
    
    try {
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          locations: selectedLocations, 
          budget: budget,
          campaignName: `Kurd Agency - ${selectedLocations[0]}`
        }),
      });
      
      const data = await res.json();
      
      if (data.id) {
        setStatus({ type: 'success', msg: `سەرکەوتوو بوو! کەمپەین دروستکرا ID: ${data.id}` });
      } else {
        setStatus({ type: 'error', msg: data.error?.message || "هەڵەیەک لە سێرڤەری مێتا هەیە" });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: "پەیوەندی بە سێرڤەرەوە نەکرا" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans" dir="rtl">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10 border-b border-slate-800 pb-6 flex justify-between items-center">
        <div className="text-right">
          <h1 className="text-4xl font-black text-blue-500 italic tracking-tighter">KURD AGENCY</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">CEO: PAIWAST ALI ABDALLA</p>
        </div>
        <a href={`https://wa.me/${phoneNumber}`} className="bg-green-600/10 border border-green-600/50 px-4 py-2 rounded-2xl text-green-500 flex items-center gap-2 font-bold hover:bg-green-600/20 transition-all">
          <MessageCircle size={18} /> پشتگیری
        </a>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Target Section */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4 text-blue-500">
              <Target size={24} /> <h2 className="text-2xl font-bold text-white">دیاریکردنی ئامانج</h2>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-slate-400 mb-2 mr-2 text-sm">گەڕان بۆ شارەکان</label>
                <input 
                  type="text" 
                  placeholder="بۆ نموونە: سلێمانی، سۆران..." 
                  className="w-full bg-slate-800/50 border border-slate-700 pr-4 py-4 rounded-2xl outline-none focus:border-blue-500 text-right focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
                {locationQuery && (
                  <div className="absolute z-20 w-full mt-2 bg-slate-800 border border-slate-700 rounded-2xl max-h-60 overflow-y-auto shadow-2xl">
                    {allLocations.filter(l => l.includes(locationQuery)).map(loc => (
                      <button key={loc} onClick={() => addLocation(loc)} className="w-full text-right p-4 hover:bg-blue-600 border-b border-slate-700 last:border-0 transition-colors">{loc}</button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-400 mb-2 mr-2 text-sm">بودجەی ڕۆژانە (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute right-4 top-4 text-slate-500" size={20} />
                  <input 
                    type="number" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 pr-12 py-4 rounded-2xl outline-none focus:border-green-500 text-right font-bold text-xl"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {selectedLocations.map(loc => (
                <span key={loc} className="bg-blue-600/10 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                  {loc} <X size={16} className="cursor-pointer hover:text-white" onClick={() => setSelectedLocations(selectedLocations.filter(l => l !== loc))} />
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-4 h-fit sticky top-8">
          <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-[0_0_50px_rgba(37,99,235,0.2)]">
            <h3 className="text-2xl font-black mb-6 border-b border-white/20 pb-4 flex justify-between items-center">پوختە <Zap size={24} /></h3>
            <div className="space-y-4 opacity-90">
                <div className="flex justify-between"><span>شوێنەکان:</span> <span className="font-bold">{selectedLocations.length} شار</span></div>
                <div className="flex justify-between"><span>بودجە:</span> <span className="font-bold">${budget} ڕۆژانە</span></div>
            </div>
            
            <button 
              onClick={handleStartAds}
              disabled={loading}
              className="w-full mt-8 bg-white text-blue-600 font-black py-5 rounded-2xl hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : "چالاککردنی سپۆنسەر 🚀"}
            </button>
          </div>

          {status && (
            <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-bounce ${status.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
              {status.type === 'success' ? <CheckCircle2 size={20} /> : <X size={20} />}
              <span className="text-sm font-bold">{status.msg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
