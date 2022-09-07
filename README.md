# jak włączyć:

kroki: \
trzeba mieć node \
w konsoli wpisać: `node --version` \
mi wyskakuje `v16.16.0` \
jak nie ma to https://nodejs.org/en/download/

- sklonować repo
- wejść do ReactWWW
- odpalić dwie konsole w ReactWWW
- w pierwszej wpisać `npm install`
- jak skończy mielić to wpisać `node server.js`
- w drugiej konsoli wpisać `npm start`
- w przeglądarce wejść na http://localhost:3000/

no i jest odpalone

## dodawanie danych pokoi:

kroki:

- skorzystać z mapCreatora, chyba że chcesz samemu piksele liczyć (trzeba przestrzegać schematu nazw)
- dane o piętrze dajemy do floors w BuildingData.jsx
- dane o budynku dajemy do buildings w BuildingData.jsx
- plan piętra dodajemy od images w Images.jsx
- w server.js w initializeDB dodajemy nowe entry do roomData dla każdego pokoju
