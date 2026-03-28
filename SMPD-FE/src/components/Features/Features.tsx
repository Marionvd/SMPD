import { AlertTriangle, BellRing, Flame, Wifi } from "lucide-react";
import "./Features.css";

export default function Features() {
    return (
        <>
         <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Интелигентни функции за максимална защита
            </h2>
            <p className="text-xl text-gray-600">
              Технология на бъдещето за вашата сигурност днес
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Flame className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Детекция на пламък</h3>
              <p className="text-gray-600 leading-relaxed">
                Автоматично засича пламък и пожар в реално време с AI технология
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Сензор за дим</h3>
              <p className="text-gray-600 leading-relaxed">
                Интелигентно разпознаване на дим и опасни изпарения
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BellRing className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Моментално известяване</h3>
              <p className="text-gray-600 leading-relaxed">
                Получавате SMS и push нотификация при всяка опасност
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Wifi className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 облачна връзка</h3>
              <p className="text-gray-600 leading-relaxed">
                Постоянен достъп от телефон или компютър навсякъде
              </p>
            </div>
          </div>
        </div>
      </section>
        
        </>
    )
}