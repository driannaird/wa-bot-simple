import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

const welcomeMessage =
  "*Selamat Datang di Sistem Bot Pelayanan Desa Bulurejo, Gresik Ketik ✨*\n\n" +
  "Ketik angka 1 : untuk 🧰 Daftar Layanan\n" +
  "Ketik angka 2 : untuk Alamat Kantor";

const commands = {
  1:
    "*Berikut Daftar Layanan Kami ✨*\n\n" +
    "Ketik angka 1.1 : untuk SKU (Surat Keterangan Usaha)\n" +
    "Ketik angka 2.1 : untuk Pengantar Surat Nikah\n" +
    "Ketik angka 3.1 : untuk Surat Domisili Usaha/Penduduk\n" +
    "Ketik angka 4.1 : untuk Surat Kehilangan\n" +
    "Ketik angka 5.1 : untuk Pengantar SKCK\n" +
    "Ketik angka 6.1 : untuk Surat Keterangan Status\n" +
    "Ketik angka 7.1 : untuk Kritik dan Saran\n\n",
  2: "Jalan raya megah",
  1.1: "SKU",
  2.1: "pengantar",
  3.1: "domisi",
  4.1: "surat",
};

client.on("message_create", (message) => {
  if (message.body !== welcomeMessage && !commands[message.body]) {
    client.sendMessage(message.from, welcomeMessage);
  } else if (commands[message.body]) {
    client.sendMessage(message.from, commands[message.body]);
  }
});

client.initialize();
