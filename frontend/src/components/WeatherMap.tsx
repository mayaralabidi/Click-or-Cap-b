import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

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

interface WeatherMapProps {
  regionalData: RegionalData[];
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WeatherMap: React.FC<WeatherMapProps> = ({ regionalData }) => {
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [hoveredCountry, setHoveredCountry] = useState<RegionalData | null>(null);

  // Create color scale based on toxicity level
  const colorScale = scaleLinear<string>()
    .domain([0, 25, 45, 65, 100])
    .range(['#22c55e', '#eab308', '#f97316', '#dc2626', '#7f1d1d']);

  const getCountryData = (geoProperties: any) => {
    // Try to match by ISO codes or country name
    const iso2 = geoProperties?.ISO_A2;
    const iso3 = geoProperties?.ISO_A3;
    const name = geoProperties?.NAME;
    
    // Debug logging
    console.log('Checking country:', { iso2, iso3, name });
    
    const match = regionalData.find(d => 
      d.countryCode === iso2 || 
      d.countryCode === iso3 ||
      d.country.toLowerCase() === name?.toLowerCase()
    );
    
    if (match) {
      console.log('✅ Match found:', match.country);
    }
    
    return match;
  };

  const getCountryColor = (geo: any) => {
    const countryData = getCountryData(geo.properties);
    if (countryData) {
      return colorScale(countryData.toxicityLevel);
    }
    return '#e5e7eb'; // Default gray for countries without data
  };

  return (
    <div className="relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20]
        }}
        className="w-full h-[500px]"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => {
              const countryData = getCountryData(geo.properties);
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColor(geo)}
                  stroke="#000000"
                  strokeWidth={0.5}
                  onMouseEnter={() => {
                    if (countryData) {
                      setHoveredCountry(countryData);
                      setTooltipContent(countryData.country);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredCountry(null);
                    setTooltipContent('');
                  }}
                  style={{
                    default: {
                      outline: 'none'
                    },
                    hover: {
                      fill: countryData ? '#e12320' : '#d1d5db',
                      outline: 'none',
                      cursor: countryData ? 'pointer' : 'default'
                    },
                    pressed: {
                      outline: 'none'
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredCountry && (
        <div className="absolute top-4 right-4 bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl min-w-[250px] z-10">
          <h4 className="font-black text-lg uppercase mb-2">{hoveredCountry.country}</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-medium">Overall Toxicity:</span>
              <span className="font-black text-[#e12320] text-xl">{hoveredCountry.toxicityLevel}%</span>
            </div>
            
            <div className="border-t-2 border-gray-200 pt-2 mt-2">
              <div className="font-bold mb-1">By Platform:</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>𝕏 (Twitter):</span>
                  <span className="font-bold">{hoveredCountry.platforms.x}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Facebook:</span>
                  <span className="font-bold">{hoveredCountry.platforms.facebook}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Reddit:</span>
                  <span className="font-bold">{hoveredCountry.platforms.reddit}%</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-2 mt-2">
              <div className="inline-block px-2 py-1 bg-gray-100 border-2 border-black rounded text-xs font-bold uppercase">
                {hoveredCountry.severity}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!hoveredCountry && (
        <div className="absolute top-4 right-4 bg-gray-100 border-2 border-black p-3 rounded-lg text-sm font-medium text-gray-600">
          Hover over countries to see details
        </div>
      )}
    </div>
  );
};

export default WeatherMap;
