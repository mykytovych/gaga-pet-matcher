# gaga-pet-matcher


GagaPet Matcher is a lightweight web application built purely for laugh. It randomly generates a picture of a dog or a cat and pairs it with a random Lady Gaga song, complete with the album cover and a 30-second audio preview.

## Features
- Randomly fetches either a cat or a dog to match your unpredictable mood.
- Pulls a random Lady Gaga track using the iTunes Search API.
- Listen to a 30-second audio preview directly on the site.
- Neon-tinted design inspired by the Chromatica era.

## Tech Stack
This project was built focusing on simplicity and speed:
- **HTML5 & CSS3:** For the structure and glamorous styling.
- **Vanilla JavaScript:** No frameworks, no build tools, just pure asynchronous JS to handle API requests.

## APIs Used
- **[TheDogAPI](https://thedogapi.com/) & [TheCatAPI](https://thecatapi.com/):** For fetching high-quality, random images of our furry friends.
- **[iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html):** For retrieving Lady Gaga's discography, album artwork, and audio previews (no authentication required!).

## How to Run Locally
Since this project uses Vanilla JavaScript and no build tools, running it is incredibly simple:

1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/gaga-pet-matcher.git](https://github.com/YOUR_USERNAME/gaga-pet-matcher.git)
