import { ContactInfo } from './components/ContactInfo';
import { ContactForm } from './components/ContactForm';
import { QuickLinks } from './components/QuickLinks';

export default function Contact() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#002868] to-[#1a4d8f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact CEPROC</h1>
          <p className="text-xl text-gray-200">
            Get in touch with our team to explore export opportunities
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <ContactInfo />

        <div className="grid md:grid-cols-2 gap-12">
          <ContactForm />
          <QuickLinks />
        </div>
      </section>
    </div>
  );
}