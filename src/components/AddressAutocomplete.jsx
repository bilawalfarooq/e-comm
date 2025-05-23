import React, { useState, useEffect } from 'react';
import { usAddresses } from '../data/us-addresses';

const AddressAutocomplete = ({ onSelect, disabled }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const filtered = usAddresses.filter(addr =>
        addr.street.toLowerCase().includes(query.toLowerCase()) ||
        addr.city.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSelect = (address) => {
    setQuery(address.street);
    setShowSuggestions(false);
    onSelect(address);
  };

  return (
    <div className="address-autocomplete">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Start typing your address..."
        disabled={disabled}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((addr, index) => (
            <li key={index} onClick={() => handleSelect(addr)}>
              <strong>{addr.street}</strong>
              <small>{addr.city}, {addr.state} {addr.zip}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
