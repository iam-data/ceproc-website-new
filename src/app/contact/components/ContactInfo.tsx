export function ContactInfo() {
  return (
    <div className="grid md:grid-cols-3 gap-12 mb-16">
      <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-[#ff6b35]">
        <div className="text-3xl mb-4">📍</div>
        <h3 className="text-xl font-bold text-[#002868] mb-2">Address</h3>
        <p className="text-gray-700">
          123 Bay Street<br />
          Toronto, ON M5H 2R2<br />
          Canada
        </p>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-[#ff6b35]">
        <div className="text-3xl mb-4">📞</div>
        <h3 className="text-xl font-bold text-[#002868] mb-2">Phone</h3>
        <p className="text-gray-700">
          <a href="tel:+14165551234" className="text-[#ff6b35] font-semibold hover:underline">
            +1 (416) 555-1234
          </a><br />
          <span className="text-sm text-gray-600">Monday - Friday, 9AM - 5PM EST</span>
        </p>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-[#ff6b35]">
        <div className="text-3xl mb-4">✉️</div>
        <h3 className="text-xl font-bold text-[#002868] mb-2">Email</h3>
        <p className="text-gray-700">
          <a href="mailto:info@ceproc.ca" className="text-[#ff6b35] font-semibold hover:underline">
            info@ceproc.ca
          </a><br />
          <span className="text-sm text-gray-600">We'll respond within 24 hours</span>
        </p>
      </div>
    </div>
  );
}