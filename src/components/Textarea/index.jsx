import "./styles.css";

function Textarea({ ...props }) {
  return (
    <textarea className="textarea-container" {...props} />
  )
}

export default Textarea