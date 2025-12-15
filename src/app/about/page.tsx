'use client';

import { getMarkdownContent, getJsonContent } from '@/app/actions';
import { useEffect, useState } from 'react';

export default function About() {
  const [content, setContent] = useState({ meta: {}, body: '' });
  const [values, setValues] = useState<any>({ values: [] });
  const [features, setFeatures] = useState<any>({ features: [] });
  const [stats, setStats] = useState<any>({ stats: [] });
  const [commitments, setCommitments] = useState<any>({ commitments: [] });

  useEffect(() => {
    Promise.all([
      getMarkdownContent('about'),
      getJsonContent('about-values'),
      getJsonContent('about-features'),
      getJsonContent('about-stats'),
      getJsonContent('about-commitments')
    ]).then(([mdContent, valuesData, featuresData, statsData, commitmentsData]) => {
      setContent(mdContent);
      setValues(valuesData);
      setFeatures(featuresData);
      setStats(statsData);
      setCommitments(commitmentsData);
    });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#002868] via-[#1a4d8f] to-[#003d82] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#ff6b35] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-[#ff6b35] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Founded {content.meta.founded || '2020'}
          </div>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            {content.meta.heroTitle || 'About CEPROC'}
          </h1>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto">
            {content.meta.heroSubtitle || 'Your Strategic Partner in Global Trade'}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-[#002868] to-[#1a4d8f] rounded-2xl p-12 text-white h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-6">🌍</div>
                  <h3 className="text-3xl font-bold mb-4">Canada's Voice</h3>
                  <p className="text-xl text-gray-200">in Global Trade</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#002868] mb-6">
                {content.meta.introHeading || 'Shaping the Future of Canadian Exports'}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {content.meta.introPara1}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.meta.introPara2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#002868] to-[#1a4d8f] rounded-3xl p-12 text-white text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">{content.meta.missionHeading || 'Our Mission'}</h2>
            <p className="text-2xl leading-relaxed max-w-4xl mx-auto font-light">
              {content.meta.missionText}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#002868] text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.values?.map((value: any, index: number) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md border-t-4 border-[#ff6b35]">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-[#002868] mb-3">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#002868] text-center mb-4">What Makes CEPROC.CA Unique?</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We focus on the pillars that matter most to serious B2B export success: Policy and Connectivity.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.features?.map((feature: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#002868] mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#002868] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            {content.meta.impactHeading || 'Our Impact'}
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.stats?.map((stat: any, index: number) => (
              <div key={index}>
                <div className="text-5xl font-bold text-[#ff6b35] mb-2">{stat.value}</div>
                <div className="text-xl text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#002868] text-center mb-4">
            {content.meta.commitmentHeading || 'Our Commitment to You'}
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            {content.meta.commitmentSubtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {commitments.commitments?.map((commitment: any, index: number) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#ff6b35] hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{commitment.icon}</div>
                <h3 className="text-2xl font-bold text-[#002868] mb-3">{commitment.title}</h3>
                <p className="text-gray-700">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold Closing Statement */}
      <section className="py-16 bg-gradient-to-r from-[#ff6b35] to-[#e55a24] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            {content.meta.closingStatement}
          </h2>
          <p className="text-2xl font-light">
            {content.meta.closingSubtext}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#002868] to-[#1a4d8f] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Expand Your Global Reach?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join Canada's most trusted export promotion network and connect with verified international opportunities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/contact" 
              className="bg-[#ff6b35] hover:bg-[#e55a24] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started Today
            </a>
            <a 
              href="/resources" 
              className="bg-white hover:bg-gray-100 text-[#002868] px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Our Resources
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}