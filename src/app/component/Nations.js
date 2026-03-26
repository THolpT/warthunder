'use client';

import { useState, useEffect } from 'react';

export default function Nations() {
  const [nations, setNations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNations();
  }, []);

  const fetchNations = async () => {
    try {
      setLoading(true);
      
      setTimeout(() => {
        setNations([
          { name: 'СССР', color: 'red', strength: 'Мощные танки', icon: '🇷🇺', vehicles: 450 },
          { name: 'США', color: 'blue', strength: 'Авиация', icon: '🇺🇸', vehicles: 420 },
          { name: 'Германия', color: 'gray', strength: 'Точность', icon: '🇩🇪', vehicles: 410 },
          { name: 'Япония', color: 'red', strength: 'Мобильность', icon: '🇯🇵', vehicles: 280 },
          { name: 'Великобритания', color: 'blue', strength: 'Броня', icon: '🇬🇧', vehicles: 380 },
          { name: 'Франция', color: 'blue', strength: 'Скорострельность', icon: '🇫🇷', vehicles: 290 },
          { name: 'Китай', color: 'red', strength: 'Универсальность', icon: '🇨🇳', vehicles: 260 },
          { name: 'Италия', color: 'green', strength: 'Легкая техника', icon: '🇮🇹', vehicles: 240 }
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="нации" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Нации</h2>
          <div className="text-center text-gray-400">Загрузка наций...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="нации" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Доступные нации</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nations.map((nation, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 text-center hover:transform hover:scale-105 transition duration-300">
              <div className="text-5xl mb-4">{nation.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{nation.name}</h3>
              <p className="text-gray-400 mb-2">Сильная сторона: {nation.strength}</p>
              <p className="text-yellow-500 text-sm mb-4">{nation.vehicles} единиц техники</p>
              <button className="mt-2 text-yellow-500 hover:text-yellow-400 transition">
                Исследовать →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}