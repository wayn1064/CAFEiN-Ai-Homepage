import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Basic',
    description: '소규모 카페 의원을 위한 필수 기능',
    price: '₩99,000',
    features: ['기본 고객 관리', '예약 시스템', '웹 기반 차트 입력'],
    isPopular: false,
  },
  {
    name: 'Pro',
    description: '성장하는 매장을 위한 완벽한 솔루션',
    price: '₩199,000',
    features: ['Basic 모든 기능', 'AI 카운터 비서', '무제한 알림톡', '심층 통계 리포트'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    description: '대형 매장 및 네트워크 지점 관리',
    price: '문의하기',
    features: ['Pro 모든 기능', '맞춤형 프론트카운터 커스텀', '1:1 전담 매니저 배치', '다지점 본사 통합 관리'],
    isPopular: false,
  },
];

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCheckout = (planName: string, price: string) => {
    if (price === '문의하기') {
      navigate('/board?tab=inquiries');
      return;
    }
    // 본사(WAYN-Ai) 통합 로그인/회원가입으로 연동
    const waynAuthUrl = import.meta.env.VITE_WAYN_AUTH_URL || 'https://auth.wayn-ai.com/api/auth/login';
    window.location.href = `${waynAuthUrl}?redirect=${window.location.href}&plan=${planName}`;
  };

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#1A365D] sm:text-4xl">
            합리적인 가격, 압도적인 성능
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            매장 규모에 맞는 최적의 플랜을 선택하고 지금 바로 덴티AI를 경험하세요.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 bg-white rounded-2xl shadow-sm border ${
                plan.isPopular ? 'border-[#1A365D] ring-2 ring-[#1A365D]' : 'border-gray-200'
              } transition-transform hover:scale-105 duration-300`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-[#1A365D] text-white">
                    추천
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#1A365D]">{plan.name}</h3>
                <p className="mt-4 flex items-baseline text-[#1E293B]">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.price !== '문의하기' && <span className="ml-1 text-xl font-medium text-[#6B7280]">/월</span>}
                </p>
                <p className="mt-6 text-[#6B7280]">{plan.description}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-[#1A365D]" aria-hidden="true" />
                      <span className="text-[#1E293B]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleCheckout(plan.name, plan.price)}
                  className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md transition-colors ${
                    plan.isPopular
                      ? 'bg-[#1A365D] text-white hover:bg-blue-900 shadow-md'
                      : 'bg-blue-50 text-[#1A365D] hover:bg-blue-100'
                  }`}
                >
                  {plan.price === '문의하기' ? '도입 문의하기' : '결제하기'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
