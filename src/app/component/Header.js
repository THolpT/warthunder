export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-500">
            WarThunder<span className="text-white">.Info</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-yellow-500 transition">Главная</a>
            <a href="#техника" className="text-gray-300 hover:text-yellow-500 transition">Техника</a>
            <a href="#нации" className="text-gray-300 hover:text-yellow-500 transition">Нации</a>
            <a href="#о игре" className="text-gray-300 hover:text-yellow-500 transition">О игре</a>
          </div>

          <div className="md:hidden">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
}