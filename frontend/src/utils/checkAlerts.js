const THRESHOLDS = {
  errorCritical: 10,
  errorWarning: 5,
  warnHigh: 15,
}

function checkAlerts(logs) {
  const alerts = []

  const counts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1
    return acc
  }, {})

  const errorCount = counts['ERROR'] || 0
  const warnCount = counts['WARN'] || 0

  if (errorCount >= THRESHOLDS.errorCritical) {
    alerts.push({
      severity: 'critical',
      title: `Critical: ${errorCount} ERROR logs detected`,
      message: `Error count has exceeded ${THRESHOLDS.errorCritical}. Immediate attention required.`,
    })
  } else if (errorCount >= THRESHOLDS.errorWarning) {
    alerts.push({
      severity: 'warning',
      title: `Warning: ${errorCount} ERROR logs detected`,
      message: `Error count is above ${THRESHOLDS.errorWarning}. Consider investigating.`,
    })
  }

  if (warnCount >= THRESHOLDS.warnHigh) {
    alerts.push({
      severity: 'warning',
      title: `Warning: ${warnCount} WARN logs detected`,
      message: `High number of warnings detected. System may be under stress.`,
    })
  }

  return alerts
}

export default checkAlerts