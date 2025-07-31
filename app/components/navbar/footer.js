'use client';
//make footer component template
import React from 'react';
import Image from 'next/image';
import {
  MapPinIcon,
  EnvelopeIcon,
  PlayIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white pt-16 pb-8">
      <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-12 border-b border-gray-800">
          <div className="flex items-center mb-6 md:mb-0">
            <img
              src="/images/Logo Masjid Baiturrohim.png"
              alt="Logo Masjid Baiturrohim"
              width="60"
              height="60"
              className="mr-4"
            />
            <div>
              <h3 className="text-xl font-bold text-white">
                Masjid Baiturrohim
              </h3>
              <p className="text-gray-400 text-sm">
                Rumah Ibadah & Pusat Kegiatan Islam
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/baiturrohim.korpri"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6DB144] transition-colors"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://wa.me/+6281234567890"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6DB144] transition-colors"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
              <MapPinIcon className="w-5 h-5 text-[#6DB144] mr-2" />
              Alamat
            </h4>
            <p className="text-gray-400 mb-4">
              Harapan Jaya, Sukarame, Bandar Lampung City, Lampung 35131
            </p>
            <a
              href="https://maps.app.goo.gl/2QvRpEnBxyAAzv4g6"
              target="_blank"
              className="inline-flex items-center text-[#6DB144] hover:text-white"
            >
              Lihat di Google Maps
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
              <EnvelopeIcon className="w-5 h-5 text-[#6DB144] mr-2" />
              Kontak
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@baiturrohim.id"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-6 text-center mr-2">📧</span>
                  masjid.baiturrohimkorpri@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+6282377321000"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-6 text-center mr-2">📱</span>
                  (+62) 823-7732-1000
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
              <PlayIcon className="w-5 h-5 text-[#6DB144] mr-2" />
              Kegiatan
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/kajian"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kajian Rutin
                </a>
              </li>
              <li>
                <a
                  href="/kegiatan"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kegiatan Rutin
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Dapatkan informasi terbaru tentang kegiatan Masjid Baiturrohim
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Anda"
                className="bg-white/10 rounded-l-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6DB144] w-full"
              />
              <button className="bg-[#6DB144] hover:bg-[#5ca23a] text-white px-4 rounded-r-lg transition-colors">
                Daftar
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            Dewan Kemakmuran Masjid Baiturrohim
          </p>
          <p className="text-gray-500">
            Copyright © {new Date().getFullYear()} • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
