export default function Hero() {
  return (
    <section className="pt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"></div>
      <div className="relative container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            War Thunder{' '}
            <span className="text-yellow-500">База знаний</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Полная информация о технике, нациях, тактиках и последние новости игры
          </p>
          <div className="space-x-4">
            <a href="#техника" className="inline-block bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-400 transition font-semibold">
              Исследовать технику
            </a>
            <a href="#нации" className="inline-block border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg hover:bg-yellow-500/10 transition">
              Новые нации
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}