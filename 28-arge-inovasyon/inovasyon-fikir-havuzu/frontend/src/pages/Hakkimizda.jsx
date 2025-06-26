import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Hakkimizda = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main className="flex-grow">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-center py-20 px-4 relative">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">İnovasyon Fikir Havuzu'nu Keşfedin</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Bu platform, <span className="font-semibold">Kamu AKYS</span> girişimi kapsamında geliştirilmiş olup, kamu sektöründe yeniliği ve dönüşümü teşvik eden, katılımcı ve şeffaf bir yapı sunar.
          </p>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="max-w-5xl mx-auto py-16 px-4">
        {/* Misyon & Vizyon */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Misyonumuz</h2>
            <p className="text-gray-700 leading-relaxed">
              Kamu çalışanlarının ve paydaşlarının yaratıcı fikirlerini ortaya çıkararak, bu fikirlerin şeffaf bir şekilde değerlendirilmesini ve hayata geçirilmesini sağlamak. Kamu hizmetlerinde verimliliği artıracak, toplumsal fayda sağlayacak ve dijital dönüşümü hızlandıracak yenilikçi çözümleri destekliyoruz.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Vizyonumuz</h2>
            <p className="text-gray-700 leading-relaxed">
              Türkiye'nin kamu sektöründe inovasyonun ve dijital dönüşümün öncüsü olmak. Ulusal ve uluslararası düzeyde örnek gösterilen, sürdürülebilir bir inovasyon ekosistemi kurarak, geleceğin kamu hizmetlerini bugünden şekillendirmeyi hedefliyoruz.
            </p>
          </div>
        </div>

        {/* Platformun Özellikleri */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Platformumuz Neler Sunuyor?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-semibold text-xl text-blue-800 mb-2">Açık Katılım</h3>
              <p className="text-sm text-gray-600">Tüm kamu çalışanları fikirlerini özgürce paylaşabilir.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-semibold text-xl text-blue-800 mb-2">Şeffaf Değerlendirme</h3>
              <p className="text-sm text-gray-600">Fikirler oylama ve uzman görüşleriyle adil bir şekilde incelenir.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-semibold text-xl text-blue-800 mb-2">Ortak Akıl</h3>
              <p className="text-sm text-gray-600">Kullanıcılar fikirlere yorum yaparak gelişimine katkıda bulunur.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-semibold text-xl text-blue-800 mb-2">Destek ve Mentorluk</h3>
              <p className="text-sm text-gray-600">Kabul edilen projelere hayata geçmeleri için destek sağlanır.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Hakkimizda; 