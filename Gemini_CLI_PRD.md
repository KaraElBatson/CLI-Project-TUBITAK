# Product Requirements Document
## Gemini CLI + SuperGemini + Türkçe Arayüz

**Versiyon:** 1.0  
**Tarih:** Aralık 2025  
**Hazırlayan:** Kara El  
**Durum:** Taslak

---

## 1. Yönetici Özeti

Bu proje, Google'ın açık kaynak Gemini CLI aracını temel alarak, Türkçe konuşan geliştiriciler için zenginleştirilmiş bir komut satırı deneyimi geliştirmeyi amaçlamaktadır. Proje kapsamında Türkçe arayüz lokalizasyonu, özelleştirilmiş prompt paketleri, React Ink tabanlı modern CLI arayüzü ve kapsamlı Türkçe dokümantasyon sunulacaktır.

Gemini CLI, hâlihazırda terminalden Gemini modellerine erişim sağlayan, ReAct döngüsü kullanan ve kod, içerik üretimi ile çeşitli otomasyon senaryolarını destekleyen bir AI ajanıdır. Bizim katkımız, bu ekosistemi Türkçe kullanıcılar için erişilebilir ve fonksiyonel olarak zenginleştirilmiş hale getirmektir.

---

## 2. Problem Tanımı

### 2.1 Mevcut Durum

Gemini CLI, terminalden Gemini modellerine erişim sağlayan güçlü bir AI ajanıdır. Ancak mevcut durumda tamamen İngilizce arayüze sahiptir ve Türkçe kullanıcılar için erişilebilirlik sorunları yaratmaktadır.

### 2.2 Tespit Edilen Sorunlar

- Tüm yardım metinleri, hata mesajları ve komut açıklamaları İngilizce
- Türkçe odaklı prompt şablonları mevcut değil
- Akademik ve profesyonel Türkçe kullanım senaryoları desteklenmiyor
- CLI arayüzü düz metin tabanlı, modern UX özellikleri eksik
- "Gemini CLI İngilizce çok teknik geliyor" diyen kullanıcılar için giriş bariyeri yüksek

---

## 3. Proje Hedefleri

### 3.1 Birincil Hedefler

1. Gemini CLI'ye tam Türkçe lokalizasyon desteği eklemek
2. Türkçe odaklı prompt ve slash komut paketi geliştirmek
3. React Ink ile modern ve kullanıcı dostu CLI arayüzü oluşturmak
4. Kapsamlı Türkçe dokümantasyon ve örnek senaryolar hazırlamak

### 3.2 İkincil Hedefler

- SuperGemini framework'ünden ilham alarak persona ve workflow desteği eklemek
- Gelecekte MCP server entegrasyonu için altyapı hazırlamak
- Açık kaynak topluluğuna katkı sağlamak

---

## 4. Kapsam

### 4.1 Kapsam İçi

- Türkçe arayüz lokalizasyonu (yardım, hata mesajları, örnek promptlar)
- 5-10 adet Türkçe odaklı slash komutu
- React Ink tabanlı interaktif menü sistemi
- Türkçe README ve kullanım kılavuzu
- Örnek kullanım senaryoları ve demo

### 4.2 Kapsam Dışı

- Gemini CLI'nin temel işlevselliğini değiştirmek
- Yeni AI modeli entegrasyonu
- Web veya mobil arayüz geliştirme
- Gemini API'nin kendisinde değişiklik yapmak

---

## 5. Teknik Gereksinimler

### 5.1 Temel Bağımlılıklar

| Bileşen | Kaynak | Amaç |
|---------|--------|------|
| Gemini CLI | google-gemini/gemini-cli | Temel CLI altyapısı |
| SuperGemini | GitHub Repository | Persona ve slash komut referansı |
| React Ink | npm: ink | Modern CLI UI kütüphanesi |
| Node.js | v18+ LTS | Runtime ortamı |

### 5.2 Sistem Mimarisi

Proje, mevcut Gemini CLI üzerine bir katman (wrapper) olarak tasarlanacaktır. Bu yaklaşım, orijinal CLI'nin güncellemelerinden faydalanmayı ve geriye dönük uyumluluğu korumayı sağlar.

