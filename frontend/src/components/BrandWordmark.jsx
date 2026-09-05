// Frasa "Si BiMa" dengan huruf "a" diperbesar sedikit (bukan diubah jadi
// kapital) supaya proporsinya kelihatan setara dengan huruf besar di
// sekitarnya. Dipisah jadi komponen kecil sendiri (bukan cuma di dalam
// BrandWordmark) supaya bisa dipakai ulang di tempat lain juga, misalnya di
// judul widget chatbot ("Tanya Si BiMa AI").
export function SiBiMaText() {
  // fontWeight lebih ringan sengaja dipasang di sini -- soalnya makin besar
  // ukuran huruf, semakin tebal juga garisnya kelihatan dibanding huruf lain
  // di sekitarnya yang ukurannya normal. Menurunkan fontWeight di sini
  // menyeimbangkan itu supaya ketebalannya terasa konsisten.
  const bigLetterStyle = { fontSize: '1.35em', lineHeight: 1, fontWeight: 505 };
  return (
    <>Si BiM<span style={bigLetterStyle}>a</span></>
  );
}

// "Wordmark" logo teks "POJOK Si BiMa", dipakai bareng di Navbar & Footer
// biar tampilannya konsisten.
export default function BrandWordmark({ style }) {
  return (
    <span style={style}>
      POJOK <SiBiMaText />
    </span>
  );
}
