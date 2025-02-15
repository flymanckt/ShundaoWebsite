import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

function Home({ language }) {
  const [carouselImages, setCarouselImages] = useState([]);
  const [homeContent, setHomeContent] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carouselResponse, homeContentResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/homepage_carousel/`),
          axios.get(`${API_BASE_URL}/api/homecontent/`)
        ]);

        setCarouselImages(carouselResponse.data);
        setHomeContent(homeContentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="home-page">
      {/* Banner 轮播图 */}
      <section className="banner-section">
        <div className="banner-wrapper">
          <Slider {...sliderSettings}>
            {carouselImages.length > 0 ? (
              carouselImages.map(item => (
                <div key={item.id}>
                  <img src={item.image_url} alt={item.title || "Banner"} className="banner-image" crossOrigin="anonymous" />
                </div>
              ))
            ) : (
              <>
                <div>
                  <img src="https://via.placeholder.com/1200x500?text=Banner+1" alt="Banner 1" className="banner-image" />
                </div>
                <div>
                  <img src="https://via.placeholder.com/1200x500?text=Banner+2" alt="Banner 2" className="banner-image" />
                </div>
                <div>
                  <img src="https://via.placeholder.com/1200x500?text=Banner+3" alt="Banner 3" className="banner-image" />
                </div>
              </>
            )}
          </Slider>
        </div>
      </section>

      {/* 首页正文内容 */}
      <div className="container">
        {homeContent.length > 0 ? (
          homeContent.map(item => (
            <section key={item.id} className="section">
              <h2>{language === "en" ? item.title_en : item.title_vi}</h2>
              {item.subtitle_en && <h3>{language === "en" ? item.subtitle_en : item.subtitle_vi}</h3>}
              <p>{language === "en" ? item.content_en : item.content_vi}</p>
              {item.image && (
                <img src={`${API_BASE_URL}${item.image}`} alt={language === "en" ? item.title_en : item.title_vi} style={{ width: "100%", borderRadius: "8px" }} />
              )}
              {item.subtopics && item.subtopics.length > 0 && (
                <div className="subtopics">
                  {item.subtopics.map(subtopic => (
                    <div key={subtopic.id} className={`subtopic ${subtopic.layout}`}>
                      <h3>{language === "en" ? subtopic.title_en : subtopic.title_vi}</h3>
                      <p>{language === "en" ? subtopic.content_en : subtopic.content_vi}</p>
                      <div className="subtopic-images" style={{ gap: `${subtopic.image_spacing}px` }}>
                        {subtopic.layout === 'carousel' ? (
                          <Slider {...sliderSettingsSubtopic}>
                            {subtopic.images && subtopic.images.length > 0 ? (
                              subtopic.images.map(img => (
                                <div key={img.id} style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <img
                                    src={img.image_url}
                                    alt={language === "en" ? subtopic.title_en : subtopic.title_vi}
                                    className="subtopic-image"
                                    style={{
                                      width: img.custom_width ? `${img.custom_width}px` : '100%',
                                      height: img.custom_height ? `${img.custom_height}px` : 'auto',
                                      objectFit: 'cover'
                                    }}
                                  />
                                </div>
                              ))
                            ) : (
                              <p>No images available.</p>
                            )}
                          </Slider>
                        ) : (
                          subtopic.images && subtopic.images.length > 0 ? (
                            subtopic.images.map(img => (
                              <img
                                key={img.id}
                                src={img.image_url}
                                alt={language === "en" ? subtopic.title_en : subtopic.title_vi}
                                className="subtopic-image"
                                style={{
                                  width: img.custom_width ? `${img.custom_width}px` : '100%',
                                  height: img.custom_height ? `${img.custom_height}px` : 'auto'
                                }}
                              />
                            ))
                          ) : (
                            <p>No images available.</p>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))
        ) : (
          <section className="section">
            <h2>Welcome to Shundao</h2>
            <p>We are a global leader in color spun yarn and sustainable textile solutions.</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default Home;