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
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        {isRange && (
          <select 
            value={dateState.mode}
            onChange={handleModeChange}
            className="text-xs border-none bg-slate-100 rounded px-2 py-1 text-slate-700 focus:ring-0 cursor-pointer hover:bg-slate-200"
          >
            <option value="range">Rango (Inicio - Fin)</option>
            {allowPresent && <option value="present">En curso / Actualidad</option>}
            <option value="single">Fecha única / Certificado</option>
          </select>
        )}
      </div>
      
      <div className={`grid ${dateState.mode === 'range' ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
        <div className="relative">
          <input
            type="date"
            value={dateState.start}
            onChange={handleStartChange}
            className="w-full pl-3 pr-2 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm hover-input"
            placeholder={placeholder}
            required={required}
          />
        </div>

        {dateState.mode === 'range' && (
          <div className="relative">
            <input
              type="date"
              value={dateState.end}
              onChange={handleEndChange}
              className="w-full pl-3 pr-2 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm hover-input"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
