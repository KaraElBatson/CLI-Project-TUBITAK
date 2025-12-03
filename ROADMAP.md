# Gemini CLI Türkçe - Proje Yol Haritası

> **Proje Durumu:** Faz 1 - Analiz & Kurulum
> **Son Güncelleme:** Aralık 2025
> **Hedef Tamamlanma:** 4-5 Hafta

---

## 📋 Genel Bakış

Bu doküman, Gemini CLI Türkçe projesinin detaylı yol haritasını, kilometre taşlarını ve ilerleme durumunu içerir.

### Proje Vizyonu

Türkçe konuşan geliştiriciler için Gemini CLI'yı erişilebilir ve zenginleştirilmiş hale getirmek. Tam Türkçe lokalizasyon, özel Türkçe komutlar ve modern CLI arayüzü ile kullanıcı deneyimini iyileştirmek.

---

## 🎯 Faz 1: Analiz & Kurulum (Hafta 1)

**Süre:** 1 Hafta
**Durum:** ✅ Tamamlandı
**Başlangıç:** Aralık 2025

### Hedefler

- [x] Gemini CLI deposunu inceleme
- [x] PRD (Product Requirements Document) oluşturma
- [x] Temel dokümantasyon hazırlığı
- [x] Proje yapısı tasarımı
- [x] Proje Git repository yapısının oluşturulması
- [x] İlk dizin yapısının kurulumu
- [x] TypeScript yapılandırması
- [x] Temel bağımlılıkların kurulumu

### Çıktılar

| Çıktı | Durum | Dosya |
|-------|-------|-------|
| Product Requirements Document | ✅ Tamamlandı | `Gemini_CLI_PRD.md` |
| Claude AI Talimatları | ✅ Tamamlandı | `CLAUDE.md` |
| Gemini CLI Rehberi | ✅ Tamamlandı | `GEMINI-CLI-UZERINE-CLI-INSA-ETME-REHBERI.md` |
| Proje Yol Haritası | ✅ Tamamlandı | `ROADMAP.md` |
| Dizin Yapısı | ✅ Tamamlandı | `src/`, `config/`, vb. |
| TypeScript Config | ✅ Tamamlandı | `tsconfig.json` |
| Güncellenmiş Package.json | ✅ Tamamlandı | `package.json` |
| Ana CLI Dosyası | ✅ Tamamlandı | `src/index.ts` |
| Türkçe Lokalizasyon | ✅ Tamamlandı | `src/locales/tr.json` |

### Görevler

#### Tamamlananlar ✅

1. ✅ Gemini CLI dokümantasyonu inceleme
2. ✅ SuperGemini framework araştırması
3. ✅ PRD belgesi hazırlama
4. ✅ Teknik mimari tasarımı
5. ✅ CLAUDE.md güncellemesi
6. ✅ Proje dizin yapısının oluşturulması
7. ✅ TypeScript yapılandırması
8. ✅ Bağımlılıkların kurulumu (npm install)
9. ✅ Gemini CLI yerel kurulumu ve test (v0.19.1)
10. ✅ Ana CLI dosyası oluşturuldu (src/index.ts)
11. ✅ TypeScript build başarılı
12. ✅ İlk commit ve GitHub push

#### Devam Edenler 🔄

