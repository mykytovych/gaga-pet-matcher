async function generatePetMatch() {
    const btn = document.getElementById('match-btn');
    const card = document.getElementById('result-card');
    
    btn.innerText = "Lookin' for the mood...";
    btn.disabled = true;

    try {
        const isCat = Math.random() < 0.5;
        const petApiUrl = isCat ? 'https://api.thecatapi.com/v1/images/search' : 'https://api.thedogapi.com/v1/images/search';

        const petRes = await fetch(petApiUrl);
        const petData = await petRes.json();
        const petImageUrl = petData[0].url;

        const itunesRes = await fetch('https://itunes.apple.com/search?term=lady+gaga&entity=song&limit=50');
        const itunesData = await itunesRes.json();
        
        const randomIndex = Math.floor(Math.random() * itunesData.results.length);
        const track = itunesData.results[randomIndex];

        document.getElementById('pet-img').src = petImageUrl;
        document.getElementById('song-name').innerText = track.trackName;
        document.getElementById('cover-img').src = track.artworkUrl100.replace('100x100', '300x300');
        document.getElementById('audio-player').src = track.previewUrl;

        card.style.display = "block";

    } catch (error) {
        alert("Oops! Smth wrong, try again!.");
        console.error(error);
    }

    btn.innerText = "One more time";
    btn.disabled = false;
}