```
┌─────────────────────────────────────────┐
│         React Ink UI Layer              │
│    (Menüler, Spinner, Renkli Çıktı)     │
├─────────────────────────────────────────┤
│      Türkçe Lokalizasyon Katmanı        │
│   (Mesajlar, Yardım, Hata Metinleri)    │
├─────────────────────────────────────────┤
│       Slash Komut / Prompt Paketi       │
│  (/ozetle, /kod-acikla-tr, /rapor...)   │
├─────────────────────────────────────────┤
│          Gemini CLI (Base)              │
│      (google-gemini/gemini-cli)         │
└─────────────────────────────────────────┘
```

### 5.3 Dizin Yapısı

```
gemini-cli-tr/
├── src/
│   ├── locales/
│   │   ├── tr.json
│   │   └── en.json
│   ├── commands/
│   │   ├── ozetle.js
│   │   ├── kod-acikla-tr.js
│   │   ├── rapor-taslagi.js
│   │   └── ...
│   ├── ui/
│   │   ├── MainMenu.jsx
│   │   ├── PromptInput.jsx
│   │   └── HistoryList.jsx
│   └── index.js
├── docs/
│   ├── README-TR.md
│   └── examples/
├── config.json
└── package.json
```

---

## 6. Fonksiyonel Gereksinimler

### 6.1 Türkçe Lokalizasyon

| Özellik | Açıklama | Öncelik |
|---------|----------|---------|
| Dil Yapılandırması | `config.json` içinde `language: "tr" \| "en"` seçimi | Yüksek |
| Runtime Dil Değişimi | `--lang tr` parametresi ile anlık dil değişimi | Yüksek |
| Yardım Metinleri | `--help`, `--version` komutlarının Türkçe çevirisi | Yüksek |
| Hata Mesajları | API key yok, bağlantı hatası vb. mesajların lokalizasyonu | Yüksek |
| Örnek Kullanımlar | Örnek komut ve prompt mesajlarının Türkçe versiyonları | Orta |

### 6.2 Slash Komut Paketi

| Komut | Açıklama | Örnek Kullanım |
|-------|----------|----------------|
| `/ozetle` | Dosya veya metin için Türkçe özet çıkarır, akademik/teknik ton ayarı yapılabilir | `ai /ozetle -f ders-notlari.pdf` |
| `/acikla-baslangic` | Teknik konuları başlangıç seviyesine göre Türkçe açıklar | `ai /acikla-baslangic "async/await nedir?"` |
| `/kod-acikla-tr` | Verilen kodu satır satır Türkçe açıklar | `ai /kod-acikla-tr -f script.py` |
| `/rapor-taslagi` | Notlardan proje raporu veya ödev taslağı oluşturur | `ai /rapor-taslagi -f notlar.txt` |
| `/ing-ceviri-akademik` | Türkçe metni akademik İngilizce'ye çevirir | `ai /ing-ceviri-akademik "Bu çalışmada..."` |

#### Örnek Prompt Şablonu

```
Sen Türkçe konuşan bir asistansın. Kullanıcı sana ders notları verecek.
Görevin:
1) Maksimum 10 maddede özet çıkarmak,
2) Her maddeyi en fazla 2 cümleyle yazmak,
3) Teknik terimleri parantez içinde İngilizce karşılığı ile belirtmek.
Çıktıyı sadece madde işaretli liste olarak ver.
```

### 6.3 React Ink Arayüzü

| Bileşen | Açıklama |
|---------|----------|
| Ana Menü | Chat, Kod Açıklama, Not Özetle, Ayarlar seçenekleri |
| Prompt Input | Interaktif prompt giriş alanı |
| Spinner | Yükleniyor göstergesi |
| Hata Gösterimi | Renkli hata ve uyarı mesajları |
| Geçmiş Listesi | Son 3 sohbeti gösteren liste |
| Dil Seçimi | Menü içinden TR/EN değiştirme |

---

## 7. Proje Zaman Çizelgesi

### Aşama 1: Analiz & Kurulum (1 Hafta)

**Hedefler:**
- Gemini CLI deposunu inceleme ve kurulum
- Temel komutların (chat, tools, context) test edilmesi
- SuperGemini dokümantasyonunun incelenmesi
- Proje Git repository'sinin oluşturulması

**Çıktılar:**
- Çalışan vanilla Gemini CLI
- Analiz ve mimari notları

### Aşama 2: Türkçe Arayüz & Config (1-1.5 Hafta)

**Hedefler:**
- `config.json` içinde dil seçimi yapısının oluşturulması
- Yardım metinleri ve hata mesajlarının TR versiyonlarının yazılması
- `--lang tr` parametresinin implementasyonu

**Çıktılar:**
- Türkçe konuşabilen CLI
- Dil seçimi desteği

