"use client";

import { motion } from "framer-motion";
import {
  Brain,
  FileSearch,
  BarChart3,
  FileDown,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Resume Analysis",
    description:
      "Analyse your resume with AI and receive personalised feedback instantly.",
  },
  {
    icon: FileSearch,
    title: "ATS Score",
    description:
      "Find out how well your resume performs with Applicant Tracking Systems.",
  },
  {
    icon: BarChart3,
    title: "Keyword Suggestions",
    description:
      "Identify missing skills and keywords recruiters are looking for.",
  },
  {
    icon: FileDown,
    title: "Download Report",
    description:
      "Export your complete resume analysis as a professional PDF report.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Powerful Features
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Everything you need to optimise your resume and improve your chances
            of getting shortlisted.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Icon className="text-blue-600" size={28} />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}