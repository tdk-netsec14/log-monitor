const statConfig = [
  { level: 'ERROR', color: '#ef4444', glow: 'rgba(239,68,68,0.12)'  },
  { level: 'WARN',  color: '#f59e0b', glow: 'rgba(245,158,11,0.12)' },
  { level: 'INFO',  color: '#3b82f6', glow: 'rgba(59,130,246,0.12)' },
  { level: 'DEBUG', color: '#8b5cf6', glow: 'rgba(139,92,246,0.12)' },
]

function StatsBar({ logs }) {
  const counts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1
    return acc
  }, {})

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '24px',
      }}
    >
      {statConfig.map(({ level, color, glow }, i) => (
        <div
          key={level}
          className={`fade-in fade-in-delay-${i + 1}`}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderLeft: `3px solid ${color}`,
            borderRadius: '12px',
            padding: '20px 24px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = `0 8px 24px ${glow}`
            e.currentTarget.style.borderColor = color
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.borderLeftColor = color
          }}
        >
          <p
            className="mono"
            style={{
              fontSize: '30px',
              fontWeight: 500,
              color,
              lineHeight: 1,
            }}
          >
            {counts[level] || 0}
          </p>
          <p
            className="mono"
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              marginTop: '8px',
              letterSpacing: '0.08em',
            }}
          >
            {level}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsBar