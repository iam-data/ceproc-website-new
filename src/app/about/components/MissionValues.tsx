export function MissionValues() {
  const values = [
    {
      icon: "🎯",
      title: "Advocacy",
      description: "The relentless voice of Canadian exporters, ensuring favorable trade environments and influencing national policy."
    },
    {
      icon: "🛡️",
      title: "Integrity",
      description: "Establishing trust through meticulous vetting of every partner in our network, guaranteeing reliable partnerships."
    },
    {
      icon: "📈",
      title: "Growth",
      description: "Fostering sustainable international revenue streams through strategic market intelligence and connectivity."
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#002868] text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#ff6b35]">
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold text-[#002868] mb-3">{value.title}</h3>
              <p className="text-gray-700 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}