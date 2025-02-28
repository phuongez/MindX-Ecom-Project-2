import { Link } from "react-router";
import news from "../news";

const NewsList = () => {
  return (
    <div className="news-list">
      <h1>Tin tức mới nhất</h1>
      <div className="news-container">
        {news.map((item) => (
            <Link key={item.id} to={`/news/${item.slug}`}>
                <div className="news-item">
                    <img src={item.image} alt={item.title} />
                    <div className="news-preview">
                        <h2>{item.title}</h2>
                        <p>{item.summary}</p>
                        {/* <Link to={`/news/${item.slug}`}>Đọc tiếp</Link> */}
                    </div>
                </div>
            </Link>    
            
      ))}
      </div>
      
    </div>
  );
};

export default NewsList;
