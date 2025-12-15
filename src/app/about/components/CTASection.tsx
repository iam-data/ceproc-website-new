export function CTASection() {
  return (
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
  );
}