# FLIX

## API

`
GET /api/v0/torrent
  - returns all torrent info

GET /api/v0/torrent/{infohash}
  - returns a specific torrent info

GET /api/v0/torrent/{infoHash}/stats
  - returns bandwidth and speed stats for specific torrent

POST /api/v0/torrent
  - takes a body {magnet: "magnet:....."}
  - adds torrent to the engine

`