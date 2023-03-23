import React, { useContext, useState } from "react";
import { NewsContext } from "../NewsContext";
import NewsArticle from "./NewsArticle";

function News(props) {
  const { data } = useContext(NewsContext);
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1 className="head__text">NewsAPI</h1>
      <input
        type="text"
        placeholder="Search news"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="all__news">
        {data
          ? data.articles
              .filter((news) =>
                news.title.toLowerCase().includes(query.toLowerCase())
              )
              .map((news) => <NewsArticle data={news} key={news.url} />)
          : "Loading"}
      </div>
    </div>
  );
}

export default News;
