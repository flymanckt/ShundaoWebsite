import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

function Home({ language }) {
  const [carouselImages, setCarouselImages] = useState([]);
  const [homeContent, setHomeContent] = useState([]);
  const [brandAdv, setBrandAdv] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/homepage_carousel/`)
      .then(response => {
        console.log("Carousel Data:", response.data);
        setCarouselImages(response.data);
      })
      .catch(error => console.error("Error fetching homepage carousel:", error));

    axios.get(`${API_BASE_URL}/api/homecontent/`)
      .then(response => setHomeContent(response.data))
      .catch(error => console.error("Error fetching home content:", error));

    axios.get(`${API_BASE_URL}/api/brand_advantage/`)
      .then(response => {
        if (response.data.length > 0) {
          setBrandAdv(response.data[0]);
          console.log("Brand Advantage API Response:", response.data[0]);
          console.log("Brand Advantage Subtopics:", response.data[0].subtopics);
        }
      })
      .catch(error => console.error("Error fetching brand advantage:", error));
  }, []);

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

  const sliderSettingsSubtopic = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true, // 根据 slide 内容自适应高度
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
            </section>
          ))
        ) : (
          <section className="section">
            <h2>Welcome to Shundao</h2>
            <p>We are a global leader in color spun yarn and sustainable textile solutions.</p>
          </section>
        )}

        {/* 品牌优势部分 */}
        {brandAdv && (
          <section className="section brand-advantage">
            <h2>{language === "en" ? brandAdv.main_title_en : brandAdv.main_title_vi}</h2>
            <p>{language === "en" ? brandAdv.main_content_en : brandAdv.main_content_vi}</p>
            <div className="brand-advantage-container">
              {brandAdv.subtopics && brandAdv.subtopics.length > 0 ? (
                brandAdv.subtopics.map(sub => {
                  console.log("Subtopic images:", sub.images);
                  return (
                    <div key={sub.id} className={`brand-advantage-subtopic ${sub.text_position} ${sub.layout}`}>
                      {(sub.text_position === 'top' || sub.text_position === 'left') && (
                        <div className="subtopic-text">
                          <h3>{language === "en" ? sub.title_en : sub.title_vi}</h3>
                          <p>{language === "en" ? sub.content_en : sub.content_vi}</p>
                        </div>
                      )}
                      <div className="subtopic-images" style={{ gap: `${sub.image_spacing}px` }}>
                        {sub.layout === 'carousel' ? (
                          <Slider {...sliderSettingsSubtopic}>
                            {sub.images && sub.images.length > 0 ? (
                              sub.images.map(img => (
                                <div key={img.id} style={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <img
                                    src={img.image_url}
                                    alt={language === "en" ? sub.title_en : sub.title_vi}
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
                          sub.images && sub.images.length > 0 ? (
                            sub.images.map(img => (
                              <img
                                key={img.id}
                                src={img.image_url}
                                alt={language === "en" ? sub.title_en : sub.title_vi}
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
                      {(sub.text_position === 'bottom' || sub.text_position === 'right') && (
                        <div className="subtopic-text">
                          <h3>{language === "en" ? sub.title_en : sub.title_vi}</h3>
                          <p>{language === "en" ? sub.content_en : sub.content_vi}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No subtopics available.</p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Home;
