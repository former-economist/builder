"use client";

import {
  keepPreviousData,
  useQuery,
  QueryFunctionContext,
} from "@tanstack/react-query";
// import ReactPaginate from "react-paginate";
import { Card } from "../components/Card";
import { useState } from "react";

type JSONValue = JSONValue[] | { [key: string]: JSONValue };

type Key = [
  string,
  {
    page: string | number;
    searchTerm: string | undefined;
  }
];

const fetchSpaceNews = async (
  searchTerm: FormDataEntryValue | string | null
) => {
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/?limit=5&search=${searchTerm}`
  );
  const data = await response.json();
  const list = [data];
  const results = list[0].results;
  console.log(results);
  return results;
};

const fetchSpaceNewsPaginated = async ({
  queryKey,
}: QueryFunctionContext<Key>) => {
  const [_key, { page, searchTerm }] = queryKey;
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/?limit=5&offset=${page}&search=${searchTerm}`
  );
  const data = await response.json();
  const list = [data];
  const results = list[0].results;
  console.log(results);
  return results;
};

export default function News() {
  const [news, setNews] = useState<JSONValue[]>([]);
  const [page, setPage] = useState<number | string>(0);
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", { page, searchTerm }],
    queryFn: () => fetchSpaceNewsPaginated,
    placeholderData: keepPreviousData,
  });
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
              const searchValue = setSearchTerm(
                formData.get("search")?.toString()
              );
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
              <Card
                key={article.id}
                url={article.url}
                title={article.title}
                summary={article.summary}
                publishedAt={article.published_at}
              />
            ))}
        </div>
      </div>
    </>
  );
}
