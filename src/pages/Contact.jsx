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
        <div className="bg-gray-100 py-16 ">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                        >
                            <div className="text-blue-500 text-3xl mb-4">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.content}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-lg shadow-md p-8"
                >
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Kirim Pesan</h3>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nama</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nama Anda"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Anda"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Pesan</label>
                            <textarea
                                id="message"
                                placeholder="Tulis pesan Anda..."
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-y"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full"
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
