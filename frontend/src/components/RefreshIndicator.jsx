function RefreshIndicator({ lastUpdated, isRefreshing }) {
  return (
    <div
      className="mono"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: 'var(--text-secondary)',
      }}
    >
      <div
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: isRefreshing ? 'var(--accent)' : 'var(--success)',
          boxShadow: `0 0 6px ${isRefreshing ? 'var(--accent)' : 'var(--success)'}`,
          animation: isRefreshing ? 'pulse-dot 1s ease-in-out infinite' : 'none',
          transition: 'background 0.3s ease',
        }}
      />
      {isRefreshing
        ? 'refreshing...'
        : `updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
    </div>
  )
}

export default RefreshIndicator