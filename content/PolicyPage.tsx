'use client';

import ReactMarkdown from 'react-markdown';
import { getMarkdownContent } from '@/app/actions';
import { useEffect, useState } from 'react';

interface PolicyPageProps {
  filename: string;
  title: string;
}

export function PolicyPage({ filename, title }: PolicyPageProps) {
  const [content, setContent] = useState({ meta: {}, body: '' });

  useEffect(() => {
    getMarkdownContent(filename).then(data => {
      setContent(data);
    });
  }, [filename]);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#002868] to-[#1a4d8f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-200">
            Last updated: {content.meta.lastUpdated || 'N/A'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-16 prose prose-lg max-w-none
        prose-h2:text-3xl prose-h2:font-bold prose-h2:text-[#002868] prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-[#002868] prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-a:text-[#ff6b35] prose-a:font-semibold hover:prose-a:underline
        prose-ul:text-gray-700 prose-li:my-2
        prose-strong:text-[#002868]
      ">
        <ReactMarkdown>
          {content.body}
        </ReactMarkdown>
      </section>
    </div>
  );
}