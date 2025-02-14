import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";

function AboutUs() {
  const [aboutContent, setAboutContent] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/aboutcontent/')
      .then(response => setAboutContent(response.data))
      .catch(error => console.error("Error fetching about content", error));
  }, []);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>About Us</h1>
      {aboutContent.length > 0 ? (
        aboutContent.map(item => (
          <section key={item.id} className="section">
            {item.title && <h2>{item.title}</h2>}
            <p>{item.content}</p>
            {item.image && <img src={`http://127.0.0.1:8000${item.image}`} alt={item.title} />}
          </section>
        ))
      ) : (
        <section className="section">
          <h2>About Shundao</h2>
          <p>Shundao is a leading supplier of innovative, sustainable yarns produced in Vietnam.</p>
        </section>
      )}
    </div>
  );
}

export default AboutUs;
