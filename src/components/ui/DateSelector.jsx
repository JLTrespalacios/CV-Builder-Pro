import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, Square } from 'lucide-react';

const DateSelector = ({ 
  label, 
  value = '', 
  onChange, 
  isRange = false,
  allowPresent = false,
  placeholder = "YYYY",
  required = false,
  presentLabel = "Trabajo aquí actualmente"
}) => {
  // Parse initial value
  const parseValue = (val) => {
    if (!val) return { start: '', end: '', isPresent: false };
    
    if (typeof val === 'object') {
      return {
        start: val.start || '',
        end: val.end || '',
        isPresent: val.isPresent || false
      };
    }

    // Check if it's a range (contains " - ")
    if (val.includes(' - ')) {
      const [start, end] = val.split(' - ');
      const isPresent = end === 'Presente' || end === 'Present' || end === 'Actualmente' || end === 'Présent';
      return { 
        start: start || '', 
        end: isPresent ? '' : end, 
        isPresent
      };
    }
    
    return { start: val, end: '', isPresent: false };
  };

  const [dateState, setDateState] = useState(parseValue(value));

  useEffect(() => {
    setDateState(parseValue(value));
  }, [value]);

  const updateParent = (newState) => {
    onChange({
      start: newState.start,
      end: newState.end,
      isPresent: newState.isPresent
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

  const togglePresent = () => {
    const newState = { ...dateState, isPresent: !dateState.isPresent, end: '' };
    setDateState(newState);
    updateParent(newState);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      
      <div className={`grid ${isRange ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
        <div className="relative">
          <input
            type="date"
            value={dateState.start}
            onChange={handleStartChange}
            className="w-full pl-3 pr-2 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm hover-input"
            placeholder={placeholder}
            required={required}
          />
          {!dateState.start && (
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm pointer-events-none bg-white px-1">
              {isRange ? 'Inicio' : 'Fecha'}
            </span>
          )}
        </div>

        {isRange && (
          <div className="relative">
            <input
              type="date"
              value={dateState.end}
              onChange={handleEndChange}
              disabled={dateState.isPresent}
              className={`w-full pl-3 pr-2 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm hover-input ${dateState.isPresent ? 'bg-slate-100 text-slate-400' : ''}`}
            />
             {!dateState.end && !dateState.isPresent && (
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm pointer-events-none bg-white px-1">
                Fin
              </span>
            )}
          </div>
        )}
      </div>

      {isRange && allowPresent && (
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePresent}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors hover-btn"
          >
            {dateState.isPresent ? (
              <CheckSquare size={16} className="text-blue-600" />
            ) : (
              <Square size={16} className="text-slate-400" />
            )}
            <span>{presentLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
