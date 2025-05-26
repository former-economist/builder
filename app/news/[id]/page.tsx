import Image from "next/image";

const fetchSpaceNews = async () => {
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/`
  );
  const data = await response.json();
  const list = [data];
  const results = list[0].results;
  return results;
};

const fetchSpaceNewsArticle = async (id: string) => {
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/${id}/`
  );
  const data = await response.json();
  const list = data;
  return list;
};

export async function generateStaticParams() {
  const allPosts = await fetchSpaceNews();

  return allPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export type paramsType = Promise<{ id: string }>;

export default async function NewsPage({ params }: { params: paramsType }) {
  const { id } = await params;
  console.log(id);
  const post = await fetchSpaceNewsArticle(id);
  console.log(post);

  return (
    <>
      <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
        {post.title}
      </h1>
      {/* <Image src={post.image_url} alt="#" className="mb-12"></Image> */}
      <p className="mb-6 text-lg">Publisher: {post.news_site}</p>
      <p className="mx-auto max-w-2xl">{post.summary}</p>
      <p className="mb-6 text-lg">{post.published_at}</p>
    </>
  );
}
