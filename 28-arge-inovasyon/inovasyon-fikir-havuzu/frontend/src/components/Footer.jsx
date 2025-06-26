import React from 'react';
import aselsanLogo from '../assets/aselsan.png';
import havelsanLogo from '../assets/havelsan.png';
import tubitakLogo from '../assets/tübitak.jpg';
import tcLogo from '../assets/T.C..jpg';
import ibLogo from '../assets/İ.B..png';

const SUPPORTERS = [
  { name: 'ASELSAN', logo: aselsanLogo, url: 'https://www.aselsan.com.tr/' },
  { name: 'HAVELSAN', logo: havelsanLogo, url: 'https://www.havelsan.com.tr/' },
  { name: 'TÜBİTAK', logo: tubitakLogo, url: 'https://tubitak.gov.tr/' },
  { name: 'Cumhurbaşkanlığı', logo: tcLogo, url: 'https://www.tccb.gov.tr/' },
  { name: 'İletişim Başkanlığı', logo: ibLogo, url: 'https://www.iletisim.gov.tr/' },
];

const Footer = () => (
  <footer className="bg-blue-900 text-white w-full mt-10 pt-8 pb-4">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
      {/* Sol: Platform adı ve açıklama */}
      <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
        <div className="text-xl font-bold mb-2">İnovasyon Fikir Havuzu</div>
        <div className="text-sm text-blue-100 max-w-xs">Kamu kurumları için inovasyonun, katılımcılığın ve dijital dönüşümün merkezi.</div>
      </div>
      {/* Orta: İletişim */}
      <div className="flex-1 text-center mb-4 md:mb-0">
        <div className="font-semibold mb-1">İletişim</div>
        <div className="text-sm">Cumhurbaşkanlığı İletişim Başkanlığı</div>
        <div className="text-sm">iletisim@cib.gov.tr</div>
        <div className="text-sm">0 (312) 123 45 67</div>
      </div>
      {/* Sağ: Destekleyenler ve sosyal medya */}
      <div className="flex-1 flex flex-col items-center md:items-end gap-2">
        <div className="font-semibold mb-1">Destekleyen Kurumlar</div>
        <div className="flex gap-3 flex-wrap justify-center md:justify-end">
          {SUPPORTERS.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name} className="bg-white rounded shadow p-1 flex items-center justify-center h-8 w-20">
              <img src={s.logo} alt={s.name} className="h-6 object-contain" />
            </a>
          ))}
        </div>
        <div className="flex gap-3 mt-2">
          <a href="#" className="hover:text-blue-300" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.1.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.85 1.95 3.63-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.9 3.99 2.93A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z" /></svg></a>
          <a href="#" className="hover:text-blue-300" aria-label="LinkedIn"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z" /></svg></a>
        </div>
      </div>
    </div>
    <div className="border-t border-blue-800 mt-6 pt-3 text-center text-xs text-blue-200">
      © {new Date().getFullYear()} İnovasyon Fikir Havuzu. Tüm hakları saklıdır. | Bu platform <span className="font-semibold text-white">Cumhurbaşkanlığı İletişim Başkanlığı</span> tarafından desteklenmektedir.
    </div>
    <div className="text-center text-xs text-blue-200 mt-1">Bu bir <span className="font-semibold text-white">Kamu AKYS</span> ürünüdür.</div>
  </footer>
);

export default Footer; 