import { Link } from "react-router";

import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";

const news = [
  {
    id: 1,
    title: "Top 10 Must-Read Books of 2026",
    description:
      "Discover this year's most loved books across fiction, business, mystery, and self-development. Build your perfect reading list today.",
    image: news1,
    category: "Trending",
    date: "July 2026",
  },
  {
    id: 2,
    title: "Author Spotlight: James Clear",
    description:
      "Explore the journey of bestselling author James Clear and discover why Atomic Habits continues to inspire millions of readers worldwide.",
    image: news2,
    category: "Authors",
    date: "July 2026",
  },
  {
    id: 3,
    title: "5 Reading Habits That Improve Productivity",
    description:
      "Learn practical reading habits that help improve focus, boost creativity, and make learning a daily routine.",
    image: news3,
    category: "Reading Tips",
    date: "July 2026",
  },
  {
    id: 4,
    title: "Award-Winning Books You Shouldn't Miss",
    description:
      "Explore critically acclaimed books that have received international recognition for their storytelling and impact.",
    image: news4,
    category: "Editor's Pick",
    date: "July 2026",
  },
];

const News = () => {
  return (
    <section className="py-24">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-slate-900">
          Reading Journal
        </h2>

        <p className="mt-3 text-gray-500 text-lg">
          Discover book recommendations, reading tips, author stories and the
          latest literary updates.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {news.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                  {item.category}
                </span>

                <span className="text-xs text-gray-400">
                  {item.date}
                </span>
              </div>

              <Link to="/">
                <h3 className="line-clamp-2 text-xl font-bold text-slate-900 transition hover:text-violet-600">
                  {item.title}
                </h3>
              </Link>

              <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-500">
                {item.description}
              </p>

              <Link
                to="/"
                className="mt-6 inline-flex items-center font-semibold text-violet-600 transition hover:text-violet-700"
              >
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default News;