import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import CUMHURBASKANLIGI_LOGO from '../assets/İl.svg';
import aselsanLogo from '../assets/aselsan.png';
import havelsanLogo from '../assets/havelsan.png';
import tubitakLogo from '../assets/tübitak.jpg';
import tcLogo from '../assets/T.C..jpg';
import ibLogo from '../assets/İ.B..png';
import bilisimVadisiLogo from '../assets/bilşim_vadisi.png';
import sanayiLogo from '../assets/Sanayi Bak..png';
import mebLogo from '../assets/milli_eğitim.png';

const SUPPORTERS = [
  { name: 'ASELSAN', logo: aselsanLogo },
  { name: 'HAVELSAN', logo: havelsanLogo },
  { name: 'TÜBİTAK', logo: tubitakLogo },
  { name: 'Cumhurbaşkanlığı', logo: tcLogo },
  { name: 'İletişim Başkanlığı', logo: ibLogo },
  { name: 'Bilişim Vadisi', logo: bilisimVadisiLogo },
  { name: 'Sanayi ve Teknoloji Bakanlığı', logo: sanayiLogo },
  { name: 'Milli Eğitim Bakanlığı', logo: mebLogo },
];

const HomePage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
    <Navbar />
    {/* HERO SECTION */}
    <section className="flex flex-col items-center justify-center text-center py-20 px-4 relative">
      {/* Cumhurbaşkanlığı İletişim Başkanlığı */}
      <div className="flex justify-center mb-12 absolute left-1/2 -translate-x-1/2 top-6 md:static md:translate-x-0 md:mb-12">
        <img src={CUMHURBASKANLIGI_LOGO} alt="Cumhurbaşkanlığı İletişim Başkanlığı" className="h-48 w-96 object-contain" />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight mt-20 md:mt-0">İnovasyon Fikir Havuzu</h1>
      <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8">
