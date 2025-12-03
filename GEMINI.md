# Gemini CLI Türkçe - Proje Bağlamı

Bu dosya, Gemini AI modeline bu proje hakkında bilgi sağlar.

## Proje Genel Bakış

**Proje Adı:** Gemini CLI Türkçe
**Versiyon:** 0.1.0
**Dil:** TypeScript/JavaScript (Node.js)
**Hedef:** Türkçe konuşan geliştiriciler için Gemini CLI arayüzü

## Proje Yapısı

```
gemini-cli-turkce/
├── src/
│   ├── index.ts              # Ana CLI giriş noktası
│   ├── locales/
│   │   ├── tr.json           # Türkçe çeviriler
│   │   └── en.json           # İngilizce çeviriler
│   ├── commands/             # Komut implementasyonları
│   ├── ui/                   # React Ink UI bileşenleri
│   └── core/                 # Temel modüller
├── .gemini/
│   ├── settings.json         # Gemini CLI ayarları
│   └── commands/             # TOML slash komutları
│       ├── akademik/         # Akademik komutlar
│       ├── kod/              # Kod komutları
│       └── genel/            # Genel komutlar
├── config/                   # Yapılandırma dosyaları
├── docs/                     # Dokümantasyon
└── dist/                     # Derlenmiş çıktılar
```

## Kodlama Standartları

### TypeScript
- Strict mode kullan
- ES2022 target
- NodeNext module resolution
- Tüm fonksiyonlar için tip tanımlamaları

### Dil ve Lokalizasyon
- Tüm kullanıcı mesajları `src/locales/` dosyalarından gelir
- Varsayılan dil: Türkçe (tr)
- Fallback dil: İngilizce (en)
- Kod içinde hard-coded metin kullanma

### Hata Yönetimi
- Tüm hataları yakala ve anlamlı Türkçe mesajlar göster
- Kritik hatalarda graceful degradation
- API hatalarında yeniden deneme mekanizması

## Slash Komutlar

### Mevcut Komutlar

#### Akademik Komutlar (/akademik:*)
- `/akademik:ozetle` - Dosya/metin Türkçe özet
- `/akademik:rapor-taslagi` - Rapor taslağı oluşturma
- `/akademik:ing-ceviri-akademik` - Akademik İngilizce çeviri

#### Kod Komutları (/kod:*)
- `/kod:acikla-tr` - Türkçe kod açıklama

#### Genel Komutlar (/genel:*)
- `/genel:acikla-baslangic` - Başlangıç seviyesi açıklama

## API Kullanımı

### Ortam Değişkenleri
- `GEMINI_API_KEY` - Google Gemini API anahtarı (zorunlu)
- `DEFAULT_LANG` - Varsayılan dil (opsiyonel, varsayılan: tr)

### Model Ayarları
- Model: gemini-2.5-pro
- Temperature: 0.7
- Max Tokens: 2048

## Geliştirme Komutları

```bash
# Bağımlılıkları kur
npm install

# TypeScript derle
npm run build

# Geliştirme modu
npm run dev

# Uygulamayı çalıştır
npm start
# veya
node dist/index.js

# Temizle
npm run clean
```

## Önemli Notlar

1. **Dil Tercihi:** Tüm kullanıcı arayüzü ve mesajlar Türkçe olmalı
2. **Güvenlik:** API anahtarlarını asla kodda saklamayın, .env kullanın
3. **Performans:** Lokalizasyon dosyaları uygulama başlangıcında bir kez yüklenir
4. **Hata Mesajları:** Teknik detayları kullanıcıdan gizleyin, anlaşılır Türkçe açıklamalar verin

## Test Senaryoları

### Temel Kullanım
```bash
# Yardım
gemini-tr --help

# Versiyon
gemini-tr --version

# Sohbet
gemini-tr chat

# Dil değiştir
gemini-tr chat --lang en
```

### Slash Komutlar
```bash
# Özet çıkar
gemini-tr /akademik:ozetle -f dosya.pdf

# Kod açıkla
gemini-tr /kod:acikla-tr -f script.py
```

## Bilinen Sorunlar

- React Ink UI henüz implementasyonda değil (Faz 4)
- MCP server entegrasyonu bekleniyor (Faz 3)
- Slash komutlar henüz çalışmıyor (Faz 2-3)

## Gelecek Özellikler

1. React Ink ile interaktif UI
2. MCP server ile özel araçlar
3. Slash komutların tam implementasyonu
4. Dosya yükleme ve işleme
5. Gelişmiş prompt yönetimi
