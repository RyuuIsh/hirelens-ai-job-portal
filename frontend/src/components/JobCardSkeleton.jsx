function JobCardSkeleton() {
  return (
    <div style={styles.card}>
      <div style={styles.title}></div>
      <div style={styles.company}></div>

      <div style={styles.metaRow}>
        <div style={styles.meta}></div>
        <div style={styles.meta}></div>
      </div>

      <div style={styles.line}></div>
      <div style={styles.lineShort}></div>
    </div>
  );
}

const shimmer = {
  background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.2s infinite linear",
};

const styles = {
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    ...shimmer,
    height: "22px",
    width: "70%",
    borderRadius: "8px",
  },
  company: {
    ...shimmer,
    height: "18px",
    width: "45%",
    borderRadius: "8px",
  },
  metaRow: {
    display: "flex",
    gap: "12px",
  },
  meta: {
    ...shimmer,
    height: "16px",
    width: "90px",
    borderRadius: "8px",
  },
  line: {
    ...shimmer,
    height: "16px",
    width: "100%",
    borderRadius: "8px",
  },
  lineShort: {
    ...shimmer,
    height: "16px",
    width: "75%",
    borderRadius: "8px",
  },
};

export default JobCardSkeleton;