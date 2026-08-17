import React from "react";
import { FaWrench, FaShieldHalved, FaGears } from "react-icons/fa6";

export default function Service() {
  const services = [
    {
      id: 1,
      title: "Maintenance & Tuning",
      icon: <FaWrench className="text-blue-400 text-xl shrink-0" />,
      description:
        "Complete engine checks, oil changes, and performance tuning.",
    },
    {
      id: 2,
      title: "Safety Inspection",
      icon: <FaShieldHalved className="text-blue-400 text-xl shrink-0" />,
      description:
        "Comprehensive brake, tire, and electrical safety diagnostics.",
    },
    {
      id: 3,
      title: "Custom Parts & Upgrades",
      icon: <FaGears className="text-blue-400 text-xl shrink-0" />,
      description: "Genuine exhaust, suspension, and body kit installation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1329] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-10 text-white tracking-tight">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              className="bg-[#151f38] border border-gray-800 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:border-blue-500 transition-all text-left"
            >
              <div className="flex items-start gap-3 min-h-[56px] mb-3">
                <div className="mt-1">{item.icon}</div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
