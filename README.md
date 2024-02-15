## Belajar Open Layer

Program ini merupakan program sederhana bagaimana cara menggunakan library OpenLayer

### Prasyarat

 - NodeJS

### Instalasi

Untuk dapat menggunakan OpenLayer, maka diperlukan instalasi library OpenLayer terlebih dahulu dengan perintah berikut : 

```bash
npm i ol
```

### Penjelasan beberapa komponen dari 

1. Map (Peta): Komponen inti OpenLayers adalah peta yang dirender ke dalam suatu wadah target, misalnya sebuah elemen div di halaman web. Properti peta dapat dikonfigurasi baik pada saat konstruksi, maupun dengan menggunakan metode setter.

2. View (Tampilan): Peta tidak bertanggung jawab atas hal-hal seperti pusat, tingkat zoom, dan proyeksi peta. Sebaliknya, properti-properti ini merupakan bagian dari instansi ol/View.

3. Source (Sumber Data): Untuk mendapatkan data dari jarak jauh untuk sebuah layer, OpenLayers menggunakan subclass ol/source/Source. Ini mencakup layanan tile peta gratis dan berbayar seperti OpenStreetMap atau Bing, sumber OGC seperti WMS atau WMTS, dan data vektor dalam format seperti GeoJSON atau KML.

4. Layer (Lapisan): Lapisan merupakan representasi visual dari data dari sebuah sumber. OpenLayers memiliki empat tipe dasar lapisan: Tile, Image, Vector, dan VectorTile.
