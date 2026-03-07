import { Component } from 'react'
// import PropTypes from 'prop-types'

interface NewsCardProps {
  title: string;
  description: string;
  img_url: string;
  news_url: string;
  author: string,
  date:string,
  source: string,
}

//TODO IMPROVE CSS OF CARD

export class NewsCard extends Component <NewsCardProps> {

    constructor(props: NewsCardProps){
        super(props);
        // console.log("News Item Cons");
    }

    //! news url in not coded
    render() {
      let { title, description , img_url, news_url, author, date, source} = this.props;

      return (
        <div className="my-3">

          <div className="card h-100 shadow-sm">

            {/* Source Badge */}
            <span
              className="position-absolute top-0 end-0 badge bg-danger"
              style={{ zIndex: 1 }}
            >
              {source}
            </span>

            {/* Image */}
            <img
              src={img_url}
              className="card-img-top"
              alt="news"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <div className="card-body d-flex flex-column">

              {/* Title */}
              <h5 className="card-title">
                {title}
              </h5>

              {/* Description */}
              <p className="card-text">
                {description}
              </p>

              {/* Meta Info */}
              <p className="card-text mt-auto">
                <small className="text-muted">
                  By {author || "Unknown"} <br />
                  {date}
                </small>
              </p>

              {/* Button */}
              <a
                rel="noreferrer"
                href={news_url}
                target="_blank"
                className="btn btn-primary btn-sm mt-2"
              >
                Read More
              </a>

            </div>

          </div>

        </div>
    )
  }
}

export default NewsCard
