import React from "react";
import { Link } from "react-router-dom";
import "./DevNewsPage.css";

const DevNewsPage = () => {
  const news = [
    {
      id: 1,
      date: "27 квітня 2024",
      title: "Додано вбудований кодовий редактор",
      preview:
        "Ми раді повідомити, що на нашому сайті тепер доступний вбудований кодовий редактор! Це нововведення дозволить студентам практикуватися в написанні коду прямо на платформі...",
      author: "Команда розробників",
      tags: ["новини", "оновлення", "кодовий редактор"],
    },
  ];

  return (
    <div className="dev-news-container">
      <h1>Новини розробника</h1>
      <div className="news-list">
        {news.map((item) => (
          <Link to={`/dev-news/${item.id}`} key={item.id} className="news-item">
            <div className="news-date">{item.date}</div>
            <h2>{item.title}</h2>
            <div className="news-meta">
              <span className="news-author">
                <i className="fas fa-user"></i> {item.author}
              </span>
              <div className="news-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="news-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="news-content">
              <p>{item.preview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DevNewsPage;
