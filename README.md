# Library-Management
## Deskripsi
Sebuah aplikasi untuk manajemen perpustakaan yang dibangun menggunakan **Express.js** dan **PostgreSQL** dengan menerapkan **struktur MVC** tanpa menggunakan view (hanya API).

## Fitur
- Autentikasi & Role-based Authorization.
- CRUD pada buku.
- Pencarian semua buku.
- mencari buku berdasarkan judul atau penulis.
- Pagination di List Buku.
- Soft Delete Buku .
-  Peminjaman Buku oleh Member.
  
## Teknologi yang Digunakan
- **Node.js** dengan **Express.js** sebagai framework.
- **PostgreSQL** sebagai database.
- **MVC** (Model-View-Controller) tanpa View (API-based).
- **JWT** Authentication.

## Installation
1. Install Node.js
   Silahkan untuk mendownload dan instal Node.js pada situs resminya:
   https://nodejs.org/en/download/
   
2. Install PostgreSQL
   Silahkan untuk mendownload dan instal PostgreSQL pada situs resminya:
   https://www.postgresql.org/download/
   
3. Clone the repo

```bash
https://github.com/adyansyah28/Library-Management.git
```
```bash
git@github.com:adyansyah28/Library-Management.git
```
```bash
gh repo clone adyansyah28/Library-Management
```

4. Install the dependencies
```bash
npm install
```
  
## Configuration
You will have to update some values in `config/db.js`

|key|description|
|---|-----------|
|HOST| your host address on which postgreSQL is installed. Most probably `localhost`|
|USER| Username of the postgreSQL User (default: `postgres`)|
|PASSWORD|Password to the PostgreSQL User|
|DB| The DB Name|

Jika ingin menggunakan data template, import data dari file `library.sql`

## Jalankan Program
```bash
npm start
```
