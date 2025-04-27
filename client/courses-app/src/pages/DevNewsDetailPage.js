import React from "react";
import { useParams, Link } from "react-router-dom";
import "./DevNewsPage.css";

const DevNewsDetailPage = () => {
  const { id } = useParams();

  const news = {
    id: 1,
    date: "27 квітня 2024",
    title: "Додано вбудований кодовий редактор",
    content: `Ми раді повідомити, що на нашому сайті тепер доступний вбудований кодовий редактор! Це нововведення дозволить студентам практикуватися в написанні коду прямо на платформі, без необхідності встановлювати додаткове програмне забезпечення.

Основні можливості нового редактора:
- Підсвічування синтаксису для різних мов програмування
- Автодоповнення коду
- Можливість збереження та завантаження файлів
- Інтеграція з системою перевірки завдань

Це перший крок до створення повноцінного середовища для навчання програмуванню. У планах:
- Додавання можливості запуску коду
- Інтеграція з системою тестування
- Підтримка більшої кількості мов програмування
- Колаборативне програмування в реальному часі

Слідкуйте за оновленнями!`,
    author: "Команда розробників",
    tags: ["новини", "оновлення", "кодовий редактор"],
  };

  return (
    <div className="dev-news-detail-container">
      <div className="news-detail-header">
        <Link to="/dev-news" className="back-link">
          <i className="fas fa-arrow-left"></i> Назад до новин
        </Link>
        <div className="news-detail-date">{news.date}</div>
      </div>

      <article className="news-detail-content">
        <h1>{news.title}</h1>

        <div className="news-meta">
          <span className="news-author">
            <i className="fas fa-user"></i> {news.author}
          </span>
          <div className="news-tags">
            {news.tags.map((tag, index) => (
              <span key={index} className="news-tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="news-text">
          {news.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default DevNewsDetailPage;
