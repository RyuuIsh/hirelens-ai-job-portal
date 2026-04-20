function PageContainer({ children, darkMode }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "24px",
        backgroundColor: darkMode ? "#111827" : "#f3f4f6",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PageContainer;