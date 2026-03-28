import { Flame } from "lucide-react";
import "./Header.css";

export default function Header() {
    return (
        <>
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Flame className="h-8 w-8 text-red-600" />
                            <span className="text-xl font-bold text-gray-900">FireWatch Pro</span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-red-600 transition-colors">Функции</a>
                            <a href="#products" className="text-gray-700 hover:text-red-600 transition-colors">Продукти</a>
                            <a href="#benefits" className="text-gray-700 hover:text-red-600 transition-colors">Предимства</a>
                            <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">Контакт</a>
                        </div>
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105">
                            Поръчай сега
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
