import React, { useState } from 'react';
import { Building2, User, Phone, MapPin, KeyRound, CheckSquare, Layers, Search, X } from 'lucide-react';
import DaumPostcode from 'react-daum-postcode';

const solutions = [
  { id: 'director', name: '점장실', desc: '매장 전반의 핵심 지표 모니터링 및 전자 결재' },
  { id: 'management', name: '경영지원실', desc: '인사, 근태, 급여, 재무 등 전사 운영 지원' },
  { id: 'clinic', name: '주방/제조', desc: '주문 레시피 내역 작성 및 주문 기록 관리' },
  { id: 'desk', name: '카운터', desc: '고객 접수, 수납, 예약 타임라인 및 보험청구' },
  { id: 'supply', name: '중앙공급실', desc: '카페 식자재, 재료 재고 관리 및 발주' },
  { id: 'lab', name: '베이커리', desc: '원내/외 베이커리 의뢰 관리 및 수발주 내역' },
  { id: 'counsel', name: '마케팅실', desc: '고객 응대, 동의서 작성 및 CRM 데이터 분석' },
  { id: 'myoffice', name: '마이오피스', desc: '개인별 업무 일정, 연차 신청 및 사내 메신저' },
];

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    businessNumber: '',
    hospitalName: '',
    directorName: '',
    phone: '',
    address: '',
    adminId: '',
    adminPassword: '',
    selectedSolutions: [] as string[],
  });
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handleCompletePostcode = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setFormData(prev => ({ ...prev, address: fullAddress }));
    setIsPostcodeOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSolutionToggle = (id: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedSolutions.includes(id);
      if (isSelected) {
        return { ...prev, selectedSolutions: prev.selectedSolutions.filter(solId => solId !== id) };
      } else {
        return { ...prev, selectedSolutions: [...prev.selectedSolutions, id] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Map form data to WAYN-Ai API structure
    const payload = {
      hospitalName: formData.hospitalName,
      ceoName: formData.directorName,
      contactNumber: formData.phone,
      email: formData.adminId,
      password: formData.adminPassword,
      businessRegistrationNumber: formData.businessNumber,
      address: formData.address,
      accessibleMenus: formData.selectedSolutions,
      status: 'PENDING'
    };

    try {
      const BASE_URL = import.meta.env.VITE_WAYN_AI_API_URL || 'http://localhost:5001';
      // Make sure axios is imported at the top of the file
      const { default: axios } = await import('axios');
      const response = await axios.post(`${BASE_URL}/api/registrations`, payload);
      
      if (response.data.success || response.status === 201) {
        alert('가입 신청이 완료되었습니다. WAYN-Ai 본사에서 확인 후 승인 처리됩니다.');
        // Optionally reset form here
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('가입 신청 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#1A365D] px-8 py-10 text-white text-center">
            <h1 className="text-3xl font-bold">도입 신청 및 무료 시작하기</h1>
            <p className="mt-2 text-blue-100">CAFEiN-Ai와 함께 카페 업무를 완벽하게 자동화하세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-10 space-y-10">
            {/* 1. 기본 정보 */}
            <section>
              <h2 className="text-xl font-semibold text-[#1A365D] mb-6 flex items-center gap-2 border-b pb-2">
                <Building2 className="w-6 h-6" />
                매장 기본 정보
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700">사업자등록번호</label>
                  <input
                    type="text"
                    id="businessNumber"
                    name="businessNumber"
                    value={formData.businessNumber}
                    onChange={handleChange}
                    placeholder="000-00-00000"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1A365D] focus:ring-[#1A365D] sm:text-sm p-3 border"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">카페 이름</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="hospitalName"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      className="focus:ring-[#1A365D] focus:border-[#1A365D] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                      placeholder="행복카페의원"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="directorName" className="block text-sm font-medium text-gray-700">대표자 이름</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="directorName"
                      name="directorName"
                      value={formData.directorName}
                      onChange={handleChange}
                      className="focus:ring-[#1A365D] focus:border-[#1A365D] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                      placeholder="김점장"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">연락처 (핸드폰번호)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="focus:ring-[#1A365D] focus:border-[#1A365D] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                      placeholder="010-0000-0000"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">주소</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="relative flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="focus:ring-[#1A365D] focus:border-[#1A365D] block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 p-3 border"
                        placeholder="주소를 입력하세요"
                        readOnly
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPostcodeOpen(true)}
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1A365D] focus:border-[#1A365D]"
                    >
                      <Search className="h-5 w-5 text-gray-400" />
                      <span>주소 검색</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. 관리자 계정 생성 */}
            <section>
              <h2 className="text-xl font-semibold text-[#1A365D] mb-6 flex items-center gap-2 border-b pb-2">
                <KeyRound className="w-6 h-6" />
                최고 관리자 계정
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">관리자 아이디</label>
                  <input
                    type="text"
                    id="adminId"
                    name="adminId"
                    value={formData.adminId}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1A365D] focus:ring-[#1A365D] sm:text-sm p-3 border"
                    placeholder="admin_id"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">관리자 비밀번호</label>
                  <input
                    type="password"
                    id="adminPassword"
                    name="adminPassword"
                    value={formData.adminPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1A365D] focus:ring-[#1A365D] sm:text-sm p-3 border"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </section>

            {/* 3. 솔루션 선택 */}
            <section>
              <h2 className="text-xl font-semibold text-[#1A365D] mb-6 flex items-center gap-2 border-b pb-2">
                <Layers className="w-6 h-6" />
                사용할 솔루션 선택 (다중 선택 가능)
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {solutions.map((solution) => {
                  const isSelected = formData.selectedSolutions.includes(solution.id);
                  return (
                    <div
                      key={solution.id}
                      onClick={() => handleSolutionToggle(solution.id)}
                      className={`cursor-pointer rounded-lg border p-4 flex items-start gap-4 transition-all ${
                        isSelected ? 'border-[#1A365D] bg-blue-50 ring-1 ring-[#1A365D] shadow-sm' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckSquare className={`w-6 h-6 ${isSelected ? 'text-[#1A365D]' : 'text-gray-300'}`} />
                      </div>
                      <div>
                        <h3 className={`font-medium ${isSelected ? 'text-[#1A365D]' : 'text-gray-900'}`}>{solution.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{solution.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Submit Button */}
            {isPostcodeOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col m-4 animate-in fade-in zoom-in duration-200">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-bold text-[#1A365D]">주소 검색</h3>
                    <button type="button" onClick={() => setIsPostcodeOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-0 bg-white" style={{ height: '400px' }}>
                    <DaumPostcode onComplete={handleCompletePostcode} style={{ height: '100%', width: '100%' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-[#1A365D] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A365D] transition-colors"
              >
                가입 신청 완료하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
