"use client";
import React, { useState, useEffect } from 'react';
import { Facebook, Target, Zap, MapPin, ImageIcon, CheckCircle2, ChevronLeft, Loader2 } from 'lucide-react';

export default function RealMetaManager() {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState("10");

  // هێنانی پۆستەکان لە کاتی کردنەوەی بەرنامەکە
  useEffect(() => {
    fetch('/api/ads').then(res => res.json()).then(data => setPosts(data));
  }, []);

  const handlePublish = async () => {
    setLoading(true);
    const res = await fetch('/api/ads', {
      method: 'POST',
      body: JSON.stringify({ post_id: selectedPost, budget: budget, objective: "OUTCOME_ENGAGEMENT" })
    });
    const data = await res.json();
    if(data.id) alert("✅ بە سەرکەوتوویی پەبڵیش کرا!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans" dir="rtl">
      {/* Header ڕێک وەک مێتا */}
      <nav className="bg-[#0062E0] text-white p-3 shadow-lg flex justify-between px-8">
        <span className="font-bold">Kurd Agency Ads Manager</span>
        <Facebook />
      </nav>

      <div className="max-w-5xl mx-auto p-6 mt-4">
        {/* هەنگاوەکان */}
        <div className="flex gap-4 mb-8 justify-center">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= i ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border'}`}>
              {i}
            </div>
          ))}
        </div>

        {/* بەشی هەڵبژاردنی پۆست - ڕێک وەک Meta */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ImageIcon className="text-blue-600"/> پۆستێکی فەیسبووک هەڵبژێرە</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {posts.map(post => (
                <div 
                  key={post.id} 
                  onClick={() => setSelectedPost(post.id)}
                  className={`cursor-pointer rounded-lg border-4 transition-all overflow-hidden ${selectedPost === post.id ? 'border-blue-600 scale-95' : 'border-transparent'}`}
                >
                  <img src={post.full_picture} alt="Post" className="w-full h-48 object-cover" />
                  <p className="p-2 text-xs truncate">{post.message}</p>
                </div>
              ))}
            </div>
            <button 
              disabled={!selectedPost}
              onClick={() => setStep(2)}
              className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-50"
            >
              بەردەوامبە بۆ دیاریکردنی ئامانج
            </button>
          </div>
        )}

        {/* هەنگاوی ٢ و ٣: ئامانج و پەبڵیش */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Target className="text-red-500"/> ئامانجی سپۆنسەر (Objective)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-xl cursor-pointer">
                    <p className="font-bold">Engagement</p>
                    <p className="text-xs text-slate-500">بۆ زیادکردنی فرۆشتن </p>
                  </div>
                  <div className="p-4 border rounded-xl hover:bg-slate-50 cursor-pointer">
                    <p className="font-bold">Traffic</p>
                    <p className="text-xs text-slate-500">بۆ سەردانی ماڵپەڕ</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-100 h-fit sticky top-20">
              <h3 className="font-bold mb-4">پوختەی کۆتایی</h3>
              <div className="space-y-3 text-sm border-b pb-4 mb-4">
                <div className="flex justify-between"><span>بودجە:</span><b>${budget}</b></div>
                <div className="flex justify-between"><span>شوێن:</span><b>عێراق</b></div>
              </div>
              <button 
                onClick={handlePublish}
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "پەبڵیش (Publish) 🚀"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
