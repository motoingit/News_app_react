import { Component } from 'react'
import NewsCard from './NewsCard'
import Spinner from './LoadingSpinner'

interface NewsPageDataState {
  articles: any[];
  loading: boolean;
  currentPage: number;
  totalApiRes: number;
}

//! static proptypes is 
interface NewsPageProps {
  pageSize: number;
  country: string;
  category: string;
  setStateProgress: (progress: number) => void;
  apiKey: string;
}

export class NewsPage extends Component<NewsPageProps, NewsPageDataState> {

    constructor(props: NewsPageProps) {
        super(props);
        // console.log("News Item Cons from news-page");
        this.state = {
            articles: [],
            loading: false,
            currentPage: 1,
            totalApiRes: 0,
        };
    };

    handleScroll = () => {
        const { loading, currentPage: page, totalApiRes } = this.state;

        if (loading) return;

        const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

        if (bottom){

            const totalPages = Math.ceil(totalApiRes / this.props.pageSize);

            if (page < totalPages) {
                this.fetchNews(page + 1);
            }
        }
    };

    
    // centralized API call
    fetchNews = async (page: number) => {

        this.setState({ loading: true });

        this.props.setStateProgress(10);

        const URL =
            `${import.meta.env.VITE_NEWS_API_URL}` +
            `&country=${this.props.country}` +
            `&category=${this.props.category}` +
            `&apiKey=${this.props.apiKey}` +
            `&page=${page}` +
            `&pageSize=${this.props.pageSize}`;

        const data = await fetch(URL);

        this.props.setStateProgress(40);

        const parsedData = await data.json();

        this.props.setStateProgress(70);

        this.setState((prevState) => ({
            articles: prevState.articles.concat(parsedData.articles),
            totalApiRes: parsedData.totalResults,
            currentPage: page,
            loading: false
        }));

        this.props.setStateProgress(100);
    };
    
    async componentDidMount(): Promise<void> {
        await this.fetchNews(this.state.currentPage);
        window.addEventListener("scroll", this.handleScroll);
        document.title = `News Monkey - ${this.props.category}` 
    }

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.handleScroll);
    }

    //! NEWS URL AND IMG URL UNDEFINE
    render() {

        //*no nned of  destructure
        // const {articles, loading} = this.state;
        //! change now
        return (
            <div className='container my-3'>
                <div>
                    <h2 className='text-center'> Top Headlines - On {this.props.category} </h2>
                </div>

                <div className="row">
                    {/* this is genrated*/}
                    {this.state.articles.map((article: any, index:number) => (
                        <div className="col-md-4 mb-4"  key={index}>
                            <NewsCard
                            title={article.title == null ? "No Title Available" : article.title.slice(0,50)}
                            description={article.description == null ? "No Description Available" : article.description.slice(0,150)}
                            img_url={article.urlToImage ? article.urlToImage : "https://via.placeholder.com/300x200"}
                            news_url={article.url ? article.url : "#"}
                            author={article.author}
                            date={new Date(article.publishedAt).toUTCString()}
                            source={article.source.name}
                            />
                        </div>
                    ))}
                </div>

                {/*  &&(<p className="text-center">Loading...</p>)   */}
                {this.state.loading ==true && <Spinner/> }
            </div>
        )
    }
}

export default NewsPage;
