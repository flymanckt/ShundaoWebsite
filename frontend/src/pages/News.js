import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/news/')
      .then(response => setNews(response.data))
      .catch(error => console.error("Error fetching news", error));
  }, []);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>News & Activities</h1>
      {news.map(item => (
        <section key={item.id} className="section">
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          {item.image && <img src={`http://127.0.0.1:8000${item.image}`} alt={item.title} />}
        </section>
      ))}
    </div>
  );
}

export default News;
