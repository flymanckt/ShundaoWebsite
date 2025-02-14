import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

function Home() {
  // 1. Banner 轮播图数据
  const [carouselImages, setCarouselImages] = useState([]);
  // 2. 首页正文数据
  const [homeContent, setHomeContent] = useState([]);

  // ========== 静态测试：Brand Advantage 子主题数据（无后端） ==========
  const testSubtopics = [
    {
      id: 1,
      title: "Static Carousel Test",
      content: "This is a static subtopic for testing the carousel layout.",
      layout: "carousel",          // 强制 carousel
      text_position: "top",        // 文字在上方
      image_spacing: 10,           // 图片间距 10px
      images: [
        {
          id: 101,
          image: "https://via.placeholder.com/600x200?text=Test+Image+1",
          custom_width: 600,
          custom_height: 200
        },
        {
          id: 102,
          image: "https://via.placeholder.com/600x200?text=Test+Image+2",
          custom_width: 600,
          custom_height: 200
        },
        {
          id: 103,
          image: "https://via.placeholder.com/600x200?text=Test+Image+3",
          custom_width: 600,
          custom_height: 200
        }
      ]
    },
    {
      id: 2,
      title: "Another Subtopic (stacked)",
      content: "Check stacked layout with static images.",
      layout: "stacked",
      text_position: "left",
      image_spacing: 15,
      images: [
        {
          id: 201,
          image: "https://via.placeholder.com/300x200?text=Stacked+1",
          custom_width: 300,
          custom_height: 200
        },
        {
          id: 202,
          image: "https://via.placeholder.com/300x200?text=Stacked+2",
          custom_width: 300,
          custom_height: 200
        }
      ]
    }
  ];

  // 3. useEffect 获取 Banner 和首页正文
  useEffect(() => {
    // 如果想完全静态测试，可以注释掉这两段
    axios.get('http://127.0.0.1:8000/api/homepage_carousel/')
      .then(response => setCarouselImages(response.data))
      .catch(error => console.error("Error fetching homepage carousel:", error));

    axios.get('http://127.0.0.1:8000/api/homecontent/')
      .then(response => setHomeContent(response.data))
      .catch(error => console.error("Error fetching home content:", error));
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

  // 子主题轮播配置
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
      {/* ========== Banner 轮播图（如要静态测试，也可改成写死的数据） ========== */}
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
                <div><img src="https://via.placeholder.com/1200x500?text=Banner+1" alt="Banner 1" className="banner-image" /></div>
                <div><img src="https://via.placeholder.com/1200x500?text=Banner+2" alt="Banner 2" className="banner-image" /></div>
                <div><img src="https://via.placeholder.com/1200x500?text=Banner+3" alt="Banner 3" className="banner-image" /></div>
              </>
            )}
          </Slider>
        </div>
      </section>

      {/* ========== 首页正文（如要静态测试，也可改写死的数据） ========== */}
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
            <p>
              We are a global leader in color spun yarn and sustainable textile solutions.
            </p>
          </section>
        )}

        {/* ========== Brand Advantage - 静态测试子主题 ========== */}
        <section className="section brand-advantage">
          <h2>Static Brand Advantage Test</h2>
          <p>Below subtopics are purely static, not from API.</p>
          <div className="brand-advantage-container">
            {testSubtopics.map(sub => (
              <div key={sub.id} className={`brand-advantage-subtopic ${sub.text_position} ${sub.layout}`}>
                {/* 根据文字位置决定文字先后 */}
                {(sub.text_position === 'top' || sub.text_position === 'left') && (
                  <div className="subtopic-text">
                    <h3>{sub.title}</h3>
                    <p>{sub.content}</p>
                  </div>
                )}
                <div className="subtopic-images" style={{ gap: `${sub.image_spacing}px` }}>
                  {sub.layout === 'carousel' ? (
                    console.log("Carousel subtopic images:", sub.images);
                    <Slider {...sliderSettingsSubtopic}>
                      {sub.images.map(img => (
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
                      ))}
                    </Slider>
                  ) : (
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
                  )}
                </div>
                {(sub.text_position === 'bottom' || sub.text_position === 'right') && (
                  <div className="subtopic-text">
                    <h3>{sub.title}</h3>
                    <p>{sub.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
