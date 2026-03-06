import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-white/6 py-6 px-8 flex justify-between items-center flex-wrap gap-2 max-w-275 mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-xs text-gray-700">© 2026 Krian Lloyd Lerry</p>
      <p className="text-xs text-gray-700 flex items-center gap-1.5">
        <MapPin className="w-3 h-3" />
        Mandaluyong City, Metro Manila, PH
      </p>
    </motion.footer>
  );
};

export default Footer;
