import WebTorrent from 'webtorrent';

interface SerializableTorrent {
  name: String;
  magnetURI: String;
  infoHash: String;
  files: WebTorrent.TorrentFile[];
  announce: String[];
  pieces: (WebTorrent.TorrentPiece | null)[];
}

const serializableTorrent = (torrent: WebTorrent.Torrent) => {
  const output: SerializableTorrent = {
    name: torrent.name,
    infoHash: torrent.infoHash,
    magnetURI: torrent.magnetURI,
    files: torrent.files,
    announce: torrent.announce,
    pieces: torrent.pieces,
  };
  return output;
};


class TorrentsStore {
  client: WebTorrent.Instance;

  constructor() {
    this.client = new WebTorrent();
  }

  get torrents() {
    return this.client.torrents.map(serializableTorrent);
  }

  add(magnetLink: string) {
    return new Promise((resolve: (torrent: WebTorrent.Torrent) => void) => {
      this.client.add(magnetLink, (torrent) => {
        resolve(torrent);
      });
    });
  }

}


const store = new TorrentsStore();

export { store };
