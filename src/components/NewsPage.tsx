import React ,{ useEffect, useState} from 'react' //! wy not showinfg
import NewsCard from './NewsCard'

import Spinner from './LoadingSpinner'

const NewsPage = (props: any)=> {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); //* page is 1 by def
    const [totalApiRes, setTotalApiRes] = useState(0);

    /* //! revomended
    
let scrollTimeout;

const handleScroll = () => {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
        // logic
        scrollTimeout = null;
    }, 200);
};
    */

    const handleScroll = ()=>{

        if (loading) return;

        const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

        if (bottom){

            const totalPages = Math.ceil(totalApiRes / props.pageSize);

            if (currentPage < totalPages) {
                fetchNews(currentPage + 1);
            }
        }
    };

    
    // centralized API call
    const fetchNews = async (page: number) => {

        setLoading(true);

        props.setStateProgress(10);

        const URL =
            `${import.meta.env.VITE_NEWS_API_URL}` +
            `&country=${props.country}` +
            `&category=${props.category}` +
            `&apiKey=${props.apiKey}` +
            `&page=${page}` +
            `&pageSize=${props.pageSize}`;

        const data = await fetch(URL);

        props.setStateProgress(40);

        const parsedData = await data.json();

        props.setStateProgress(70);

        setArticles((prevArticles) => prevArticles.concat(parsedData.articles))
        setTotalApiRes(parsedData.totalResults);
        setCurrentPage(page);
        setLoading(false);

        props.setStateProgress(100);
    };

    useEffect(()=>{
        const loadData = async () => {
            await fetchNews(currentPage);
        };
        loadData();
        window.addEventListener("scroll", handleScroll);

        document.title = `News Monkey - ${props.category}`;

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };


    }, []) //TODO why empty arrary - ye khali array jiske change pe ye effect run hora vo hai

    //! NEWS URL AND IMG URL UNDEFINE

        //*no nned of  destructure
        // const {articles, loading} = this.state;
        //! change now
        return (
            <div className='container my-3'>
                <div>
                    <h2 className='text-center'> Top Headlines - On {props.category} </h2>
                </div>

                <div className="row">
                    {/* this is genrated*/}
                    {articles.map((article: any, index:number) => (
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
                {loading ==true && <Spinner/> }
            </div>
        )
}

interface NewsPageDataState {
  articles: any[];
  loading: boolean;
  currentPage: number;
  totalApiRes: number;
}

export default NewsPage;
