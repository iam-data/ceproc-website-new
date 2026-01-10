// /src/components/tdaas/TradeBalanceModal.tsx
// Updated with proper 3-line header hierarchy from config

import { useEffect, useState } from 'react';
import { X, Download, TrendingUp, TrendingDown, Calendar, Maximize2, Minimize2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

// Import configs
import siteConfig from '../../data/site-config.json';
import modalConfig from '../../data/tdaas-modal-config.json';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TradeBalanceData {
  period: string;
  date: string;
  exports: number;
  imports: number;
  balance: number;
  type: 'surplus' | 'deficit';
}

interface TradeBalanceResponse {
  success: boolean;
  data: TradeBalanceData[];
  metadata: {
    currency: string;
    unit: string;
    total_records: number;
  };
  summary: {
    average_balance: number;
    surplus_months: number;
    deficit_months: number;
    surplus_rate: number;
    strongest_month: { period: string; balance: number };
    weakest_month: { period: string; balance: number };
  };
}

interface TradeBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TradeBalanceModal({ isOpen, onClose }: TradeBalanceModalProps) {
  const [data, setData] = useState<TradeBalanceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get config values
  const modalInfo = modalConfig.modals.tradeBalance;
  const chartConfig = modalInfo.chartConfig;
  const header = modalInfo.header;
  
  // State from config defaults
  const [currency, setCurrency] = useState<'CAD' | 'USD'>(chartConfig.defaultCurrency as 'CAD' | 'USD');
  const [timeRange, setTimeRange] = useState(chartConfig.defaultTimeRange);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/tdaas/trade-balance?currency=${currency}&limit=${timeRange}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching trade balance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, currency, timeRange]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Prepare chart data
  const chartData = data?.data ? {
    labels: data.data.slice().reverse().map(d => format(new Date(d.date), 'MMM yyyy')),
    datasets: [
      chartConfig.showExports && {
        label: 'Exports',
        data: data.data.slice().reverse().map(d => d.exports),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      chartConfig.showImports && {
        label: 'Imports',
        data: data.data.slice().reverse().map(d => d.imports),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      chartConfig.showBalance && {
        label: 'Balance',
        data: data.data.slice().reverse().map(d => d.balance),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderDash: [5, 5],
      },
    ].filter(Boolean),
  } : null;

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: 'bold',
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += `$${context.parsed.y.toLocaleString()} M ${currency}`;
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return `$${Number(value).toLocaleString()}M`;
          },
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!data?.data) return;

    const headers = ['Period', 'Date', 'Exports', 'Imports', 'Balance', 'Type'];
    const rows = data.data.map(d => [
      d.period,
      d.date,
      d.exports,
      d.imports,
      d.balance,
      d.type
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trade-balance-${currency}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isFullscreen ? 'p-0' : ''}`}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative min-h-screen flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}>
        <div className={`relative bg-white shadow-2xl w-full overflow-hidden transition-all duration-300 ${
          isFullscreen 
            ? 'h-screen max-w-full rounded-none' 
            : 'rounded-2xl max-w-6xl max-h-[90vh]'
        }`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* CEPROC Logo */}
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center shadow-lg">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1l1.5 3.5L16 3l-1 3.5 3.5.5-3 2 1.5 3.5-3-1.5L12 15l-2-4.5-3 1.5 1.5-3.5-3-2 3.5-.5L8 3l2.5 1.5L12 1z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Title Section - Config Driven with 3-line hierarchy */}
                <div>
                  {/* Line 1: Organization - TDaaS */}
                  <h2 className="text-lg font-bold mb-1 leading-tight text-white">
                    {header.line1.prefix}{header.line1.separator}{header.line1.text}
                  </h2>
                  
                  {/* Line 2: Dataset Title */}
                  <h3 className="text-2xl font-bold text-white mb-1 leading-tight">
                    {header.line2.text}
                  </h3>
                  
                  {/* Line 3: Subtitle • Source */}
                  <p className="text-sm text-blue-100 leading-tight">
                    {header.line3.text}{header.line3.separator}{header.line3.source}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
                  title="Close"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrency('CAD')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currency === 'CAD'
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  CAD
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currency === 'USD'
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  USD
                </button>
              </div>

              <div className="flex gap-2">
                {chartConfig.availableTimeRanges.map((months: number) => (
                  <button
                    key={months}
                    onClick={() => setTimeRange(months)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      timeRange === months
                        ? 'bg-white text-blue-600 shadow-lg'
                        : 'bg-blue-700 text-white hover:bg-blue-600'
                    }`}
                  >
                    {months}M
                  </button>
                ))}
              </div>

              <button
                onClick={exportToCSV}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors shadow-lg"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`p-8 overflow-y-auto ${isFullscreen ? 'h-[calc(100vh-220px)]' : 'max-h-[calc(90vh-220px)]'}`}>
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : data ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <TrendingUp className="text-white" size={20} />
                      </div>
                      <span className="text-sm font-semibold text-green-700">Avg Balance</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      ${data.summary.average_balance.toLocaleString()}M
                    </div>
                    <div className="text-xs text-green-600 mt-1">{currency}</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Calendar className="text-white" size={20} />
                      </div>
                      <span className="text-sm font-semibold text-blue-700">Surplus Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {data.summary.surplus_rate}%
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {data.summary.surplus_months}/{data.metadata.total_records} months
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border-2 border-cyan-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-cyan-500 rounded-lg">
                        <TrendingUp className="text-white" size={20} />
                      </div>
                      <span className="text-sm font-semibold text-cyan-700">Best Month</span>
                    </div>
                    <div className="text-2xl font-bold text-cyan-900">
                      ${data.summary.strongest_month.balance.toLocaleString()}M
                    </div>
                    <div className="text-xs text-cyan-600 mt-1">
                      {data.summary.strongest_month.period}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <TrendingDown className="text-white" size={20} />
                      </div>
                      <span className="text-sm font-semibold text-orange-700">Worst Month</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900">
                      ${data.summary.weakest_month.balance.toLocaleString()}M
                    </div>
                    <div className="text-xs text-orange-600 mt-1">
                      {data.summary.weakest_month.period}
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Monthly Trade Balance Analysis
                  </h3>
                  <div className={isFullscreen ? 'h-[500px]' : 'h-96'}>
                    {chartData && <Line data={chartData} options={chartOptions} />}
                  </div>
                </div>

                {/* Data Table */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Detailed Data</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100 border-b-2 border-slate-300">
                          <th className="px-4 py-3 text-left font-bold">Period</th>
                          <th className="px-4 py-3 text-right font-bold">Exports</th>
                          <th className="px-4 py-3 text-right font-bold">Imports</th>
                          <th className="px-4 py-3 text-right font-bold">Balance</th>
                          <th className="px-4 py-3 text-center font-bold">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.map((row, idx) => (
                          <tr 
                            key={row.period}
                            className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                              idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                            }`}
                          >
                            <td className="px-4 py-3 font-semibold">{row.period}</td>
                            <td className="px-4 py-3 text-right text-green-600">
                              ${row.exports.toLocaleString()}M
                            </td>
                            <td className="px-4 py-3 text-right text-red-600">
                              ${row.imports.toLocaleString()}M
                            </td>
                            <td className={`px-4 py-3 text-right font-bold ${
                              row.balance >= 0 ? 'text-blue-600' : 'text-orange-600'
                            }`}>
                              ${row.balance.toLocaleString()}M
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                row.type === 'surplus'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}>
                                {row.type.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">Failed to load data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
