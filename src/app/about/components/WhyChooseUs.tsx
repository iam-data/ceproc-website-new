export function WhyChooseUs() {
  const features = [
    {
      icon: "🏛️",
      title: "Policy Driven, Government Connected",
      description: "Active relationships with federal and provincial policymakers deliver proactive intelligence on regulatory changes and trade agreements."
    },
    {
      icon: "✓",
      title: "A Vetted Network, Not an Open Directory",
      description: "Strictly vetted network ensuring high-probability, low-risk partnerships through rigorous certification standards."
    },
    {
      icon: "🌍",
      title: "Strategic Market Making",
      description: "Data-driven analysis on geopolitical risks and optimal entry strategies for high-growth regions."
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#002868] text-center mb-4">
          What Makes CEPROC.CA Unique?
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          We focus on the pillars that matter most to serious B2B export success: Policy and Connectivity.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#002868] mb-3">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}