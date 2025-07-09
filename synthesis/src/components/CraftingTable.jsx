import React, { useState, useEffect } from 'react';
import { Sparkles, Thermometer, Droplets } from 'lucide-react';
import './CraftingTable.css';

const CraftingTable = () => {
  const fragranceInventory = {
    "Rosemary": { temp: "cool", category: "fresh", subcategory: "aromatic" },
    "Eucalyptus": { temp: "cool", category: "fresh", subcategory: "aromatic" },
    "Bergamot": { temp: "cool", category: "fresh", subcategory: "citrus" },
    "Lemon": { temp: "cool", category: "fresh", subcategory: "citrus" },
    "Peppermint": { temp: "cool", category: "fresh", subcategory: "green" },
    "Lavender": { temp: "warm", category: "floral", subcategory: "floral" },
    "Gardenia": { temp: "warm", category: "floral", subcategory: "floral" },
    "Rose": { temp: "warm", category: "floral", subcategory: "soft floral" },
    "Jasmine": { temp: "warm", category: "floral", subcategory: "floral oriental" },
    "Geranium": { temp: "warm", category: "floral", subcategory: "floral oriental" },
    "Vanilla": { temp: "warm", category: "oriental", subcategory: "soft oriental" },
    "Cardamom": { temp: "hot", category: "oriental", subcategory: "soft oriental" },
    "Frankincense": { temp: "hot", category: "oriental", subcategory: "oriental" },
    "Sandalwood": { temp: "warm", category: "oriental", subcategory: "oriental woody" },
    "Patchouli": { temp: "hot", category: "oriental", subcategory: "oriental woody" },
    "Pine": { temp: "cool", category: "woody", subcategory: "woods" },
    "Cedarwood": { temp: "warm", category: "woody", subcategory: "dry woods" },
    "Oakmoss": { temp: "cool", category: "woody", subcategory: "mossy woods" },
    "Black Pepper": { temp: "hot", category: "woody", subcategory: "dry woods" },
    "Cinnamon": { temp: "hot", category: "woody", subcategory: "dry woods" }
  };

  const fragranceDescriptions = {
    "Rosemary": "herbaceous, camphor-tinged green spike that clears the mind",
    "Eucalyptus": "cool medicinal vapour like a minty forest exhale",
    "Bergamot": "sun-dappled Earl-Grey zest that balances tartness with soft florals",
    "Lemon": "pure yellow zing—bright, clean, electrifyingly sour",
    "Peppermint": "icy menthol rush wrapped in sweet, peppery leaves",
    "Lavender": "powdery alpine breeze of sweet herb and soft honey",
    "Gardenia": "creamy white petals dripping tropical nectar and banana-green nuance",
    "Rose": "silky velvet bloom with dewy lemon-fresh sparkle and faint spice",
    "Jasmine": "night-bloom narcotic sweetness laced with indolic depth",
    "Geranium": "rosy-citrus leaf bridging green herb and floral warmth",
    "Vanilla": "warm gourmand custard that hugs with woody amber",
    "Cardamom": "sweet-spicy fizz combining cool eucalyptus lift and buttery resin",
    "Frankincense": "sacred citrus-pine smoke floating over dry balsamic amber",
    "Sandalwood": "creamy, lactonic wood that radiates soft, lingering serenity",
    "Patchouli": "earthy dark-chocolate soil with mossy forest musk",
    "Pine": "crisp conifer needles exuding terpene-rich alpine clarity",
    "Cedarwood": "dry pencil-shaving woodiness accented by gentle smoke",
    "Oakmoss": "damp lichen leather casting an ink-green forest shadow",
    "Black Pepper": "crackling woody citrus bite that tingles the nose",
    "Cinnamon": "sweet fiery bark delivering baking-warm spice"
  };

  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [temperature, setTemperature] = useState(50);
  const [concentration, setConcentration] = useState(50);
  const [generatedScent, setGeneratedScent] = useState(null);

  const attributes = [
    { id: 'fruity', label: 'Fruity', icon: '🍊' },
    { id: 'citrus', label: 'Citrus', icon: '🍋' },
    { id: 'floral', label: 'Floral', icon: '🌸' },
    { id: 'woody', label: 'Woody', icon: '🌰' },
    { id: 'earthy', label: 'Earthy', icon: '🌱' },
    { id: 'spicy', label: 'Spicy', icon: '🌶️' },
    { id: 'sweet', label: 'Sweet', icon: '🍯' },
    { id: 'fresh', label: 'Fresh', icon: '🍃' },
    { id: 'herbal', label: 'Herbal', icon: '🌿' },
    { id: 'minty', label: 'Minty', icon: '🌱' },
    { id: 'vanilla', label: 'Vanilla', icon: '🍦' },
    { id: 'musky', label: 'Musky', icon: '🦌' },
    { id: 'powdery', label: 'Powdery', icon: '💨' },
    { id: 'clean', label: 'Clean', icon: '🧼' },
    { id: 'warm', label: 'Warm', icon: '🔥' },
    { id: 'cool', label: 'Cool', icon: '❄️' },
    { id: 'sharp', label: 'Sharp', icon: '⚡' },
    { id: 'soft', label: 'Soft', icon: '☁️' },
    { id: 'rich', label: 'Rich', icon: '💎' },
    { id: 'light', label: 'Light', icon: '💡' },
    { id: 'deep', label: 'Deep', icon: '🌊' },
    { id: 'bright', label: 'Bright', icon: '☀️' },
    { id: 'dark', label: 'Dark', icon: '🌙' },
    { id: 'smooth', label: 'Smooth', icon: '🌊' },
    { id: 'rough', label: 'Rough', icon: '🗻' },
    { id: 'tangy', label: 'Tangy', icon: '🍋' },
    { id: 'bitter', label: 'Bitter', icon: '☕' },
    { id: 'sour', label: 'Sour', icon: '🍋' },
    { id: 'smoky', label: 'Smoky', icon: '🔥' },
    { id: 'oceanic', label: 'Oceanic', icon: '🌊' }
  ];

  const toggleAttribute = (attributeId) => {
    setSelectedAttributes(prev => 
      prev.includes(attributeId) 
        ? prev.filter(id => id !== attributeId)
        : [...prev, attributeId]
    );
  };

  const generateScent = () => {
    if (selectedAttributes.length === 0) {
      setGeneratedScent(null);
      return;
    }

    // Temperature mapping
    const tempMapping = {
      cool: temperature < 33,
      warm: temperature >= 33 && temperature <= 66,
      hot: temperature > 66
    };

    const targetTemp = Object.keys(tempMapping).find(key => tempMapping[key]) || 'warm';

    // Filter fragrances based on selected attributes and temperature
    const compatibleScents = Object.entries(fragranceInventory).filter(([name, data]) => {
      const matchesTemp = data.temp === targetTemp || Math.abs(['cool', 'warm', 'hot'].indexOf(data.temp) - ['cool', 'warm', 'hot'].indexOf(targetTemp)) <= 1;
      const matchesAttributes = selectedAttributes.some(attr => 
        data.category.includes(attr) || 
        data.subcategory.includes(attr) ||
        name.toLowerCase().includes(attr) ||
        fragranceDescriptions[name].toLowerCase().includes(attr)
      );
      return matchesTemp && matchesAttributes;
    });

    if (compatibleScents.length === 0) {
      // Fallback to any scent matching temperature
      const fallbackScents = Object.entries(fragranceInventory).filter(([name, data]) => {
        return data.temp === targetTemp;
      });
      if (fallbackScents.length > 0) {
        const randomScent = fallbackScents[Math.floor(Math.random() * fallbackScents.length)];
        setGeneratedScent({
          name: randomScent[0],
          description: fragranceDescriptions[randomScent[0]]
        });
      } else {
        setGeneratedScent(null);
      }
      return;
    }

    // Select a random compatible scent
    const selectedScent = compatibleScents[Math.floor(Math.random() * compatibleScents.length)];
    setGeneratedScent({
      name: selectedScent[0],
      description: fragranceDescriptions[selectedScent[0]]
    });
  };

  useEffect(() => {
    generateScent();
  }, [selectedAttributes, temperature, concentration]);

  // Calculate bottle color based on temperature (blue to red)
  const getBottleColor = () => {
    const hue = 240 - (temperature * 2.4); // 240 (blue) to 0 (red)
    const saturation = Math.min(50 + concentration, 100); // Base saturation + concentration
    const lightness = 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Calculate liquid color with higher saturation
  const getLiquidColor = () => {
    const hue = 240 - (temperature * 2.4);
    const saturation = Math.min(70 + concentration, 100);
    const lightness = 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const BottleSVG = () => (
    <svg width="120" height="160" viewBox="0 0 120 160" className="mx-auto">
      <defs>
        <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={getBottleColor()} stopOpacity="0.3" />
          <stop offset="100%" stopColor={getBottleColor()} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={getLiquidColor()} stopOpacity="0.8" />
          <stop offset="100%" stopColor={getLiquidColor()} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      
      {/* Bottle body */}
      <path 
        d="M25 40 L25 130 Q25 140 35 140 L85 140 Q95 140 95 130 L95 40 Q95 35 90 35 L30 35 Q25 35 25 40 Z" 
        fill="url(#bottleGradient)" 
        stroke={getBottleColor()} 
        strokeWidth="2"
      />
      
      {/* Liquid level based on concentration */}
      <path 
        d={`M27 ${140 - (concentration * 0.9)} L27 138 Q27 138 35 138 L85 138 Q93 138 93 138 L93 ${140 - (concentration * 0.9)} Z`}
        fill="url(#liquidGradient)"
      />
      
      {/* Bottle neck */}
      <rect x="45" y="20" width="30" height="15" fill={getBottleColor()} stroke={getBottleColor()} strokeWidth="1" />
      
      {/* Bottle cap */}
      <rect x="42" y="15" width="36" height="8" rx="4" fill="#333" />
      
      {/* Spray nozzle */}
      <rect x="78" y="18" width="15" height="4" rx="2" fill="#666" />
      
      {/* Highlight */}
      <path d="M35 45 Q40 40 45 45 L45 120 Q40 125 35 120 Z" fill="white" fillOpacity="0.3" />
    </svg>
  );

  return (
    <div className="crafting-table-container">
      <div className="max-w-6xl mx-auto p-8">
        <h2>Select Scent Attributes</h2>
        <p>Choose scent attributes to craft your perfect fragrance:</p>

        <div className="main-grid">
          {/* Left Column - Attributes */}
          <div>
            <div className="attribute-grid">
              {attributes.map((attr) => (
                <button
                  key={attr.id}
                  onClick={() => toggleAttribute(attr.id)}
                  className={`attribute-button ${
                    selectedAttributes.includes(attr.id) ? 'selected' : ''
                  }`}
                >
                  <div className="attribute-icon">{attr.icon}</div>
                  <div className="attribute-label">{attr.label}</div>
                </button>
              ))}
            </div>

            {/* Temperature Slider */}
            <div className="slider-section">
              <div className="slider-header">
                <Thermometer className="slider-icon" size={20} />
                <span className="slider-title">Temperature</span>
              </div>
              <div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="slider-input temperature-slider"
                />
                <div className="slider-labels">
                  <span>Cool</span>
                  <span>Hot</span>
                </div>
              </div>
            </div>

            {/* Concentration Slider */}
            <div className="slider-section">
              <div className="slider-header">
                <Droplets className="slider-icon" size={20} />
                <span className="slider-title">Concentration</span>
              </div>
              <div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={concentration}
                  onChange={(e) => setConcentration(Number(e.target.value))}
                  className="slider-input concentration-slider"
                />
                <div className="slider-labels">
                  <span>Light</span>
                  <span>Intense</span>
                </div>
              </div>
            </div>

            <button
              onClick={generateScent}
              className="generate-button"
            >
              Find Matching Scent
            </button>
          </div>

          {/* Right Column - Results */}
          <div className="results-panel">
            <div className="mb-6">
              <BottleSVG />
            </div>
            
            {generatedScent ? (
              <div>
                <h3>{generatedScent.name}</h3>
                <p className="results-description">
                  {generatedScent.description}
                </p>
              </div>
            ) : (
              <div className="no-results">
                <p>No matching scent found</p>
                <p>Try selecting different attributes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftingTable;