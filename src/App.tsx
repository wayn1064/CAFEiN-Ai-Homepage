import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './features/landing/ui/Home';
import { Board } from './features/board/ui/Board';
import { RegisterForm } from './features/auth/ui/RegisterForm';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        {/* Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  <span className="text-2xl font-bold tracking-tighter text-[#1A365D]">CAFEiN-Ai</span>
                </Link>
                <nav className="ml-10 hidden space-x-8 md:flex">
                  <Link to="/" className="text-gray-600 hover:text-[#1A365D] inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                    요금안내
                  </Link>
                  <Link to="/board" className="text-gray-600 hover:text-[#1A365D] inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                    고객지원
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href={import.meta.env.VITE_WAYN_AUTH_URL || 'https://auth.wayn-ai.com/login'}
                  className="text-sm font-medium text-gray-600 hover:text-[#1A365D]"
                >
                  로그인
                </a>
                <Link
                  to="/register"
                  className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1A365D] hover:bg-blue-900 transition-colors"
                >
                  무료 시작하기
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<Board />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-400">
              &copy; 2026 WAYN-Ai, Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};
