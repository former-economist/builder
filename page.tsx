"use client";

export default function HomePage() {
  return (
    <main>
      <form action="">
        <label htmlFor="pokemon-search" className="">
          Search your pokemon
        </label>
        <input type="search" name="pokemon-search" id="search" />
      </form>
    </main>
  );
}
