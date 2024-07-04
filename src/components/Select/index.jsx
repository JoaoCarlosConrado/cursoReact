import { ChevronDown } from "lucide-react";
import "./styles.css";

function Select({ options, ...props }) {
  return (
    <div className="select-container">
      <select {...props}>
        <option defaultChecked>Selecione um professor</option>

        {options.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>

      <ChevronDown size={18} />
    </div>
  );
}

export default Select;