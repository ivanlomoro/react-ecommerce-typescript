import { useState } from "react";
import { Header } from "../components/Header/Header";
import { SearchBar } from "../components/SearchBar/SearchBar";
import SearchResultsList from "../components/SearchResultsList/SearchResultsList";

export function Search() {
    const [results, setResults] = useState([]);

    return (
        <>
            <Header />
            <div className="search-bar-container">
                <SearchBar setResults={setResults} />
                <SearchResultsList results={results} />
            </div>
        </>
    )
}