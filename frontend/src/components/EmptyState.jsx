import { motion } from "framer-motion";

function EmptyState({ title, text, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        backgroundColor: darkMode ? "#1f2937" : "white",
        color: darkMode ? "#f9fafb" : "#111827",
        padding: "28px",
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p
        style={{
          marginBottom: 0,
          color: darkMode ? "#d1d5db" : "#6b7280",
        }}
      >
        {text}
      </p>
    </motion.div>
  );
}

export default EmptyState;