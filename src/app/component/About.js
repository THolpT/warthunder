export default function About() {
  const stats = [
    { label: 'Активных игроков', value: '50M+', icon: '👥' },
    { label: 'Единиц техники', value: '2000+', icon: '🚀' },
    { label: 'Игровых карт', value: '100+', icon: '🗺️' },
    { label: 'Ежегодных обновлений', value: '15+', icon: '🔄' }
  ];

  const features = [
    'Реалистичная физика и баллистика',
    'Более 2000 единиц техники из 10 стран',
    'Несколько режимов игры: Аркадный, Реалистичный, Симулятор',
    'Командные сражения до 32 игроков',
    'Постоянные обновления и новый контент',
    'Кросс-платформенная игра'
  ];

  return (
    <section id="о игре" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">О War Thunder</h2>
          <p className="text-gray-300 text-center mb-12 leading-relaxed text-lg">
            War Thunder — это масштабная военная онлайн-игра, объединяющая авиацию, 
            бронетанковые войска и флот. Участвуйте в эпических сражениях на более чем 
            2000 единицах техники из разных стран и эпох.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gray-900 rounded-lg p-6">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-yellow-500">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Особенности игры:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-400 transition font-semibold">
              Начать играть бесплатно
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}