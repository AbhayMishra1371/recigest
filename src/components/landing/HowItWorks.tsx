"use client";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your free account in seconds with Google or email.",
  },
  {
    number: "02",
    title: "Input Ingredients",
    description: "Tell us what's in your pantry or snap a photo of your leftovers.",
  },
  {
    number: "03",
    title: "Get Recipes",
    description: "Our AI chef instantly suggests the best meals you can cook right now.",
  },
  {
    number: "04",
    title: "Cook & Enjoy",
    description: "Follow the simple instructions and enjoy your zero-waste meal!",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[#3D4A3E] mb-4">How It Works</h2>
          <p className="text-gray-600">Start your culinary journey in four simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-[#F5F3EE] rounded-full flex items-center justify-center text-[#AA4D4D] font-bold text-2xl mb-8 border-4 border-white shadow-xl">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#3D4A3E] mb-4">{step.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
