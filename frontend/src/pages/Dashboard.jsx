import { useEffect, useState, useCallback } from "react";
import { fetchLogs } from "../services/api";
import LogTable from "../components/LogTable";
import FilterBar from "../components/FilterBar";
import StatsBar from "../components/StatsBar";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import AlertBanner from "../components/AlertBanner";
import RefreshIndicator from "../components/RefreshIndicator";
import checkAlerts from "../utils/checkAlerts";
import useAutoRefresh from "../hooks/useAutoRefresh";

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    level: "",
    source: "",
    from: "",
    to: "",
  });

  const loadLogs = useCallback(
    async (page = currentPage, activeFilters = filters) => {
      try {
        const params = { page, limit: 10 };
        if (activeFilters.level) params.level = activeFilters.level;
        if (activeFilters.source) params.source = activeFilters.source;
        if (activeFilters.search) params.search = activeFilters.search;
        if (activeFilters.from) params.from = activeFilters.from;
        if (activeFilters.to) params.to = activeFilters.to + "T23:59:59";

        const res = await fetchLogs(params);
        setLogs(res.data);
        setPagination(res.pagination);
        setError(null);

        if (
          !activeFilters.level &&
          !activeFilters.source &&
          !activeFilters.search
        ) {
          const all = await fetchLogs({ limit: 1000 });
          setAllLogs(all.data);
        }
      } catch {
        setError("Failed to connect to backend");
      }
    },
    [currentPage, filters],
  );

  useEffect(() => {
    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLogs().then(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [loadLogs]);

  const { lastUpdated, isRefreshing } = useAutoRefresh(
    () => loadLogs(currentPage, filters),
    10000,
  );

  const handleFilterChange = (key, value) => {
    const newFilters =
      key === "reset"
        ? { search: "", level: "", source: "", from: "", to: "" }
        : { ...filters, [key]: value };

    setFilters(newFilters);
    setCurrentPage(1);
    loadLogs(1, newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadLogs(page, filters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const alerts = checkAlerts(allLogs.length > 0 ? allLogs : logs);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div className="fade-in">
            <h1
              className="mono"
              style={{
                fontSize: "22px",
                fontWeight: 500,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              dashboard
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginTop: "4px",
              }}
            >
              {pagination.total || 0} events collected
            </p>
          </div>
          {!loading && (
            <RefreshIndicator
              lastUpdated={lastUpdated}
              isRefreshing={isRefreshing}
            />
          )}
        </div>

        {!loading && !error && <AlertBanner alerts={alerts} />}
        {!loading && !error && (
          <StatsBar logs={allLogs.length > 0 ? allLogs : logs} />
        )}

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {loading && (
          <div
            className="card mono"
            style={{
              padding: "60px",
              textAlign: "center",
              color: "var(--text-secondary)",
              fontSize: "13px",
            }}
          >
            loading logs...
          </div>
        )}

        {error && (
          <div
            className="card"
            style={{
              padding: "60px",
              textAlign: "center",
              color: "var(--danger)",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <LogTable logs={logs} />
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
