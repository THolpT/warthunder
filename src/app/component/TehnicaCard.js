export default function TehnicaCard({ tehnica }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
      <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-600 relative">
        <img
          src={tehnica.images.image}
          alt={tehnica.identifier}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 flex gap-2 z-10">
          <span className={`bg-gray-600 px-2 py-1 rounded text-xs text-white`}>
          🎯 {tehnica.vehicle_type.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{tehnica.identifier.toUpperCase()}</h3>
        <div className="flex justify-between items-center text-gray-400 mb-3">
          <span>{tehnica.country.toUpperCase()}</span>
          <span>{tehnica.era} Эра</span>
        </div>
        <div className="flex gap-2">
          <a href="#" className="flex-1 bg-yellow-500 text-gray-900 px-3 py-2 rounded hover:bg-yellow-400 transition text-sm font-semibold text-center">
            Подробнее
          </a>
        </div>
      </div>
    </div>
  );
}