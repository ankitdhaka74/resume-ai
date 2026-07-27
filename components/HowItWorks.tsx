"use client";

import { motion } from "framer-motion";
import { Upload, Brain, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload your PDF or DOCX resume securely with a single click.",
  },
  {
    icon: Brain,
    title: "AI Analyses Your Resume",
    description:
      "Our AI evaluates your resume for ATS compatibility, skills, grammar, and keywords.",
  },
  {
    icon: BadgeCheck,
    title: "Get Your Report",
    description:
      "Receive your ATS score, improvement suggestions, and keyword recommendations instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            How It Works
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Get detailed AI-powered resume feedback in three simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="absolute -top-5 left-6 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-6 mt-4">
                  <Icon className="text-blue-600" size={32} />
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}