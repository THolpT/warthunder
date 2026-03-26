export default function NewsCard({ news }) {
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Обновление': return 'bg-green-600';
      case 'Событие': return 'bg-purple-600';
      case 'Баланс': return 'bg-blue-600';
      case 'Новый режим': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
      <div className="h-56 bg-gradient-to-r from-gray-700 to-gray-600 relative">
        <span className={`absolute top-2 left-2 ${getCategoryColor(news.category)} text-white px-3 py-1 rounded text-sm font-semibold`}>
          {news.category}
        </span>
        <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-sm text-white">
          📅 {news.date}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3">{news.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{news.excerpt}</p>
        <button className="text-yellow-500 hover:text-yellow-400 font-medium transition flex items-center gap-2">
          Читать далее 
          <span>→</span>
        </button>
      </div>
    </div>
  );
}