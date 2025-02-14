import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

function Contact() {
  const [contactContent, setContactContent] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/contactcontent/')
      .then(response => setContactContent(response.data))
      .catch(error => console.error("Error fetching contact content", error));
  }, []);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Contact</h1>
      {contactContent.map(item => (
        <section key={item.id} className="section">
          {item.title && <h2>{item.title}</h2>}
          <p>{item.content}</p>
          {item.image && <img src={`http://127.0.0.1:8000${item.image}`} alt={item.title} />}
        </section>
      ))}
    </div>
  );
}

export default Contact;
