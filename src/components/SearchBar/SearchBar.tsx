import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.styles.css';
import { useSearchParams } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
}

interface SearchBarProps {
    setResults: (results: Product[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
    const [input, setInput] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("q") || "";

    const fetchData = (value: string) => {
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((product: Product) => {
                    return (
                        value &&
                        product &&
                        product.name &&
                        product.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setResults(results);
                setSearchParams({ q: value });
            });
    };

    const handleFilterChange = (value: string) => {
        setInput(value);
        setSearchParams({ q: value });
    };

    useEffect(() => {
        setInput(filter);
        fetchData(filter);
    }, [filter]);

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder='Find your Funko!'
                value={input}
                onChange={(e) => handleFilterChange(e.target.value)}
            />
        </div>
    );
};
