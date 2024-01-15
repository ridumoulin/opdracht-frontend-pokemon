import './App.css';
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        let isMounted = true;

        async function fetchPokemon() {
            try {
                setLoading(true);
                setError(null);

                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`);

                if (isMounted) {
                    setPokemons(result.data.results);
                }
            } catch (e) {
                if (isMounted) {
                    setError('Error fetching Pokémon data');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchPokemon();

        return () => {
            isMounted = false;
        };
    }, [offset]);

    const handleNextClick = () => {
        setOffset((prevOffset) => prevOffset + 10);
    };

    const handlePrevClick = () => {
        setOffset((prevOffset) => Math.max(0, prevOffset - 10));
    };

    return (
        <>
            <div className="inner-container">
                <h1>Pokémon</h1>

                <div>
                    <button onClick={handlePrevClick} disabled={offset === 0}>
                        Previous
                    </button>
                    <button onClick={handleNextClick}>Next</button>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                <div className="list-pokemons">
                    {pokemons.length > 0 &&
                        pokemons.map((pokemon, index) => {
                            return <PokemonCard key={index} name={pokemon.name} />;
                        })}
                </div>

            </div>
        </>
    );
}

export default App;
