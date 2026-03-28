import { Shield, Wifi, CheckCircle } from "lucide-react";
import "./Benefits.css";

export default function Benefits() {
    return (
        <>
            <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Защо FireWatch Pro?
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-red-100 rounded-lg p-3 flex-shrink-0">
                                        <Shield className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Надеждна защита</h3>
                                        <p className="text-gray-600">
                                            Сертифицирани системи с доказана ефективност в реални ситуации
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                                        <Wifi className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Лесна инсталация</h3>
                                        <p className="text-gray-600">
                                            Монтаж за минути без нужда от специалист
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">3 години гаранция</h3>
                                        <p className="text-gray-600">
                                            Пълна гаранция и безплатна техническа поддръжка
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white text-center">
                                <div className="text-5xl font-bold mb-2">50K+</div>
                                <div className="text-lg">Доволни клиенти</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white text-center">
                                <div className="text-5xl font-bold mb-2">99.9%</div>
                                <div className="text-lg">Точност</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center">
                                <div className="text-5xl font-bold mb-2">24/7</div>
                                <div className="text-lg">Поддръжка</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
                                <div className="text-5xl font-bold mb-2">3 год.</div>
                                <div className="text-lg">Гаранция</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}