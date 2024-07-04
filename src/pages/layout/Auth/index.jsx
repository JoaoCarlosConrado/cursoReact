import { Outlet, useNavigate } from 'react-router-dom'
import './styles.css'
import { useEffect } from 'react'

function AuthLayout({ children }) {
  
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('athena:user')) {
      navigate('/schedules')
    }
  }, [])

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  )
}

export default AuthLayout