// app/components/News.js
'use client';

import { useState, useEffect } from 'react';
import NewsCard from './NewCard';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // ЗДЕСЬ ВАШ API ЗАПРОС
      // const response = await fetch('/api/news');
      // const data = await response.json();
      // setNews(data);
      
      setTimeout(() => {
        setNews([
          {
            id: 1,
            title: 'Обновление "Ветер перемен"',
            excerpt: 'Новые самолеты 5-го поколения, танки и карты в игре. Добавлены F-16C, Su-27 и новые карты для наземных сражений.',
            date: '2024-03-22',
            category: 'Обновление',
          },
          {
            id: 2,
            title: 'Сезонные события 2024',
            excerpt: 'Примите участие в специальных ивентах и получите уникальную технику. Стартует новый боевой пропуск.',
            date: '2024-03-20',
            category: 'Событие',
          },
          {
            id: 3,
            title: 'Баланс изменений',
            excerpt: 'Корректировки характеристик техники. Изменены БР для некоторых самолетов и танков.',
            date: '2024-03-18',
            category: 'Баланс',
          },
          {
            id: 4,
            title: 'Новый режим "Штурм"',
            excerpt: 'Кооперативный режим против ИИ. Сражайтесь вместе с друзьями против волн врагов.',
            date: '2024-03-15',
            category: 'Новый режим',
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="новости" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Новости</h2>
          <div className="text-center text-gray-400">Загрузка новостей...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="новости" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Последние новости</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </div>
    </section>
  );
}