interface NewsCardProps {
  title: string;
  description: string;
  img_url: string;
  news_url: string;
  author: string | null;
  date: string;
  source: string;
}

const NewsCard = ({ title, description, img_url, news_url, author, date, source }: NewsCardProps) => {
  return (
    <div className="card h-100 shadow-sm border-0 news-card-hover transition-all">
      <div className="position-relative">
        <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger m-2 shadow-sm" style={{ zIndex: 1 }}>
          {source}
        </span>
        <img
          src={img_url}
          className="card-img-top rounded-top"
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=News+Image";
          }}
        />
      </div>
      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title fw-bold text-dark mb-3">
          {title.length > 50 ? `${title.slice(0, 50)}...` : title}
        </h5>
        <p className="card-text text-secondary mb-4 flex-grow-1">
          {description.length > 120 ? `${description.slice(0, 120)}...` : description}
        </p>
        <div className="mt-auto">
          <p className="card-text mb-3">
            <small className="text-muted d-block">
              <i className="bi bi-person-fill"></i> By {author || "Unknown"}
            </small>
            <small className="text-muted d-block">
              <i className="bi bi-calendar3"></i> {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={news_url}
            target="_blank"
            className="btn btn-primary btn-sm px-4 rounded-pill"
          >
            Read Full Story
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
