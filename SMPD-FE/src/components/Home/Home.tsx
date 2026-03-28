import { Camera, CheckCircle } from "lucide-react";
import "./Home.css";

export default function Home() {
    return (
        <>
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Защитете вашия дом с <span className="text-red-600">интелигентни камери</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Автоматично засичане на пожар, дим и опасности. Моментално известяване и 24/7 наблюдение.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
                                    Виж продуктите
                                </button>
                                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-red-600 hover:text-red-600 transition-all">
                                    Безплатна демо
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-8 shadow-2xl">
                                <Camera className="h-64 w-64 text-white mx-auto" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 flex items-center space-x-3">
                                <div className="bg-green-100 rounded-full p-2">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">99.9% точност</p>
                                    <p className="text-sm text-gray-600">на засичане</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}