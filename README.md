# Gemini CLI Türkçe 🇹🇷

> Türkçe konuşan geliştiriciler için özel olarak tasarlanmış Gemini CLI arayüzü

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

## 📋 Proje Hakkında

**Gemini CLI Türkçe**, Google'ın açık kaynaklı Gemini CLI aracını temel alarak Türkçe konuşan geliştiriciler için zenginleştirilmiş bir komut satırı deneyimi sunar. Bu proje, TUBITAK CLI araştırma projesi kapsamında geliştirilmektedir.

### ✨ Özellikler

- 🌍 **Tam Türkçe Lokalizasyon**: Tüm arayüz, yardım metinleri ve hata mesajları Türkçe
- 💬 **Türkçe Slash Komutlar**: Akademik ve profesyonel kullanım için özel Türkçe komutlar
- 🎨 **Modern CLI Arayüzü**: React Ink ile oluşturulmuş interaktif menüler
- 📚 **Kapsamlı Türkçe Dokümantasyon**: Detaylı kullanım kılavuzu ve örnekler
- 🔧 **MCP Server Desteği**: Özelleştirilebilir araçlar ve eklentiler
- 🎯 **Akademik Odaklı**: Öğrenciler ve araştırmacılar için özel komutlar

## 🎯 Kullanım Senaryoları

### 📖 Akademik Çalışmalar
```bash
# Ders notlarını özetle
gemini-tr /akademik:ozetle -f ders-notlari.pdf

# Kod ödevini Türkçe açıkla
gemini-tr /kod:acikla-tr -f homework.py

# Proje raporu taslağı oluştur
gemini-tr /akademik:rapor-taslagi -f notlar.txt
```

### 💻 Yazılım Geliştirme
```bash
# Teknik konuları başlangıç seviyesinde öğren
gemini-tr /genel:acikla-baslangic "async/await nedir?"

# Türkçe metni akademik İngilizce'ye çevir
gemini-tr /akademik:ing-ceviri-akademik "Bu çalışmada makine öğrenmesi..."
```

## 🚀 Kurulum

### Ön Gereksinimler

- Node.js >= 18.0.0
- npm veya yarn
- Gemini API anahtarı

### Adım 1: Projeyi Klonlayın

```bash
git clone https://github.com/KaraElBatson/CLI-Project-TUBITAK.git
cd CLI-Project-TUBITAK
```

### Adım 2: Bağımlılıkları Kurun

```bash
npm install
```

### Adım 3: Projeyi Derleyin

```bash
npm run build
```

### Adım 4: API Anahtarını Ayarlayın

**Önemli:** Gemini CLI Türkçe'yi kullanmak için Google Gemini API anahtarına ihtiyacınız var.

#### Hızlı Kurulum (.env dosyası - Önerilen):

```bash
# .env.example dosyasını kopyalayın
cp .env.example .env

# .env dosyasını düzenleyin ve API anahtarınızı ekleyin
# GEMINI_API_KEY=your-api-key-here
```

