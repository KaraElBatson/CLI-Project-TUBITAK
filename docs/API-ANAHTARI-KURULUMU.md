# Gemini API Anahtarı Kurulumu

Bu rehber, Gemini CLI Türkçe projesinde API anahtarını nasıl ayarlayacağınızı adım adım açıklar.

## 📋 İçindekiler

1. [API Anahtarı Alma](#api-anahtarı-alma)
2. [Windows Kurulumu](#windows-kurulumu)
3. [Linux/Mac Kurulumu](#linuxmac-kurulumu)
4. [.env Dosyası Kullanma (Önerilen)](#env-dosyası-kullanma)
5. [Sorun Giderme](#sorun-giderme)

---

## 🔑 API Anahtarı Alma

### Adım 1: Google AI Studio'ya Giriş

1. Tarayıcınızda https://aistudio.google.com/ adresine gidin
2. Google hesabınızla giriş yapın
3. Sol menüden **"Get API key"** veya **"API anahtarı al"** seçeneğine tıklayın

### Adım 2: API Anahtarı Oluşturma

1. **"Create API key"** butonuna tıklayın
2. Bir Google Cloud projesi seçin veya **"Create new project"** ile yeni proje oluşturun
3. API anahtarınız oluşturulacak (örnek format: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
4. **Anahtarı güvenli bir yere kopyalayın** (Bu anahtarı kimseyle paylaşmayın!)

> ⚠️ **Güvenlik Uyarısı:** API anahtarınızı asla public GitHub repository'lere, kodlara veya sosyal medyaya eklemeyin!

---

## 💻 Windows Kurulumu

### Yöntem 1: PowerShell ile Geçici Ayarlama

PowerShell terminalinizi açın ve şu komutu çalıştırın:

```powershell
$env:GEMINI_API_KEY="AIzaSy-YOUR-ACTUAL-API-KEY-HERE"
```

**Avantajlar:**
- Hemen çalışır
- Kurulum basit

**Dezavantajlar:**
- Sadece o terminal oturumu için geçerli
- Terminal kapatıldığında kaybolur

**Test:**
```powershell
node dist/index.js chat
```

### Yöntem 2: Kalıcı Sistem Ortam Değişkeni (Önerilen)

#### PowerShell ile:

```powershell
# Kullanıcı düzeyinde kalıcı ayar
[System.Environment]::SetEnvironmentVariable('GEMINI_API_KEY', 'AIzaSy-YOUR-API-KEY', 'User')
```

#### Grafik Arayüz ile:

1. **Başlat** menüsünde "ortam değişkenleri" arayın
2. **"Sistem ortam değişkenlerini düzenle"** seçeneğine tıklayın
3. **"Ortam Değişkenleri..."** butonuna tıklayın
4. **Kullanıcı değişkenleri** bölümünde **"Yeni"** butonuna tıklayın
5. Değişken adı: `GEMINI_API_KEY`
6. Değişken değeri: `AIzaSy-YOUR-API-KEY`
7. **"Tamam"** ile kaydedin
8. **PowerShell'i kapatıp yeniden açın**

**Test:**
```powershell
# Değişkenin kaydedildiğini kontrol edin
echo $env:GEMINI_API_KEY

# Uygulamayı test edin
node dist/index.js chat
```

---

## 🐧 Linux/Mac Kurulumu

### Yöntem 1: Geçici Ayarlama (Tek oturum)

```bash
export GEMINI_API_KEY="AIzaSy-YOUR-ACTUAL-API-KEY-HERE"
node dist/index.js chat
```

### Yöntem 2: Kalıcı Ayarlama (Önerilen)

#### Bash kullanıyorsanız:

```bash
echo 'export GEMINI_API_KEY="AIzaSy-YOUR-API-KEY"' >> ~/.bashrc
source ~/.bashrc
```

#### Zsh kullanıyorsanız (Mac varsayılan):

```bash
echo 'export GEMINI_API_KEY="AIzaSy-YOUR-API-KEY"' >> ~/.zshrc
source ~/.zshrc
```

**Test:**
```bash
echo $GEMINI_API_KEY
node dist/index.js chat
```

---

## 📄 .env Dosyası Kullanma (En Kolay Yöntem)

### Adım 1: .env Dosyası Oluşturma

Proje kök dizininde bir `.env` dosyası oluşturun:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

### Adım 2: API Anahtarını Ekleme

`.env` dosyasını bir metin editörü ile açın ve API anahtarınızı ekleyin:

```env
GEMINI_API_KEY=AIzaSy-YOUR-ACTUAL-API-KEY-HERE
```

### Adım 3: Test

```bash
node dist/index.js chat
```

> ℹ️ **Not:** `.env` dosyası `.gitignore` listesinde olduğu için GitHub'a yüklenmez. Bu güvenli bir yöntemdir.

---

## 🔧 Sorun Giderme

### Hata: "HATA: Gemini API anahtarı bulunamadı"

**Çözümler:**

1. **API anahtarının doğru ayarlandığını kontrol edin:**
   ```powershell
   # Windows
   echo $env:GEMINI_API_KEY

   # Linux/Mac
   echo $GEMINI_API_KEY
   ```

2. **Terminal'i yeniden başlatın:**
   - Ortam değişkenlerini kalıcı olarak eklediyseniz, terminali kapatıp yeniden açın

3. **.env dosyasını kontrol edin:**
   - `.env` dosyasının proje kök dizininde olduğundan emin olun
   - Dosya adının tam olarak `.env` olduğunu kontrol edin (`.env.txt` değil)

4. **API anahtarının geçerliliğini test edin:**
   - Google AI Studio'da anahtarın aktif olduğunu kontrol edin
   - Gerekirse yeni bir anahtar oluşturun

### Hata: "Connection failed" veya "Rate limit"

**Olası Nedenler:**

1. **İnternet bağlantısı problemi:**
   - İnternet bağlantınızı kontrol edin

2. **API kullanım limiti aşıldı:**
   - Google AI Studio'da kullanım limitlerini kontrol edin
   - Ücretsiz tier limitlerini aştıysanız biraz bekleyin

3. **Geçersiz API anahtarı:**
   - API anahtarınızı yenileyin

### Hata: "Invalid API key"

**Çözüm:**
1. API anahtarını kopyalarken baştaki/sondaki boşlukları sildiğinizden emin olun
2. Anahtarın tam ve eksiksiz kopyalandığını kontrol edin
3. Gerekirse yeni bir API anahtarı oluşturun

---

## 📊 API Anahtarı Formatı

Geçerli bir Gemini API anahtarı şu formatta olmalıdır:

```
AIzaSy[39 karakter]
```

**Örnek:** `AIzaSyABCDEFGHIJKLMNOPQRSTUVWXYZ123456789`

Toplam 39 karakter olmalıdır (başındaki `AIzaSy` dahil).

---

## 🔒 Güvenlik En İyi Uygulamaları

1. ✅ **API anahtarınızı asla public repository'lere eklemeyin**
2. ✅ **`.env` dosyasının `.gitignore` listesinde olduğundan emin olun**
3. ✅ **API anahtarlarını periyodik olarak yenileyin**
4. ✅ **Kullanılmayan anahtarları silin**
5. ✅ **API kullanım metriklerini düzenli kontrol edin**
6. ❌ **API anahtarlarını kodun içine hard-code etmeyin**
7. ❌ **API anahtarlarını e-posta veya mesajlarda paylaşmayın**

---

## 📞 Yardım

Hala sorun yaşıyorsanız:

1. [GitHub Issues](https://github.com/KaraElBatson/CLI-Project-TUBITAK/issues) üzerinden bildirin
2. [Google AI Studio Docs](https://ai.google.dev/tutorials/setup) dokümantasyonuna bakın
3. README.md dosyasındaki kurulum talimatlarını gözden geçirin

---

**Son Güncelleme:** Aralık 2025
