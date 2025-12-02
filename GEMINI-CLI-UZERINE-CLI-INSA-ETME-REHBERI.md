# Gemini CLI Üzerine CLI İnşa Etme Rehberi

Bu rehber, gemini-cli projesini temel alarak kendi CLI uygulamanızı nasıl inşa edebileceğinizi açıklamaktadır.

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Proje Yapısı](#proje-yapısı)
3. [Extension Sistemi](#extension-sistemi)
4. [MCP Server Entegrasyonu](#mcp-server-entegrasyonu)
5. [Custom Commands (Özel Komutlar)](#custom-commands-özel-komutlar)
6. [Headless Mode (Programatik Kullanım)](#headless-mode-programatik-kullanım)
7. [Yapılandırma Dosyaları](#yapılandırma-dosyaları)
8. [Örnek Extension Projesi](#örnek-extension-projesi)

---

## Genel Bakış

Gemini CLI, Google'ın Gemini AI modelini komut satırından kullanmanızı sağlayan açık kaynaklı bir araçtır. Üzerine kendi CLI'nızı inşa etmenin **3 temel yolu** vardır:

| Yöntem | Kullanım Senaryosu | Zorluk |
|--------|-------------------|--------|
| **Extension** | Mevcut Gemini CLI'ya yeni özellikler eklemek | ⭐ Kolay |
| **MCP Server** | Özel araçlar (tools) eklemek | ⭐⭐ Orta |
| **Headless Mode** | Otomasyon ve script entegrasyonu | ⭐ Kolay |

---

## Proje Yapısı

Kendi projenizde aşağıdaki yapıyı oluşturmalısınız:

```
my-project/
├── .gemini/                          # Gemini CLI yapılandırma klasörü
│   ├── settings.json                 # Proje-spesifik ayarlar
│   ├── commands/                     # Özel komutlar (TOML dosyaları)
│   │   └── my-command.toml
│   └── GEMINI.md                     # Proje bağlamı (context)
├── my-extension/                     # Özel extension (opsiyonel)
│   ├── gemini-extension.json         # Extension manifestosu
│   ├── GEMINI.md                     # Extension bağlamı
│   ├── commands/                     # Extension komutları
│   │   └── *.toml
│   ├── package.json                  # Node.js bağımlılıkları (MCP server için)
│   ├── tsconfig.json                 # TypeScript yapılandırması
│   └── src/
│       └── server.ts                 # MCP server kaynak kodu
└── scripts/
    └── automation.sh                 # Headless mode scriptleri
```

---

## Extension Sistemi

### Extension Nedir?

Extension'lar, Gemini CLI'ya yeni özellikler eklemek için kullanılan modüler paketlerdir. Bir extension şunları içerebilir:

- **MCP Server**: Özel araçlar (tools)
- **Custom Commands**: Özel slash komutları
- **Context**: Model için ek talimatlar
- **Excluded Tools**: Belirli araçları devre dışı bırakma

### Extension Oluşturma

#### 1. Boilerplate Template Kullanma

```bash
# Yeni extension oluştur
gemini extensions new my-extension mcp-server

# Veya diğer template'ler:
# gemini extensions new my-extension context
# gemini extensions new my-extension custom-commands
# gemini extensions new my-extension exclude-tools
```

#### 2. Manuel Oluşturma

**`gemini-extension.json`** (Zorunlu - Extension manifestosu):

```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "mcpServers": {
    "myServer": {
      "command": "node",
      "args": ["${extensionPath}${/}dist${/}server.js"],
      "cwd": "${extensionPath}"
    }
  },
  "contextFileName": "GEMINI.md",
  "excludeTools": ["run_shell_command(rm -rf)"],
  "settings": [
    {
      "name": "API Key",
      "description": "Harici servis için API anahtarı",
      "envVar": "MY_API_KEY",
      "sensitive": true
    }
  ]
}
```

#### Desteklenen Değişkenler

| Değişken | Açıklama |
|----------|----------|
| `${extensionPath}` | Extension'ın kurulu olduğu tam yol |
| `${workspacePath}` | Mevcut çalışma dizininin tam yolu |
| `${/}` veya `${pathSeparator}` | İşletim sistemine özgü yol ayırıcı |

### Extension Yönetimi

```bash
# Extension kurma
gemini extensions install <github-url-veya-yerel-yol>
gemini extensions install https://github.com/user/my-extension
gemini extensions install ./my-local-extension

# Extension güncelleme
gemini extensions update my-extension
gemini extensions update --all

# Extension linkle (geliştirme için)
gemini extensions link ./my-extension

# Extension kaldırma
gemini extensions uninstall my-extension

# Extension etkinleştir/devre dışı bırak
gemini extensions enable my-extension
gemini extensions disable my-extension --scope workspace
```

---

## MCP Server Entegrasyonu

### MCP (Model Context Protocol) Nedir?

MCP, Gemini CLI'ya özel araçlar (tools) eklemek için kullanılan bir protokoldür. MCP server'lar şunları sağlar:

- **Tool Discovery**: Mevcut araçları listeleme
- **Tool Execution**: Araçları çalıştırma
- **Resource Access**: Verilere erişim

### MCP Server Oluşturma

**`package.json`**:

```json
{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

**`tsconfig.json`**:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

**`src/server.ts`** (MCP Server örneği):

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Server oluştur
const server = new McpServer({
  name: 'my-mcp-server',
  version: '1.0.0',
});

// Tool tanımla: Basit bir hesaplama aracı
server.registerTool(
  'calculate',
  {
    description: 'İki sayıyı toplar',
    inputSchema: z.object({
      a: z.number().describe('Birinci sayı'),
      b: z.number().describe('İkinci sayı'),
    }).shape,
  },
  async ({ a, b }) => {
    const result = a + b;
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ result, operation: `${a} + ${b} = ${result}` }),
        },
      ],
    };
  }
);

// Tool tanımla: API çağrısı yapan araç
server.registerTool(
  'fetch_weather',
  {
    description: 'Belirtilen şehir için hava durumu bilgisi getirir',
    inputSchema: z.object({
      city: z.string().describe('Şehir adı'),
    }).shape,
  },
  async ({ city }) => {
    try {
      // Örnek API çağrısı (gerçek API'ye göre değiştirin)
      const response = await fetch(
        `https://api.example.com/weather?city=${encodeURIComponent(city)}`
      );
      const data = await response.json();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: `Hava durumu alınamadı: ${error}` }),
          },
        ],
      };
    }
  }
);

