import { CalendarClock, LayoutGrid } from 'lucide-react'
import { Link } from 'react-router-dom' 

import "./styles.css"

function Sidebar() {
  return (
    <aside className="sidebar-container">
      <Link to="/schedules">
        <span>
          <CalendarClock size={24} />
          Athena
        </span>
      </Link>

      <div className="sidebar-nav-container">
        <h1>Geral</h1>

        <div className="sidebar-nav-body">
          <Link to="/schedules">
            <LayoutGrid size={20} />
            Início
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar