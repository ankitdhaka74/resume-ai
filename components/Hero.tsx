"use client";

import { motion } from "framer-motion";
import { Sparkles, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium mb-6"
          >
            <Sparkles size={18} />
            AI Powered Resume Analyzer
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900"
          >
            Land More Interviews
            <br />
            <span className="text-blue-600">
              with AI Resume Analysis
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-gray-600 leading-8 max-w-xl"
          >
            Get instant ATS scoring, keyword analysis, and AI-powered
            recommendations to make your resume stand out and increase your
            chances of getting shortlisted by recruiters.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
          <Link href="/analyze">  
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition">
              🚀 Analyze Resume
            </button>
          </Link>

            <button 
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({
                  behavior: "smooth",
                })
              }     
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold transition">
              ▶ Watch Demo
            </button>
            
          </motion.div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 mt-8 text-gray-600">

            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>ATS Compatible</span>
            </div>

            <div className="flex items-center gap-2">
              <span>🤖</span>
              <span>AI Powered</span>
            </div>

            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Secure Upload</span>
            </div>

          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-12">

            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                10K+
              </h3>
              <p className="text-gray-600">
                Resumes Analysed
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                95%
              </h3>
              <p className="text-gray-600">
                ATS Accuracy
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                24/7
              </h3>
              <p className="text-gray-600">
                AI Support
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border">

            <div className="flex items-center gap-3 mb-6">
              <FileText
                className="text-blue-600"
                size={28}
              />

              <div>
                <h2 className="font-bold text-lg">
                  Resume Analysis
                </h2>

                <p className="text-gray-500 text-sm">
                  AI Generated Report
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 text-center mb-6">

              <p className="text-gray-500">
                ATS Score
              </p>

              <h1 className="text-6xl font-bold text-blue-600 my-2">
                92%
              </h1>

              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                Excellent
              </span>

            </div>

            <div className="space-y-4">

              {[
                "Strong Technical Skills",
                "Relevant Experience",
                "Good Project Descriptions",
                "Grammar Checked",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle
                    className="text-green-500"
                    size={20}
                  />

                  <span className="text-gray-700">
                    {item}
                  </span>

                </div>
              ))}

            </div>

            <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Download Report
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}