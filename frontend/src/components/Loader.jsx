function Loader({ text = "Loading..." }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>{text}</p>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    color: "#374151",
  },
  spinner: {
    width: "42px",
    height: "42px",
    border: "4px solid #d1d5db",
    borderTop: "4px solid #111827",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "14px",
    fontSize: "15px",
  },
};

export default Loader;