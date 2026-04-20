function PageHeader({ title, subtitle, darkMode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h1
        style={{
          marginBottom: "8px",
          color: darkMode ? "#f9fafb" : "#111827",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            margin: 0,
            color: darkMode ? "#d1d5db" : "#6b7280",
            fontSize: "16px",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;