(Faz 1 tamamlandı, Faz 2'ye geçiliyor)

#### Bekleyenler ⏳

(Tümü tamamlandı)

---

## 🌐 Faz 2: Türkçe Arayüz & Yapılandırma (Hafta 2-2.5)

**Süre:** 1-1.5 Hafta
**Durum:** ⏳ Bekliyor
**Tahmini Başlangıç:** Hafta 2

### Hedefler

- [ ] `config.json` içinde dil seçimi yapısı
- [ ] Yardım metinlerinin Türkçe versiyonları
- [ ] Hata mesajlarının lokalizasyonu
- [ ] `--lang tr` parametresi implementasyonu
- [ ] Dil değiştirme mekanizması

### Planlanan Çıktılar

| Çıktı | Öncelik | Açıklama |
|-------|---------|----------|
| `src/locales/tr.json` | Yüksek | Türkçe çeviri dosyası |
| `src/locales/en.json` | Orta | İngilizce referans dosyası |
| `config.json` | Yüksek | Dil yapılandırması |
| Lokalizasyon modülü | Yüksek | Çeviri yükleme sistemi |

### Görevler

1. ⏳ Tüm kullanıcı mesajlarını kataloglama
2. ⏳ Türkçe çevirileri hazırlama
3. ⏳ i18n (internationalization) sistemini kurma
4. ⏳ Dil değiştirme fonksiyonlarını implementasyon
5. ⏳ Yardım komutlarını Türkçeleştirme
6. ⏳ Hata mesajlarını Türkçeleştirme
7. ⏳ Test senaryoları oluşturma

### Başarı Kriterleri

- [ ] Tüm UI elementleri Türkçe gösterilebiliyor
- [ ] `--lang tr` ile Türkçe, `--lang en` ile İngilizce çalışıyor
- [ ] Hata mesajları anlaşılır Türkçe ile gösteriliyor
- [ ] Yardım komutları tam Türkçe

---

## 💬 Faz 3: Prompt / Slash Komut Paketi (Hafta 3-4)

**Süre:** 1-1.5 Hafta
**Durum:** ⏳ Bekliyor
**Tahmini Başlangıç:** Hafta 3

### Hedefler

- [ ] 5-10 temel Türkçe komutun tasarımı
- [ ] Her komut için system prompt yazımı
- [ ] TOML formatında komut dosyaları
- [ ] CLI'ye entegrasyon
- [ ] Test ve iyileştirme

### Planlanan Slash Komutlar

#### Yüksek Öncelikli Komutlar

| Komut | Açıklama | Dosya | Durum |
|-------|----------|-------|-------|
| `/ozetle` | Dosya/metin için Türkçe özet çıkarma | `.gemini/commands/ozetle.toml` | ⏳ |
| `/acikla-baslangic` | Başlangıç seviyesinde Türkçe açıklama | `.gemini/commands/acikla-baslangic.toml` | ⏳ |
| `/kod-acikla-tr` | Kod satır satır Türkçe açıklama | `.gemini/commands/kod-acikla-tr.toml` | ⏳ |

#### Orta Öncelikli Komutlar

| Komut | Açıklama | Dosya | Durum |
|-------|----------|-------|-------|
| `/rapor-taslagi` | Proje raporu/ödev taslağı oluşturma | `.gemini/commands/rapor-taslagi.toml` | ⏳ |
| `/ing-ceviri-akademik` | Türkçe → Akademik İngilizce çeviri | `.gemini/commands/ing-ceviri-akademik.toml` | ⏳ |

#### Ek Önerilen Komutlar

| Komut | Açıklama | Dosya | Durum |
|-------|----------|-------|-------|
| `/makale-onerisi` | Konu için Türkçe akademik kaynak önerisi | `.gemini/commands/makale-onerisi.toml` | 💡 Fikir |
| `/sunum-hazirla` | Konu için sunum taslağı oluşturma | `.gemini/commands/sunum-hazirla.toml` | 💡 Fikir |
| `/hata-coz-tr` | Hata mesajlarını Türkçe açıklama | `.gemini/commands/hata-coz-tr.toml` | 💡 Fikir |

### Görevler

1. ⏳ Her komut için detaylı prompt tasarımı
2. ⏳ TOML dosyalarını oluşturma
3. ⏳ Argüman interpolasyonu test etme
4. ⏳ Shell injection ve dosya injection kullanımı
5. ⏳ Namespace yapısını organize etme
6. ⏳ Her komut için test senaryoları
7. ⏳ Dokümantasyon yazımı

### Başarı Kriterleri

- [ ] Minimum 5 fonksiyonel slash komutu çalışıyor
- [ ] Her komut Türkçe çıktı üretiyor
- [ ] Komutlar TOML formatında doğru çalışıyor
- [ ] Argümanlar düzgün işleniyor
- [ ] Kullanım örnekleri hazır

---

## 🎨 Faz 4: React Ink Arayüzü (Hafta 5)

**Süre:** 1 Hafta
**Durum:** ⏳ Bekliyor
**Tahmini Başlangıç:** Hafta 5

### Hedefler

- [ ] React Ink kurulumu ve yapılandırması
- [ ] Ana menü bileşeni
- [ ] Prompt giriş alanı
- [ ] Cevap gösterim ekranı
- [ ] Spinner ve yükleme göstergeleri
- [ ] Renkli hata/uyarı mesajları
- [ ] Geçmiş listesi

### Planlanan UI Bileşenleri

| Bileşen | Dosya | Açıklama | Durum |
|---------|-------|----------|-------|
| Ana Menü | `src/ui/MainMenu.jsx` | Chat, Kod Açıklama, Özet, Ayarlar | ⏳ |
| Prompt Input | `src/ui/PromptInput.jsx` | Interaktif prompt giriş alanı | ⏳ |
| Response Display | `src/ui/ResponseDisplay.jsx` | Formatlanmış cevap gösterimi | ⏳ |
| Spinner | `src/ui/Spinner.jsx` | Yükleniyor animasyonu | ⏳ |
| Error Display | `src/ui/ErrorDisplay.jsx` | Renkli hata mesajları | ⏳ |
| History List | `src/ui/HistoryList.jsx` | Son 3 sohbet listesi | ⏳ |
| Language Selector | `src/ui/LanguageSelector.jsx` | TR/EN değiştirme | ⏳ |

### Görevler

1. ⏳ React Ink bağımlılıklarını kurma
2. ⏳ Temel layout yapısını oluşturma
3. ⏳ Ana menü implementasyonu
4. ⏳ Klavye navigasyonu
5. ⏳ Tema ve renk sistemi
6. ⏳ Spinner ve loading states
7. ⏳ Error handling UI
8. ⏳ Responsive tasarım (terminal boyutu)
9. ⏳ Kullanıcı testleri

### Başarı Kriterleri

- [ ] Interaktif menü çalışıyor
- [ ] Klavye ile navigasyon sorunsuz
- [ ] Spinner ve animasyonlar düzgün
- [ ] Hatalar güzel gösteriliyor
- [ ] Türkçe karakterler doğru render ediliyor
- [ ] Terminal boyutuna uyumlu

---

## 🧪 Faz 5: Test & Dokümantasyon (Final Hafta)

**Süre:** 1 Hafta
**Durum:** ⏳ Bekliyor
**Tahmini Başlangıç:** Hafta 6

### Hedefler

- [ ] Kapsamlı test senaryoları
- [ ] Bug fix ve optimizasyon
- [ ] Kullanıcı dokümantasyonu
- [ ] Kod dokümantasyonu
- [ ] Örnek senaryolar
- [ ] Proje raporu
- [ ] README güncellemesi

### Test Senaryoları

#### Fonksiyonel Testler

1. ⏳ Tüm slash komutları tek tek test
2. ⏳ Dil değiştirme testi
3. ⏳ Hata yönetimi testi
4. ⏳ Dosya yükleme testi
5. ⏳ Shell injection güvenlik testi

#### UI/UX Testleri

1. ⏳ Farklı terminal boyutlarında test
2. ⏳ Klavye kısayolları testi
3. ⏳ Navigasyon akışı testi
4. ⏳ Hata mesajları görünürlük testi
5. ⏳ Türkçe karakter render testi

#### Entegrasyon Testleri

1. ⏳ Gemini CLI ile entegrasyon testi
2. ⏳ MCP server bağlantı testi
3. ⏳ Config dosyası yükleme testi
4. ⏳ Extension mekanizması testi

### Dokümantasyon Görevleri

| Doküman | Durum | Açıklama |
|---------|-------|----------|
| README.md (Türkçe) | ⏳ | Proje açıklama ve kurulum |
| KULLANIM-KILAVUZU.md | ⏳ | Detaylı kullanım kılavuzu |
| API.md | ⏳ | MCP server API dokümantasyonu |
| ORNEKLER.md | ⏳ | Örnek kullanım senaryoları |
| KATKIDA-BULUNMA.md | ⏳ | Katkı rehberi |
| PROJE-RAPORU.md | ⏳ | Final proje raporu |

### Başarı Kriterleri

- [ ] Tüm testler başarıyla geçiyor
- [ ] Bilinen kritik bug yok
- [ ] README ve dokümantasyon tamamlandı
- [ ] En az 3 örnek senaryo hazır
- [ ] Proje raporu tamamlandı
- [ ] Kod kalitesi standartlara uygun

---

## 📊 İlerleme Göstergeleri

### Genel Tamamlanma

```
Faz 1: Analiz & Kurulum          [██████████] 100% ✅
Faz 2: Türkçe Arayüz             [░░░░░░░░░░]   0%
Faz 3: Slash Komutlar            [░░░░░░░░░░]   0%
Faz 4: React Ink UI              [░░░░░░░░░░]   0%
Faz 5: Test & Dokümantasyon      [░░░░░░░░░░]   0%
────────────────────────────────────────────
TOPLAM İLERLEME                  [██░░░░░░░░]  20%
```

### Kilometre Taşları

| Taş | Açıklama | Hedef Tarih | Durum |
|-----|----------|-------------|-------|
| M1 | Proje kurulumu tamamlandı | Hafta 1 Sonu | ✅ Tamamlandı |
| M2 | Türkçe lokalizasyon çalışıyor | Hafta 2.5 Sonu | ⏳ Bekliyor |
| M3 | İlk 5 slash komutu çalışıyor | Hafta 4 Sonu | ⏳ Bekliyor |
| M4 | React Ink UI entegre | Hafta 5 Sonu | ⏳ Bekliyor |
| M5 | Proje teslime hazır | Hafta 6 Sonu | ⏳ Bekliyor |

---

## 🎯 Öncelikli Bir Sonraki Adımlar

### Bu Hafta İçinde Tamamlanacaklar

1. **Yüksek Öncelik**
   - [ ] Dizin yapısını oluştur (`src/`, `.gemini/`, `docs/`)
   - [ ] TypeScript yapılandırmasını tamamla
   - [ ] package.json'ı güncelle (tüm bağımlılıklar)
   - [ ] İlk commit ve GitHub'a push

2. **Orta Öncelik**
   - [ ] İlk lokalizasyon dosyalarını oluştur
   - [ ] İlk 2 slash komutu TOML dosyalarını yaz
   - [ ] README.md'yi Türkçe güncelle

3. **Düşük Öncelik**
   - [ ] GEMINI.md context dosyası oluştur
   - [ ] Gelecek hafta için detaylı plan

---

## 🚧 Risk ve Engeller

| Risk | Olasılık | Etki | Azaltma Stratejisi | Durum |
|------|----------|------|-------------------|-------|
| Gemini CLI API değişiklikleri | Orta | Yüksek | Modüler mimari, soyutlama katmanları | ✅ Planlandı |
| Prompt kalitesi tutarsızlığı | Orta | Orta | Kapsamlı test, iteratif iyileştirme | ⏳ İzleniyor |
| Zaman kısıtları | Yüksek | Orta | MVP önceliklendirme, fazlı teslimat | ✅ Planlandı |
| Node.js/Ink uyumluluk | Düşük | Orta | LTS versiyonları, bağımlılık kilitleme | ⏳ İzleniyor |
| Gemini API rate limiting | Düşük | Düşük | Hata yönetimi, retry mekanizması | ⏳ İzleniyor |

---

## 📝 Notlar ve Kararlar

### Teknik Kararlar

1. **TypeScript Kullanımı**: MCP server için TypeScript, UI için JavaScript tercih edildi
2. **React Ink Versiyonu**: En son stable versiyon kullanılacak
3. **Dil Yönetimi**: JSON tabanlı i18n sistemi
4. **Config Formatı**: JSON (TOML yerine, daha yaygın)

### Tasarım Kararları

1. **Wrapper Yaklaşımı**: Gemini CLI üzerine katman, fork değil
2. **Geri Uyumluluk**: Orijinal Gemini CLI komutları korunacak
3. **Varsayılan Dil**: İlk kurulumda Türkçe
4. **Tema**: GitHub tema varsayılan

---

## 🔗 Kaynaklar

- [Gemini CLI Repository](https://github.com/google-gemini/gemini-cli)
- [React Ink Documentation](https://github.com/vadimdemedes/ink)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [PRD Belgesi](./Gemini_CLI_PRD.md)
- [Gemini CLI Rehberi](./GEMINI-CLI-UZERINE-CLI-INSA-ETME-REHBERI.md)

---

**Son Güncelleme:** Aralık 2025
**Sonraki İnceleme:** Hafta 1 Sonu
**Proje Sahibi:** Kara El
