import { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Головна функція, яка робить магію
  const generateMatch = async () => {
    setLoading(true);
    
    try {
      // 1. Отримуємо випадкового песика
      const dogRes = await fetch('https://api.thedogapi.com/v1/images/search');
      const dogData = await dogRes.json();
      const dogImage = dogData[0].url;

      // 2. Отримуємо випадкову пісню Леді Гаги з iTunes
      // Шукаємо 50 пісень і вибираємо одну навмання
      const itunesRes = await fetch('https://itunes.apple.com/search?term=lady+gaga&entity=song&limit=50');
      const itunesData = await itunesRes.json();
      const randomIndex = Math.floor(Math.random() * itunesData.results.length);
      const track = itunesData.results[randomIndex];
      
      const songName = track.trackName;
      const previewUrl = track.previewUrl;
      const albumCover = track.artworkUrl100.replace('100x100', '300x300'); // Робимо картинку більшою

      // 3. Отримуємо цитату з пісні (Lyrics.ovh)
      // Робимо try/catch, бо тексти є не на всі пісні
      let quote = "I'm on the right track, baby, I was born to survive."; // Цитата за замовчуванням
      try {
        // Очищаємо назву (прибираємо приписки типу "Radio Edit", щоб АРІ краще шукало)
        const cleanSongName = songName.split('(')[0].trim();
        const lyricsRes = await fetch(`https://api.lyrics.ovh/v1/Lady Gaga/${cleanSongName}`);
        
        if (lyricsRes.ok) {
          const lyricsData = await lyricsRes.json();
          // Розбиваємо текст на рядки і беремо випадковий (не пустий)
          const lines = lyricsData.lyrics.split('\n').filter(line => line.trim().length > 10);
          if (lines.length > 0) {
            quote = lines[Math.floor(Math.random() * lines.length)];
          }
        }
      } catch (e) {
        console.log("Не вдалося знайти текст, використовуємо запасний рядок");
      }

      // Зберігаємо всі дані, щоб показати їх на екрані
      setResult({
        image: dogImage,
        song: songName,
        cover: albumCover,
        audio: previewUrl,
        quote: quote
      });

    } catch (error) {
      console.error("Помилка:", error);
      alert("Ой, щось зламалося! Спробуй ще раз.");
    }
    
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🐾 GagaPet Matcher ⚡️</h1>
      <p>Дізнайся, який трек Гаги описує настрій цього песика!</p>

      <button 
        onClick={generateMatch} 
        disabled={loading}
        style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', margin: '20px' }}
      >
        {loading ? 'Шукаємо настрій...' : 'Згенерувати Метч!'}
      </button>

      {result && (
        <div style={{ border: '2px solid #ccc', padding: '20px', maxWidth: '400px', margin: '0 auto', borderRadius: '15px' }}>
          <img src={result.image} alt="Випадковий песик" style={{ width: '100%', borderRadius: '10px' }} />
          
          <h2 style={{ margin: '15px 0 5px 0' }}>{result.song}</h2>
          <p style={{ fontStyle: 'italic', color: '#555' }}>"{result.quote}"</p>
          
          <img src={result.cover} alt="Обкладинка альбому" style={{ width: '100px', borderRadius: '5px', margin: '10px 0' }} />
          
          <br />
          {/* Плеєр для 30-секундного уривку */}
          <audio controls src={result.audio} style={{ width: '100%', marginTop: '10px' }}>
            Ваш браузер не підтримує аудіо.
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;