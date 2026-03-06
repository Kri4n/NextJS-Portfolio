import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <span className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-600">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      >
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
