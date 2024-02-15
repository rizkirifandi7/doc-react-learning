## Belajar Open Layer

Program ini merupakan program sederhana bagaimana cara menggunakan library OpenLayer

### Prasyarat

 - NodeJS

### Instalasi

Untuk dapat menggunakan OpenLayer, maka diperlukan instalasi library OpenLayer terlebih dahulu dengan perintah berikut : 

```bash
npm i ol
```

### Penjelasan beberapa komponen dari Open Layer

1. Map (Peta): Komponen inti OpenLayers adalah peta yang dirender ke dalam suatu wadah target, misalnya sebuah elemen div di halaman web. Properti peta dapat dikonfigurasi baik pada saat konstruksi, maupun dengan menggunakan metode setter.

- Element <div> ini berfungsi sebagai penampung untuk map.
  
```bash
<div id="map" style="width: 100%; height: 400px"></div>
```
- Kemudian lakukan import Map, seperti contoh berikut.
  
```bash
import Map from 'ol/Map.js';

const map = new Map({target: 'map'});
```

2. View (Tampilan): Peta tidak bertanggung jawab atas hal-hal seperti pusat, tingkat zoom, dan proyeksi peta. Sebaliknya, properti-properti ini merupakan bagian dari instansi ol/View.

- Penggunaan View, seperti contoh berikut.
  
```bash
import View from 'ol/View.js';

map.setView(new View({
  center: [0, 0],
  zoom: 2,
}));
```

3. Source (Sumber Data): Untuk mendapatkan data dari jarak jauh untuk sebuah layer, OpenLayers menggunakan subclass ol/source/Source. Ini mencakup layanan tile peta gratis dan berbayar seperti OpenStreetMap atau Bing, sumber OGC seperti WMS atau WMTS, dan data vektor dalam format seperti GeoJSON atau KML.

- Penggunaan OSM sebagai berikut :

```bash
import OSM from 'ol/source/OSM.js';

const source = OSM();
```

4. Layer (Lapisan): Lapisan merupakan representasi visual dari data dari sebuah sumber. OpenLayers memiliki empat tipe dasar lapisan: Tile, Image, Vector, dan VectorTile.

- Penggunaan Layer sebagai berikut :

```bash
import TileLayer from 'ol/layer/Tile.js';

// ...
const layer = new TileLayer({source: source});
map.addLayer(layer);
```

5. Tampilan code gabungan dari setiap komponen : 

```bash
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';

new Map({
  layers: [
    new TileLayer({source: new OSM()}),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  target: 'map',
});
```

