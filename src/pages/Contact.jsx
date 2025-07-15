import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const contactInfo = [
    {
        icon: Phone,
        title: 'Telepon',
        content: '+62 123 456 7890',
    },
    {
        icon: Mail,
        title: 'Email',
        content: 'info@eduspace.com',
    },
    {
        icon: MapPin,
        title: 'Alamat',
        content: 'Jl. Sriwijaya. Kedawung, Cirebon',
    },
];

function Contact() {
    return (
        // Hapus bg-gray-100 karena background global sudah di App.js
        <div className="py-16">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">Hubungi Kami</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                        Kami siap membantu Anda dengan senang hati. Jangan ragu untuk menghubungi kami melalui informasi di bawah ini atau melalui form pesan.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 transition-colors duration-300"
                        >
                            <div className="text-blue-500 dark:text-blue-400 text-3xl mb-4 transition-colors duration-300">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{item.content}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
                >
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center transition-colors duration-300">Kirim Pesan</h3>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-300">Nama</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nama Anda"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Anda"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-300">Pesan</label>
                            <textarea
                                id="message"
                                placeholder="Tulis pesan Anda..."
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline h-32 resize-y placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300"
                        >
                            Kirim Pesan
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;