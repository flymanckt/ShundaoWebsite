import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

function Home({ language }) {
  const [homepagecarouselImages, setCarouselImages] = useState([]);
  const [homeContent, setHomeContent] = useState([]);  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homepagecarouselResponse, homeContentResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/homepage_carousel/`),
          axios.get(`${API_BASE_URL}/api/homecontent/`)
        ]);

        console.log("Carousel Images:", homepagecarouselResponse.data);
        homepagecarouselResponse.data.forEach(item => console.log("Image URL:", item.image_url));
        setCarouselImages(homepagecarouselResponse.data);
        setHomeContent(homeContentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_BASE_URL]);


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

  // 子主题轮播配置（仅当 layout 为 "carousel" 时使用）
  const sliderSettingsSubtopic = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true, // 根据内容调整高度
    centerMode: true,  // 尝试使用 centerMode 确保图片显示
    centerPadding: '0',  // 防止图片被裁切
    variableWidth: false, // 显式禁用动态宽度
    centerMode: false, // 关闭居中模式
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        centerMode: false
      },
      cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)', // 匹配CSS过渡效果
      fade: false, // 禁用默认渐变（使用自定义opacity）      
  }]  
  };

  return (
    <div className="home-page">
      {/* Banner 轮播图 */}
      <section className="banner-section" aria-hidden="true">
        <div className="banner-wrapper">
          <Slider {...sliderSettings}>
            {homepagecarouselImages.length > 0 ? (
              homepagecarouselImages.map(item => (
                <div key={item.id}>
                  <img 
                    src={item.image} // 拼接基础URL
                    alt={item.title || "Banner"} 
                    className="banner-image"
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: 'auto' }} // 确保图片适应容器
                  />
                  {console.log("Rendering Image URL:", item.image)}
                </div>
              ))
            ) : (
              <>
                <div>
                  <img src="https://picsum.photos/1200/500?random=1" alt="Banner 1" className="banner-image" />
                </div>
                <div>
                  <img src="https://picsum.photos/1200/500?random=2" alt="Banner 2" className="banner-image" />
                </div>
                <div>
                  <img src="https://picsum.photos/1200/500?random=3" alt="Banner 3" className="banner-image" />
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
                    <div key={subtopic.id} className={`subtopic ${subtopic.layout} text-${subtopic.text_position}`}>
                      
                      <h3>{language === "en" ? subtopic.title_en : subtopic.title_vi}</h3>
                      <p>{language === "en" ? subtopic.content_en : subtopic.content_vi}</p>
                      <div className="subtopic-images" style={{ gap: `${subtopic.image_spacing}px` }}>
                        {subtopic.layout === 'carousel' ? (
                          <Slider {...sliderSettingsSubtopic}>
                            {subtopic.images && subtopic.images.length > 0 ? (
                              subtopic.images.map(img => (
                                <div key={img.id} style={{ minHeight: '300px',
                                  width: '100vw', // 添加视口宽度限制
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}>

                                  <img
                                    src={`${API_BASE_URL}${img.image_url}`}
                                    alt={language === "en" ? subtopic.title_en : subtopic.title_vi}
                                    className="subtopic-image"
                                    style={{
                                      width: img.custom_width ? `${img.custom_width}px` : '100%',
                                      height: img.custom_height ? `${img.custom_height}px` : '100%',
                                      objectFit: 'contain'
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
                                  width: img.custom_width ? `${img.custom_width}px` : '100%',// 替换cover避免裁剪
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
