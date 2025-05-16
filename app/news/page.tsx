"use client";

import ReactPaginate from "react-paginate";
import { Card } from "../components/Card";
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

const fetchSpaceNewsPaginated = async ({ querykey }) => {
  const [_, page, search] = querykey;
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/?limit=5&offset=${page}&search=${search}`
  );
  const data = await response.json();
  const list = [data];
  const results = list[0].results;
  console.log(results);
  return results;
};

export default function News() {
  const [news, setNews] = useState<JSONValue[]>([]);
  const [currentpage, setCurrentPage] = useState(0);

  const { data, isLoading, isError } = useQuery({
    querykey: ["articles", currentpage],
    queryFn: fetchSpaceNewsPaginated,
    placeHolderData: (prevData) => prevData ?? { data: [] },
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
              const searchValue = formData.get("search");
              fetchSpaceNewsPaginated(searchValue).then(setNews);
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
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
