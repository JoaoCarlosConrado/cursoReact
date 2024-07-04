import "./styles.css";

function Button({ children, ...props }) {
  return (
    <button className="button-container" {...props}>
      {children}
    </button>
  );
}

export default Button;