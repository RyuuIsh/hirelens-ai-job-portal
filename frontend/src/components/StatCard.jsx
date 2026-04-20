import { motion } from "framer-motion";

function StatCard({ title, value, subtitle, darkMode }) {
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
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: darkMode ? "#9ca3af" : "#6b7280",
        }}
      >
        {title}
      </p>

      <h2 style={{ margin: "10px 0 6px 0" }}>{value}</h2>

      {subtitle && (
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: darkMode ? "#d1d5db" : "#4b5563",
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default StatCard;