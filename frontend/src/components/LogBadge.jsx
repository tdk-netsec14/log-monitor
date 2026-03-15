const config = {
  INFO:  { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)'  },
  WARN:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)'  },
  ERROR: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)'   },
  DEBUG: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.25)'  },
}

function LogBadge({ level }) {
  const c = config[level] || config.DEBUG

  return (
    <span
      className="mono"
      style={{
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '6px',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.05em',
      }}
    >
      {level}
    </span>
  )
}

export default LogBadge