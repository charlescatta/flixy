import WebTorrent from 'webtorrent';

interface SerializableTorrent {
  name: String;
  magnetURI: String;
  infoHash: String;
  files: WebTorrent.TorrentFile[];
  announce: String[];
  pieces: (WebTorrent.TorrentPiece | null)[];
}

function serialize(torrent: WebTorrent.Torrent) {
    return {
      name: torrent.name,
      infoHash: torrent.infoHash,
      magnetURI: torrents.magnetURI,
      files: torrents.files,
      announce: torrents.announce,
      pieces: torrents.pieces,
    };
}

class TorrentsStore {
  client: WebTorrent.Instance;

  constructor(opts = {}) {
    this.client = new WebTorrent(opts);
    this.pending = [];
  }

  get torrents() {
    return this.client.torrents.map(serialize);
  }

  add(magnetLink: string) {
    return new Promise((resolve: (torrent: WebTorrent.Torrent) => void) => {
      this.pending.push(magnetLink);
      this.client.add(magnetLink, (torrent) => {
        const index = this.pending.indexOf(magnetLink);
        if (index > -1) {
          this.pending.splice(index, 1);
        }
        resolve(torrent);
      });
    });
  }

}


const store = new TorrentsStore();

export { store };
