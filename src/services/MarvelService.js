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

  return {loading, error, getAllCharacters, getCharacter}

}

export default useMarvelService