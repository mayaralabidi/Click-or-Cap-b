import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSnow, Sun, TrendingUp, TrendingDown, Minus, Loader2, RefreshCw } from 'lucide-react';
import WeatherMap from '../components/WeatherMap';
import PlatformCard from '../components/PlatformCard';

interface ToxicityData {
  platform: string;
  toxicityLevel: number;
  severity: string;
  trend: string;
  lastUpdated: string;
  description?: string;
  activeUsers?: number;
  flaggedContent?: number;
}

interface RegionalData {
  country: string;
  countryCode: string;
  toxicityLevel: number;
  severity: string;
  platforms: {
    x: number;
    facebook: number;
    reddit: number;
  };
  trend: string;
}

const HateWeatherReport = () => {
  const [globalStats, setGlobalStats] = useState<ToxicityData | null>(null);
  const [platformStats, setPlatformStats] = useState<ToxicityData[]>([]);
  const [regionalData, setRegionalData] = useState<RegionalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [globalRes, platformsRes, regionsRes] = await Promise.all([
        fetch('http://localhost:8000/hate-weather/global'),
        fetch('http://localhost:8000/hate-weather/platforms'),
        fetch('http://localhost:8000/hate-weather/regions')
      ]);

      if (!globalRes.ok || !platformsRes.ok || !regionsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [global, platforms, regions] = await Promise.all([
        globalRes.json(),
        platformsRes.json(),
        regionsRes.json()
      ]);

      setGlobalStats(global);
      setPlatformStats(platforms);
      setRegionalData(regions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (severity: string) => {
    switch (severity) {
      case 'calm':
        return <Sun size={48} className="text-yellow-500" />;
      case 'moderate':
        return <Cloud size={48} className="text-gray-500" />;
      case 'stormy':
        return <CloudRain size={48} className="text-blue-600" />;
      case 'severe':
        return <CloudSnow size={48} className="text-red-600" />;
      default:
        return <Cloud size={48} className="text-gray-400" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={20} className="text-red-500" />;
      case 'down':
        return <TrendingDown size={20} className="text-green-500" />;
      default:
        return <Minus size={20} className="text-gray-500" />;
    }
  };

  if (loading && !globalStats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-[#e12320]" />
          <p className="font-bold uppercase tracking-widest">Loading Weather Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-100 border-[3px] border-red-600 p-8 rounded-xl text-center max-w-md">
          <strong className="text-red-700 text-xl mb-2 block">Error Loading Data</strong>
          <p className="text-red-900 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter">
            Hate <span className="text-[#e12320]">Weather</span> Report
          </h2>
          <p className="text-gray-600 font-medium mt-2">
            Real-time toxicity levels across platforms and regions
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 bg-black text-white font-bold uppercase tracking-wide border-[3px] border-black shadow-[4px_4px_0px_0px_#e12320] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-lg disabled:opacity-50 flex items-center gap-2"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Global Overview */}
      {globalStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-[3px] border-black p-4 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              {getWeatherIcon(globalStats.severity)}
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-1">Global Toxicity</h3>
                <p className="text-gray-600 font-medium text-sm md:text-base">{globalStats.description}</p>
              </div>
            </div>
            <div className="text-left md:text-right w-full md:w-auto">
              <div className="text-5xl md:text-6xl font-black text-[#e12320] mb-2">
                {globalStats.toxicityLevel}%
              </div>
              <div className="flex items-center gap-2 justify-start md:justify-end">
                {getTrendIcon(globalStats.trend)}
                <span className="text-sm font-bold uppercase text-gray-600">
                  {globalStats.trend}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Platform Comparison */}
      <div>
        <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">Platform Breakdown</h3>
        {/* Mobile: Horizontal Scroll (Slider) | Desktop: Grid */}
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:gap-6 snap-x no-scrollbar">
          {platformStats.map((platform, index) => (
            <div key={platform.platform} className="min-w-[70vw] sm:min-w-[300px] md:min-w-0 snap-center">
              <PlatformCard
                data={platform}
                index={index}
                getWeatherIcon={getWeatherIcon}
                getTrendIcon={getTrendIcon}
              />
            </div>
          ))}
        </div>
      </div>

      {/* World Map */}
      <div>
        <h3 className="text-3xl font-black uppercase mb-4">Global Heat Map</h3>
        <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl">
          <WeatherMap regionalData={regionalData} />
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-100 border-[3px] border-black p-6 rounded-xl">
        <h4 className="font-black uppercase mb-4">Severity Levels</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Sun size={24} className="text-yellow-500" />
            <div>
              <div className="font-bold">Calm</div>
              <div className="text-sm text-gray-600">0-25%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Cloud size={24} className="text-gray-500" />
            <div>
              <div className="font-bold">Moderate</div>
              <div className="text-sm text-gray-600">25-45%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CloudRain size={24} className="text-blue-600" />
            <div>
              <div className="font-bold">Stormy</div>
              <div className="text-sm text-gray-600">45-65%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CloudSnow size={24} className="text-red-600" />
            <div>
              <div className="font-bold">Severe</div>
              <div className="text-sm text-gray-600">65-100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HateWeatherReport;
