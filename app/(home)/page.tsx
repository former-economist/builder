"use client";

import { FormEvent, useState } from "react";
import Pokemon from "../components/Pokemon";

type JSONValue = JSONValue[] | { [key: string]: JSONValue };

async function fetchPokemon(name: FormDataEntryValue | null) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return [data];
}

export default function HomePage() {
  const [pokemon, setPokemon] = useState<JSONValue[] | undefined>([]);
  // const findPokemon = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formValue = formData.get("pokemon-search");
  //   fetchPokemon(formValue)
  //     .then(setPokemon)
  //     .then(() => console.log(pokemon));
  // };
  // // if (!pokemon) {
  //   return <p>Loading...</p>;
  // }
  if (!pokemon) {
    return (
      <main>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formValue = formData.get("pokemon-search");
            fetchPokemon(formValue)
              .then()
              .then(setPokemon)
              .then(() => console.log(pokemon));
          }}
        >
          <label htmlFor="pokemon-search" className="">
            Search your pokemon
          </label>
          <input
            type="search"
            name="pokemon-search"
            id="search"
            className="border"
          />
          <button type="submit" className="bg-blue-500">
            Find that pokemon
          </button>
        </form>
      </main>
    );
  }
  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formValue = formData.get("pokemon-search");
          fetchPokemon(formValue).then(setPokemon);
        }}
      >
        <label htmlFor="pokemon-search" className="">
          Search your pokemon
        </label>
        <input
          type="search"
          name="pokemon-search"
          id="search"
          className="border"
        />
        <button type="submit" className="bg-blue-500">
          Find that pokemon
        </button>
      </form>
      <div>
        {pokemon.map((p) => (
          <Pokemon key={p.name} name={p.name} />
        ))}
      </div>
    </main>
  );
}
