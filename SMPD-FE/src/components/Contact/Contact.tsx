import "./Contact.css";

export default function Contact() {
    return (
        <>
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-600 to-orange-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Готови за по-сигурен дом?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Свържете се с нас днес и получете безплатна консултация
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Вашият имейл адрес"
                            className="px-6 py-4 rounded-lg text-lg w-full sm:w-96 focus:outline-none focus:ring-4 focus:ring-white/50"
                        />
                        <button className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                            Изпрати запитване
                        </button>
                    </div>
                    <p className="text-white/80 mt-6">
                        Или се обадете на: <span className="font-bold">+359 888 123 456</span>
                    </p>
                </div>
            </section>

        </>
    )
}