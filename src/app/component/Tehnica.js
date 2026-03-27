'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TehnicaCard from './TehnicaCard';

export default function Tehnica() {
  const [Tehnicas, setTehnicas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://wtvehiclesapi.duckdns.org/api/vehicles?limit=6&page=${currentPage}`)
      .then(response => response.json())
      .then(data => setTehnicas(data));
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleViewAll = () => {
    router.push('/vehicles');
  };

  return (
    <section id='техника' className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">Техника War Thunder</h2>
          <button
            onClick={handleViewAll}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
            Вся техника →
          </button>
        </div>
        <div className="relative">
          <button 
            onClick={handlePrevPage}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-8 z-10 
              bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 
              transition-colors duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-8 z-10 
              bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 
              transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Tehnicas.map((tehnica) => (
              <TehnicaCard key={tehnica.identifier} tehnica={tehnica} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
