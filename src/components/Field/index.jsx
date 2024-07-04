import "./styles.css";

function Field({ children }) {
  return (
    <div className="field-container">
      {children}
    </div>
  )
}

export default Field;