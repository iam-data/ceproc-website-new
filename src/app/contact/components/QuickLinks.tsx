export function QuickLinks() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#002868] mb-6">Quick Links</h2>
      
      <div className="space-y-6">
        <div className="bg-[#f8f9fa] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#002868] mb-2">For Producers</h3>
          <p className="text-gray-700 mb-4">
            Looking to access international buyers and expand your export markets?
          </p>
          <a href="/services/producers" className="text-[#ff6b35] font-semibold hover:underline">
            Learn about our vetting program →
          </a>
        </div>

        <div className="bg-[#f8f9fa] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#002868] mb-2">For International Buyers</h3>
          <p className="text-gray-700 mb-4">
            Seeking verified Canadian suppliers with guaranteed supply chain integrity?
          </p>
          <a href="/services/buyers" className="text-[#ff6b35] font-semibold hover:underline">
            Connect with verified suppliers →
          </a>
        </div>

        <div className="bg-[#f8f9fa] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#002868] mb-2">Policy & Insights</h3>
          <p className="text-gray-700 mb-4">
            Stay updated on trade agreements, market trends, and regulatory changes.
          </p>
          <a href="/resources" className="text-[#ff6b35] font-semibold hover:underline">
            View our latest briefs →
          </a>
        </div>

        <div className="bg-[#f8f9fa] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#002868] mb-2">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#linkedin" className="text-[#002868] hover:text-[#ff6b35]">in</a>
            <a href="#twitter" className="text-[#002868] hover:text-[#ff6b35]">𝕏</a>
            <a href="#facebook" className="text-[#002868] hover:text-[#ff6b35]">f</a>
          </div>
        </div>
      </div>
    </div>
  );
}