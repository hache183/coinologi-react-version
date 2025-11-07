import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { monthlyStats, tradeResults } from '../data/resultsData';

const formatNumber = (value, options = {}) => {
  if (value === null || value === undefined) {
    return '—';
  }
  return new Intl.NumberFormat('it-IT', options).format(value);
};

const formatPercent = (value) => {
  if (value === null || value === undefined) {
    return '—';
  }
  return `${value.toFixed(1)}%`;
};

const capitalize = (text) => {
  if (!text) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const parseDateFromString = (value) => {
  if (!value) {
    return null;
  }
  const parts = value.split(/[\/\-]/).map((part) => part.trim());
  if (parts.length < 3) {
    return null;
  }

  let day;
  let month;
  let year;

  if (parts[0].length === 4) {
    [year, month, day] = parts.map(Number);
  } else {
    [day, month, year] = parts.map(Number);
  }

  if ([day, month, year].some((component) => Number.isNaN(component))) {
    return null;
  }

  return new Date(year, (month || 1) - 1, day || 1);
};

const Results = () => {
  const monthlyStatsNormalized = useMemo(() => monthlyStats.map((item) => {
    const [yearStr, monthStr] = item.month.split('-');
    const year = Number(yearStr);
    const monthIndex = Number(monthStr) - 1;
    const date = new Date(year, monthIndex, 1);
    const label = capitalize(date.toLocaleString('it-IT', { month: 'long', year: 'numeric' }));

    return {
      year,
      monthIndex,
      monthLabel: label,
      profit: item.totalProfitPercent || 0,
      successRate: item.successRate,
      takeProfit: item.takeProfit,
      stopLoss: item.stopLoss,
      totalTrades: item.totalTrades
    };
  }), [monthlyStats]);

  const historicMonthly = useMemo(() => {
    const monthMap = new Map();

    tradeResults.forEach((trade) => {
      const referenceDate = trade.closeDate || trade.openDate;
      const parsed = parseDateFromString(referenceDate);
      if (!parsed) {
        return;
      }

      const year = parsed.getFullYear();
      const monthIndex = parsed.getMonth();
      const key = `${year}-${monthIndex}`;
      const existing = monthMap.get(key) || {
        year,
        monthIndex,
        monthLabel: capitalize(parsed.toLocaleString('it-IT', { month: 'long', year: 'numeric' })),
        profit: 0,
        totalTrades: 0,
        takeProfit: 0,
        stopLoss: 0
      };

      const profit = trade.numericProfit ?? 0;
      existing.totalTrades += 1;

      if (profit > 0) {
        existing.takeProfit += 1;
      } else if (profit < 0 || (trade.status && trade.status.toLowerCase().includes('stop'))) {
        existing.stopLoss += 1;
      }

      existing.profit += profit;
      monthMap.set(key, existing);
    });

    return Array.from(monthMap.values()).map((entry) => ({
      ...entry,
      successRate: entry.totalTrades ? (entry.takeProfit / entry.totalTrades) * 100 : null
    }));
  }, [tradeResults]);

  const combinedMonthly = useMemo(
    () => [...historicMonthly, ...monthlyStatsNormalized],
    [historicMonthly, monthlyStatsNormalized]
  );

  const baseYearHighlights = useMemo(() => {
    const grouped = combinedMonthly.reduce((acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = [];
      }
      acc[item.year].push(item);
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([year, items]) => {
        const sorted = [...items].sort((a, b) => (b.profit || 0) - (a.profit || 0));
        const [top] = sorted;
        return {
          year: Number(year),
          monthLabel: top?.monthLabel || '—',
          profit: top?.profit ?? 0,
          successRate: top?.successRate ?? null,
          takeProfit: top?.takeProfit ?? 0,
          stopLoss: top?.stopLoss ?? 0
        };
      })
      .sort((a, b) => b.year - a.year);
  }, [combinedMonthly]);

  const yearHighlights = useMemo(() => {
    const overrides = {
      2023: {
        monthLabel: 'Settembre 2023',
        profitLabel: '+1200%',
        winRateLabel: '82%',
        takeProfitLabel: '40',
        stopLossLabel: '10'
      },
      2022: {
        monthLabel: 'Luglio 2022',
        profitLabel: '+1.544,7%',
        winRateLabel: '87,5%',
        takeProfitLabel: '42',
        stopLossLabel: '6'
      },
      2021: {
        monthLabel: 'Gennaio 2021',
        profitLabel: '+10.419%',
        winRateLabel: '82,7%',
        takeProfitLabel: '110',
        stopLossLabel: '23'
      },
      2020: {
        monthLabel: 'Novembre 2020',
        profitLabel: '+10.864%',
        winRateLabel: '82,3%',
        takeProfitLabel: '205',
        stopLossLabel: '44'
      }
    };

    const mapped = baseYearHighlights.map((item) => {
      const override = overrides[item.year];
      if (override) {
        return {
          ...item,
          monthLabel: override.monthLabel,
          profitLabel: override.profitLabel,
          winRateLabel: override.winRateLabel,
          takeProfitLabel: override.takeProfitLabel,
          stopLossLabel: override.stopLossLabel
        };
      }

      return {
        ...item,
        profitLabel: item.profit !== null ? `${formatNumber(item.profit, { maximumFractionDigits: 1 })}%` : '—',
        winRateLabel: item.successRate !== null ? formatPercent(item.successRate) : '—',
        takeProfitLabel: formatNumber(item.takeProfit),
        stopLossLabel: formatNumber(item.stopLoss)
      };
    });

    if (!mapped.some((item) => item.year === 2023)) {
      const override2023 = overrides[2023];
      mapped.push({
        year: 2023,
        monthLabel: override2023.monthLabel,
        profitLabel: override2023.profitLabel,
        winRateLabel: override2023.winRateLabel,
        takeProfitLabel: override2023.takeProfitLabel,
        stopLossLabel: override2023.stopLossLabel
      });
    }

    return mapped.sort((a, b) => b.year - a.year);
  }, [baseYearHighlights]);

  const topTrades = [
    {
      pair: 'SOL/USDT',
      roi: '+1033%',
      date: '23/02/2021',
      status: 'Closed',
      year: '2020'
    },
    {
      pair: 'ADA/USDT',
      roi: '+925%',
      date: '20/02/2021',
      status: 'Closed',
      year: '2020'
    },
    {
      pair: 'ETC/USDT',
      roi: '+718%',
      date: '05/05/2021',
      status: 'Closed',
      year: '2021'
    },
    {
      pair: 'ENJ/USDT',
      roi: '+696%',
      date: '15/03/2021',
      status: 'Closed',
      year: '2021'
    },
    {
      pair: 'SYS/BTC',
      roi: '+626%',
      date: '05/05/2021',
      status: 'Closed',
      year: '2021'
    }
  ];

  const yearlySnapshots = [
    {
      year: 2024,
      totalTrades: '2.813',
      wins: '2.159',
      losses: '654',
      winRate: '72.3%',
      roi: '30.722%'
    },
    {
      year: 2023,
      totalTrades: '610',
      wins: '430',
      losses: '80',
      winRate: '81%',
      roi: '8.000%'
    },
    {
      year: 2022,
      totalTrades: '586',
      wins: '332',
      losses: '65',
      winRate: '83.6%',
      roi: '6.137%'
    },
    {
      year: 2021,
      totalTrades: '1.019',
      wins: '715',
      losses: '141',
      winRate: '83.5%',
      roi: '34.696%'
    },
    {
      year: 2020,
      totalTrades: '1.149',
      wins: '767',
      losses: '232',
      winRate: '76.8%',
      roi: '27.806%'
    }
  ];

  const metrics = [
    {
      label: 'ROI netto cumulato',
      value: '99.362%',
      meta: 'Somma dei profitti dichiarati 2020-2024 al netto delle perdite'
    },
    {
      label: 'Take Profit complessivi',
      value: '3.973',
      meta: 'Operazioni chiuse a target'
    },
    {
      label: 'Stop Loss registrati',
      value: '1.092',
      meta: 'Eventi di rischio gestiti'
    },
    {
      label: 'Operazioni analizzate',
      value: '5.567',
      meta: 'Storico VIP considerato (2020-2024)'
    },
    {
      label: 'Win rate storico',
      value: '78.4%',
      meta: 'Percentuale di trade chiusi in profitto'
    }
  ];

  return (
    <>
      <SEO
        title="Risultati VIP Trading Signals"
        description="Scopri performance, ROI e migliori operazioni del servizio VIP Trading Signals dal 2020 al 2024."
        canonical="/results"
      />

      <section className="results-hero" aria-labelledby="results-heading">
        <div className="container">
          <div className="results-hero__grid">
            <div className="results-hero__content">
              <h1 id="results-heading">Risultati VIP Trading Signals</h1>
              <p>
                Quattro anni di operatività reale sintetizzati in una panoramica che mette in risalto il valore del servizio.
                Sfoglia in un colpo d&apos;occhio i numeri chiave, i mesi più incisivi e i trade simbolo della nostra strategia.
              </p>
              <div className="results-hero__cta">
                <Link to="/vip-trading-signals" className="btn btn--primary">Torna ai Segnali VIP</Link>
                <a href="#results-cta" className="btn btn--secondary">Richiedi informazioni</a>
              </div>
            </div>
            <div className="results-hero__metrics">
              {metrics.map((metric) => (
                <article key={metric.label} className="metric-card">
                  <span className="metric-card__label">{metric.label}</span>
                  <span className="metric-card__value">{metric.value}</span>
                  <span className="metric-card__meta">{metric.meta}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="results-section" aria-labelledby="annual-highlights-heading">
        <div className="container">
          <header className="results-section__header">
            <div>
              <h2 id="annual-highlights-heading">I mesi più performanti, anno per anno</h2>
              <p>Best month per ciascun anno analizzato, con focus su rendimento e controllo del rischio.</p>
            </div>
          </header>

          <div className="year-highlights">
            {yearHighlights.map((item) => (
              <article key={item.year} className="year-card">
                <header className="year-card__header">
                  <span className="year-card__year">{item.year}</span>
                  <span className="year-card__month">{item.monthLabel}</span>
                </header>
                <div className="year-card__metrics">
                  <div>
                    <span className="metric-label">ROI dichiarato</span>
                    <span className="metric-value metric-value--positive">{item.profitLabel}</span>
                  </div>
                  <div>
                    <span className="metric-label">Win rate</span>
                    <span className="metric-value">{item.winRateLabel}</span>
                  </div>
                </div>
                <footer className="year-card__footer">
                  <span>{item.takeProfitLabel} TP</span>
                  <span>{item.stopLossLabel} SL</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="trade-highlights" className="results-section" aria-labelledby="trade-highlights-heading">
        <div className="container">
          <header className="results-section__header">
            <div>
              <h2 id="trade-highlights-heading">Top trade che raccontano il metodo</h2>
              <p>Selezione delle operazioni con rendimento più alto: setup, timing e impatto sul ROI complessivo.</p>
            </div>
          </header>

          <div className="trade-spotlight">
            {topTrades.map((trade) => (
              <article key={`${trade.pair}-${trade.date}`} className="trade-card">
                <header className="trade-card__header">
                  <span className="trade-card__pair">{trade.pair}</span>
                  <span className="trade-card__badge">{trade.roi}</span>
                </header>
                <div className="trade-card__details">
                  <div>
                    <span className="metric-label">Data</span>
                    <span className="metric-value">{trade.date}</span>
                  </div>
                  <div>
                    <span className="metric-label">Stato</span>
                    <span className="status-badge">{trade.status}</span>
                  </div>
                  <div>
                    <span className="metric-label">Anno</span>
                    <span className="metric-value">{trade.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="results-section results-section--alt" aria-labelledby="yearly-snapshot-heading">
        <div className="container">
          <header className="results-section__header">
            <div>
              <h2 id="yearly-snapshot-heading">Panoramica annuale</h2>
              <p>Numeri sintetici per confrontare rapidamente l&apos;evoluzione della strategia VIP.</p>
            </div>
          </header>

          <div className="table-scroll">
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Anno</th>
                  <th>Trade totali</th>
                  <th>Take Profit</th>
                  <th>Stop Loss</th>
                  <th>Win rate</th>
                  <th>ROI dichiarato</th>
                </tr>
              </thead>
              <tbody>
                {yearlySnapshots.map((row) => (
                  <tr key={`year-${row.year}`}>
                    <td data-label="Anno">{row.year}</td>
                    <td data-label="Trade totali">{row.totalTrades}</td>
                    <td data-label="Take Profit">{row.wins}</td>
                    <td data-label="Stop Loss">{row.losses}</td>
                    <td data-label="Win rate">{row.winRate}</td>
                    <td data-label="ROI dichiarato">{row.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="results-cta" className="results-cta" aria-labelledby="results-cta-heading">
        <div className="container">
          <div className="results-cta__content">
            <h2 id="results-cta-heading">Porta questi risultati nel tuo trading</h2>
            <p>
              Prenota una call con il team Coinologi e scopri come integrare i segnali VIP nel tuo piano operativo.
              Numeri concreti, supporto continuo e strategia su misura per accelerare la crescita del tuo portafoglio.
            </p>
            <div className="results-cta__actions">
              <Link to="/contact" className="btn btn--primary">Parla con un consulente</Link>
              <Link to="/vip-trading-signals" className="btn btn--secondary">Esplora il servizio</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .results-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1f2937 58%, #ff7a45 100%);
          color: #ffffff;
          padding: calc(5rem + 120px) 0 4.5rem;
        }

        .results-hero__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(2rem, 6vw, 3rem);
          align-items: center;
        }

        .results-hero__content {
          max-width: 560px;
        }

        .results-hero__content h1 {
          font-size: clamp(2.4rem, 5vw, 3.4rem);
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .results-hero__content p {
          font-size: clamp(1rem, 2.3vw, 1.2rem);
          line-height: 1.8;
          margin-bottom: 2.2rem;
          color: rgba(255, 255, 255, 0.82);
        }

        .results-hero__cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .results-hero__metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .metric-card {
          background: rgba(15, 23, 42, 0.45);
          border-radius: 1rem;
          padding: 1.6rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          min-height: 100%;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 18px 32px rgba(15, 23, 42, 0.35);
        }

        .metric-card__label {
          display: block;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.7);
        }

        .metric-card__value {
          display: block;
          font-size: clamp(1.9rem, 4vw, 2.4rem);
          font-weight: 700;
          margin: 0.85rem 0;
          color: #ffffff;
        }

        .metric-card__meta {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.75);
        }

        .results-section {
          padding: clamp(3.2rem, 6vw, 4.75rem) 0;
        }

        .results-section--alt {
          background: #f8fafc;
        }

        .results-section__header {
          display: flex;
          justify-content: space-between;
          gap: 2.5rem;
          align-items: flex-start;
          margin-bottom: 2.75rem;
        }

        .results-section__header h2 {
          font-size: clamp(1.9rem, 3.4vw, 2.4rem);
          margin-bottom: 0.5rem;
          color: #0f172a;
        }

        .results-section__header p {
          color: #475569;
          margin: 0;
          max-width: 640px;
        }

        .year-highlights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.6rem;
        }

        .year-card {
          background: #ffffff;
          border-radius: 1rem;
          padding: 1.85rem;
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .year-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 50px rgba(15, 23, 42, 0.12);
        }

        .year-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .year-card__year {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f172a;
        }

        .year-card__month {
          font-size: 0.95rem;
          color: #475569;
          font-weight: 600;
          text-align: right;
        }

        .year-card__metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }

        .year-card__footer {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          color: #475569;
        }

        .metric-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          display: block;
        }

        .metric-value {
          display: block;
          font-size: 1.3rem;
          font-weight: 700;
          color: #0f172a;
        }

        .metric-value--positive {
          color: #047857;
        }

        .trade-spotlight {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.6rem;
        }

        .trade-card {
          background: #ffffff;
          border-radius: 1rem;
          padding: 1.85rem;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .trade-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(15, 23, 42, 0.12);
        }

        .trade-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .trade-card__pair {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
        }

        .trade-card__badge {
          background: rgba(4, 120, 87, 0.12);
          color: #047857;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.9rem;
        }

        .trade-card__details {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .trade-card__details > div {
          flex: 1 1 120px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          background: #e2e8f0;
          color: #1e293b;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .trade-card__note {
          margin: 0;
          font-size: 0.95rem;
          color: #475569;
        }

        .table-scroll {
          overflow-x: auto;
        }

        .summary-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 640px;
          background: #ffffff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
        }

        .summary-table th,
        .summary-table td {
          padding: 1rem 1.25rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
          font-size: 0.95rem;
          color: #1e293b;
        }

        .summary-table thead {
          background: #f1f5f9;
        }

        .summary-table tbody tr:hover {
          background: #f8fafc;
        }

        .results-cta {
          background: linear-gradient(120deg, #111827 0%, #1e293b 70%, #ff6b35 100%);
          color: #ffffff;
          padding: clamp(4.5rem, 8vw, 5.5rem) 0;
        }

        .results-cta__content {
          max-width: 720px;
        }

        .results-cta__content h2 {
          font-size: clamp(2rem, 4vw, 2.6rem);
          margin-bottom: 1rem;
        }

        .results-cta__content p {
          font-size: clamp(1rem, 2.4vw, 1.15rem);
          line-height: 1.8;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .results-cta__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 1120px) {
          .results-hero__metrics {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }

        @media (max-width: 992px) {
          .results-hero {
            padding: calc(4.5rem + 100px) 0 3.75rem;
          }

          .results-hero__grid {
            grid-template-columns: 1fr;
          }

          .results-section__header {
            flex-direction: column;
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .results-hero__content h1 {
            font-size: clamp(2.1rem, 6vw, 2.6rem);
          }

          .results-hero__cta {
            flex-direction: column;
          }

          .results-hero__cta .btn {
            width: 100%;
            text-align: center;
          }

          .metric-card__value {
            font-size: 2.1rem;
          }

          .year-card__metrics {
            grid-template-columns: 1fr;
          }

          .trade-card__details {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .results-hero {
            padding: calc(3.5rem + 80px) 0 3rem;
          }

          .results-section {
            padding: 3.2rem 0;
          }

          .results-hero__metrics {
            grid-template-columns: 1fr;
          }

          .metric-card {
            padding: 1.5rem;
          }

          .year-highlights,
          .trade-spotlight {
            grid-template-columns: 1fr;
          }

          .summary-table {
            min-width: 100%;
          }

          .summary-table thead {
            display: none;
          }

          .summary-table tr {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.5rem 1rem;
            padding: 1rem;
          }

          .summary-table td {
            border: none;
            padding: 0;
          }

          .summary-table td::before {
            content: attr(data-label);
            display: block;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #64748b;
            margin-bottom: 0.35rem;
          }

          .summary-table tr + tr {
            border-top: 1px solid #e2e8f0;
          }
        }

        @media (max-width: 480px) {
          .results-hero__content p {
            margin-bottom: 1.75rem;
          }

          .year-card,
          .trade-card {
            padding: 1.6rem;
          }

          .results-cta__actions .btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default Results;
