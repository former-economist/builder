"use client";

import {
  keepPreviousData,
  useQuery,
  QueryFunctionContext,
} from "@tanstack/react-query";
// import ReactPaginate from "react-paginate";
import { Card } from "../components/Card";
import { useState } from "react";
import FeedbackForm from "../components/FeedbackForm";

type JSONValue = JSONValue[] | { [key: string]: JSONValue };

type Key = [
  string,
  {
    page: string | number;
    searchTerm: string | undefined;
  }
];

const fetchSpaceNews = async (search: string | null) => {
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/?ordering=&search=${search}`
  );
  const data = await response.json();
  const list = [data];
  const results = list[0].results;
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
  console.log(list);
  const results = list[0].results;
  const count = list[0].count;
  return results;
};

export default function News() {
  // const [news, setNews] = useState<JSONValue[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isPending, isError, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["articles", { page, searchTerm }],
      queryFn: fetchSpaceNewsPaginated,
      placeholderData: keepPreviousData,
    });

  return (
    <>
      <div>{isPlaceholderData.valueOf()}</div>
      <h1>News</h1>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const searchValue = formData.get("search");
              if (searchValue === null || searchValue === undefined) {
                setSearchTerm("");
              } else {
                setSearchTerm(searchValue?.toString());
              }
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
          {isPending ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <div>
              {data.map((article) => (
                <Card
                  key={article.id}
                  url={article.url}
                  title={article.title}
                  summary={article.summary}
                  publishedAt={article.published_at}
                />
              ))}
            </div>
          )}
          <div className="mb-4">
            <span>Current Page: {page + 1}</span>
            <button
              onClick={() => {
                setPage((old) => Math.max(old - 1, 0));
                console.log(page);
              }}
              className="bg-black text-white mr-3"
            >
              Previous Page
            </button>
            <button
              onClick={() => {
                setPage((old) => old + 1);
                console.log(page);
              }}
              // Disable the Next Page button until we know a next page is available
              // disabled={isPlaceholderData || !data?.hasMore}
              className="bg-black text-white"
            >
              Next Page
            </button>
          </div>
          <FeedbackForm />
        </div>
      </div>
    </>
  );
}
