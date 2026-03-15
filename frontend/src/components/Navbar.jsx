import { Link, useLocation, useNavigate } from 'react-router-dom'
import { removeToken, getUsername } from '../utils/auth'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <nav
      style={{
        background: 'rgba(10, 15, 30, 0.85)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          <span className="mono" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '15px' }}>
            log<span style={{ color: 'var(--accent)' }}>monitor</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[{ path: '/', label: 'dashboard' }, { path: '/analytics', label: 'analytics' }].map(({ path, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className="mono"
                style={{
                  fontSize: '13px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </Link>
            )
          })}

          <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />

          <span className="mono" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {getUsername()}
          </span>

          <button
            onClick={handleLogout}
            className="mono"
            style={{
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.target.style.color = '#ef4444'; e.target.style.borderColor = 'rgba(239,68,68,0.3)' }}
            onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; e.target.style.borderColor = 'var(--border)' }}
          >
            logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar