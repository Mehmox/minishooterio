# Mini Shooter (2D)

## 🎮 Tanıtım

Bu proje, diep.io benzeri bir çok oyunculu 2D arena shooter oyunudur. Tasarım ve mekanik olarak diep.io'dan ilham alınmıştır.

Mini Shooter, tarayıcı üzerinde oynanabilen multiplayer bir 2D top-down nişancı oyunudur. Oyuncular basit silahlarla birbirlerine karşı savaşır. Her oyuncu, gerçek zamanlı olarak diğer oyuncuların konumunu, hareketini ve atışlarını görebilir.

Bu oyun, öğrenme amaçlı olarak Node.js tabanlı bir fullstack mimariyle geliştirilmiştir. Hem istemci hem sunucu tarafı Node.js ile yazılmıştır.

🔗 Canlı Demo: [https://mehmox.com](https://mehmox.com)

## Özellikler
- 🔫 **Gerçek zamanlı çok oyunculu** 2D shooter sistemi
- 💻 **WebSocket protokolü** ile hızlı ve düşük gecikmeli veri aktarımı
- ⚔️ **Oyuncular arası çatışma sistemi**: mermi çarpışmaları, ölüm ve yeniden doğma
- 📦 **Buffer tabanlı veri iletimi** ile optimize ağ performansı
- ⚙️ **Delta snapshot altyapısı**: yalnızca değişen veriler gönderilir
- 🎮 **React tabanlı kullanıcı arayüzü** (frontend)
- 🧊 **Entity pooling sistemi** (her entity baştan oluşturulmaz, yeniden kullanılır)

## Teknolojiler
- "⚔️ **Client**: React, Html Canvas, socket.io-client, tailwind, vite, express"
- "💻 **Load Balancer**: dotenv, express, jsonwebtoken"
- "🔫 **Server**: dotenv, jsonwebtoken, socket.io, typescript"

## Sistem Mimarisi

⚔️ **Client**

- React tabanlı SPA (Single Page Application).

- StateManager global oyun durumunu (snapshot, session, input) tutar.

- Interpolation sistemi: snapshot.prev–snapshot.next → game.prev–game.next.

- Harita 4000×4000 px, oyuncu ekranı 1920×925 px sabit.

- Görsel tema: light/dark mode.

- Arayüz göstergeleri: ping, snapshot boyutu, aktif oyuncu sayısı.

💻 **Game Server**

- Açılışta sabit sayıda player ve bullet instance oluşturur (entity pooling).

- Tick başına game state hesaplar ve snapshot üretir.

- 64 Hz snapshot gönderir.

- Disconnect olaylarında entity release eder.

- AOI (Area of Interest): sadece oyuncunun görüş alanındaki entity’leri gönderir.

💻 **Load Balancer**

- Sunucuların oyuncu sayılarını ve önceliklerini takip eder.

- 30 saniye boyunca heartbeat gelmeyen sunucuyu listeden siler.

- Yeni oyunculara “en dolu ama tam dolmamış” sunucuyu seçer.

- Her oyun sunucusuyla shared secret_key üzerinden JWT doğrulaması yapar.

🧠 **Bot (Test Clients)**

- Bu klasör sadece yük testi (stress test) ve davranış denemeleri için kullanılır.

- Development modda otomatik başlatılmaz.

- Bot’lar oyuna bağlanıp harita etrafında saat yönünde döner, gerçek oyuncular gibi davranmaz.

## Kurulum (Installation)

Geliştirme ortamını başlatmak için aşağıdaki adımları takip edebilirsiniz.

> ⚠️ **Önemli:**  
> Uygulama yalnızca **3000** (frontend) ve **3001** (backend) portları kullanılabiliyorsa çalışır.  
> Bu portlar başka bir uygulama tarafından kullanılıyorsa proje başlatılamaz.  
> Geliştirme ortamında yalnızca web server ve game server başlatılır. Load balancer kullanılmaz ve JWT doğrulama kapalıdır.

### Gereksinimler
- Node.js (LTS sürümü önerilir)  
- npm (Node Package Manager)

### 1. Depoyu klonlayın

```
git clone https://github.com/Mehmox/minishooterio.git
cd minishooterio
```

### 2. Bağımlılıkları yükleyin
```
npm run i
```
Bu komut root, bot, client ve server dizinlerindeki tüm bağımlılıkları yükler.

#### 3. Geliştirme sunucusunu başlatın
```
npm run dev
```

## Lisans

Bu proje [Ticari Olmayan Kullanım Lisansı (TOUL)](LICENSE) kapsamında lisanslanmıştır.

## İletişim (Contact)

Herhangi bir sorun bildirimi, öneri veya katkı için benimle Discord üzerinden iletişime geçebilirsin:

- Discord: `mehmox#8166`