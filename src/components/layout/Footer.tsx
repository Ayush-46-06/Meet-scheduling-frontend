'use client';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaMediumM } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0D2137] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* LEFT SECTION */}
        <div className="lg:col-span-1">
          <Image src="/White logo.png" alt="Athenura" width={130} height={38}
            className="object-contain sm:w-[130px] mb-2" priority />
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            Next-gen software engineering for the modern enterprise. We build the systems that drive the world.
          </p>

          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {[FaLinkedinIn, FaInstagram, FaTwitter].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-700 cursor-pointer hover:scale-105 transition">
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY */}
        {/* <div>
          <h3 className="font-semibold mb-4 border-b border-white/30 inline-block pb-1">Company</h3>
          <ul className="space-y-3 text-sm text-white/90">
            <li>About Us</li>
            <li>Career</li>
            <li>Internship Program</li>
            <li>Internship Policy</li>
            <li>FAQs</li>
          </ul>
        </div> */}

        {/* SERVICES */}
        {/* <div>
          <h3 className="font-semibold mb-4 border-b border-white/30 inline-block pb-1">Services</h3>
          <ul className="space-y-3 text-sm text-white/90">
            <li>Custom Software Development</li>
            <li>Web Application Development</li>
            <li>Website Maintenance</li>
            <li>Software Testing & QA</li>
            <li>Business Automation Solutions</li>
          </ul>
        </div> */}

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white/30 inline-block pb-1">Contact Us</h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-xs text-white/70">EMAIL</p>
                <p className="font-medium">official@athenura.in</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-xs text-white/70">PHONE</p>
                <p className="font-medium">+91 98350 51934</p>
              </div>
            </div>
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white/30 inline-block pb-1">Location</h3>

          <div className="rounded-xl overflow-hidden mb-3 border border-white/30">
            <iframe
              src="https://maps.google.com/maps?q=Sector%2062%20Noida&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[120px] border-0"
              loading="lazy"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-white/90">
            <MapPin size={14} />
            <p>Sector 62, Noida, Uttar Pradesh</p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-white/80 gap-2">
          <p>© 2026 Athenura. All rights reserved.</p>
          <div className="flex gap-6">
            <p className="cursor-pointer hover:text-white">Privacy Policy</p>
            <p className="cursor-pointer hover:text-white">Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}