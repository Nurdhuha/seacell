# Spesifikasi UI/UX Prototype: Website ERP Kelompok Tani Rumput Laut

Dokumen ini berisi panduan desain antarmuka (UI) dan pengalaman pengguna (UX) untuk pembuatan *prototype* sistem internal ERP. Fokus utama desain adalah **kesederhanaan (*simplicity*)**, **keterbacaan tinggi (skala font besar)**, dan **aksesibilitas mobile** karena target pengguna adalah pengurus koperasi di daerah pesisir.

---

## 1. Panduan Sistem Desain (Design System Blueprint)
* **Palet Warna:**
    * *Primary Color:* Deep Ocean Blue (`#0A4D68`) – Memberikan kesan profesional, terpercaya, dan bernuansa laut.
    * *Secondary/Accent Color:* Seafoam Green (`#088395`) – Digunakan untuk tombol aksi utama (*Call to Action*) dan indikator keberhasilan.
    * *Warning Color:* Coral Orange (`#F45050`) – Digunakan khusus untuk penanda kegagalan panen atau indikasi gejala wabah *ice-ice*.
    * *Background:* Soft Grey/White (`#F4F6F9`) – Menjaga kontras agar mata tidak cepat lelah.
* **Tipografi:** Menggunakan font bawaan sistem yang bersih dan tegas seperti *Inter* atau *Roboto*. Ukuran font minimal untuk teks body adalah `14px` (dioptimalkan untuk layar smartphone).

---

## 2. Tata Letak Layar & Komponen Wireframe (Wireframe Components)

### A. Layar 1: Dashboard Utama (Akses Utama Mobile)
* **Layout:** Struktur vertikal *single-column scroll* (bebas dari penumpukan menu horizontal).
* **Komponen UI:**
    * *Top Bar:* Menampilkan logo koperasi di kiri, nama pengguna dan foto profil kecil di kanan.
    * *Ringkasan Metrik (Card Widgets):* Tiga kotak besar penunjuk data dengan visualisasi ikonik:
        * Stok Siap Jual (Ikon Karung - Warna Hijau).
        * Suhu/Kondisi Alat Pengering (Ikon Termometer - Warna Biru).
        * Notifikasi Status Lahan (Ikon Jangkar/Rumput Laut - Warna Hijau jika aman, Merah jika waspada wabah).
    * *Tombol Aksi Cepat (Quick Action Floating Button):* Tombol bulat besar dengan ikon tanda tambah `(+)` di sudut kanan bawah untuk menginput data baru secara instan tanpa masuk ke menu berlapis.

### B. Layar 2: Form Input Produksi & Mitigasi Wabah (Koneksi Pilar 1)
* **UX Pattern:** Menggunakan pola *Step-by-Step Form* (Wizard) untuk mencegah pengguna kewalahan mengisi baris data yang panjang dalam satu layar.
* **Komponen UI:**
    * *Progress Bar:* Menunjukkan langkah pengisian di bagian atas (Tahap 1: Pra-Tanam $
ightarrow$ Tahap 2: Pengeringan $
ightarrow$ Tahap 3: Batching).
    * *Input Fields:* Kolom teks dengan ukuran ketukan minimal `48px` agar tidak salah klik oleh jari petani di lapangan.
    * *Radio Button & Dropdown:* Pilihan jenis pupuk optimal pra-tanam yang tinggal diklik (meminimalkan mengetik manual).
    * *Toggles:* Sakelar geser (*Toggle Switch*) bertuliskan "Gejala Wabah Ice-Ice Terdeteksi?". Jika diaktifkan ke kanan (warna merah), sistem otomatis membuka kolom unggah foto kondisi rumput laut.

### C. Layar 3: Manajemen Gudang & Generator QR Code (Koneksi Pilar 2 & 3)
* **Layout:** Bentuk daftar (*List View*) kronologis dari hasil panen yang masuk gudang setelah keluar dari alat pengering.
* **Komponen UI:**
    * *Badges Mutu:* Label otomatis penunjuk kualitas (contoh: teks putih di atas latar belakang hijau gelap untuk **GRADE A**, kuning untuk **GRADE B**).
    * *Action Card:* Setiap item panen memiliki tombol berikon printer bertuliskan **"Cetak QR Code"**.
    * *Modal Pop-up (Overlay Window):* Ketika tombol cetak diklik, muncul jendela pop-up di layar tengah yang menampilkan pratinjau gambar QR Code yang siap diunduh atau dikirim langsung ke mesin printer bluetooth thermal portabel.

---

## 3. Alur Pengguna Prototype (User Flow)
1.  **Mulai:** Pengguna membuka aplikasi di browser HP $
ightarrow$ Diarahkan langsung ke Dashboard Utama.
2.  **Input Data Tanam:** Klik Tombol `(+)` $
ightarrow$ Pilih "Data Tebar Bibit" $
ightarrow$ Isi formulir jenis pupuk optimal $
ightarrow$ Klik "Simpan".
3.  **Proses Pengeringan:** Ketika panen tiba, pengguna klik baris data bersangkutan $
ightarrow$ Masukkan berat kering pasca keluar dari alat pengering $
ightarrow$ Sistem mengunci kalkulasi kadar air $
ightarrow$ Status berubah menjadi "Siap Cetak QR".
4.  **Cetak Label:** Klik "Cetak QR Code" $
ightarrow$ Label fisik ditempel pada karung kemasan produk.