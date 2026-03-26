// app/vehicles/VehiclesContent.js
'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TehnicaCard from '../component/TehnicaCard';

const countries = [
  { value: '', label: 'Все нации' },
  { value: 'britain', label: 'Великобритания' },
  { value: 'china', label: 'Китай' },
  { value: 'france', label: 'Франция' },
  { value: 'germany', label: 'Германия' },
  { value: 'isreal', label: 'Израиль' },
  { value: 'italy', label: 'Италия' },
  { value: 'japan', label: 'Япония' },
  { value: 'sweden', label: 'Швеция' },
  { value: 'usa', label: 'США' },
  { value: 'ussr', label: 'СССР' },
];

const vehicleTypes = [
  { value: '', label: 'Все типы' },
  { value: 'tank', label: 'Танк' },
  { value: 'light_tank', label: 'Легкий танк' },
  { value: 'medium_tank', label: 'Средний танк' },
  { value: 'heavy_tank', label: 'Тяжелый танк' },
  { value: 'tank_destroyer', label: 'ПТ-САУ' },
  { value: 'spaa', label: 'ЗСУ' },
  { value: 'lbv', label: 'Легкая бронетехника' },
  { value: 'mbv', label: 'Средняя бронетехника' },
  { value: 'hbv', label: 'Тяжелая бронетехника' },
  { value: 'exoskeleton', label: 'Экзоскелет' },
  { value: 'attack_helicopter', label: 'Ударный вертолет' },
  { value: 'utility_helicopter', label: 'Многоцелевой вертолет' },
  { value: 'fighter', label: 'Истребитель' },
  { value: 'assault', label: 'Штурмовик' },
  { value: 'bomber', label: 'Бомбардировщик' },
  { value: 'ship', label: 'Корабль' },
  { value: 'destroyer', label: 'Эсминец' },
  { value: 'light_cruiser', label: 'Легкий крейсер' },
  { value: 'boat', label: 'Катер' },
  { value: 'heavy_boat', label: 'Тяжелый катер' },
  { value: 'barge', label: 'Баржа' },
  { value: 'frigate', label: 'Фрегат' },
  { value: 'heavy_cruiser', label: 'Тяжелый крейсер' },
  { value: 'battlecruiser', label: 'Линейный крейсер' },
  { value: 'battleship', label: 'Линкор' },
  { value: 'submarine', label: 'Подводная лодка' },
];

const eras = [
  { value: '', label: 'Все эры' },
  { value: '1', label: 'Эра I' },
  { value: '2', label: 'Эра II' },
  { value: '3', label: 'Эра III' },
  { value: '4', label: 'Эра IV' },
  { value: '5', label: 'Эра V' },
  { value: '6', label: 'Эра VI' },
  { value: '7', label: 'Эра VII' },
  { value: '8', label: 'Эра VIII' },
];

export default function VehiclesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({
    country: searchParams.get('country') || '',
    type: searchParams.get('type') || '',
    era: searchParams.get('era') || '',
  });

  const itemsPerPage = 12;

  // Функция для получения общего количества страниц
  const fetchTotalCount = async () => {
    try {
      let url = `https://wtvehiclesapi.duckdns.org/api/vehicles?limit=1&page=1`;

      if (filters.country) {
        url += `&country=${filters.country}`;
      }
      if (filters.type) {
        url += `&type=${filters.type}`;
      }
      if (filters.era) {
        url += `&era=${filters.era}`;
      }

      const response = await fetch(url);
      const totalCount = response.headers.get('x-total-count');
      if (totalCount) {
        const total = parseInt(totalCount);
        setTotalItems(total);
        setTotalPages(Math.ceil(total / itemsPerPage));
      } else {
        // Если заголовка нет, делаем запрос на все данные чтобы посчитать
        const allDataUrl = `https://wtvehiclesapi.duckdns.org/api/vehicles?limit=10000&page=1${filters.country ? `&country=${filters.country}` : ''
          }${filters.type ? `&type=${filters.type}` : ''}${filters.era ? `&era=${filters.era}` : ''
          }`;
        const allResponse = await fetch(allDataUrl);
        const allData = await allResponse.json();
        const total = allData.length;
        setTotalItems(total);
        setTotalPages(Math.ceil(total / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [currentPage, filters]);

  // Загружаем общее количество при изменении фильтров
  useEffect(() => {
    fetchTotalCount();
  }, [filters]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      let url = `https://wtvehiclesapi.duckdns.org/api/vehicles?limit=${itemsPerPage}&page=${currentPage}`;

      if (filters.country) {
        url += `&country=${filters.country}`;
      }
      if (filters.type) {
        url += `&type=${filters.type}`;
      }
      if (filters.era) {
        url += `&era=${filters.era}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setVehicles(data);

      // Если не получили totalPages из fetchTotalCount, пробуем получить из заголовка
      const totalCount = response.headers.get('x-total-count');
      if (totalCount && totalPages === 1) {
        const total = parseInt(totalCount);
        setTotalItems(total);
        setTotalPages(Math.ceil(total / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (newFilters.country) params.set('country', newFilters.country);
    if (newFilters.type) params.set('type', newFilters.type);
    if (newFilters.era) params.set('era', newFilters.era);
    router.push(`/vehicles?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({ country: '', type: '', era: '' });
    setCurrentPage(1);
    router.push('/vehicles');
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => router.push('/#техника')}
            className="text-yellow-500 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад на главную
          </button>
          <h1 className="text-4xl font-bold text-white">Вся техника</h1>
          <p className="text-gray-400 mt-2">Просмотр всех доступных машин War Thunder</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Нация
              </label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                {countries.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Тип техники
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                {vehicleTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Эра
              </label>
              <select
                value={filters.era}
                onChange={(e) => handleFilterChange('era', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                {eras.map(era => (
                  <option key={era.value} value={era.value}>
                    {era.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {(filters.country || filters.type || filters.era) && (
            <div className="mt-4 text-right">
              <button
                onClick={resetFilters}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Техника не найдена</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-blue-400 hover:text-blue-300">
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {vehicles.map((vehicle) => (
                <TehnicaCard key={vehicle.identifier} tehnica={vehicle} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-12">
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${currentPage === 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                          }`}>
                        {page}
                      </button>
                    )
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${currentPage === totalPages
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}