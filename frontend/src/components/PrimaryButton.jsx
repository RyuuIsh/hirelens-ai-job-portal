import { motion } from "framer-motion";

function PrimaryButton({ children, onClick, type = "button", disabled = false, style = {} }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { y: -2, scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "15px",
        fontWeight: "600",
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

export default PrimaryButton;