

**Summary:**

- Aplikasi ini memungkinkan user untuk menambahkan daftar wishlist,
- User harus login terlebih dahulu untuk dapat menambah wishlist dan melihat wishlist apa saja yang sudah dibuat (_wishlist yang ditampilkan hanya milik user yang sedang login!_).
- Setiap kali menambahkan wishlist maka saldo akan berkurang sesuai wishlist

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