// Prompt tanımla (slash komut olarak kullanılabilir)
server.registerPrompt(
  'code-review',
  {
    title: 'Kod İnceleme',
    description: 'Kod için inceleme yapar',
    argsSchema: { 
      language: z.string().optional(),
      focus: z.string().optional() 
    },
  },
  ({ language, focus }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Lütfen ${language || 'bu'} kodu incele${focus ? `. Özellikle ${focus} konusuna odaklan` : ''}.`,
        },
      },
    ],
  })
);

// Server'ı başlat
const transport = new StdioServerTransport();
await server.connect(transport);
```

### MCP Server Yapılandırması

**`.gemini/settings.json`** veya **`~/.gemini/settings.json`**:

```json
{
  "mcpServers": {
    "myServer": {
      "command": "node",
      "args": ["path/to/dist/server.js"],
      "cwd": "./my-mcp-server",
      "env": {
        "API_KEY": "$MY_API_KEY"
      },
      "timeout": 30000,
      "trust": false,
      "includeTools": ["calculate", "fetch_weather"],
      "excludeTools": []
    }
  }
}
```

### MCP Server Transport Türleri

| Transport | Kullanım | Yapılandırma |
|-----------|----------|--------------|
| **Stdio** | Yerel subprocess | `command`, `args`, `cwd` |
| **SSE** | Server-Sent Events | `url` |
| **HTTP** | HTTP streaming | `httpUrl` |

**SSE örneği**:

```json
{
  "mcpServers": {
    "remoteServer": {
      "url": "https://api.example.com/sse",
      "headers": {
        "Authorization": "Bearer ${MY_TOKEN}"
      }
    }
  }
}
```

---

## Custom Commands (Özel Komutlar)

### Command Dosya Konumları

| Konum | Kapsam |
|-------|--------|
| `~/.gemini/commands/` | Global (tüm projeler) |
| `.gemini/commands/` | Proje-spesifik |
| `<extension>/commands/` | Extension-spesifik |

### TOML Format

**Basit komut** (`commands/greet.toml`):

```toml
description = "Kullanıcıyı selamlar"
prompt = "Merhaba! Nasıl yardımcı olabilirim?"
```

**Argümanlı komut** (`commands/explain.toml`):

```toml
description = "Kodu açıklar"
prompt = """
Lütfen şu kodu detaylı olarak açıkla:

{{args}}

Açıklamanı şu formatta yap:
1. Genel amaç
2. Adım adım işleyiş
3. Kullanılan pattern'ler
"""
```

**Shell injection** (`commands/git/status.toml`):

```toml
description = "Git durumunu analiz eder"
prompt = """
Mevcut Git durumunu analiz et:

```
!{git status}
```

Son 5 commit:
```
!{git log --oneline -5}
```

Değişiklikleri özetle ve önerilerde bulun.
"""
```

**Dosya injection** (`commands/review.toml`):

```toml
description = "Dosyayı inceler"
prompt = """
Şu dosyayı incele: {{args}}

İçerik:
@{{{args}}}

Lütfen:
1. Potansiyel bug'ları bul
2. Performance iyileştirmeleri öner
3. Best practice'lere uygunluğu değerlendir
"""
```

### Namespace (İsim Alanı)

Klasör yapısı namespace oluşturur:

```
commands/
├── deploy.toml          →  /deploy
├── git/
│   ├── commit.toml      →  /git:commit
│   └── push.toml        →  /git:push
└── db/
    └── migrate.toml     →  /db:migrate
```

---

## Headless Mode (Programatik Kullanım)

### Temel Kullanım

```bash
# Basit prompt
gemini --prompt "Bu kodu açıkla"
gemini -p "Merhaba dünya"

# Stdin'den okuma
cat README.md | gemini -p "Bu dokümantasyonu özetle"

# Dosya ile
echo "print('hello')" | gemini -p "Bu Python kodunu incele"
```

### Output Formatları

**Text (varsayılan)**:

```bash
gemini -p "Türkiye'nin başkenti neresi?"
# Çıktı: Türkiye'nin başkenti Ankara'dır.
```

**JSON**:

```bash
gemini -p "Türkiye'nin başkenti?" --output-format json | jq '.response'
```

JSON çıktı şeması:

```json
{
  "response": "...",
  "stats": {
    "models": { ... },
    "tools": { ... },
    "files": { ... }
  },
  "error": null
}
```

**Streaming JSON**:

```bash
gemini -p "Dosyaları listele" --output-format stream-json
```

### Otomasyon Örnekleri

**Commit mesajı oluşturma**:

```bash
#!/bin/bash
git diff --cached | gemini -p "Bu değişiklikler için commit mesajı yaz" --output-format json | jq -r '.response'
```

**Kod inceleme**:

```bash
#!/bin/bash
for file in src/*.ts; do
    echo "📄 $file inceleniyor..."
    cat "$file" | gemini -p "Bu kodu incele ve önerilerde bulun" > "reviews/$(basename $file).review.md"
done
```

**CI/CD entegrasyonu**:

```bash
#!/bin/bash
# PR değişikliklerini incele
git diff origin/main...HEAD | gemini -p "Bu değişiklikleri incele" \
    --output-format json \
    --yolo | jq -r '.response' > pr-review.md
```

### Önemli Bayraklar

| Bayrak | Kısaltma | Açıklama |
|--------|----------|----------|
| `--prompt` | `-p` | Headless mode prompt |
| `--output-format` | | `text`, `json`, `stream-json` |
| `--model` | `-m` | Model seçimi |
| `--yolo` | `-y` | Otomatik onay |
| `--approval-mode` | | `default`, `auto_edit`, `yolo` |
| `--sandbox` | `-s` | Sandbox modu |
| `--include-directories` | | Ek dizinler |

---

## Yapılandırma Dosyaları

### settings.json Yapısı

**`~/.gemini/settings.json`** (Global):

```json
{
  "general": {
    "vimMode": false,
    "preferredEditor": "code"
  },
  "ui": {
    "theme": "GitHub",
    "hideBanner": false,
    "showLineNumbers": true
  },
  "model": {
    "name": "gemini-2.5-pro"
  },
  "tools": {
    "sandbox": false,
    "autoAccept": false,
    "allowed": ["run_shell_command(git)", "run_shell_command(npm)"]
  },
  "context": {
    "fileName": "GEMINI.md"
  },
  "mcpServers": {
    "myServer": {
      "command": "node",
      "args": ["server.js"]
    }
  }
}
```

### GEMINI.md (Context Dosyası)

**Proje kökünde** (`GEMINI.md`):

```markdown
# Proje: My Awesome App

## Genel Talimatlar

- TypeScript kullan
- Strict mode aktif olmalı
- Fonksiyonel programlama tercih et

## Kod Stili

- 2 space indent
- Interface isimleri `I` ile başlamalı
- camelCase kullan

## Proje Yapısı

- `src/` - Kaynak kodlar
- `tests/` - Test dosyaları
- `docs/` - Dokümantasyon

## Önemli Dosyalar

@./src/config.ts
@./docs/API.md
```

### Yapılandırma Önceliği

1. **Varsayılan değerler** (en düşük)
2. **Sistem varsayılanları** (`/etc/gemini-cli/system-defaults.json`)
3. **Kullanıcı ayarları** (`~/.gemini/settings.json`)
4. **Proje ayarları** (`.gemini/settings.json`)
5. **Sistem ayarları** (`/etc/gemini-cli/settings.json`)
6. **Environment variables**
7. **Command-line arguments** (en yüksek)

---

## Örnek Extension Projesi

### Tam Örnek: Todo Manager Extension

Aşağıda, basit bir todo yönetim sistemi extension'ı bulunmaktadır:

#### Klasör Yapısı

```
todo-manager-extension/
├── gemini-extension.json
├── GEMINI.md
├── package.json
├── tsconfig.json
├── commands/
│   ├── todo/
│   │   ├── add.toml
│   │   ├── list.toml
│   │   └── complete.toml
└── src/
    └── server.ts
```

#### `gemini-extension.json`

```json
{
  "name": "todo-manager",
  "version": "1.0.0",
  "mcpServers": {
    "todoServer": {
      "command": "node",
      "args": ["${extensionPath}${/}dist${/}server.js"],
      "cwd": "${extensionPath}"
    }
  },
  "contextFileName": "GEMINI.md",
  "settings": [
    {
      "name": "Todo Dosyası",
      "description": "Todo'ların saklanacağı dosya yolu",
      "envVar": "TODO_FILE_PATH"
    }
  ]
}
```

#### `GEMINI.md`

```markdown
# Todo Manager Extension

Bu extension, todo yönetimi için araçlar sağlar.

## Kullanılabilir Araçlar

- `todo_add`: Yeni todo ekler
- `todo_list`: Tüm todo'ları listeler
- `todo_complete`: Bir todo'yu tamamlanmış olarak işaretler
- `todo_delete`: Bir todo'yu siler

## Kullanım Örnekleri

- "Yarınki toplantı için bir todo ekle"
- "Tüm todo'larımı göster"
- "3 numaralı todo'yu tamamla"
```

#### `package.json`

```json
{
  "name": "todo-manager-extension",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### `src/server.ts`

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

const TODO_FILE = process.env.TODO_FILE_PATH || './todos.json';

async function loadTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(TODO_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveTodos(todos: Todo[]): Promise<void> {
  await fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 2));
}

const server = new McpServer({
  name: 'todo-manager',
  version: '1.0.0',
});

// Todo ekle
server.registerTool(
  'todo_add',
  {
    description: 'Yeni bir todo ekler',
    inputSchema: z.object({
      text: z.string().describe('Todo metni'),
    }).shape,
  },
  async ({ text }) => {
    const todos = await loadTodos();
    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    await saveTodos(todos);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ 
          success: true, 
          message: `Todo eklendi: "${text}"`,
          todo: newTodo 
        }),
      }],
    };
  }
);

// Todoları listele
server.registerTool(
  'todo_list',
  {
    description: 'Tüm todoları listeler',
    inputSchema: z.object({
      showCompleted: z.boolean().optional().describe('Tamamlananları da göster'),
    }).shape,
  },
  async ({ showCompleted = true }) => {
    const todos = await loadTodos();
    const filtered = showCompleted ? todos : todos.filter(t => !t.completed);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ 
          todos: filtered,
          total: todos.length,
          completed: todos.filter(t => t.completed).length,
          pending: todos.filter(t => !t.completed).length,
        }),
      }],
    };
  }
);

// Todo tamamla
server.registerTool(
  'todo_complete',
  {
    description: 'Bir todoyu tamamlanmış olarak işaretler',
    inputSchema: z.object({
      id: z.number().describe('Todo ID'),
    }).shape,
  },
  async ({ id }) => {
    const todos = await loadTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: false, error: `ID ${id} ile todo bulunamadı` }),
        }],
      };
    }
    todo.completed = true;
    await saveTodos(todos);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, message: `Todo tamamlandı: "${todo.text}"` }),
      }],
    };
  }
);

// Todo sil
server.registerTool(
  'todo_delete',
  {
    description: 'Bir todoyu siler',
    inputSchema: z.object({
      id: z.number().describe('Todo ID'),
    }).shape,
  },
  async ({ id }) => {
    const todos = await loadTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: false, error: `ID ${id} ile todo bulunamadı` }),
        }],
      };
    }
    const [deleted] = todos.splice(index, 1);
    await saveTodos(todos);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, message: `Todo silindi: "${deleted.text}"` }),
      }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

#### `commands/todo/add.toml`

```toml
description = "Hızlıca todo ekler"
prompt = """
Kullanıcı şu todo'yu eklemek istiyor: {{args}}

Lütfen `todo_add` aracını kullanarak bu todo'yu ekle.
"""
```

#### `commands/todo/list.toml`

```toml
description = "Tüm todoları gösterir"
prompt = """
Lütfen `todo_list` aracını kullanarak tüm todo'ları listele ve güzel bir şekilde formatla.
"""
```

### Extension Kurulumu ve Kullanımı

```bash
# Extension dizinine git
cd todo-manager-extension

# Bağımlılıkları kur
npm install

# Build et
npm run build

# Extension'ı linkle (geliştirme için)
gemini extensions link .

# Gemini CLI'ı başlat
gemini

# Extension komutlarını kullan
> /todo:add "Raporu tamamla"
> /todo:list
> Bugünkü todo'larımı göster
```

---

## Özet Kontrol Listesi

Kendi CLI'nızı inşa etmek için:

- [ ] Node.js 20+ kurulu mu?
- [ ] `gemini-extension.json` dosyası oluşturuldu mu?
- [ ] MCP Server (opsiyonel) TypeScript ile yazıldı mı?
- [ ] Custom commands TOML formatında mı?
- [ ] `GEMINI.md` context dosyası hazır mı?
- [ ] `settings.json` yapılandırması doğru mu?
- [ ] Extension linklenmiş veya kurulmuş mu?

---

## Kaynaklar

- [Gemini CLI Dokümantasyonu](https://geminicli.com/docs/)
- [MCP Protocol Spesifikasyonu](https://modelcontextprotocol.io/)
- [Extension Galerisi](https://geminicli.com/extensions/browse/)
- [GitHub Repository](https://github.com/google-gemini/gemini-cli)

---

*Bu rehber, gemini-cli v0.20.0 sürümü baz alınarak hazırlanmıştır.*

