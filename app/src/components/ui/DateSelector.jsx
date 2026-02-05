import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const DateSelector = ({ 
  label, 
  value = '', 
  onChange, 
  isRange = false,
  allowPresent = false,
  placeholder = "YYYY",
  required = false,
  presentLabel = "Actualmente"
}) => {
  // Parse initial value to determine mode and dates
  const parseValue = (val) => {
    if (!val) return { start: '', end: '', mode: isRange ? 'range' : 'single' };
    
    if (typeof val === 'object') {
      let mode = 'single';
      if (val.isPresent) mode = 'present';
      else if (isRange && (val.end || val.start)) mode = 'range'; // Default to range if object has structure
      
      return {
        start: val.start || '',
        end: val.end || '',
        mode
      };
    }

    // Check if it's a range (contains " - ")
    if (val.includes(' - ')) {
      const [start, end] = val.split(' - ');
      const isPresent = end === 'Presente' || end === 'Present' || end === 'Actualmente' || end === 'Présent';
      return { 
        start: start || '', 
        end: isPresent ? '' : end, 
        mode: isPresent ? 'present' : 'range'
      };
    }
    
    // If no separator but isRange is true, it might be a single date (Certificado)
    // or just a start date. We assume 'single' if it doesn't have the separator structure
    return { start: val, end: '', mode: 'single' };
  };

  const [dateState, setDateState] = useState(parseValue(value));

  useEffect(() => {
    setDateState(parseValue(value));
  }, [value, isRange]);

  const updateParent = (newState) => {
    // Pass the full object with mode so parent can format
    onChange({
      start: newState.start,
      end: newState.end,
      isPresent: newState.mode === 'present',
      mode: newState.mode
    });
  };

  const handleStartChange = (e) => {
    const newState = { ...dateState, start: e.target.value };
    setDateState(newState);
    updateParent(newState);
  };

  const handleEndChange = (e) => {
    const newState = { ...dateState, end: e.target.value };
    setDateState(newState);
    updateParent(newState);
  };

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    const newState = { ...dateState, mode: newMode };
    
    if (newMode === 'present') {
      newState.end = '';
    } else if (newMode === 'single') {
      newState.end = '';
    }
    
    setDateState(newState);
    updateParent(newState);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">{label}</label>
        {isRange && (
          <select 
            value={dateState.mode}
            onChange={handleModeChange}
            className="text-xs border border-[var(--border-subtle)] bg-[var(--bg-muted)] rounded-lg px-2 py-1 text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] cursor-pointer hover:bg-[var(--bg-panel)] transition-colors appearance-none"
          >
            <option value="range">Rango</option>
            {allowPresent && <option value="present">Actualidad</option>}
            <option value="single">Fecha única</option>
          </select>
        )}
      </div>
      
      <div className={`grid ${dateState.mode === 'range' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
        <div className="relative">
          <input
            type="text"
            onFocus={(e) => e.target.type = 'date'}
            onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}}
            value={dateState.start}
            onChange={handleStartChange}
            className="modern-input text-sm"
            placeholder={placeholder}
            required={required}
          />
        </div>

        {dateState.mode === 'range' && (
          <div className="relative">
            <input
              type="text"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}}
              value={dateState.end}
              onChange={handleEndChange}
              className="modern-input text-sm"
              placeholder="Fin"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
