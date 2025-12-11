import {ofetch} from "ofetch";

class MarvelService {

  useApi = async (url, opts = {}) => {
    return await ofetch(url, {
      baseURL: 'https://marvel-server-zeta.vercel.app',
      ...opts,
      async onRequest({options}) {
        options.query = options.query || options.params || {}
        options.query.apikey = 'd4eecb0c66dedbfae4eab45d312fc1df'
      }
    })
  }

  getAllCharacters = async () => {
    const res = await this.useApi('/characters')
    return res.data?.results?.map(this._transformCharacter)
  }

  getCharacter = async (id) => {
    const res = await this.useApi(`/characters/${id}`)
    return this._transformCharacter(res.data?.results?.[0])
  }

  _transformCharacter = (data) => {
    return {
      name: data.name,
      description: data.description,
      thumbnail: `${data.thumbnail?.path}.${data.thumbnail?.extension}`,
      homepage: data.urls?.[0]?.url,
      wiki: data.urls?.[1]?.url,
    }
  }

}

export default MarvelService