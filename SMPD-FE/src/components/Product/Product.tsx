import { Shield, Camera, Eye, CheckCircle } from 'lucide-react';
import "./Product.css";

export default function Product() {
    return (
        <>
        <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Изберете вашия модел
            </h2>
            <p className="text-xl text-gray-600">
              Професионални решения за всяка нужда
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-center">
                <Shield className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">Basic</h3>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold text-gray-900">299лв</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">HD 1080p видео</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Детекция на дим</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">WiFi свързаност</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Мобилно приложение</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  Избери Basic
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all border-4 border-red-600 relative">
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Популярен
              </div>
              <div className="bg-gradient-to-br from-red-600 to-orange-600 p-8 text-center">
                <Camera className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">Pro</h3>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold text-gray-900">499лв</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">4K Ultra HD видео</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">AI детекция на пламък и дим</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Нощно виждане</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Облачно съхранение</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Двупосочно аудио</span>
                  </li>
                </ul>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Избери Pro
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-8 text-center">
                <Eye className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">Enterprise</h3>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold text-gray-900">899лв</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Всички Pro функции</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">360° покритие</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Термална камера</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Автоматична тревога</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Приоритетна поддръжка</span>
                  </li>
                </ul>
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Избери Enterprise
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
        
        </>
    )
}