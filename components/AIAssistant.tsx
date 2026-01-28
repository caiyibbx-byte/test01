
import React, { useState } from 'react';
import { analyzeTender } from '../services/gemini';
import { Icons } from '../constants';

const AIAssistant: React.FC = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeTender(content);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert('分析失败，请检查 API 配置');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Icons.AI />
            </div>
            <h2 className="text-2xl font-bold">AI 招标文件智能分析</h2>
          </div>
          <p className="opacity-80 text-sm">上传或粘贴招标需求，秒级提取关键条款、识别风险并给出评分。</p>
        </div>

        <div className="p-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">请输入招标需求文本或核心条款</label>
          <textarea
            className="w-full h-64 p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 text-sm"
            placeholder="在此处输入招标公告内容、评分标准或技术要求..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={loading || !content}
              className={`px-10 py-4 rounded-2xl text-white font-bold transition-all shadow-lg flex items-center gap-2 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  专家正在审阅中...
                </>
              ) : (
                '立即开始智能分析'
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="p-8 border-t border-gray-100 bg-gray-50 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  项目摘要
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{result.summary}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-bold">合规评分</div>
                <div className="text-5xl font-black text-blue-600">{result.score}</div>
                <div className="mt-4 text-xs font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  {result.score >= 80 ? '合规性良好' : '建议修改条款'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  关键风险点
                </h3>
                <ul className="space-y-3">
                  {result.risks.map((risk: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-xl text-sm text-red-800 border border-red-100">
                      <span className="mt-1">⚠️</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  评审专家建议
                </h3>
                <ul className="space-y-3">
                  {result.suggestions.map((suggestion: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-green-50/50 rounded-xl text-sm text-green-800 border border-green-100">
                      <span className="mt-1">💡</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
