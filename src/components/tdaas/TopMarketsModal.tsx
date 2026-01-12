// TopMarketsModal.tsx
// Modal component for Top Export Markets dataset
// Features: Bar chart, world map toggle, country comparison, currency/time filters

import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {
  X,
  Download,
  Maximize2,
  Minimize2,
  TrendingUp,
  Trophy,
  Rocket,
  LineChart,
  Globe,
  BarChart3
} from 'lucide-react';
import modalConfig from "../../data/tdaas-modal-config.json";
import siteConfig from "../../data/site-config.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface TopMarketsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MarketData {
  period: string;
  periodDate: string;
  periodType: string;
  countryCode: string;
  countryName: string;
  region: string;
  exports: number;
  shareOfTotal: number;
  rank: number;
  yoyChange: number | null;
  yoyGrowthRate: number | null;
  momChange: number | null;
  momGrowthRate: number | null;
  exchangeRate: number | null;
}

interface SummaryStats {
  latestPeriod: string;
  currency: string;
  periodType: string;
  topMarkets: Array<{
    country: string;
    code: string;
    exports: number;
    share: number;
    rank: number;
  }>;
  totalExports: number;
  avgGrowthRate: number;
  fastestGrowing: {
    country: string;
    code: string;
    growthRate: number;
    exports: number;
  } | null;
  recordCount: number;
  periodsIncluded: number;
  countriesIncluded: number;
}

const config = modalConfig.modals.topMarkets;

