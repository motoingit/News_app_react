import { useEffect, useState, useCallback } from 'react'
import NewsCard from './NewsCard'
import Spinner from './LoadingSpinner'

interface NewsPageProps {
  category: string;
  pageSize: number;
  country: string;
  apiKey: string;
  setProgress: (progress: number) => void;
}

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  author: string | null;
  publishedAt: string;
  source: { name: string };
}

const NewsPage = ({ category, pageSize, country, apiKey, setProgress }: NewsPageProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setProgress(10);
      const baseUrl = import.meta.env.VITE_NEWS_API_URL;
      const url = `${baseUrl}country=${country}&category=${category}&apiKey=${apiKey}&page=${pageNum}&pageSize=${pageSize}`;
      
      const response = await fetch(url);
      setProgress(40);
      const data = await response.json();
      setProgress(70);

      if (pageNum === 1) {
        setArticles(data.articles || []);
      } else {
        setArticles((prev) => [...prev, ...(data.articles || [])]);
      }

      setTotalResults(data.totalResults || 0);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setProgress(100);
    }
  }, [category, country, apiKey, pageSize, setProgress]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setLoading(true);
    fetchNews(1);
    document.title = `NewsMonkey - ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }, [category, fetchNews]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || articles.length >= totalResults) return;

      const buffer = 200;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - buffer;

      if (isAtBottom) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNews(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, articles.length, totalResults, page, fetchNews]);

  return (
    <div className="container py-5 mt-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold text-dark">
            Top <span className="text-primary">Headlines</span>
          </h1>
          <p className="text-muted lead">
            Stay updated with the latest news in <strong>{category}</strong>
          </p>
          <hr className="w-25 mx-auto border-primary border-2 opacity-75" />
        </div>
      </div>

      <div className="row g-4">
        {articles.map((article, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={`${article.url}-${index}`}>
            <NewsCard
              title={article.title || "No Title"}
              description={article.description || "No description available for this article."}
              img_url={article.urlToImage || "https://via.placeholder.com/600x400?text=News+Image"}
              news_url={article.url || "#"}
              author={article.author}
              date={article.publishedAt}
              source={article.source.name}
            />
          </div>
        ))}
      </div>

      {loading && (
        <div className="d-flex justify-content-center my-5 py-5">
          <Spinner />
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="text-center my-5 py-5">
          <h3 className="text-muted">No news articles found.</h3>
        </div>
      )}

      {articles.length >= totalResults && totalResults > 0 && (
        <div className="text-center my-5 pt-4">
          <p className="badge bg-secondary px-3 py-2 rounded-pill">You've reached the end of the news feed.</p>
        </div>
      )}
    </div>
  )
}

export default NewsPage;
