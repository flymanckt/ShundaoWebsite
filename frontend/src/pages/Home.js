import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

function Home() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [homeContent, setHomeContent] = useState([]);
  const [brandAdv, setBrandAdv] = useState(null);

  useEffect(() => {
    // 获取 Banner 轮播图数据
    axios.get('http://127.0.0.1:8000/api/homepage_carousel/')
      .then(response => setCarouselImages(response.data))
      .catch(error => console.error("Error fetching homepage carousel:", error));

    // 获取 首页正文内容数据
    axios.get('http://127.0.0.1:8000/api/homecontent/')
      .then(response => setHomeContent(response.data))
      .catch(error => console.error("Error fetching home content:", error));

    // 获取 Brand Advantage 数据（取第一条记录）
    axios.get('http://127.0.0.1:8000/api/brand_advantage/')
      .then(response => {
        if (response.data.length > 0) {
          setBrandAdv(response.data[0]);
          console.log("Brand Advantage API Response:", response.data[0]);
          console.log("Brand Advantage Subtopics:", response.data[0].subtopics);
        }
      })
      .catch(error => console.error("Error fetching brand advantage:", error));
  }, []);

  // Banner 轮播配置
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

  // Brand Advantage 子主题轮播配置（仅当 layout 为 "carousel" 时使用）
  const sliderSettingsSubtopic = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
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
                  <img src={item.image} alt={item.title || "Banner"} className="banner-image" />
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

      {/* 正文内容 */}
      <div className="container">
        {homeContent.length > 0 ? (
          homeContent.map(item => (
            <section key={item.id} className="section">
              {item.title && <h2>{item.title}</h2>}
              {item.subtitle && <h3>{item.subtitle}</h3>}
              <p>{item.content}</p>
              {item.image && (
                <img src={item.image} alt={item.title} style={{ width: "100%", borderRadius: "8px" }} />
              )}
            </section>
          ))
        ) : (
          <section className="section">
            <h2>Welcome to Shundao</h2>
            <p>We are a global leader in color spun yarn and sustainable textile solutions.</p>
          </section>
        )}

        {/* Brand Advantage 栏目 */}
        {brandAdv && (
          <section className="section brand-advantage">
            {brandAdv.main_title && <h2>{brandAdv.main_title}</h2>}
            <p>{brandAdv.main_content}</p>
            <div className="brand-advantage-container">
              {brandAdv.subtopics && brandAdv.subtopics.length > 0 ? (
                brandAdv.subtopics.map(sub => {
                  // 在此打印当前子主题的 images 数组，方便调试
                  console.log("Carousel subtopic images:", sub.images);
                  return (
                    <div key={sub.id} className={`brand-advantage-subtopic ${sub.text_position} ${sub.layout}`}>
                      {(sub.text_position === 'top' || sub.text_position === 'left') && (
                        <div className="subtopic-text">
                          <h3>{sub.title}</h3>
                          <p>{sub.content}</p>
                        </div>
                      )}
                      <div className="subtopic-images" style={{ gap: `${sub.image_spacing}px` }}>
                        {sub.layout === 'carousel' ? (
                          <Slider {...sliderSettingsSubtopic}>
                            {sub.images && sub.images.length > 0 ? (
                              sub.images.map(img => (
                                <div key={img.id} style={{ height: '200px' }}>
                                  <img
                                    src={img.image}
                                    alt={sub.title}
                                    className="subtopic-image"
                                    style={{
                                      width: img.custom_width ? `${img.custom_width}px` : '100%',
                                      height: img.custom_height ? `${img.custom_height}px` : '100%',
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
                                src={img.image}
                                alt={sub.title}
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
                          <h3>{sub.title}</h3>
                          <p>{sub.content}</p>
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
