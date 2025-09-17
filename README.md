# Mini Shooter (2D)

Tarayıcıda çalışan, çok oyunculu (multiplayer) bir 2D kuş bakışı (top-down) nişancı oyunu. Bu proje bir oyun olarak değil, bir **öğrenme süreci** olarak başladı. 

Başlangıçta Socket.IO kullanmayı öğrenmek istiyordum. ChatGPT'ye "ne yapabilirim?" diye sordum; o da basit bir karakter hareketi ve ateş etme sistemi olan küçük bir oyun önerdi. Projeye sadece Node.js ve React bilgisiyle başladım — oyun geliştirme hakkında neredeyse hiçbir şey bilmiyordum. Zamanla projeyi geliştirirken şunları öğrendim:

- Snapshot (oyun durumunu istemcilere aktarma) nedir, nasıl çalışır?
- Interpolation (arayüzde yumuşatma) neden ve nasıl uygulanır?
- Delta snapshot ile veri trafiği nasıl azaltılır?
- Oyun verileri neden ve nasıl `binary` (ikilik) formata çevrilir?
- HTML5 `canvas` nasıl çalışır?
- Oyun döngüsü (game loop) nasıl kurulur, neden `setInterval` yerine `setImmediate` kullanılır?
- Server-client ayrımı oyunlarda nasıl yapılır?
- Proje dosyaları nasıl soyutlanır (abstraction)?
- Lisanslar ne işe yarar, nasıl eklenir?

Bu süreçte aynı zamanda sunucumu evde çalıştırmak istedim. Bu sayede:

- Eski laptoplarıma Ubuntu Server kurmayı,
- SSH ile bağlanmayı,
- `ufw` (Uncomplicated Firewall) ile port açmayı,
- Modemden port yönlendirmeyi (port forwarding),
- Ve temel düzeyde Linux sistem kullanımını da öğrendim.

Kısacası bu proje, 3D oyunlar yapmadan önce altyapıyı 2D düzlemde anlayıp oturtmamı sağladı. Hedefim "oyun yapmak" değil, **oyunun nasıl yapıldığını öğrenmekti**. Bu `README`, projenin bir parçası değil, o yolculuğun bir özetidir.

## 🎮 Tanıtım

Bu proje, diep.io benzeri bir çok oyunculu 2D arena shooter oyunudur. Tasarım ve mekanik olarak diep.io'dan ilham alınmıştır.

Mini Shooter, tarayıcı üzerinde oynanabilen çok oyunculu (multiplayer) bir 2D top-down (kuş bakışı) nişancı oyunudur. Oyuncular basit silahlarla birbirlerine karşı savaşır. Her oyuncu, gerçek zamanlı olarak diğer oyuncuların konumunu, hareketini ve atışlarını görebilir.

Bu oyun, öğrenme amaçlı olarak Node.js tabanlı bir fullstack mimariyle geliştirilmiştir. Hem istemci (React.js) hem de sunucu (Express + Socket.IO) tarafı Node.js ile yazılmıştır.

Şu an oyun Prototip aşamasındadır. İki ayrı sürümü mevcuttur:

- `main`: Snapshot tabanlı, şu anda çalışan ama birkaç hatası olan sürüm.
- `rework`: Delta snapshot mimarisi üzerinde çalışılan, geliştirme aşamasındaki sürüm.

⚠️ Uyarı: Sunucu şu an dinamik IP üzerinden barındırıldığı için zaman zaman geçici erişim problemleri yaşanabilir. IP değişiklikleri tespit edildikçe, Cloudflare üzerinden manuel olarak güncellenmektedir. Eğer oyun sayfası erişilemiyorsa, lütfen daha sonra tekrar deneyin.

🔗 Canlı Demo: [https://mehmox.com](https://mehmox.com)

## Özellikler

### 🔄 Snapshot Sürümü (Çalışan Ana Sürüm)
- 🔫 **Gerçek zamanlı çok oyunculu** (multiplayer) 2D shooter sistemi
- 💻 **WebSocket protokolü** ile hızlı ve düşük gecikmeli veri aktarımı
- 📦 **Buffer tabanlı veri iletimi** ile optimize ağ performansı
- ⚔️ **Oyuncular arası çatışma sistemi**: mermi çarpışmaları, ölüm ve yeniden doğma
- 🎮 **React tabanlı kullanıcı arayüzü** (frontend)
- 🌐 **Express.js + Socket.IO tabanlı** backend altyapısı
- 🧪 **Prototip** seviyesinde tamamlanmış ilk sürüm

### 🚧 Delta Snapshot Sürümü (şu anda rework branch’i altında geliştirilmektedir)
- 🧊 **Entity pooling sistemi** (her entity baştan oluşturulmaz, yeniden kullanılır)
- ⚙️ **Delta snapshot altyapısı**: yalnızca değişen veriler gönderilir
- 🧭 **Her oyuncuya özel snapshot üretimi** (server taraflı özelleştirme)

📁 Proje klasör yapısı için: [docs/structure.txt](./docs/structure.txt)

## Kurulum (Installation)

Bu proje, frontend (React) ve backend (Express + Socket.IO) bileşenlerinden oluşmaktadır. Aşağıdaki adımları takip ederek geliştirme ortamını kurabilir ve projeyi çalıştırabilirsiniz.

### Gereksinimler
- Node.js (LTS sürümü önerilir)  
- npm (Node Package Manager)

### 1. Depoyu klonlayın

```
git clone https://github.com/Mehmox/minishooterio.git
cd minishooterio
```

#### 2. Bağımlılıkları yükleyin
```
npm run ii 
```
Bu komut, root, client ve server dizinlerindeki tüm bağımlılıkları yükler.

#### 3. Geliştirme sunucusunu başlatın
```
npm run dev
```
Frontend React uygulaması varsayılan olarak http://localhost:3000 adresinde açılır.

Backend Express + Socket.IO sunucusu ise http://localhost:3001 portunda çalışır.

#### 4. Üretim (production) için derleme ve başlatma
```
npm run build
npm start
```
Bu komutlar frontend uygulamasını derler ve backend ile birlikte üretim modunda çalıştırır.

Derlenen frontend dosyaları build/ klasörüne kopyalanır ve backend bu dosyaları sunar.

Uygulama varsayılan olarak http://localhost:3000 adresinde açılır.

## Lisans

Bu proje [MIT](LICENSE) kapsamında lisanslanmıştır.

## İletişim (Contact)

Herhangi bir sorun bildirimi, öneri veya katkı için benimle Discord üzerinden iletişime geçebilirsin:

- Discord: `mehmox#8166`