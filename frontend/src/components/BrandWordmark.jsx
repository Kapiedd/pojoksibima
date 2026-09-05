// "Wordmark" logo teks "POJOK Si BiMa" -- huruf kecil (i, a) sengaja
// dibesarkan ukurannya (bukan diubah jadi kapital/small-caps) supaya
// tingginya kelihatan setara dengan huruf besar di sekitarnya, tanpa
// mengubah bentuk huruf aslinya. Dipakai bareng di Navbar & Footer biar
// tampilannya konsisten.
export default function BrandWordmark({ style }) {
  // fontWeight lebih ringan sengaja dipasang di sini -- soalnya makin besar
  // ukuran huruf, semakin tebal juga garisnya kelihatan dibanding huruf lain
  // di sekitarnya yang ukurannya normal. Menurunkan fontWeight di sini
  // menyeimbangkan itu supaya ketebalannya terasa konsisten.
  const bigLetterStyle = { fontSize: '1.35em', lineHeight: 1, fontWeight: 505 };

  return (
    <span style={style}>
      POJOK Si BiM<span style={bigLetterStyle}>a</span>
    </span>
  );
}
