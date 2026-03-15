function AlertBanner({ alerts }) {
  if (alerts.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
      {alerts.map((alert, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '14px 18px',
            borderRadius: '10px',
            border: `1px solid ${alert.severity === 'critical' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
            background: alert.severity === 'critical' ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.08)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: alert.severity === 'critical' ? '#ef4444' : '#f59e0b',
              boxShadow: `0 0 8px ${alert.severity === 'critical' ? '#ef4444' : '#f59e0b'}`,
              marginTop: '4px',
              flexShrink: 0,
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
          <div>
            <p style={{ fontSize: '13px', fontWeight: 500, color: alert.severity === 'critical' ? '#ef4444' : '#f59e0b' }}>
              {alert.title}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {alert.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AlertBanner