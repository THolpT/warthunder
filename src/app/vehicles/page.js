import { Suspense } from 'react';
import VehiclesContent from './VehicleContent';

export default function VehiclesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <VehiclesContent />
    </Suspense>
  );
}