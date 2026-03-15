import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/api'
import { saveToken } from '../utils/auth'

function Login() {
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = mode === 'login'
        ? await loginUser(username, password)
        : await registerUser(username, password)

      saveToken(data.token, data.username)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#0d1424',
    border: '1px solid #1e2d45',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#e2e8f0',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s ease',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0f1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} />
            <span style={{ fontSize: '20px', fontWeight: 500, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace' }}>
              log<span style={{ color: '#3b82f6' }}>monitor</span>
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <div
          style={{
            background: '#111827',
            border: '1px solid #1e2d45',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', background: '#0d1424', borderRadius: '10px', padding: '4px' }}>
            {['login', 'register'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: mode === m ? '#1e2d45' : 'transparent',
                  color: mode === m ? '#e2e8f0' : '#64748b',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px', fontFamily: 'JetBrains Mono, monospace' }}>
                username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your username"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#1e2d45'}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px', fontFamily: 'JetBrains Mono, monospace' }}>
                password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#1e2d45'}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            {error && (
              <p style={{ fontSize: '13px', color: '#ef4444', textAlign: 'center' }}>
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: loading ? '#1e3a5f' : '#3b82f6',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'JetBrains Mono, monospace',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s ease',
                boxShadow: loading ? 'none' : '0 0 20px rgba(59,130,246,0.3)',
              }}
            >
              {loading ? 'please wait...' : mode}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login