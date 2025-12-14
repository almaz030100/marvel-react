import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error} = useHttp()

  const getAllCharacters = async (query = {}) => {
    const res = await request('/characters', {query})
    return res.data?.results?.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    const res = await request(`/characters/${id}`)
    return _transformCharacter(res.data?.results?.[0])
  }

  const getComics = async (query = {}) => {
    const res = await request('/comics', {query})
    return res.data?.results?.map(_transformComics)
  }

  const getComic = async (id) => {
    const res = await request(`/comics/${id}`)
    return _transformComics(res.data?.results?.[0])
  }

  const _transformCharacter = (data) => {
    if (!data) return
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      thumbnail: `${data.thumbnail?.path}.${data.thumbnail?.extension}`,
      homepage: data.urls?.[0]?.url,
      wiki: data.urls?.[1]?.url,
      comics: data.comics?.items,
    }
  }

  const _transformComics = (data) => {
    if (!data) return
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnail: `${data.thumbnail?.path}.${data.thumbnail?.extension}`,
      price: `${data.prices?.[0]?.price}$`,
      url: `/comics/${data.id}`,
      pageCount: data.pageCount,
      language: data.textObjects?.languages,
    }
  }

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getComics,
    getComic
  }

}

export default useMarvelService