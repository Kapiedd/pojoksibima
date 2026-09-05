// Komponen kecil khusus buat brand "Si BiMa": huruf kecil (i, a, dst) sengaja
// diperbesar ukurannya via CSS supaya tingginya kelihatan setara huruf
// kapital di sekitarnya -- TANPA mengubah bentuk hurufnya jadi kapital
// (beda dengan font-variant: small-caps yang mengubah bentuk huruf).
//
// Angka `scale` bisa disetel manual kalau di font tertentu masih kelihatan
// kurang/lebih besar (defaultnya 1.35, artinya 35% lebih besar dari huruf
// kapital di sekelilingnya).
export default function BrandText({ text, scale = 1.35 }) {
  return text.split('').map((ch, i) =>
    /[a-z]/.test(ch) ? (
      <span key={i} style={{ fontSize: `${scale}em` }}>{ch}</span>
    ) : (
      <span key={i}>{ch}</span>
    )
  );
}
