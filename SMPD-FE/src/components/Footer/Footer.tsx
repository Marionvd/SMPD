import { Flame } from "lucide-react";
import "./Footer.css";

export default function Footer() {

    return (
        <>
            <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Flame className="h-8 w-8 text-red-600" />
                                <span className="text-xl font-bold">FireWatch Pro</span>
                            </div>
                            <p className="text-gray-400">
                                Вашата сигурност е нашият приоритет
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Продукти</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Basic камера</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pro камера</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Компания</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">За нас</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Контакти</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Поддръжка</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Правна информация</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Условия</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Поверителност</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Гаранция</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 FireWatch Pro. Всички права запазени.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}