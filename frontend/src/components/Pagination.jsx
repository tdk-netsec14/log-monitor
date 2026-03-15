function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const btnBase = {
    padding: '6px 12px',
    fontSize: '13px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontFamily: 'JetBrains Mono, monospace',
    transition: 'all 0.15s ease',
  }

  const btnActive = {
    ...btnBase,
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
    color: '#fff',
    boxShadow: '0 0 12px var(--accent-glow)',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '16px',
      }}
    >
      <span
        className="mono"
        style={{ fontSize: '12px', color: 'var(--text-secondary)' }}
      >
        page {currentPage} of {totalPages}
      </span>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            ...btnBase,
            opacity: currentPage === 1 ? 0.3 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          ← prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={page === currentPage ? btnActive : btnBase}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            ...btnBase,
            opacity: currentPage === totalPages ? 0.3 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          next →
        </button>
      </div>
    </div>
  )
}

export default Pagination