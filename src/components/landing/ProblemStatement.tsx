"use client";

import { XCircle } from "lucide-react";

const problems = [
  {
    title: "Wasting time on repetitive tasks",
    description: "Searching for recipes shouldn't take longer than cooking them.",
  },
  {
    title: "The 'What to cook' fatigue",
    description: "Staring at a fridge full of ingredients but having no idea what to make.",
  },
  {
    title: "Food Waste",
    description: "Throwing away perfectly good ingredients because you don't know how to use them.",
  },
];

export const ProblemStatement = () => {
  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3D4A3E] mb-6">
             The Kitchen Struggle is <span className="text-[#AA4D4D]">Real</span>
          </h2>
          <p className="text-xl text-gray-600">
            We know the feeling. Cooking should be joyful, not a stressful math problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 transition-all hover:shadow-md group"
            >
              <div className="w-12 h-12 bg-red-50 text-[#AA4D4D] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#3D4A3E] mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
