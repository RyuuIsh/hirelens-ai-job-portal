import { motion } from "framer-motion";

function SectionCard({ children, darkMode, style = {} }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: darkMode ? "#1f2937" : "white",
        color: darkMode ? "#f9fafb" : "#111827",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export default SectionCard;