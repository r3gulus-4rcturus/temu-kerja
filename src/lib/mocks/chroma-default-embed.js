// File ini berfungsi sebagai pengganti kosong untuk modul yang bermasalah di chromadb.
export class DefaultEmbeddingFunction {
    constructor() {
      // Tidak perlu melakukan apa-apa di sini.
    }
    async generate(texts) {
      // Mengembalikan array kosong untuk memenuhi tipe data yang diharapkan.
      return texts.map(() => []);
    }
  }