### Aşama 3: Prompt / Slash Komut Paketi (1-1.5 Hafta)

**Hedefler:**
- 5-10 adet temel komutun belirlenmesi
- Her komut için system prompt tasarımı
- Komutların CLI'ye entegrasyonu

**Çıktılar:**
- Fonksiyonel Türkçe slash komutları
- Prompt şablon kütüphanesi

### Aşama 4: React Ink Arayüzü (1 Hafta)

**Hedefler:**
- Ink ile ana menü implementasyonu
- Prompt giriş alanı ve cevap gösterimi
- UX detayları (spinner, renkli uyarılar)

**Çıktılar:**
- Menülü ve interaktif CLI arayüzü

### Aşama 5: Test & Raporlama

**Hedefler:**
- Farklı senaryoların test edilmesi
- Hata düzeltmeleri
- Proje raporunun hazırlanması
- Dokümantasyonun tamamlanması

**Çıktılar:**
- Final proje raporu
- Türkçe README ve örnek senaryolar

---

## 8. Risk Analizi

| Risk | Olasılık | Etki | Azaltma Stratejisi |
|------|----------|------|-------------------|
| Gemini CLI API değişiklikleri | Orta | Yüksek | Modüler mimari, soyutlama katmanları kullanma |
| Prompt kalitesi tutarsızlığı | Orta | Orta | Kapsamlı test, iteratif iyileştirme |
| Zaman kısıtları | Yüksek | Orta | MVP önceliklendirme, fazlı teslimat |
| Node.js / Ink uyumluluk sorunları | Düşük | Orta | LTS versiyonları kullanma, bağımlılık kilitleme |
| Gemini API rate limiting | Düşük | Düşük | Hata yönetimi, retry mekanizması |

---

## 9. Başarı Kriterleri

1. Tüm yardım ve hata mesajlarının %100 Türkçe lokalizasyonu
2. Minimum 5 fonksiyonel slash komutunun çalışır durumda olması
3. React Ink ile interaktif menü sisteminin tamamlanması
4. Kapsamlı Türkçe README ve en az 3 örnek senaryo dokümantasyonu
5. Tüm temel fonksiyonların hatasız çalışması
6. Proje raporunun zamanında teslimi

---

## 10. Örnek Kullanım Senaryoları

### Senaryo 1: Sınav Çalışırken Ders Notlarını Özetleme

```bash
$ ai /ozetle -f veri-yapilari-notlari.pdf --ton akademik

📝 Özet (10 madde):
• Veri yapıları, verilerin organize edilme ve saklanma biçimleridir (Data Structures)
• Array'ler sabit boyutlu, ardışık bellek konumlarında veri saklar...
...
```

### Senaryo 2: Kod Ödevi İçin Fonksiyon Açıklaması

```bash
$ ai /kod-acikla-tr -f quicksort.py

📖 Kod Açıklaması:
Satır 1-3: Fonksiyon tanımı ve base case kontrolü...
Satır 4: Pivot elemanı seçimi...
...
```

### Senaryo 3: Rapor Giriş Kısmını TR→EN Çevirtme

```bash
$ ai /ing-ceviri-akademik "Bu çalışmada, makine öğrenmesi algoritmalarının..."

🔄 Akademik İngilizce Çeviri:
"In this study, machine learning algorithms..."
```

---

## 11. Gelecek Geliştirmeler

- **MCP Server Entegrasyonu:** Model Context Protocol ile genişletilmiş araç desteği
- **GitHub Actions CI/CD:** Otomatik test ve dağıtım pipeline'ı
- **Ek Dil Desteği:** Kürtçe, Arapça vb. lokalizasyon
- **Tema Sistemi:** Özelleştirilebilir renk şemaları
- **Plugin Mimarisi:** Topluluk tarafından geliştirilebilir eklenti sistemi
- **VS Code Entegrasyonu:** Editor içinden CLI erişimi

---

## 12. Onay

Bu PRD belgesi, proje kapsamını ve gereksinimlerini tanımlamaktadır. Proje başlamadan önce ilgili paydaşların onayı gerekmektedir.

| Rol | İsim | Tarih | İmza |
|-----|------|-------|------|
| Proje Sahibi | | | |
| Danışman | | | |

---

**Doküman Geçmişi:**

| Versiyon | Tarih | Değişiklik | Yazar |
|----------|-------|------------|-------|
| 1.0 | Aralık 2025 | İlk taslak | Kara El |
