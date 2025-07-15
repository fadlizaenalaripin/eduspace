import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300 text-sm">
              EduSpace adalah platform edukasi yang menyediakan berbagai kursus online
              untuk membantu Anda meningkatkan keterampilan dan pengetahuan.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="text-gray-300 text-sm space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Jl. Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@eduspace.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+62 123 456 7890</span>
              </li>
            </ul>
          </div>

          {/* Google Maps Integration */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Location</h3>
            <div className="rounded-md overflow-hidden h-48 md:h-52">
              <iframe
                title="EduSpace Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3163495372917!2d107.60912639999999!3d-6.9742177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e639e341c979%3A0x13c27e2197a39591!2sUniversitas%20Pendidikan%20Indonesia%20(UPI)!5e0!3m2!1sid!2sid!4v1686744037414!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} EduSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;