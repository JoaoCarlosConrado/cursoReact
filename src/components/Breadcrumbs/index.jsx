import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import "./styles.css";

function Breadcrumbs({ options }) {
  return (
    <nav className="breadcrumbs-container">
      <ol>
        {options.map(({ label, path, activeLink }, index) => {
          return (
            <li key={path} className={activeLink ? "active-link" : ""}>
              <Link to={path}>{label}</Link>
              {index < options.length - 1 && <ChevronRight size={20} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
