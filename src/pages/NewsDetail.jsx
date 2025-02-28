import { useParams } from "react-router";
import news from "../news";

const NewsDetail = () => {
  const { slug } = useParams();
  const article = news.find((item) => item.slug === slug);

  if (!article) return <h1>Bài viết không tồn tại</h1>;

  return (
    <div className="news-detail">
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} />
      <p><small>Ngày đăng: {article.date}</small></p>
      <p>{article.content}</p>
    </div>
  );
};

export default NewsDetail;