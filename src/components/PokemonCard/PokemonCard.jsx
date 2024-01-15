import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonCard.css';

function PokemonCard({ name }) {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        async function fetchPokemonCard() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemon(result.data);
                console.log(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPokemonCard();
    }, [name]);

    return (
        <>
            <div className="pokemon-card">
                {Object.keys(pokemon).length > 0 && (
                    <>
                        <h2>{pokemon.name}</h2>
                        {pokemon.sprites && (
                            <img src={pokemon.sprites.front_default} alt="Image Pokemon" />
                        )}
                        {pokemon.moves && (
                            <p>Moves: {pokemon.moves.length}</p>
                        )}
                        {pokemon.weight && (
                            <p>Weight: {pokemon.weight}</p>
                        )}
                        {pokemon.abilities && (
                            <ul>
                                {pokemon.abilities.length > 0 && (
                                    <>
                                        <li><p>{pokemon.abilities[0].ability.name}</p></li>
                                        {pokemon.abilities.length > 1 && (
                                            <li><p>{pokemon.abilities[1].ability.name}</p></li>
                                        )}
                                    </>
                                )}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default PokemonCard;

