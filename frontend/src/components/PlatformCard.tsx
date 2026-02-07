import React from 'react';
import { motion } from 'framer-motion';

interface PlatformCardProps {
  data: {
    platform: string;
    toxicityLevel: number;
    severity: string;
    trend: string;
    lastUpdated: string;
    activeUsers?: number;
    flaggedContent?: number;
  };
  index: number;
  getWeatherIcon: (severity: string) => React.ReactElement;
  getTrendIcon: (trend: string) => React.ReactElement;
}

const platformNames: Record<string, string> = {
  x: 'X (Twitter)',
  facebook: 'Facebook',
  reddit: 'Reddit'
};

const platformColors: Record<string, string> = {
  x: '#000000',
  facebook: '#1877F2',
  reddit: '#FF4500'
};

const PlatformCard: React.FC<PlatformCardProps> = ({ 
  data, 
  index, 
  getWeatherIcon, 
  getTrendIcon 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all rounded-xl"
    >
      {/* Platform Header */}
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 border-[3px] border-black flex items-center justify-center rounded-lg font-black text-white text-xl"
          style={{ backgroundColor: platformColors[data.platform] }}
        >
          {data.platform === 'x' ? '𝕏' : data.platform[0].toUpperCase()}
        </div>
        {getWeatherIcon(data.severity)}
      </div>

      {/* Platform Name */}
      <h4 className="text-xl font-black uppercase mb-2">
        {platformNames[data.platform]}
      </h4>

      {/* Toxicity Level */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-5xl font-black text-[#e12320]">
          {data.toxicityLevel}%
        </span>
        {getTrendIcon(data.trend)}
      </div>

      {/* Severity Badge */}
      <div className="inline-block px-3 py-1 bg-gray-100 border-2 border-black rounded-md mb-4">
        <span className="text-xs font-bold uppercase tracking-widest">
          {data.severity}
        </span>
      </div>

      {/* Stats */}
      {(data.activeUsers || data.flaggedContent) && (
        <div className="space-y-2 text-sm font-medium text-gray-600">
          {data.activeUsers && (
            <div className="flex justify-between">
              <span>Active Users:</span>
              <span className="font-bold">{data.activeUsers.toLocaleString()}</span>
            </div>
          )}
          {data.flaggedContent && (
            <div className="flex justify-between">
              <span>Flagged Content:</span>
              <span className="font-bold text-red-600">{data.flaggedContent.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-4 pt-4 border-t-2 border-gray-200 text-xs text-gray-500 font-medium">
        Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
      </div>
    </motion.div>
  );
};

export default PlatformCard;