export default function TopMarketsModal({ isOpen, onClose }: TopMarketsModalProps) {
  const [currency, setCurrency] = useState<'CAD' | 'USD'>(config.chartConfig.defaultCurrency as 'CAD' | 'USD');
  const [timeRange, setTimeRange] = useState(config.chartConfig.defaultTimeRange);
  const [topN, setTopN] = useState(config.chartConfig.defaultTopN);
  const [periodType, setPeriodType] = useState<'monthly' | 'annual'>(config.chartConfig.defaultPeriodType as 'monthly' | 'annual');
  const [visualization, setVisualization] = useState<'bar' | 'map'>(config.chartConfig.defaultVisualization as 'bar' | 'map');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [presetGroup, setPresetGroup] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [marketsData, setMarketsData] = useState<MarketData[]>([]);
  const [dataByCountry, setDataByCountry] = useState<Record<string, any[]>>({});
  const [summary, setSummary] = useState<SummaryStats | null>(null);

  // Fetch data when modal opens or filters change
  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, currency, timeRange, topN, periodType, compareMode, selectedCountries]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        currency,
        limit: timeRange.toString(),
        topN: topN.toString(),
        periodType,
        compareMode: compareMode.toString(),
      });

      if (compareMode && selectedCountries.length > 0) {
        params.append('countries', selectedCountries.join(','));
      }

      const response = await fetch(`/api/tdaas/top-markets?${params}`);
      const data = await response.json();

      if (data.success) {
        setMarketsData(data.data.markets);
        setDataByCountry(data.data.dataByCountry);
        setSummary(data.data.summary);
      } else {
        setError(data.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error fetching markets data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle preset group selection
  const handlePresetSelect = (groupId: string) => {
    const group = config.countryComparison.presetGroups.find(g => g.id === groupId);
    if (group) {
      setSelectedCountries(group.countries);
      setCompareMode(true);
      setPresetGroup(groupId);
    }
  };

  // Handle individual country toggle
  const toggleCountry = (countryCode: string) => {
    setSelectedCountries(prev => {
      if (prev.includes(countryCode)) {
        return prev.filter(c => c !== countryCode);
      } else if (prev.length < config.countryComparison.maxCountries) {
        return [...prev, countryCode];
      }
      return prev;
    });
    setPresetGroup(''); // Clear preset when manually selecting
  };

  // Prepare chart data based on visualization mode
  const chartData = useMemo(() => {
    if (!marketsData.length) return null;

    if (visualization === 'bar') {
      // Bar chart: Latest period top markets
      const latestPeriodData = marketsData
        .filter(m => m.period === summary?.latestPeriod)
        .sort((a, b) => a.rank - b.rank)
        .slice(0, topN);

      return {
        labels: latestPeriodData.map(m => m.countryName),
        datasets: [
          {
            label: `Exports (${currency} Millions)`,
            data: latestPeriodData.map(m => m.exports),
            backgroundColor: latestPeriodData.map((_, i) => {
              const colors = [
                'rgba(59, 130, 246, 0.8)',  // Blue
                'rgba(168, 85, 247, 0.8)',  // Purple
                'rgba(34, 197, 94, 0.8)',   // Green
                'rgba(251, 146, 60, 0.8)',  // Orange
                'rgba(236, 72, 153, 0.8)',  // Pink
              ];
              return colors[i % colors.length];
            }),
            borderColor: latestPeriodData.map((_, i) => {
              const colors = [
                'rgb(59, 130, 246)',
                'rgb(168, 85, 247)',
                'rgb(34, 197, 94)',
                'rgb(251, 146, 60)',
                'rgb(236, 72, 153)',
              ];
              return colors[i % colors.length];
            }),
            borderWidth: 2
          }
        ]
      };
    } else {
      // Line chart for comparison mode (time series for selected countries)
      if (!compareMode || selectedCountries.length === 0) {
        return null;
      }

      const countryColors: Record<string, string> = {
        'US': 'rgb(59, 130, 246)',
        'CN': 'rgb(239, 68, 68)',
        'GB': 'rgb(168, 85, 247)',
        'JP': 'rgb(34, 197, 94)',
        'MX': 'rgb(251, 146, 60)',
        'KR': 'rgb(236, 72, 153)',
        'DE': 'rgb(14, 165, 233)',
        'IN': 'rgb(250, 204, 21)',
        'NL': 'rgb(132, 204, 22)',
        'FR': 'rgb(167, 139, 250)',
      };

      // Get unique periods sorted
      const periods = [...new Set(marketsData.map(m => m.period))].sort();

      const datasets = selectedCountries.map(countryCode => {
        const countryData = dataByCountry[countryCode] || [];
        const color = countryColors[countryCode] || 'rgb(156, 163, 175)';
        
        return {
          label: countryData[0]?.countryName || countryCode,
          data: periods.map(period => {
            const dataPoint = countryData.find((d: any) => d.period === period);
            return dataPoint ? dataPoint.exports : null;
          }),
          borderColor: color,
          backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
          tension: 0.3,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });

      return {
        labels: periods,
        datasets
      };
    }
  }, [marketsData, summary, visualization, compareMode, selectedCountries, dataByCountry, topN, currency]);

  // Chart options
  const chartOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: compareMode && visualization === 'map',
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#e5e7eb',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y || context.parsed;
            return `${context.dataset.label}: ${currency} ${value.toLocaleString()}M`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
        ticks: { 
          color: '#e5e7eb',
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
        ticks: { 
          color: '#e5e7eb',
          callback: (value) => `${currency} ${(value as number).toLocaleString()}M`
        }
      }
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!marketsData.length) return;

    const latestData = marketsData.filter(m => m.period === summary?.latestPeriod);
    const headers = ['Rank', 'Country', 'Region', `Exports (${currency}M)`, 'Share (%)', 'YoY Growth (%)'];
    const rows = latestData.map(m => [
      m.rank,
      m.countryName,
      m.region,
      m.exports.toFixed(2),
      m.shareOfTotal.toFixed(2),
      m.yoyGrowthRate?.toFixed(2) || 'N/A'
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `top-export-markets-${summary?.latestPeriod}-${currency}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700 ${
        isFullscreen ? 'w-screen h-screen' : 'w-[95vw] max-w-7xl h-[90vh]'
      } flex flex-col overflow-hidden`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 border-b border-purple-400/30">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-lg font-bold text-white mb-2">
                {config.header.line1.prefix}
                {config.header.line1.separator}
                {config.header.line1.text}
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {config.header.line2.text}
              </h2>
              <div className="text-sm text-blue-100">
                {config.header.line3.text}
                {config.header.line3.separator}
                <span className="font-medium">{config.header.line3.source}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-purple-500/30 rounded-lg transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-purple-500/30 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading export markets data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-red-400">
                <p className="text-lg font-semibold mb-2">Error loading data</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Currency Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                    <div className="flex gap-2">
                      {['CAD', 'USD'].map(curr => (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr as 'CAD' | 'USD')}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                            currency === curr
                              ? 'bg-purple-600 text-white shadow-lg'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time Range</label>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {config.chartConfig.availableTimeRanges.map(range => (
                        <option key={range} value={range}>
                          {range} {periodType === 'monthly' ? 'Months' : 'Years'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Top N Countries */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Show Top</label>
                    <select
                      value={topN}
                      onChange={(e) => setTopN(parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={compareMode}
                    >
                      {config.chartConfig.availableTopN.map(n => (
                        <option key={n} value={n}>Top {n}</option>
                      ))}
                    </select>
                  </div>

                  {/* Visualization Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">View</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setVisualization('bar')}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                          visualization === 'bar'
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <BarChart3 className="w-4 h-4" />
                        Chart
                      </button>
                      <button
                        onClick={() => {
                          setVisualization('map');
                          setCompareMode(true);
                        }}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                          visualization === 'map'
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <Globe className="w-4 h-4" />
                        Compare
                      </button>
                    </div>
                  </div>
                </div>

                {/* Country Comparison Section */}
                {visualization === 'map' && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-300">
                        Compare Countries ({selectedCountries.length}/{config.countryComparison.maxCountries})
                      </label>
                      <button
                        onClick={() => {
                          setCompareMode(false);
                          setSelectedCountries([]);
                          setVisualization('bar');
                        }}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        Clear Selection
                      </button>
                    </div>
                    
                    {/* Preset Groups */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                      {config.countryComparison.presetGroups.map(group => (
                        <button
                          key={group.id}
                          onClick={() => handlePresetSelect(group.id)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            presetGroup === group.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {group.name}
                        </button>
                      ))}
                    </div>

                    {/* Selected Countries */}
                    {selectedCountries.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedCountries.map(code => {
                          const country = summary?.topMarkets.find(m => m.code === code);
                          return (
                            <span
                              key={code}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
                            >
                              {country?.country || code}
                              <button
                                onClick={() => toggleCountry(code)}
                                className="hover:bg-purple-700 rounded-full p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Summary Cards */}
              {summary && config.summaryCards.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {config.summaryCards.cards.map(card => {
                    let value, subtitle;
                    const Icon = card.icon === 'trophy' ? Trophy : 
                                card.icon === 'trendingUp' ? TrendingUp :
                                card.icon === 'rocket' ? Rocket : LineChart;

                    switch (card.id) {
                      case 'topMarket':
                        value = summary.topMarkets[0]?.country || 'N/A';
                        subtitle = `${currency} ${summary.topMarkets[0]?.exports.toLocaleString()}M`;
                        break;
                      case 'totalExports':
                        value = `${currency} ${summary.totalExports.toLocaleString()}M`;
                        subtitle = `Top ${summary.countriesIncluded} markets`;
                        break;
                      case 'fastestGrowing':
                        value = summary.fastestGrowing?.country || 'N/A';
                        subtitle = summary.fastestGrowing ? `+${summary.fastestGrowing.growthRate.toFixed(1)}% YoY` : '';
                        break;
                      case 'avgGrowth':
                        value = `${summary.avgGrowthRate >= 0 ? '+' : ''}${summary.avgGrowthRate.toFixed(1)}%`;
                        subtitle = 'Average YoY';
                        break;
                    }

                    return (
                      <div key={card.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">{card.title}</span>
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{value}</div>
                        <div className="text-sm text-gray-400">{subtitle}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Chart */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {visualization === 'bar' ? 'Top Export Markets' : 'Country Comparison'}
                  </h3>
                  <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="h-96">
                  {chartData ? (
                    visualization === 'bar' ? (
                      <Bar data={chartData} options={chartOptions} />
                    ) : (
                      compareMode && selectedCountries.length > 0 ? (
                        <Line data={chartData} options={chartOptions} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          Select countries to compare
                        </div>
                      )
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No data available
                    </div>
                  )}
                </div>
              </div>

              {/* Data Table */}
              {config.tableConfig.enabled && summary && (
                <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white">
                      Detailed Data - {summary.latestPeriod}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900/50">
                        <tr>
                          {config.tableConfig.columns.map(col => (
                            <th key={col.id} className={`px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ${col.width}`}>
                              {col.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {marketsData
                          .filter(m => m.period === summary.latestPeriod)
                          .sort((a, b) => a.rank - b.rank)
                          .map(market => (
                            <tr key={market.countryCode} className="hover:bg-gray-700/30 transition-colors">
                              <td className="px-4 py-3 text-sm text-white font-medium">{market.rank}</td>
                              <td className="px-4 py-3 text-sm text-white">
                                <div className="flex flex-col">
                                  <span className="font-medium">{market.countryName}</span>
                                  <span className="text-xs text-gray-400">{market.region}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-white">
                                {currency} {market.exports.toLocaleString()}M
                              </td>
                              <td className="px-4 py-3 text-sm text-white">
                                {market.shareOfTotal.toFixed(2)}%
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {market.yoyGrowthRate !== null ? (
                                  <span className={market.yoyGrowthRate >= 0 ? 'text-green-400' : 'text-red-400'}>
                                    {market.yoyGrowthRate >= 0 ? '+' : ''}{market.yoyGrowthRate.toFixed(2)}%
                                  </span>
                                ) : (
                                  <span className="text-gray-500">N/A</span>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
