'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#002868] mb-6">Send us a Message</h2>
      
      {submitted ? (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
          <p className="text-green-700">
            Thank you for contacting CEPROC. Our team will get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#002868] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] focus:ring-opacity-20"
              placeholder="John Doe"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#002868] mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] focus:ring-opacity-20"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#002868] mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] focus:ring-opacity-20"
                placeholder="+1 (416) 555-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#002868] mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] focus:ring-opacity-20"
              placeholder="Your Company"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#002868] mb-2">
              Inquiry Type *
            </label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] focus:ring-opacity-20"
            >
              <option value="general">General Inquiry</option>
              <option value="export-support">Export Support</option>
              <option value="market-intelligence">Market Intelligence</option>
              <option value="networking">Networking Events</option>
              <option value="partnership">Partnership Opportunity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#002868] mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] focus:ring-opacity-20"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#002868] mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] focus:ring-opacity-20"
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff6b35] hover:bg-[#e55a24] text-white font-bold py-3 rounded-lg transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}