import React, { useState, useEffect } from 'react';
import { MessageCircle, Info } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const Board: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'notices' | 'inquiries'>('notices');

  useEffect(() => {
    if (tabParam === 'inquiries' || tabParam === 'notices') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'notices' | 'inquiries') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="flex-1 bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1A365D] mb-8">고객지원</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => handleTabChange('notices')}
              className={`${
                activeTab === 'notices'
                  ? 'border-[#1A365D] text-[#1A365D]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg flex items-center gap-2`}
            >
              <Info className="w-5 h-5" />
              공지사항
            </button>
            <button
              onClick={() => handleTabChange('inquiries')}
              className={`${
                activeTab === 'inquiries'
                  ? 'border-[#1A365D] text-[#1A365D]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg flex items-center gap-2`}
            >
              <MessageCircle className="w-5 h-5" />
              1:1 문의하기
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] p-6">
          {activeTab === 'notices' ? (
            <div className="text-center py-20 text-gray-500">
              <Info className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg">등록된 공지사항이 없습니다.</p>
              <p className="text-sm mt-2">CAFEiN-Ai의 새로운 소식을 여기서 확인하세요.</p>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg">문의 내역이 없습니다.</p>
              <button className="mt-6 px-6 py-2 bg-[#1A365D] text-white rounded-md hover:bg-blue-900 transition-colors">
                새 문의 작성하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
