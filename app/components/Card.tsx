"use client";
export type CardType = {
  title: string;
  url: string;
  summary: string;
  publishedAt: string;
};

export const Card = ({ title, url, summary, publishedAt }: CardType) => {
  const date = new Date(publishedAt);

  return (
    <div className="mb-6">
      <h3 className="hover:underline block font-bold mb-4" href={url}>
        {title}
      </h3>
      <p className="mb-4">{summary}</p>
      <p className="mb-2">Published: {date.toDateString()}</p>
      <hr />
    </div>
  );
};
