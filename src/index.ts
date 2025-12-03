#!/usr/bin/env node

/**
 * Gemini CLI Türkçe
 * Türkçe lokalizasyonlu Gemini CLI wrapper
 * 
 * @author Kara El
 * @version 0.1.0
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chalk from 'chalk';

// ES Module için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dil dosyalarını yükle
interface LocaleData {
  app: {
    name: string;
    version: string;
    description: string;
  };
  messages: {
    welcome: string;
    loading: string;
    processing: string;
    completed: string;
    cancelled: string;
    success: string;
  };
  errors: {
    api_key_missing: string;
    connection_failed: string;
    file_not_found: string;
    invalid_command: string;
    permission_denied: string;
    rate_limit: string;
    unknown_error: string;
  };
  help: {
    usage: string;
    commands: string;
    options: string;
    examples: string;
    description: Record<string, string>;
  };
}

// Varsayılan dil
let currentLocale: LocaleData;

// Gömülü varsayılan Türkçe çeviriler (fallback için)
const DEFAULT_LOCALE_TR: LocaleData = {
  app: {
    name: "Gemini CLI Türkçe",
    version: "0.1.0",
    description: "Türkçe lokalizasyonlu Gemini CLI arayüzü"
  },
  messages: {
    welcome: "Gemini CLI Türkçe'ye hoş geldiniz!",
    loading: "Yükleniyor...",
    processing: "İşleniyor...",
    completed: "Tamamlandı!",
    cancelled: "İptal edildi",
    success: "Başarılı!"
  },
  errors: {
    api_key_missing: "HATA: Gemini API anahtarı bulunamadı. Lütfen GEMINI_API_KEY ortam değişkenini ayarlayın.",
    connection_failed: "Bağlantı hatası: Gemini API'ye bağlanılamadı.",
    file_not_found: "Dosya bulunamadı: {file}",
    invalid_command: "Geçersiz komut: {command}",
    permission_denied: "İzin reddedildi: {action}",
    rate_limit: "İstek limiti aşıldı. Lütfen bir süre bekleyin.",
    unknown_error: "Bilinmeyen bir hata oluştu: {error}"
  },
  help: {
    usage: "Kullanım",
    commands: "Komutlar",
    options: "Seçenekler",
    examples: "Örnekler",
    description: {
      chat: "Gemini ile sohbet başlatır",
      explain: "Kod veya metin açıklaması yapar",
      summarize: "Dosya veya metin özetler",
      translate: "Türkçe → İngilizce akademik çeviri",
      report: "Notlardan rapor taslağı oluşturur"
    }
  }
};

/**
 * Olası locale dosya yollarını döndürür
 * Hem development hem production ortamlarını destekler
 */
function getLocalePaths(lang: string): string[] {
  return [
    // Production: dist/locales/ (npm paketi olarak)
    join(__dirname, 'locales', `${lang}.json`),
    // Development: src/locales/ (proje kökünden)
    join(__dirname, '..', 'src', 'locales', `${lang}.json`),
    // Alternative: locales/ (proje kökünde)
    join(__dirname, '..', 'locales', `${lang}.json`),
  ];
}

/**
 * Dil dosyasını yükler
 * Birden fazla olası konumu dener ve bulamazsa gömülü varsayılana döner
 */
function loadLocale(lang: string = 'tr'): LocaleData {
  const paths = getLocalePaths(lang);
  
  // Tüm olası yolları dene
  for (const localePath of paths) {
    try {
      const content = readFileSync(localePath, 'utf-8');
      return JSON.parse(content) as LocaleData;
    } catch {
      // Bu yolda dosya yok, sonrakini dene
      continue;
    }
  }
  
  // İstenen dil bulunamadı, Türkçe'yi dene (eğer farklı bir dil istendiyse)
  if (lang !== 'tr') {
    console.error(chalk.yellow(`Uyarı: ${lang}.json yüklenemedi, Türkçe kullanılıyor.`));
    const trPaths = getLocalePaths('tr');
    for (const localePath of trPaths) {
      try {
        const content = readFileSync(localePath, 'utf-8');
        return JSON.parse(content) as LocaleData;
      } catch {
        continue;
      }
    }
  }
  
  // Hiçbir dosya bulunamadı, gömülü varsayılanı kullan
  console.error(chalk.yellow('Uyarı: Dil dosyaları bulunamadı, gömülü varsayılan kullanılıyor.'));
  return DEFAULT_LOCALE_TR;
}

/**
 * Hoşgeldin mesajını gösterir
 */
function showWelcome(): void {
  console.log();
  console.log(chalk.cyan.bold('╔════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║') + chalk.white.bold('          🌟 Gemini CLI Türkçe v0.1.0 🌟              ') + chalk.cyan.bold('║'));
  console.log(chalk.cyan.bold('╚════════════════════════════════════════════════════════╝'));
  console.log();
  console.log(chalk.green('  ' + currentLocale.messages.welcome));
  console.log();
}

