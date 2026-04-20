function SecondaryButton({ children, onClick, type = "button", disabled = false, style = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#111827",
        color: "white",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "15px",
        fontWeight: "600",
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;