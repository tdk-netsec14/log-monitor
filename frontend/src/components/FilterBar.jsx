const inputStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '8px 14px',
  fontSize: '13px',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s ease',
  colorScheme: 'dark',
}

function FilterBar({ filters, onFilterChange }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
      }}
    >
      <input
        type="text"
        placeholder="Search by keyword..."
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        style={{ ...inputStyle, width: '220px' }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-dim)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />

      <select
        value={filters.level}
        onChange={(e) => onFilterChange('level', e.target.value)}
        style={inputStyle}
      >
        <option value="">All levels</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
        <option value="DEBUG">DEBUG</option>
      </select>

      <select
        value={filters.source}
        onChange={(e) => onFilterChange('source', e.target.value)}
        style={inputStyle}
      >
        <option value="">All sources</option>
        <option value="auth-service">auth-service</option>
        <option value="payment-service">payment-service</option>
        <option value="user-service">user-service</option>
        <option value="email-service">email-service</option>
        <option value="api-gateway">api-gateway</option>
      </select>

      <input
        type="date"
        value={filters.from}
        onChange={(e) => onFilterChange('from', e.target.value)}
        style={{ ...inputStyle, width: '160px' }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-dim)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />

      <input
        type="date"
        value={filters.to}
        onChange={(e) => onFilterChange('to', e.target.value)}
        style={{ ...inputStyle, width: '160px' }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-dim)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />

      <button
        onClick={() => onFilterChange('reset')}
        style={{
          ...inputStyle,
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          background: 'transparent',
        }}
        onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
      >
        clear filters
      </button>
    </div>
  )
}

export default FilterBar