Kamunun inovasyon potansiyelini ortaya çıkarmak için buradayız!
Kamu çalışanlarının yaratıcı fikirlerini paylaşabileceği, oylayabileceği ve birlikte geliştirebileceği açık ve katılımcı bir platform sunuyoruz.      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <Link
          to="/ideas/create"
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-bold shadow transition"
        >
          Fikrini Hemen Paylaş
        </Link>
        <Link
          to="/ideas"
          className="bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-bold shadow transition"
        >
          Tüm Fikirleri Gör
        </Link>
      </div>
      {/* DESTEKLEYENLER - Animasyonlu Şerit */}
      <section className="w-full flex flex-col items-center py-20 px-2 bg-white border-t border-b border-blue-100 my-24">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Destekleyen Kurumlar</h3>
            <p className="text-gray-600 text-sm">Bu platform aşağıdaki kurumlar tarafından desteklenmektedir:</p>
          </div>
        </div>
        <div className="w-full overflow-x-hidden relative">
          <div className="group">
            <div className="flex items-center gap-10 animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
              {SUPPORTERS.concat(SUPPORTERS).map((s, idx) => (
                <div key={s.name + idx} className="flex flex-col items-center bg-white rounded-lg shadow p-4 min-w-[140px] h-28 justify-center">
                  <img src={s.logo} alt={s.name} className="h-12 object-contain mb-2" />
                  <span className="text-xs font-medium text-gray-700 text-center whitespace-nowrap">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Tailwind'e özel animasyon tanımı için index.css'e eklenmeli:
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        */}
      </section>
    </section>
    {/* CAROUSEL */}
    <Carousel />
    {/* İnovasyonun Faydaları - Modern Grid */}
    <section className="w-full flex justify-center py-12 px-2 bg-white border-b border-blue-100">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-3">İnovasyonun Kamuya Faydaları</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Bu platform, kamu kurumlarının dijital dönüşüm sürecinde inovasyon kültürünü yaygınlaştırmak ve yenilikçi çözümleri teşvik etmek için geliştirilmiştir.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 1 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-200">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </div>
            <h4 className="font-bold text-blue-800 text-xl text-center mb-2">Dijital Dönüşüm</h4>
            <p className="text-gray-700 text-center text-base">Kamu kurumlarının dijitalleşme sürecini hızlandırır, yenilikçi teknolojilerin benimsenmesini sağlar.</p>
          </div>
          {/* 2 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-200">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5l-9 9m0-9l9 9" /></svg>
            </div>
            <h4 className="font-bold text-blue-800 text-xl text-center mb-2">Açık Kaynak ve Katılımcılık</h4>
            <p className="text-gray-700 text-center text-base">Açık kaynak yapısı sayesinde tüm kurumlar katkı sunabilir, ortak akıl ve iş birliği teşvik edilir.</p>
          </div>
          {/* 3 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-200">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
            </div>
            <h4 className="font-bold text-blue-800 text-xl text-center mb-2">Verimlilik ve Şeffaflık</h4>
            <p className="text-gray-700 text-center text-base">Fikirlerin şeffaf şekilde değerlendirilmesiyle kamu hizmetlerinde verimlilik ve hesap verebilirlik artar.</p>
          </div>
          {/* 4 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-200">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 10v6m8-8h-6m-4 0H4" /></svg>
            </div>
            <h4 className="font-bold text-blue-800 text-xl text-center mb-2">Yenilikçi Çözümler</h4>
            <p className="text-gray-700 text-center text-base">Kamu çalışanlarının fikirleriyle toplumsal fayda sağlayan yenilikçi projeler hayata geçirilir.</p>
          </div>
        </div>
      </div>
    </section>
    {/* ALT BİLGİ KARTLARI */}
    <section className="w-full flex justify-center mt-16 mb-8 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* İnovasyon Nedir Kartı */}
        <div className="bg-white bg-opacity-80 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">İnovasyon Nedir?</h2>
          <p className="text-gray-700 text-base mb-2">
            İnovasyon, mevcut ürün, hizmet, süreç veya iş modellerinde yenilikçi ve katma değerli değişiklikler yapma sürecidir. Kurumlar için inovasyon, rekabet avantajı sağlamak, verimliliği artırmak ve sürdürülebilir büyümeyi desteklemek açısından kritik öneme sahiptir.
          </p>
          <p className="text-gray-600 text-sm">
            İnovasyon kültürünü yaygınlaştırmak, çalışanların fikirlerini özgürce paylaşabildiği ve bu fikirlerin hayata geçirilebildiği bir ortam oluşturmakla mümkündür. Bu platform, kurumumuzun inovasyon ekosistemini güçlendirmek için tasarlanmıştır.
          </p>
        </div>
        {/* İnovasyonun Faydaları Kartı */}
        <div className="bg-white bg-opacity-80 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">İnovasyonun Faydaları</h2>
          <ul className="text-gray-700 text-base space-y-2 list-disc list-inside">
            <li>Dijital dönüşümü hızlandırır ve yenilikçi teknolojilerin benimsenmesini sağlar.</li>
            <li>Kurumsal verimliliği ve şeffaflığı artırır.</li>
            <li>Çalışanların katılımını ve motivasyonunu yükseltir.</li>
            <li>Toplumsal fayda sağlayan projelerin hayata geçmesini destekler.</li>
            <li>Rekabet avantajı ve sürdürülebilir büyüme sağlar.</li>
          </ul>
        </div>
      </div>
    </section>
    {/* Sık Sorulan Sorular - Modern Accordion */}
    <section className="w-full flex justify-center py-12 px-2 bg-gray-50 border-b border-blue-100">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-3">Sık Sorulan Sorular</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Platformun kullanımı ve inovasyon başvuruları hakkında en çok merak edilenleri sizin için derledik.
          </p>
        </div>
        <FAQAccordion />
      </div>
    </section>
    <Footer />
  </div>
);

function FAQAccordion() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      question: 'Kimler fikir gönderebilir?',
      answer: 'Kurumumuzun tüm çalışanları platforma giriş yaparak fikir gönderebilir.'
    },
    {
      question: 'Fikirler nasıl değerlendirilir?',
      answer: 'Fikirler, oylama ve yönetici değerlendirmesiyle şeffaf şekilde incelenir. En çok oyu alan projeler öncelikli olarak desteklenir.'
    },
    {
      question: 'Kabul edilen projelere ne tür destekler sağlanır?',
      answer: 'Kabul edilen projelere maddi destek, mentorluk ve kurum içi kaynaklardan faydalanma imkanı sunulur.'
    },
    {
      question: 'Fikirlerim gizli tutulur mu?',
      answer: 'Fikirler platformda diğer kullanıcılar tarafından görülebilir. Ancak kişisel bilgileriniz gizli tutulur.'
    },
  ];
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-4">
          <button
            className="w-full flex justify-between items-center text-left text-blue-800 font-semibold text-lg focus:outline-none"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
            aria-controls={`faq-content-${idx}`}
          >
            <span>{faq.question}</span>
            <svg className={`w-6 h-6 transform transition-transform ${open === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {open === idx && (
            <div id={`faq-content-${idx}`} className="mt-3 text-gray-700 text-base border-t pt-3">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomePage; 