/**
 * Yardım mesajını gösterir
 */
function showHelp(): void {
  console.log();
  console.log(chalk.yellow.bold(`📖 ${currentLocale.help.usage}:`));
  console.log(chalk.white('  gemini-tr [komut] [seçenekler]'));
  console.log();
  
  console.log(chalk.yellow.bold(`📌 ${currentLocale.help.commands}:`));
  console.log(chalk.white('  chat        ') + chalk.gray(currentLocale.help.description.chat));
  console.log(chalk.white('  explain     ') + chalk.gray(currentLocale.help.description.explain));
  console.log(chalk.white('  summarize   ') + chalk.gray(currentLocale.help.description.summarize));
  console.log(chalk.white('  translate   ') + chalk.gray(currentLocale.help.description.translate));
  console.log(chalk.white('  report      ') + chalk.gray(currentLocale.help.description.report));
  console.log();
  
  console.log(chalk.yellow.bold(`⚙️  ${currentLocale.help.options}:`));
  console.log(chalk.white('  --lang, -l  ') + chalk.gray('Dil seçimi (tr/en)'));
  console.log(chalk.white('  --help, -h  ') + chalk.gray('Bu yardım mesajını gösterir'));
  console.log(chalk.white('  --version   ') + chalk.gray('Versiyon bilgisini gösterir'));
  console.log();
  
  console.log(chalk.yellow.bold(`💡 ${currentLocale.help.examples}:`));
  console.log(chalk.gray('  $ gemini-tr chat'));
  console.log(chalk.gray('  $ gemini-tr explain dosya.ts'));
  console.log(chalk.gray('  $ gemini-tr summarize README.md --lang tr'));
  console.log();
}

/**
 * Versiyon bilgisini gösterir
 */
function showVersion(): void {
  console.log(chalk.cyan(`${currentLocale.app.name} v${currentLocale.app.version}`));
  console.log(chalk.gray(currentLocale.app.description));
}

/**
 * API anahtarı kontrolü
 */
function checkApiKey(): boolean {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.log();
    console.log(chalk.red.bold('❌ ' + currentLocale.errors.api_key_missing));
    console.log();
    console.log(chalk.yellow('💡 API anahtarı almak için:'));
    console.log(chalk.gray('   1. https://aistudio.google.com/ adresine gidin'));
    console.log(chalk.gray('   2. API anahtarı oluşturun'));
    console.log(chalk.gray('   3. Ortam değişkenini ayarlayın:'));
    console.log(chalk.white('      $env:GEMINI_API_KEY="your-api-key"'));
    console.log();
    return false;
  }
  return true;
}

/**
 * Ana fonksiyon
 */
async function main(): Promise<void> {
  // Dili yükle
  const langArg = process.argv.find(arg => arg.startsWith('--lang=') || arg.startsWith('-l='));
  const lang = langArg ? langArg.split('=')[1] : 'tr';
  currentLocale = loadLocale(lang);

  const args = process.argv.slice(2);
  
  // Argüman kontrolü
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    showWelcome();
    showHelp();
    return;
  }
  
  if (args.includes('--version') || args.includes('-v')) {
    showVersion();
    return;
  }

  // API anahtarı kontrolü
  if (!checkApiKey()) {
    process.exit(1);
  }

  const command = args[0];
  
  switch (command) {
    case 'chat':
      console.log(chalk.cyan('💬 Sohbet modu başlatılıyor...'));
      console.log(chalk.gray('   (Bu özellik Faz 2\'de eklenecek)'));
      break;
      
    case 'explain':
      console.log(chalk.cyan('📝 Kod açıklama modu...'));
      console.log(chalk.gray('   (Bu özellik Faz 2\'de eklenecek)'));
      break;
      
    case 'summarize':
      console.log(chalk.cyan('📋 Özet çıkarma modu...'));
      console.log(chalk.gray('   (Bu özellik Faz 2\'de eklenecek)'));
      break;
      
    case 'translate':
      console.log(chalk.cyan('🌐 Çeviri modu...'));
      console.log(chalk.gray('   (Bu özellik Faz 2\'de eklenecek)'));
      break;
      
    case 'report':
      console.log(chalk.cyan('📄 Rapor oluşturma modu...'));
      console.log(chalk.gray('   (Bu özellik Faz 2\'de eklenecek)'));
      break;
      
    default:
      console.log(chalk.red(`❌ ${currentLocale.errors.invalid_command.replace('{command}', command)}`));
      console.log(chalk.yellow('💡 Kullanılabilir komutları görmek için: gemini-tr --help'));
  }
}

// Programı başlat
main().catch((error: Error) => {
  console.error(chalk.red('Hata:'), error.message);
  process.exit(1);
});

