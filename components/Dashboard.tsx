
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ProjectStatus } from '../types';

const data = [
  { name: '软件开发', value: 12 },
  { name: '硬件采购', value: 19 },
  { name: '咨询服务', value: 7 },
  { name: '工程建设', value: 15 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '正在招标', value: '24', change: '+3 较上周', icon: 'bg-blue-500' },
          { label: '累计采购额', value: '¥1,450w', change: '+¥240w', icon: 'bg-green-500' },
          { label: '活跃供应商', value: '1,280', change: '+42', icon: 'bg-orange-500' },
          { label: '平均评审时间', value: '4.2 天', change: '-0.5 天', icon: 'bg-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">各类目招标分布</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">最近动态</h3>
          <div className="space-y-6">
            {[
              { title: 'XX政务云二期', status: '已发布', time: '10分钟前', color: 'text-blue-600' },
              { title: '办公家具采购', status: '开标中', time: '2小时前', color: 'text-orange-600' },
              { title: 'AI实验室扩容项目', status: '评标完成', time: '5小时前', color: 'text-green-600' },
              { title: '安全合规审计咨询', status: '专家抽选', time: '1天前', color: 'text-purple-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${item.color.replace('text', 'bg')}/10 ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
