import LogBadge from './LogBadge'

function LogTable({ logs }) {
  if (logs.length === 0) {
    return (
      <div
        className="card"
        style={{
          padding: '60px',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '14px',
        }}
      >
        no logs match your filters
      </div>
    )
  }

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr
            style={{
              borderBottom: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {['level', 'message', 'source', 'timestamp'].map((h) => (
              <th
                key={h}
                className="mono"
                style={{
                  padding: '12px 20px',
                  textAlign: 'left',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr
              key={log._id}
              style={{
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.15s ease',
                animationDelay: `${i * 0.03}s`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--bg-card-hover)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              <td style={{ padding: '14px 20px' }}>
                <LogBadge level={log.level} />
              </td>
              <td
                style={{
                  padding: '14px 20px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  maxWidth: '420px',
                }}
              >
                {log.message}
              </td>
              <td
                className="mono"
                style={{
                  padding: '14px 20px',
                  fontSize: '12px',
                  color: 'var(--accent-dim)',
                }}
              >
                {log.source}
              </td>
              <td
                className="mono"
                style={{
                  padding: '14px 20px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {new Date(log.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LogTable