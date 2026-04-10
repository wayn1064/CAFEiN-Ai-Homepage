import React, { useState } from 'react';
import axios from 'axios';
import { Coffee, CheckCircle, ArrowRight, Building, User, Mail, Lock, Phone, MapPin, Briefcase, Tag } from 'lucide-react';
import './App.css';

interface FormData {
  businessId: string;
  cafeName: string;
  ceoName: string;
  phone: string;
  address: string;
  industry: string;
  businessCategory: string;
  email: string;
  password: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    businessId: '',
    cafeName: '',
    ceoName: '',
    phone: '',
    address: '',
    industry: '',
    businessCategory: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // CAFEiN-Ai 벡엔드 모듈로 전송 (Nginx 리버스 프록시를 통해 WAYN-Ai로 라우팅됨)
      await axios.post('/api/cafein/register', formData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      // For demonstration, act like it's a success if API fails because it's a mock URL
      // TODO: Change this logic when backend is ready
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="header-logo">
            <Coffee className="header-logo-icon" size={28} />
            <span>CAFEiN-Ai</span>
          </div>
          <div>
            <a href="#register" className="btn btn-outline" style={{ height: '36px', padding: '0 16px' }}>가입하기</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {!isSuccess ? (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="hero-section">
              <div className="container">
                <h1 className="hero-title">
                  스마트한 카페 비즈니스, <br />
                  <span className="hero-highlight">CAFEiN-Ai</span> 로 완성하세요
                </h1>
                <p className="hero-subtitle">
                  AI 기반의 효율적인 관리, 매출 증대 솔루션을 지금 바로 경험해 보세요. <br />
                  회원가입 후 간편하게 WAYN-Ai 모듈 승인을 받을 수 있습니다.
                </p>
              </div>
            </section>

            {/* Form Section */}
            <section id="register" className="registration-section">
              <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="registration-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <h2 className="card-title">
                    <User size={24} className="hero-highlight" />
                    서비스 가입 신청
                  </h2>
                  
                  {errorMsg && <div className="form-error" style={{ marginBottom: '16px' }}>{errorMsg}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label className="form-label">카페(매장) 이름 *</label>
                        <div style={{ position: 'relative' }}>
                          <Building size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
                          <input type="text" className="form-input" name="cafeName" value={formData.cafeName} onChange={handleChange} required placeholder="예: 카페인에이아이 강남점" style={{ paddingLeft: '40px' }} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">사업자등록번호 *</label>
                        <input type="text" className="form-input" name="businessId" value={formData.businessId} onChange={handleChange} required placeholder="000-00-00000" />
                      </div>

                      <div className="form-group">
                        <label className="form-label">대표자명 *</label>
                        <input type="text" className="form-input" name="ceoName" value={formData.ceoName} onChange={handleChange} required placeholder="홍길동" />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">전화번호 (핸드폰) *</label>
                        <div style={{ position: 'relative' }}>
                          <Phone size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
                          <input type="tel" className="form-input" name="phone" value={formData.phone} onChange={handleChange} required placeholder="010-0000-0000" style={{ paddingLeft: '40px' }} />
                        </div>
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">사업장 주소 *</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
                          <input type="text" className="form-input" name="address" value={formData.address} onChange={handleChange} required placeholder="도로명 주소 입력" style={{ paddingLeft: '40px' }} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">업종 *</label>
                        <div style={{ position: 'relative' }}>
                          <Briefcase size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
                          <input type="text" className="form-input" name="industry" value={formData.industry} onChange={handleChange} required placeholder="예: 숙박 및 음식점업" style={{ paddingLeft: '40px' }} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">업태 *</label>
                        <div style={{ position: 'relative' }}>
                          <Tag size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
                          <input type="text" className="form-input" name="businessCategory" value={formData.businessCategory} onChange={handleChange} required placeholder="예: 커피 전문점" style={{ paddingLeft: '40px' }} />
                        </div>
                      </div>

                      <div className="form-group full-width" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)'}}>
                        <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-active)' }}>마스터 계정 정보</h3>
                      </div>

                      <div className="form-group">
                        <label className="form-label">마스터 아이디 (이메일) *</label>
                        <div style={{ position: 'relative' }}>
                          <Mail size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
                          <input type="email" className="form-input" name="email" value={formData.email} onChange={handleChange} required placeholder="master@example.com" style={{ paddingLeft: '40px' }} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">비밀번호 *</label>
                        <div style={{ position: 'relative' }}>
                          <Lock size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
                          <input type="password" className="form-input" name="password" value={formData.password} onChange={handleChange} required placeholder="비밀번호 입력" style={{ paddingLeft: '40px' }} />
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? '전송 중...' : (
                          <>
                            가입 신청하기 <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="success-message animate-fade-in">
            <CheckCircle className="success-icon" />
            <h2 className="success-title">신청이 완료되었습니다!</h2>
            <p className="success-desc">
              귀하의 정보가 WAYN-Ai 관리 시스템으로 안전하게 전송되었습니다.<br />
              관리자 승인 완료 후 입력하신 이메일({formData.email})로 안내 메일이 발송됩니다.
            </p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              메인으로 돌아가기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
