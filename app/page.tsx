"use client";
import React, { useState } from 'react';
import { 
  Facebook, Target, Zap, Globe, Users2, MapPin, Heart, X, 
  Layout, MousePointer2, MessageSquare, Image as ImageIcon, 
  CheckCircle2, ChevronRight, Lock
} from 'lucide-react';

export default function MetaAdsManagerKurdish() {
  const [step, setStep] = useState(1); // 1: Login, 2: Page/Post, 3: Targeting
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [budget, setBudget] = useState("10");

  // هەنگاوەکان بۆ ڕێبەرایەتی بەکارهێنەر
  const steps = [
    { id: 1, name: 'چوونەژوورەوە', icon: <Lock size={18}/> },
    { id: 2, name: 'پەیج و پۆست', icon: <Layout size={18}/> },
    { id: 3, name: 'ئامانج و بودجە', icon: <Target size={18}/> }
  ];

  const handleLogin = () => {
    // لێرەدا لە داهاتوودا Facebook SDK دادەنێین
    setIsLoggedIn(true);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 font-sans" dir="rtl">
      {/* Top Navbar - وەک فەیسبووک شین */}
      <nav className="bg-[#0062E0] text-white p-3 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tighter">Meta Ads Manager <span className="text-xs bg-white text-blue-600 px-2 py-0.5 rounded ml-2">KURDISH</span></h1>
          </div>
          <div className="flex gap-2">
             {isLoggedIn && <div className="bg-white/20 px-3 py-1 rounded-full text-sm">Paiwast Ali Abdalla</div>}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4 mt-6">
        {/* Stepper Progress */}
        <div className="flex justify-center mb-8 gap-4">
          {steps.map((s) => (
            <div key={s.id} className={`flex items-center gap-2 ${step >= s.id ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= s.id ? 'border-blue-600 bg-blue-50' : 'border-slate-300'}`}>
                {step > s.id ? <CheckCircle2 size={16} /> : s.icon}
              </div>
              <span className="font-bold text-sm">{s.name}</span>
              {s.id !== 3 && <ChevronRight size={16} className="text-slate-300" />}
            </div>
          ))}
        </div>

        {/* STEP 1: LOGIN (وەک فەیسبووک) */}
        {step === 1 && (
          <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-xl border border-slate-200 text-center">
            <Facebook size={60} className="text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">بەخێربێیت بۆ کورد ئەجێنسی</h2>
            <p className="text-slate-500 mb-8 italic">بۆ دەستپێکردن، پێویستە سەرەتا لۆگین بکەیت بە فەیسبووکەکەت</p>
            <button 
              onClick={handleLogin}
              className="w-full bg-[#1877F2] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              <Facebook fill="white" /> بەردەوامبە بەناوی Paiwast
            </button>
            <p className="mt-6 text-xs text-slate-400">ئێمە هیچ زانیارییەکی کەسی و پاسۆردی تۆ نابینین، تەنها دەستگەیشتن بە ئەد مەنەجەر.</p>
          </div>
        )}

        {/* STEP 2: PAGE & POST SELECTION */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Layout className="text-blue-600"/> هەڵبژاردنی پەیج</h3>
              <div className="space-y-3">
                {['Kurd Agency', 'Aryan Tech', 'Sivan Online'].map(page => (
                  <div key={page} className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 cursor-pointer border-slate-100 transition-all">
                    <span className="font-medium">{page}</span>
                    <input type="radio" name="page" className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2"><ImageIcon className="text-purple-600"/> هەڵبژاردنی پۆست</h3>
              <div className="grid grid-cols-2 gap-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">وێنەی پۆست</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(3)} className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-bold">هەنگاوی داهاتوو</button>
            </div>
          </div>
        )}

        {/* STEP 3: TARGETING & BUDGET (وەک مێتا) */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Objective */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2 border-b pb-2"><Zap className="text-yellow-500"/> جۆری سپۆنسەر (Objective)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    {n: 'نامەکان', i: <MessageSquare/>}, 
                    {n: 'سەردانی وێبسایت', i: <Globe/>}, 
                    {n: 'لایک و فۆڵۆو', i: <Users2/>}
                  ].map(obj => (
                    <div key={obj.n} className="p-4 border rounded-2xl text-center hover:border-blue-500 cursor-pointer bg-slate-50">
                      <div className="flex justify-center mb-2 text-blue-600">{obj.i}</div>
                      <div className="text-sm font-bold">{obj.n}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Locations */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2 border-b pb-2"><MapPin className="text-red-500"/> شوێن و تەمەن</h3>
                <div className="space-y-4">
                   <select className="w-full p-4 bg-slate-50 border rounded-xl outline-none">
                     <option>هەموو کوردستان</option>
                     <option>سلێمانی (+40km)</option>
                     <option>هەولێر (+40km)</option>
                   </select>
                   <div className="flex gap-4">
                      <input type="number" placeholder="تەمەن: لە" className="w-1/2 p-4 bg-slate-50 border rounded-xl" />
                      <input type="number" placeholder="بۆ" className="w-1/2 p-4 bg-slate-50 border rounded-xl" />
                   </div>
                </div>
              </section>
            </div>

            {/* Sidebar Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100 h-fit sticky top-24">
              <h3 className="text-xl font-black mb-6 flex justify-between">پوختەی کۆتایی <Layout size={20}/></h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm"><span>بودجە:</span><span className="font-bold">${budget} ڕۆژانە</span></div>
                <div className="flex justify-between text-sm"><span>ماوە:</span><span className="font-bold">7 ڕۆژ</span></div>
                <div className="bg-blue-50 p-4 rounded-xl">
                   <p className="text-xs text-blue-600 font-bold mb-1">ئەنجامی پێشبینیکراو:</p>
                   <p className="text-sm font-black">2.4K - 7.1K بینەر ڕۆژانە</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                بڵاوکردنەوە (Publish) 🚀
              </button>
              <button onClick={() => setStep(2)} className="w-full mt-2 text-slate-400 text-sm font-medium">گەڕانەوە</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
