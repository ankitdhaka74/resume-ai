"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ResumeCoachWindow from "./ResumeCoachWindow";

export default function ResumeCoachWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(true)}
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white
            shadow-2xl
            hover:shadow-blue-500/40
          "
        >
          <Bot className="h-8 w-8" />

          {/* Online Indicator */}
          <span className="absolute right-2 top-2 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <ResumeCoachWindow
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}