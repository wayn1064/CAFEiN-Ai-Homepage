import React from 'react';
import { Link } from 'react-router-dom';
import { PricingSection } from './PricingSection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#1A365D] text-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-6xl tracking-tight">
            카페/프랜차이즈의 미래,<br className="hidden sm:block" />
            <span className="text-blue-300">CAFEiN-Ai</span>와 함께 시작하세요.
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            국내 유일의 완벽하게 격리된 이벤트 기반 아키텍처. 압도적인 속도와 안정성으로 매장 업무를 100% 자동화합니다.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 text-lg font-medium flex items-center justify-center rounded-md bg-white text-[#1A365D] hover:bg-gray-50 transition-colors shadow-lg">
              무료로 시작하기
            </Link>
            <Link to="/board?tab=inquiries" className="px-8 py-3 text-lg font-medium flex items-center justify-center rounded-md bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1A365D] transition-colors">
              도입 문의
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />
    </div>
  );
};
