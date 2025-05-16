"use client";

import { useState } from "react";

type JSONValue = JSONValue[] | { [key: string]: JSONValue };

const fetchSpaceNews = async (search: FormDataEntryValue | null) => {
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/?ordering=&search=${search}`
  );
  const data = await response.json();
  const list = [data];
  const results = list[0].results;
  console.log(results);
  return results;
};

export default function News() {
  const [news, setNews] = useState<JSONValue[]>([]);

  return (
    <>
      <h1>News</h1>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNews([]);
              const formData = new FormData(e.currentTarget);
              const searchValue = formData.get("search");
              fetchSpaceNews(searchValue).then(setNews);
            }}
            className="grid gap-3 col-span-1"
          >
            <label htmlFor="search">Search for space news</label>
            <input
              type="search"
              name="search"
              id="news-search"
              className="outline-1"
            />
            <button type="submit" className="bg-black text-white">
              Search
            </button>
          </form>
        </div>
        <div className="col-span-3 col-start-2">
          {news.length === 0 && <p>Loading...</p>}
          {news.length > 0 &&
            news.map((article) => (
              <a
                className="hover:underline block mb-2"
                href={article.url}
                key={article.id}
              >
                {article.title}
              </a>
            ))}
        </div>
      </div>
    </>
  );
}
