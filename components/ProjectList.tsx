
import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { Icons } from '../constants';

const mockProjects: Project[] = [
  { id: '1', title: '2024年市智慧交通大数据平台建设', code: 'ZJZB-2024-001', budget: 12500000, deadline: '2024-05-20', status: ProjectStatus.BIDDING, category: '软件开发', owner: '市交通局', publishDate: '2024-04-15', description: '' },
  { id: '2', title: '智慧政务终端设备采购项目', code: 'ZJZB-2024-012', budget: 3200000, deadline: '2024-06-01', status: ProjectStatus.PUBLISHED, category: '硬件采购', owner: '市政务中心', publishDate: '2024-04-20', description: '' },
  { id: '3', title: '网络安全等级保护测评服务', code: 'ZJZB-2024-045', budget: 450000, deadline: '2024-04-10', status: ProjectStatus.EVALUATING, category: '咨询服务', owner: '大数据局', publishDate: '2024-03-25', description: '' },
  { id: '4', title: '数据中心服务器扩容项目', code: 'ZJZB-2024-088', budget: 8900000, deadline: '2024-03-01', status: ProjectStatus.AWARDED, category: '硬件采购', owner: '云计算中心', publishDate: '2024-01-15', description: '' },
];

const ProjectList: React.FC<{ onSelect: (p: Project) => void }> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusStyle = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.BIDDING: return 'bg-blue-100 text-blue-700';
      case ProjectStatus.PUBLISHED: return 'bg-sky-100 text-sky-700';
      case ProjectStatus.EVALUATING: return 'bg-amber-100 text-amber-700';
      case ProjectStatus.AWARDED: return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="搜索项目名称、编号或采购人..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          <Icons.Plus />
          新建招标
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">项目信息</th>
              <th className="px-6 py-4">预算</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">截止日期</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockProjects.filter(p => p.title.includes(searchTerm) || p.code.includes(searchTerm)).map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="font-bold text-gray-800 mb-0.5 group-hover:text-blue-600 transition-colors">{project.title}</div>
                  <div className="text-xs text-gray-400">{project.code} | {project.owner}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-semibold text-gray-700">¥{(project.budget / 10000).toLocaleString()}w</div>
                  <div className="text-xs text-gray-400">{project.category}</div>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm text-gray-600">{project.deadline}</div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => onSelect(project)}
                    className="text-blue-600 text-sm font-medium hover:underline px-2"
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-gray-50 text-center text-xs text-gray-400">
        显示 1 至 {mockProjects.length} 条数据，共 {mockProjects.length} 条
      </div>
    </div>
  );
};

export default ProjectList;
