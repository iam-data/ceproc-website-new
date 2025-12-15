import './globals.css';

export const metadata = {
  title: 'CEPROC - Canadian Export Promotion Council',
  description: 'Supporting Canadian exporters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FEFAE0]">
        {/* Clean Professional Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Professional Logo */}
              <a href="/" className="flex items-center gap-4 group">
                {/* Refined Logo Design */}
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Clean hexagon shape */}
                    <defs>
                      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0F766E" />
                        <stop offset="100%" stopColor="#14B8A6" />
                      </linearGradient>
                    </defs>
                    
                    {/* Outer hexagon */}
                    <polygon 
                      points="50,8 85,28 85,72 50,92 15,72 15,28" 
                      fill="url(#logo-gradient)"
                    />
                    
                    {/* Modern maple leaf */}
                    <g transform="translate(50, 50)">
                      <path 
                        d="M 0,-22 L 7,-10 L 12,-12 L 8,-2 L 14,6 L 6,4 L 3,14 L 0,6 L -3,14 L -6,4 L -14,6 L -8,-2 L -12,-12 L -7,-10 Z" 
                        fill="white"
                      />
                    </g>
                  </svg>
                </div>
                
                {/* Clean Typography */}
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    CEPROC
                  </h1>
                  <p className="text-xs text-teal-700 font-medium tracking-wide uppercase">
                    Export Promotion Council
                  </p>
                </div>
              </a>

              {/* Clean Navigation */}
              <div className="flex items-center gap-8">
                <ul className="hidden lg:flex items-center gap-1">
                  <li>
                    <a 
                      href="/" 
                      className="px-4 py-2 text-gray-900 font-medium text-sm hover:text-teal-700 transition-colors"
                    >
                      Home
                    </a>
                  </li>

                  <li className="relative group">
                    <button className="px-4 py-2 text-gray-700 hover:text-teal-700 font-medium text-sm transition-colors flex items-center gap-1">
                      Services
                      <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Professional Dropdown */}
                    <div className="absolute left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-2">
                          <a 
                            href="#export-support" 
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">
                                Export Support
                              </div>
                              <div className="text-xs text-gray-600 mt-0.5">
                                Strategic guidance for global markets
                              </div>
                            </div>
                          </a>
                          
                          <a 
                            href="#market-intelligence" 
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">
                                Market Intelligence
                              </div>
                              <div className="text-xs text-gray-600 mt-0.5">
                                Data-driven insights for decisions
                              </div>
                            </div>
                          </a>
                          
                          <a 
                            href="#networking-events" 
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">
                                Networking Events
                              </div>
                              <div className="text-xs text-gray-600 mt-0.5">
                                Connect with trade leaders
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <a 
                      href="/resources" 
                      className="px-4 py-2 text-gray-700 hover:text-teal-700 font-medium text-sm transition-colors"
                    >
                      Resources
                    </a>
                  </li>

                  <li>
                    <a 
                      href="/about" 
                      className="px-4 py-2 text-gray-700 hover:text-teal-700 font-medium text-sm transition-colors"
                    >
                      About
                    </a>
                  </li>

                  <li>
                    <a 
                      href="/contact" 
                      className="px-4 py-2 text-gray-700 hover:text-teal-700 font-medium text-sm transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>

                {/* Clean CTA */}
                <a 
                  href="/contact"
                  className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Get Started
                </a>
              </div>
            </div>
          </nav>
        </header>

        <div className="h-20"></div>

        <main>
          {children}
        </main>

        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">
                  CEPROC
                </h3>
                <p className="text-gray-400 text-sm">
                  Supporting Canadian exporters to succeed globally
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-teal-400">Services</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#export-support" className="hover:text-teal-400 transition-colors">Export Support</a></li>
                  <li><a href="#market-intelligence" className="hover:text-teal-400 transition-colors">Market Intelligence</a></li>
                  <li><a href="#networking-events" className="hover:text-teal-400 transition-colors">Networking Events</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-teal-400">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/about" className="hover:text-teal-400 transition-colors">About Us</a></li>
                  <li><a href="/contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
                  <li><a href="#blog" className="hover:text-teal-400 transition-colors">Blog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-teal-400">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#accessibility" className="hover:text-teal-400 transition-colors">Accessibility</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex md:flex-row flex-col md:justify-between md:items-center gap-4">
              <p className="text-sm text-gray-400">
                &copy; 2025 CEPROC - Canadian Export Promotion Council. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#linkedin" className="text-gray-400 hover:text-teal-400 transition-colors">LinkedIn</a>
                <a href="#twitter" className="text-gray-400 hover:text-teal-400 transition-colors">Twitter</a>
                <a href="#facebook" className="text-gray-400 hover:text-teal-400 transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}