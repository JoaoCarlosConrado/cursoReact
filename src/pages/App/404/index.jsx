import { Link } from "react-router-dom"
import "./styles.css"

function NotFound() {
    return (
        <div className="not-found">
            <h1>Página não encontrada</h1>
            <span>Voltar para o <Link to={"/schedules"}>Dashboard</Link></span>
        </div>
    )
}

export default NotFound