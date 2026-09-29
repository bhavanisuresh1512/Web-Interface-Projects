import React, { useState, useMemo } from "react";
import { categories, convertValue } from "./data/unitsData";
import "./App.css";
function formatNumber(num) {
  if (!isFinite(num)) return "—";
  if (Math.abs(num) >= 1e9 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(4);
  }
  return parseFloat(num.toFixed(6)).toString();
}
export default function App() {
  const categoryNames = Object.keys(categories);
  const [activeCategory, setActiveCategory] = useState(categoryNames[0]);
  const unitNames = Object.keys(categories[activeCategory].units);
  const [fromUnit, setFromUnit] = useState(unitNames[0]);
  const [toUnit, setToUnit] = useState(unitNames[1] || unitNames[0]);
  const [inputValue, setInputValue] = useState("1");
  const handleCategoryChange = (cat) => {
    const newUnits = Object.keys(categories[cat].units);
    setActiveCategory(cat);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
  };
  const numericInput = parseFloat(inputValue);
  const isValid = !isNaN(numericInput);
  const result = useMemo(() => {
    if (!isValid) return null;
    return convertValue(numericInput, activeCategory, fromUnit, toUnit);
  }, [numericInput, isValid, activeCategory, fromUnit, toUnit]);
  const allConversions = useMemo(() => {
    if (!isValid) return [];
    return unitNames
      .filter((u) => u !== fromUnit)
      .map((u) => ({
        unit: u,
        symbol: categories[activeCategory].units[u].symbol,
        value: convertValue(numericInput, activeCategory, fromUnit, u),
      }));
  }, [numericInput, isValid, activeCategory, fromUnit, unitNames]);
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };
  return (
    <div className="app">
      <header className="hero">
        <h1>UnitFlow</h1>
        <p>Convert length, weight, temperature, volume, and more — instantly.</p>
      </header>
      <div className="category-grid">
        {categoryNames.map((cat) => (
          <button
            key={cat}
            className={`category-card ${activeCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat)}
          >
            <span className="category-icon">{categories[cat].icon}</span>
            <span>{cat}</span>
          </button>
        ))}
      </div>
      <main className="converter-panel">
        <div className="converter-row">
          <div className="unit-block">
            <label>From</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {unitNames.map((u) => (
                <option key={u} value={u}>
                  {u} ({categories[activeCategory].units[u].symbol})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <button className="swap-btn" onClick={swapUnits} title="Swap units">
            ⇄
          </button>
          <div className="unit-block">
            <label>To</label>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {unitNames.map((u) => (
                <option key={u} value={u}>
                  {u} ({categories[activeCategory].units[u].symbol})
                </option>
              ))}
            </select>
            <div className="result-display">
              {isValid && result !== null ? formatNumber(result) : "—"}
            </div>
          </div>
        </div>
        {isValid && (
          <p className="conversion-summary">
            {inputValue} {categories[activeCategory].units[fromUnit].symbol} ={" "}
            {formatNumber(result)} {categories[activeCategory].units[toUnit].symbol}
          </p>
        )}
      </main>
      {isValid && allConversions.length > 0 && (
        <section className="quick-reference">
          <h2>Quick reference — {inputValue} {categories[activeCategory].units[fromUnit].symbol} in every unit</h2>
          <div className="reference-grid">
            {allConversions.map((c) => (
              <div key={c.unit} className="reference-card">
                <span className="reference-value">{formatNumber(c.value)}</span>
                <span className="reference-unit">{c.unit} ({c.symbol})</span>
              </div>
            ))}
          </div>
        </section>
      )}
      <footer className="footer">
        <p>Built with React · UnitFlow</p>
      </footer>
    </div>
  );
}