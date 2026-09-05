// Renderer markdown super ringan, khusus buat jawaban chatbot AI.
// Kita sengaja tidak pakai library markdown penuh (biar tetap ringan),
// cukup menangani 2 hal yang paling sering dipakai Gemini:
//   1. **teks tebal** -> <strong>
//   2. Baris baru (\n) -> ditampilkan sebagai baris terpisah, bukan
//      digabung jadi satu paragraf panjang (masalah utama sebelumnya).
export function renderChatText(text) {
  if (!text) return null;

  const lines = String(text).split('\n').filter((line) => line.trim() !== '');

  return lines.map((line, i) => (
    <div key={i} style={{ marginBottom: i < lines.length - 1 ? 6 : 0 }}>
      {renderBold(line)}
    </div>
  ));
}

function renderBold(line) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
