
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import AIAssistant from './components/AIAssistant';
import { Project } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('演示提示：系统已自动生成《' + selectedProject?.title + ' 评估报告.pdf》并开始下载。');
    }, 2000);
  };

  const renderContent = () => {
    if (selectedProject) {
      return (
        <div className="animate-slideUp">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回列表
            </button>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold transition-all ${
                isExporting ? 'bg-gray-50 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50 active:scale-95 shadow-sm'
              }`}
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在生成报告...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  导出 PDF 报告
                </>
              )}
            </button>
          </div>
          
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-gray-50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    <span className="text-gray-400 text-sm">#{selectedProject.code}</span>
                  </div>
                  <h1 className="text-3xl font-black text-gray-800">{selectedProject.title}</h1>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1 uppercase tracking-widest font-bold">项目预算</p>
                  <p className="text-3xl font-black text-blue-600">¥{(selectedProject.budget / 10000).toLocaleString()}w</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: '采购人', value: selectedProject.owner },
                  { label: '发布日期', value: selectedProject.publishDate },
                  { label: '截止日期', value: selectedProject.deadline },
                  { label: '项目状态', value: selectedProject.status },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <p className="font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-gray-50/50">
               <div className="flex gap-4 mb-8">
                 <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">
                   管理标书文件
                 </button>
                 <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                   查看历史记录
                 </button>
                 <button 
                  onClick={() => setActiveTab('ai-assistant')}
                  className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-100 transition-all flex items-center gap-2"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                   AI 辅助评标
                 </button>
               </div>

               <div className="bg-white p-8 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    当前投标供应商 (3)
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'XX 科技股份有限公司', price: '¥12,450,000', status: '已提交', date: '2024-05-18' },
                      { name: 'YY 数据服务有限公司', price: '¥11,800,000', status: '已提交', date: '2024-05-19' },
                      { name: 'ZZ 系统集成有限公司', price: '¥12,880,000', status: '待审核', date: '2024-05-19' },
                    ].map((bidder, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-blue-200 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-gray-400 border border-gray-100 shadow-sm">
                            {bidder.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{bidder.name}</p>
                            <p className="text-xs text-gray-400">投标价: {bidder.price}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${bidder.status === '已提交' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                            {bidder.status}
                          </span>
                          <p className="text-xs text-gray-400 mt-2">{bidder.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectList onSelect={setSelectedProject} />;
      case 'ai-assistant':
        return <AIAssistant />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p>该模块功能正在对接中...</p>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab);
      setSelectedProject(null);
    }}>
      {renderContent()}
    </Layout>
  );
};

export default App;
