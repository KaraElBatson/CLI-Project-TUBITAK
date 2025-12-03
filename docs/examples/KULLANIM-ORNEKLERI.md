# Gemini CLI Türkçe - Kullanım Örnekleri

Bu döküman, Gemini CLI Türkçe'nin çeşitli senaryolarda nasıl kullanılacağını gösterir.

## 📋 İçindekiler

1. [Temel Kullanım](#temel-kullanım)
2. [Akademik Çalışmalar](#akademik-çalışmalar)
3. [Yazılım Geliştirme](#yazılım-geliştirme)
4. [Dil Değiştirme](#dil-değiştirme)
5. [İleri Seviye Kullanım](#ileri-seviye-kullanım)

---

## Temel Kullanım

### Yardım Alma

```bash
# Tüm komutları ve seçenekleri göster
gemini-tr --help

# veya kısa versiyonu
gemini-tr -h
```

**Çıktı:**
```
╔════════════════════════════════════════════════════════╗
║          🌟 Gemini CLI Türkçe v0.1.0 🌟              ║
╚════════════════════════════════════════════════════════╝

  Gemini CLI Türkçe'ye hoş geldiniz!

📖 Kullanım:
  gemini-tr [komut] [seçenekler]

📌 Komutlar:
  chat        Gemini ile sohbet başlatır
  explain     Kod veya metin açıklaması yapar
  summarize   Dosya veya metin özetler
  ...
```

### Versiyon Bilgisi

```bash
gemini-tr --version
```

**Çıktı:**
```
Gemini CLI Türkçe v0.1.0
Türkçe lokalizasyonlu Gemini CLI arayüzü
```

### Basit Sohbet

```bash
gemini-tr chat
```

Bu komut, Gemini ile interaktif sohbet başlatır (Faz 2'de aktif olacak).

---

## Akademik Çalışmalar

### Örnek 1: Ders Notlarını Özetleme

**Senaryo:** Veri yapıları dersi için 50 sayfalık ders notlarınız var. Hızlıca özet çıkarmak istiyorsunuz.

```bash
gemini-tr /akademik:ozetle -f veri-yapilari-notlari.pdf --ton akademik
```

**Beklenen Çıktı:**
```
📝 Özet (10 madde):

• Veri yapıları, verilerin organize edilme ve saklanma biçimleridir (Data Structures)
• Array'ler sabit boyutlu, ardışık bellek konumlarında veri saklar
• Linked List'ler dinamik boyutlu, pointer'lar ile bağlı düğümlerden oluşur
• Stack LIFO (Last In First Out) prensibiyle çalışır, push/pop operasyonları O(1)
• Queue FIFO (First In First Out) prensibiyle çalışır, enqueue/dequeue O(1)
• Tree yapıları hiyerarşik veri organizasyonu sağlar, Binary Tree en yaygınıdır
• Graph'lar node ve edge'lerden oluşur, ağ yapılarını modellemek için kullanılır
• Hash Table'lar key-value çiftlerini O(1) erişim hızında saklar
• Heap min-heap ve max-heap olarak ikiye ayrılır, öncelik kuyruklarında kullanılır
• Big O notasyonu algoritmaların zaman ve alan karmaşıklığını ifade eder
```

### Örnek 2: Proje Raporu Taslağı Oluşturma

**Senaryo:** Makine öğrenmesi projesi için notlarınızdan rapor hazırlamanız gerekiyor.

```bash
gemini-tr /akademik:rapor-taslagi -f proje-notlari.txt
```

**Örnek Çıktı:**
```markdown
# PROJE RAPORU TASLAĞI

## 1. GİRİŞ

Makine öğrenmesi alanında gelişen yapay zeka teknolojileri...

### 1.1 Amaç ve Kapsam
Bu çalışmanın amacı...

## 2. YÖNTEM / YAKLAŞIM

### 2.1 Kullanılan Yöntemler
- K-Nearest Neighbors (KNN) algoritması
- Random Forest sınıflandırıcı
- Veri ön işleme teknikleri

### 2.2 Süreç Adımları
1. Veri toplama ve temizleme
2. Özellik mühendisliği
3. Model eğitimi ve değerlendirme
...
```

### Örnek 3: Türkçe → Akademik İngilizce Çeviri

**Senaryo:** Makale özetinizi akademik İngilizce'ye çevirmeniz gerekiyor.

```bash
gemini-tr /akademik:ing-ceviri-akademik "Bu çalışmada, makine öğrenmesi algoritmalarının görüntü sınıflandırma problemlerindeki performansı incelenmiştir."
```

**Çıktı:**
```
**Orijinal Türkçe:**
Bu çalışmada, makine öğrenmesi algoritmalarının görüntü sınıflandırma
problemlerindeki performansı incelenmiştir.

**Akademik İngilizce Çeviri:**
This study examines the performance of machine learning algorithms in
image classification problems.

**Kullanılan Terimler:**
- makine öğrenmesi → machine learning
- algoritma → algorithm
- görüntü sınıflandırma → image classification
- performans → performance
```

---

## Yazılım Geliştirme

### Örnek 4: Kod Açıklama (Türkçe)

**Senaryo:** Python'da yazdığınız quicksort algoritmasını ödevde açıklamanız gerekiyor.

```bash
gemini-tr /kod:acikla-tr -f quicksort.py
```

**Örnek `quicksort.py`:**
```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
```

**Beklenen Çıktı:**
```
📖 Kod Açıklaması:

**Genel Amaç:**
Bu kod, quicksort algoritmasını kullanarak bir diziyi küçükten büyüğe sıralar.
Quicksort, böl ve yönet (divide and conquer) yaklaşımı kullanan O(n log n)
ortalama karmaşıklığa sahip bir sıralama algoritmasıdır.

**Satır Satır Açıklama:**

Satır 2-3: Base case kontrolü
- Eğer dizi 1 veya daha az elemana sahipse zaten sıralıdır, olduğu gibi döndürülür

Satır 4: Pivot seçimi
- Dizinin ortasındaki eleman pivot olarak seçilir
- Bu strateji genellikle iyi performans sağlar

Satır 5: Sol bölüm (left)
- List comprehension ile pivot'tan küçük tüm elemanlar alınır
- Bu elemanlar solda kalacak

Satır 6: Orta bölüm (middle)
- Pivot'a eşit tüm elemanlar (duplicate'ler) ayrı tutulur

Satır 7: Sağ bölüm (right)
- Pivot'tan büyük tüm elemanlar alınır

Satır 8: Rekürsif çağrı ve birleştirme
- Sol ve sağ bölümler rekürsif olarak sıralanır
- Sıralı sol + orta + sıralı sağ birleştirilerek sonuç elde edilir

**Dikkat Edilmesi Gerekenler:**
- Rekürsif yapı sebebiyle çok büyük dizilerde stack overflow riski vardır
- List comprehension'lar her adımda yeni listeler oluşturur (O(n) alan)
- In-place quicksort versiyonu daha az bellek kullanır
```

### Örnek 5: Başlangıç Seviyesi Teknik Açıklama

**Senaryo:** async/await kavramını yeni öğrenmeye başladınız.

```bash
gemini-tr /genel:acikla-baslangic "async/await nedir?"
```

**Çıktı:**
```
🎓 Başlangıç Seviyesi Açıklama: async/await

**Basit Tanım:**
async/await, JavaScript'te asenkron (eş zamanlı olmayan) işlemleri daha kolay ve
anlaşılır yazmamızı sağlayan bir özelliktir.

**Günlük Hayattan Örnek:**
Kahve sipariş ettiğinizi düşünün:

1. **Senkron (Eski Yöntem):**
   - Kahveniz hazırlanana kadar beklersiniz
   - O sırada başka bir şey yapamazsınız
   - Sıra uzar, herkes bekler

2. **Asenkron (async/await):**
   - Sipariş verirsiniz ve numara alırsınız
   - Kahve hazırlanırken başka işlerinizi yaparsınız
   - Kahveniz hazır olunca size haber verilir

**Kod Örneği:**
```javascript
// Async fonksiyon tanımlama
async function kahveSiparisVer() {
  console.log("Kahve sipariş edildi...");

  // await ile bekle
  const kahve = await kahveHazirlama();

  console.log("Kahveniz hazır:", kahve);
}
```

**Neden Kullanırız:**
- Kodumuz daha okunabilir olur
- Callback hell'den kurtuluruz
- Hata yönetimi daha kolay (try-catch)
- Programımız donmaz, akıcı çalışır

**Ne Zaman Kullanırız:**
- API'den veri çekerken
- Dosya okuma/yazma işlemlerinde
- Veritabanı sorgularında
- Uzun süren hesaplamalar yaparken
```

---

## Dil Değiştirme

### Türkçe'den İngilizce'ye Geçiş

```bash
# İngilizce arayüz
gemini-tr chat --lang en

# veya kısa versiyon
gemini-tr chat -l en
```

### Varsayılan Dili Değiştirme

**.env dosyasında:**
```env
DEFAULT_LANG=en
```

---

## İleri Seviye Kullanım

### Örnek 6: Pipeline Kullanımı

```bash
# Git diff'i al ve açıklat
git diff main | gemini-tr /kod:acikla-tr

# Tüm .js dosyalarını özetle
find . -name "*.js" | xargs -I {} gemini-tr /kod:acikla-tr -f {}
```

### Örnek 7: Toplu Dosya İşleme

**Senaryo:** Tüm Python dosyalarınız için dokümantasyon oluşturma

```bash
# Bash script
for file in src/*.py; do
  echo "İşleniyor: $file"
  gemini-tr /kod:acikla-tr -f "$file" > "docs/$(basename $file .py)-aciklama.md"
done
```

### Örnek 8: Özel Prompt ile Kullanım

```bash
# Gelecekte desteklenecek
gemini-tr --prompt "Şu kodu TypeScript'e çevir:" -f script.js
```

---

## Sık Kullanılan Senaryolar

### 1. Sınav Hazırlığı
```bash
# Ders notlarını özetle
gemini-tr /akademik:ozetle -f ders-notlari.pdf

# Konuyu basit açıklat
gemini-tr /genel:acikla-baslangic "Binary Search Tree"
```

### 2. Ödev Hazırlama
```bash
# Kodu açıklat
gemini-tr /kod:acikla-tr -f homework.cpp

# Rapor taslağı oluştur
gemini-tr /akademik:rapor-taslagi -f proje-notlari.txt
```

### 3. Makale Yazma
```bash
# Türkçe özet → İngilizce çevir
gemini-tr /akademik:ing-ceviri-akademik "Bu çalışmada..."
```

### 4. Kod İnceleme
```bash
# Kod review
gemini-tr /kod:acikla-tr -f src/main.ts

# Hata bul
gemini-tr --prompt "Bu kodda hata var mı?" -f buggy-code.js
```

---

## İpuçları ve En İyi Uygulamalar

### 1. Dosya Yolları
```bash
# Mutlak yol kullan
gemini-tr /kod:acikla-tr -f C:\Users\asus\Desktop\code.py

# veya göreceli yol
gemini-tr /kod:acikla-tr -f ./src/utils.js
```

### 2. Uzun Metinler
```bash
# Dosyadan oku (önerilen)
gemini-tr /akademik:ozetle -f long-text.txt

# Stdin kullan
cat long-text.txt | gemini-tr /akademik:ozetle
```

### 3. Çıktıyı Kaydetme
```bash
# Dosyaya yönlendir
gemini-tr /akademik:ozetle -f notes.pdf > ozet.txt

# Hem ekranda göster hem kaydet
gemini-tr /akademik:ozetle -f notes.pdf | tee ozet.txt
```

---

## Sorun Giderme

### API Anahtarı Hatası
```
❌ HATA: Gemini API anahtarı bulunamadı
```

**Çözüm:**
```powershell
$env:GEMINI_API_KEY="your-api-key"
```

Detaylı bilgi: [API-ANAHTARI-KURULUMU.md](../API-ANAHTARI-KURULUMU.md)

### Dil Dosyası Bulunamadı
```
Uyarı: fr.json yüklenemedi, varsayılan dil kullanılıyor.
```

**Çözüm:** Sadece `tr` ve `en` dilleri desteklenir.

---

## Gelecek Örnekler (Yakında)

Bu özellikler henüz implementasyonda değil:

```bash
# React Ink interaktif menü (Faz 4)
gemini-tr --interactive

# MCP server araçları (Faz 3)
gemini-tr --use-tool web-search "Türkiye nüfusu"

# Slash komut tam desteği (Faz 2-3)
gemini-tr /akademik:makale-onerisi "makine öğrenmesi"
```

---

**Son Güncelleme:** Aralık 2025
**Proje Durumu:** Faz 1 Tamamlandı, Faz 2 Başlıyor
