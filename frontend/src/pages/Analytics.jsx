import { useEffect, useState } from "react";
import { fetchLogs } from "../services/api";
import Navbar from "../components/Navbar";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

const LEVEL_COLORS = {
  ERROR: "#ef4444",
  WARN: "#f59e0b",
  INFO: "#3b82f6",
  DEBUG: "#8b5cf6",
};

function Analytics() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs({ limit: 1000 })
      .then((res) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const levelCounts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        data: Object.values(levelCounts),
        backgroundColor: Object.keys(levelCounts).map((l) => LEVEL_COLORS[l]),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const timeMap = logs.reduce((acc, log) => {
    const hour = new Date(log.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const lineData = {
    labels: Object.keys(timeMap).slice(0, 20),
    datasets: [
      {
        label: "logs",
        data: Object.values(timeMap).slice(0, 20),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.08)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        borderColor: "#1e2d45",
        borderWidth: 1,
        titleColor: "#e2e8f0",
        bodyColor: "#64748b",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#374151",
          font: { family: "JetBrains Mono", size: 11 },
        },
        grid: { color: "#111827" },
        border: { color: "#1e2d45" },
      },
      x: {
        ticks: {
          color: "#374151",
          font: { family: "JetBrains Mono", size: 11 },
        },
        grid: { display: false },
        border: { color: "#1e2d45" },
      },
    },
  };

  const cardStyle = {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "24px",
  };

  const headingStyle = {
    fontSize: "11px",
    fontWeight: 500,
    color: "var(--text-secondary)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "24px",
    fontFamily: "JetBrains Mono, monospace",
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
        <Navbar />
        <div
          className="mono"
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            padding: "80px",
            fontSize: "13px",
          }}
        >
          loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}
      >
        <div className="fade-in" style={{ marginBottom: "32px" }}>
          <h1
            className="mono"
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            analytics
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              marginTop: "4px",
            }}
          >
            breakdown of {logs.length} events
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div style={cardStyle}>
            <p style={headingStyle}>logs by level</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "240px", height: "240px" }}>
                <Doughnut
                  data={pieData}
                  options={{
                    cutout: "68%",
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "#64748b",
                          font: { family: "JetBrains Mono", size: 11 },
                          padding: 16,
                        },
                      },
                      tooltip: {
                        backgroundColor: "#111827",
                        borderColor: "#1e2d45",
                        borderWidth: 1,
                        titleColor: "#e2e8f0",
                        bodyColor: "#64748b",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <p style={headingStyle}>activity over time</p>
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>

        <div style={cardStyle}>
          <p style={headingStyle}>level breakdown</p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["level", "count", "percentage", "share"].map((h) => (
                  <th
                    key={h}
                    className="mono"
                    style={{
                      padding: "8px 0",
                      textAlign: "left",
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(levelCounts).map(([level, count]) => (
                <tr
                  key={level}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "14px 0" }}>
                    <span
                      className="mono"
                      style={{
                        color: LEVEL_COLORS[level],
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {level}
                    </span>
                  </td>
                  <td
                    className="mono"
                    style={{
                      padding: "14px 0",
                      fontSize: "13px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {count}
                  </td>
                  <td
                    className="mono"
                    style={{
                      padding: "14px 0",
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {((count / logs.length) * 100).toFixed(1)}%
                  </td>
                  <td style={{ padding: "14px 0", width: "200px" }}>
                    <div
                      style={{
                        height: "4px",
                        background: "var(--border)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(count / logs.length) * 100}%`,
                          background: LEVEL_COLORS[level],
                          borderRadius: "2px",
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