#### Alternatif: Sistem Ortam Değişkeni

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="your-api-key-here"
```

**Linux/Mac:**
```bash
export GEMINI_API_KEY="your-api-key-here"
```

> 📘 **Detaylı API Anahtarı Kurulum Rehberi:** [docs/API-ANAHTARI-KURULUMU.md](./docs/API-ANAHTARI-KURULUMU.md)
>
> Bu rehber şunları içerir:
> - Google AI Studio'dan API anahtarı alma
> - Windows, Linux ve Mac için kurulum
> - Kalıcı ortam değişkeni ayarlama
> - Sorun giderme

### Adım 5: Uygulamayı Başlatın

```bash
npm start
# veya
./dist/index.js
```

## 📚 Kullanılabilir Komutlar

### Akademik Komutlar (`/akademik:*`)

| Komut | Açıklama | Örnek |
|-------|----------|-------|
| `/akademik:ozetle` | Dosya/metin için Türkçe özet çıkarır | `/akademik:ozetle -f makale.pdf` |
| `/akademik:rapor-taslagi` | Notlardan rapor taslağı oluşturur | `/akademik:rapor-taslagi -f notlar.txt` |
| `/akademik:ing-ceviri-akademik` | Türkçe → Akademik İngilizce çeviri | `/akademik:ing-ceviri-akademik "metin"` |

### Kod Komutları (`/kod:*`)

| Komut | Açıklama | Örnek |
|-------|----------|-------|
| `/kod:acikla-tr` | Kodu satır satır Türkçe açıklar | `/kod:acikla-tr -f script.py` |

### Genel Komutlar (`/genel:*`)

| Komut | Açıklama | Örnek |
|-------|----------|-------|
| `/genel:acikla-baslangic` | Başlangıç seviyesinde Türkçe açıklama | `/genel:acikla-baslangic "React hooks"` |

## 🏗️ Proje Yapısı

```
gemini-cli-turkce/
├── src/                      # Kaynak kodlar
│   ├── locales/             # Dil dosyaları (tr.json, en.json)
│   ├── commands/            # Komut implementasyonları
│   ├── ui/                  # React Ink UI bileşenleri
│   └── core/                # Temel modüller
├── .gemini/                 # Gemini CLI yapılandırması
│   └── commands/            # TOML slash komutları
│       ├── akademik/        # Akademik komutlar
│       ├── kod/             # Kod ile ilgili komutlar
│       └── genel/           # Genel komutlar
├── docs/                    # Dokümantasyon
│   └── examples/            # Örnek senaryolar
├── config/                  # Yapılandırma dosyaları
├── dist/                    # Derlenmiş çıktılar
├── tsconfig.json            # TypeScript yapılandırması
├── package.json             # Proje bağımlılıkları
├── ROADMAP.md              # Proje yol haritası
├── Gemini_CLI_PRD.md       # Ürün gereksinimleri belgesi
└── CLAUDE.md               # AI asistan talimatları
```

## 🛠️ Geliştirme

### Geliştirme Modunda Çalıştırma

```bash
npm run dev
```

### Projeyi Derleme

```bash
npm run build
```

### Temizleme

```bash
npm run clean
```

## 📖 Dokümantasyon

- **[ROADMAP.md](./ROADMAP.md)** - Detaylı proje yol haritası ve ilerleme durumu
- **[Gemini_CLI_PRD.md](./Gemini_CLI_PRD.md)** - Ürün gereksinimleri belgesi
- **[GEMINI-CLI-UZERINE-CLI-INSA-ETME-REHBERI.md](./GEMINI-CLI-UZERINE-CLI-INSA-ETME-REHBERI.md)** - Gemini CLI üzerine geliştirme rehberi
- **[nodejs-kurulumu.md](./nodejs-kurulumu.md)** - Node.js kurulum talimatları

## 🎯 Proje Durumu

**Mevcut Faz:** Faz 1 - Analiz & Kurulum (80% tamamlandı)

### Tamamlananlar ✅

- [x] Proje yapısı oluşturuldu
- [x] TypeScript yapılandırması tamamlandı
- [x] Türkçe ve İngilizce lokalizasyon dosyaları hazırlandı
- [x] 5 temel slash komutu TOML formatında oluşturuldu
- [x] Kapsamlı dokümantasyon hazırlandı
- [x] package.json güncellendi

### Devam Edenler 🔄

- [ ] Gemini CLI yerel kurulumu ve test
- [ ] İlk MVP geliştirme

### Sırada Bekleyenler ⏳

- [ ] React Ink UI implementasyonu
- [ ] MCP server entegrasyonu
- [ ] Kapsamlı test senaryoları
- [ ] Final proje raporu

## 🤝 Katkıda Bulunma

Bu proje açık kaynaklı olarak geliştirilmektedir. Katkılarınızı bekliyoruz!

1. Projeyi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Ekip

- **Proje Sahibi**: Kara El
- **Kurum**: TUBITAK

## 🔗 Bağlantılar

- [GitHub Repository](https://github.com/KaraElBatson/CLI-Project-TUBITAK)
- [Gemini CLI (Orijinal)](https://github.com/google-gemini/gemini-cli)
- [React Ink](https://github.com/vadimdemedes/ink)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 📞 İletişim

Sorularınız veya önerileriniz için [GitHub Issues](https://github.com/KaraElBatson/CLI-Project-TUBITAK/issues) üzerinden iletişime geçebilirsiniz.

---

**Not**: Bu proje aktif geliştirme aşamasındadır. Güncellemeler için repository'yi takip edin!
