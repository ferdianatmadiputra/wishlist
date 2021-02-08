# Phase 2 - Live Code 1

#### WAKTU : 165 Menit / 2 Jam 45 menit

## Hacktiv-WishList

**Summary:**

- Aplikasi ini memungkinkan user untuk menambahkan daftar wishlist,
- User harus login terlebih dahulu untuk dapat menambah wishlist dan melihat wishlist apa saja yang sudah dibuat (_wishlist yang ditampilkan hanya milik user yang sedang login!_).
- Setiap kali menambahkan wishlist maka saldo akan berkurang sesuai wishlist

**Notes:**

- Berhubung kompetensi live code ini bukan MVC, maka kamu
  diperbolehkan untuk tidak membuat controller di server. Apabila kamu
  membuat routing nya di dalam 1 file routes/index.js juga diperbolehkan.
- File template HTML telah disediakan, boleh menggunakan template ini, boleh juga
  menggunakan template sendiri asalkan layout-nya sama.

**Rules:**

- Wajib menggunakan sequelize dan postgre sebagai db serta HTML-CSS-JQuery untuk membuat tampilan aplikasi.
- Aplikasi ini harus SPA dan Reaktif. Apabila untuk menjalankan fitur-fitur yang terdapat pada aplikasi ini membutuhkan page refresh maka nilai akan dikurangi **5 poin**
- Tidak memberikan environment variable **beserta** valuenya nilai dikurangi **5 poin**
- menggunakan `alert()` di sisi client nilai dikurangi **5 poin**
- Silahkan browsing (googling/stackoverflow/dokumentasi) untuk mencari solusi dari permasalahan yang kalian hadapi. Namun, **DILARANG** membuka/melihat repository/code milik sendiri maupun orang lain. Ketahuan dianggap bentuk kecurangan.
- Segala bentuk indikasi kecurangan mengakibatkan live-code tidak dinilai dan diproses sesuai aturan yang berlaku di hacktiv8 tanpa perlu konfirmasi dahulu kepada yang bersangkutan.

Untuk demo aplikasi silahkan click [hacktiv_wishlist](https://drive.google.com/file/d/1Ty5g-LGBlnwh5fKGu-2RsC4SLWHKkcSf/view?usp=drivesdk)

## **RELEASE 1 - Authentication (Login & Register)**

### **Server - Register**

- Lakukan register sesuai api-doc.md
- saldo default adalah 5.000.000

### **Server - Login**

- Lakukan login sesuai api-doc.md

### **Client - Login & Logout**

- jika sudah login, kalau direfresh tidak harus login lagi
- buatlah routing dan views untuk form login
- jika login berhasil maka akan ke routing yang akan menampilkan semua wishlists yang ada di database

NOTES: REGISTER CLIENT TIDAK PERLU ADA

## **Release 2 - Add new Wishlist**

### **Server**

- Lakukan add wishlist sesuai api-doc.md

notes:

- Pastikan **hanya** user yang sedang login yang dapat menambahkan wishlist milik nya.
- Current saldo harus dikurangi dengan price dari wishlist yang ditambahkan

### **Client**

Todo:

- Implementasikan form `Add New WishList` sehingga ketika di submit bisa melakukan post ke server.
- wishlist yang sudah ditambahkan langsung tampil di my Wishlists

## **Release 3 - Fetch Logged In User's Wishlists**

### **Client**

Todo :

- Tampilkan wishlists milik user yang sedang login di client kalian.

### **Server**

- Lakukan Fetch Wishlists sesuai api-doc.md
  notes :

- Pastikan **hanya** user yang sedang login yang dapat mendapatkan data wishlist dan hanya wishlist dengan UserId sesuai user yang login.

## Release 3 - Delete Wishlist

### Server

- Lakukan delete wishlist sesuai api-doc.md

### Client

- integrasi tombol delete di wishlist card
- pastikan website kalian reaktif (jika berhasil delete wishlist maka wishlists user akan berkurang otomatis di client)

notes:

- Current saldo harus ditambah sesuai dengan price dari wishlist yang dihapus
