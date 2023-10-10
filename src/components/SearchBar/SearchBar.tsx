import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './SearchBar.styles.css'

interface Product {
    id: number;
    name: string;
}

interface SearchBarProps {
    setResults: (results: Product[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
    const [input, setInput] = useState<string>("");

    const fetchData = (value: string) => {
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((product: Product) => {
                    return (
                        value &&
                        product &&
                        product.name &&
                        product.name.toLowerCase().includes(value)
                    );
                });
                setResults(results);
            });
    };

    const handleChange = (value: string) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder='Type to search...'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}
