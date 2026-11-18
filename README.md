# Aplikasi Data Siswa

## Menjalankan aplikasi

Pastikan MySQL aktif dan konfigurasi database di file `.env` backend sudah benar. Jalankan backend dan frontend di dua terminal terpisah:

```powershell
cd "C:\Pelatihan Backend\Backend"
npm run dev
```

```powershell
cd "C:\Pelatihan Frontend\Frontend"
npm run dev
```

Buka alamat frontend yang ditampilkan Vite. Frontend meneruskan permintaan `/api` ke backend di `http://localhost:3000`.

Backend menyediakan `GET /api/siswa` untuk membaca data dan `POST /api/siswa` untuk menyimpan data ke tabel `siswa`. Kode dan nama siswa wajib diisi; alamat, tanggal lahir, dan jurusan boleh kosong.
