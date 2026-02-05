import React, { useState, useEffect, useRef } from 'react';

export const EditableText = ({ 
  value, 
  onChange, 
  multiline = false, 
  className = "", 
  placeholder = "Click para editar...",
  style = {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          className={`w-full bg-blue-50 outline-none p-1 rounded resize-none overflow-hidden ${className}`}
          style={{ minHeight: '1.5em', ...style }}
          autoFocus
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-blue-50 outline-none p-1 rounded ${className}`}
        style={style}
        autoFocus
      />
    );
  }

  return (
    <span 
      onClick={() => setIsEditing(true)}
      className={`hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 rounded px-1 -mx-1 cursor-text transition-all ${className}`}
      title="Click para editar"
      style={style}
    >
      {value || <span className="text-gray-400 italic">{placeholder}</span>}
    </span>
  );
};

export default EditableText;
