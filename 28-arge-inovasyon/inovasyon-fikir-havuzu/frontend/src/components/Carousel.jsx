import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80',
    title: 'Kamu İçin İnovasyon',
    desc: 'Kamu kurumlarında yenilikçi fikirler ve dijital dönüşüm için güçlü bir platform.'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
    title: 'Ekip Çalışması ve Katılımcılık',
    desc: 'Çalışanlar arası iş birliği ve ortak akıl ile daha verimli çözümler.'
  },
  {
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    title: 'Fikirlerin Gücü',
    desc: 'Her fikir değerlidir. Paylaş, oyla, katkı sun ve fark yarat!'
  },
  {
    image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1200&q=80',
    title: 'Şeffaf Değerlendirme',
    desc: 'Fikirler adil ve şeffaf şekilde değerlendirilir, en iyi projeler desteklenir.'
  },
  {
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80',
    title: 'Teknoloji ve Gelecek',
    desc: 'Kamu için sürdürülebilir ve yenilikçi teknolojik çözümler.'
  }
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // Otomatik geçiş efekti
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden select-none">
      <img
        src={slides[current].image}
        alt={slides[current].title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 scale-105"
        style={{zIndex: 1}}
      />
      {/* Koyu katman */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70" style={{zIndex: 2}} />
      {/* Başlık ve açıklama */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg mt-10 md:mt-0">{slides[current].title}</h2>
        <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl drop-shadow-lg">{slides[current].desc}</p>
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow transition border border-white/30"
            aria-label="Önceki"
            style={{backdropFilter: 'blur(2px)'}}
          >
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow transition border border-white/30"
            aria-label="Sonraki"
            style={{backdropFilter: 'blur(2px)'}}
          >
            &#8594;
          </button>
        </div>
      </div>
      {/* Dotlar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-4 h-4 rounded-full border-2 ${idx === current ? 'bg-white border-blue-700 scale-110' : 'bg-white/40 border-white'} transition-all`}
            style={{boxShadow: idx === current ? '0 0 0 2px #2563eb' : undefined}}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel; 