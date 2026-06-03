# Spesifikasi UI/UX Prototype: Halaman Hasil Scan QR Code

Dokumen ini berisi panduan desain antarmuka (UI) dan pengalaman pengguna (UX) untuk halaman ketertelusuran produk (*product traceability page*). Fokus utama desain adalah **visual yang memikat (*visually appealing*)**, **transparansi data**, dan **kecepatan muat halaman (*loading speed*)** karena diakses secara instan lewat pemindaian kamera smartphone oleh calon pembeli industri (B2B).

---

## 1. Panduan Sistem Desain (Design System Blueprint)
* **Palet Warna:**
    * *Dominant Background:* Warm Cream/Light Sand (`#FAF8F5`) – Memberikan kesan natural, organik, khas produk hasil bumi/pesisir.
    * *Brand Color:* Deep Sea Green (`#1E5128`) – Mempertegas identitas budidaya kelautan yang ramah lingkungan dan berkelanjutan.
    * *Accent Color:* Gold/Amber (`#E8AA42`) – Digunakan untuk menyoroti kualitas premium (Grade A) dan sertifikat keaslian produk.
* **Tipografi:** Menggunakan font serif modern untuk judul utama seperti *Playfair Display* (untuk kesan premium) dikombinasikan dengan *Helvetica* untuk data teknis agar mudah dibaca sekilas.

---

## 2. Arsitektur Informasi & Elemen UI Layar (Screen Elements)

### A. Bagian Atas: Header Jaminan Mutu & Status Produk
* **UX Goal:** Membangun kepercayaan (*trust*) dalam 3 detik pertama saat halaman terbuka.
* **Komponen UI:**
    * *Verified Badge:* Ilustrasi lencana hijau dengan ikon centang emas bertuliskan **"100% Terverifikasi Asli"** di posisi paling atas halaman.
    * *Hero Metadata Card:* Kotak melayang dengan latar belakang putih bersih berisi:
        * Nomor Kode Batch dalam teks tebal (Contoh: **BATCH #RL-2026-001**).
        * Label Nilai Kualitas berukuran besar dengan warna teks emas: **GRADE A - PREMIUM QUALITY**.
        * Garis bar horizontal penunjuk persentase kadar air produk (misal: jarum indikator menunjuk tepat pada angka `33%` di zona hijau aman).

### B. Bagian Tengah: Komponen Interaktif Cerita Produk (Pilar 1 - Hulu)
* **UX Goal:** Menyajikan narasi asal usul rumput laut secara interaktif dan menarik, bukan teks panjang yang membosankan.
* **Komponen UI:**
    * *Peta Lokasi Interaktif:* Sematan mini *Google Maps* dengan pin kustom berbentuk rumput laut yang menunjukkan titik koordinat persis lahan budidaya kelompok tani mitra di pesisir pantai.
    * *Infografis Garis Waktu (Timeline Graph):* Alur vertikal interaktif yang menunjukkan siklus hidup produk:
        * *Titik 1:* Tanggal Tanam $
ightarrow$ Disertai teks deskripsi mikro: "Diberikan nutrisi pupuk optimal pra-tanam, memperkuat imun bibit dari serangan bakteri patogen."
        * *Titik 2:* Tanggal Panen $
ightarrow$ Menampilkan durasi total pembesaran di laut.

### C. Bagian Bawah: Panel Higienitas & Tombol Kontak (Pilar 2 & 3 - Hilir)
* **UX Goal:** Memberikan bukti konkret bahwa produk bersih dan memudahkan pembeli untuk segera melakukan transaksi/kontrak.
* **Komponen UI:**
    * *Galeri Proses Pengeringan:* Komponen komidi putar (*Image Carousel*) yang berisi 2-3 foto beresolusi tinggi yang memperlihatkan alat pengering mekanis/solar dome yang digunakan, membuktikan rumput laut bebas dari jemuran pinggir jalan yang berdebu.
    * *Sticky Floating Action Button (FAB):* Tombol aksi yang tetap menempel di bagian bawah layar smartphone saat pengguna melakukan *scroll*. Tombol berwarna hijau terang bertuliskan **"Hubungi Koperasi / Ajukan Penawaran"** yang langsung terhubung ke WhatsApp Hubungan Dagang Koperasi atau formulir email pemesanan resmi.

---

## 3. Aturan Transisi & Responsivitas (UX Rules)
* **Efek Transisi:** Menggunakan transisi halus (*fade-in*) berdurasi `300ms` saat memuat data grafik linimasa untuk memberikan kesan aplikasi modern dan responsif.
* **Akses Offline/Lemah Sinyal:** Karena pembeli bisa saja melakukan pemindaian di area gudang pelabuhan yang minim sinyal, seluruh aset gambar di halaman ini wajib dikompres secara ekstrem (maksimal `100KB` per gambar) agar halaman dapat terbuka kurang dari 2 detik dalam jaringan 3G.