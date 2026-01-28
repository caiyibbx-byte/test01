
import React from 'react';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: '工作台', icon: Icons.Dashboard },
    { id: 'projects', label: '招标项目', icon: Icons.Projects },
    { id: 'bidders', label: '供应商库', icon: Icons.Bidders },
    { id: 'ai-assistant', label: 'AI 评标助理', icon: Icons.AI },
  ];

  const handleShare = () => {
    alert('演示提示：演示链接已复制到剪贴板，您可以直接发送给客户。');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">SB</div>
          <h1 className="text-xl font-bold text-gray-800">SmartBid</h1>
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-xl text-white">
            <p className="text-xs opacity-80 mb-1">当前版本</p>
            <p className="text-sm font-semibold">企业级 v2.4.0 (AI+)</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">/</span>
            <h2 className="text-sm font-medium text-gray-700 capitalize">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              演示分享
            </button>
            <div className="w-px h-4 bg-gray-200 mx-2"></div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center ml-2">
              <span className="text-xs font-bold text-blue-600">JD</span>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
