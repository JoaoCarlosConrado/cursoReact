import { Outlet } from "react-router-dom"
import "./styles.css"
import Sidebar from "../../../components/Sibebar"
import Header from "../../../components/Header"

function AppLayout() {
  return (
    <main className="app-layout">
      <div className="app-layout-container">
        <Sidebar />

        <div className="app-layout-content">
          <header>
            <Header />
          </header>

          <section>
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  )
}

export default AppLayout