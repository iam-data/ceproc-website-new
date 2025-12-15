'use client';

import ReactMarkdown from 'react-markdown';
import { getMarkdownContent, getJsonContent } from './actions';
import { useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState({ meta: {}, body: '' });
  const [stats, setStats] = useState<any>({ stats: [] });
  const [pillars, setPillars] = useState<any>({ pillars: [] });

  useEffect(() => {
    Promise.all([
      getMarkdownContent('home'),
      getJsonContent('home-stats'),
      getJsonContent('home-pillars')
    ]).then(([mdContent, statsData, pillarsData]) => {
      setContent(mdContent);
      setStats(statsData);
      setPillars(pillarsData);
    });
  }, []);

  const getColorClasses = (color: string) => {
    if (color === 'orange') {
      return {
        gradient: 'from-[#ff6b35] to-[#ff8c5a]',
        border: 'from-[#ff6b35] to-[#ff8c5a]'
      };
    }
    return {
      gradient: 'from-[#002868] to-[#1a4d8f]',
      border: 'from-[#002868] to-[#1a4d8f]'
    };
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#001845] via-[#002868] to-[#003d82] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff6b35] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[130px] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 text-white">
              <span className="w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">{content.meta.badge}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-[1.1]">
              {content.meta.heroTitle}
              <span className="block bg-gradient-to-r from-[#ff6b35] via-[#ff8c5a] to-[#ffad7f] bg-clip-text text-transparent">
                {content.meta.heroHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
              {content.meta.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href={content.meta.button1Link || '#'} 
                className="group relative px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white rounded-xl font-semibold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {content.meta.button1Text}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff8c5a] to-[#ffad7f] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>

              <a 
                href={content.meta.button2Link || '#'} 
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-[#002868] transition-all hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  {content.meta.button2Text}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center gap-8 text-white/60 text-sm">
              {stats.stats?.map((stat: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff6b35]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{stat.value} {stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-sm">{content.meta.scrollText}</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Content Section with Cards */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#ff6b35]/10 text-[#ff6b35] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Core Services
            </div>
            <h2 className="text-5xl font-bold text-[#002868] mb-4">
              {content.meta.pillarsHeading}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.meta.pillarsSubtitle}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.pillars?.map((pillar: any, index: number) => {
              const colors = getColorClasses(pillar.color);
              return (
                <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#ff6b35]/30 hover:-translate-y-2">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.border} rounded-t-2xl`}></div>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                      {pillar.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#002868] mb-3">
                        {pillar.number}. {pillar.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Markdown Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-lg max-w-none
            prose-h2:text-4xl prose-h2:font-bold prose-h2:text-[#002868] prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-[#002868] prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
            prose-ul:text-gray-700 prose-li:my-2
            prose-strong:text-[#002868] prose-strong:font-bold
          ">
            <ReactMarkdown>
              {content.body}
            </ReactMarkdown>
          </article>
        </div>
      </section>
    </div>
  );
}