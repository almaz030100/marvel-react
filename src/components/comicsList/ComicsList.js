import './comicsList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
  const [comics, setComics] = useState([])
  const [offset, setOffset] = useState(0)
  const {error, loading, getComics: getComicsService} = useMarvelService()

  async function getComics() {
    const newChars = await getComicsService({limit: 8, offset})
    setComics(comics => [...comics, ...newChars])
    setOffset(offset => offset + 8)
  }

  useEffect(() => {
    async function fetchData() {
      await getComics()
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="comics__list">

      {function () {
        if (loading && !comics?.length) return <Spinner/>
        if (error) return <ErrorMessage/>
        return (
          <>
            <ul className="comics__grid">

              {comics.map(item => {
                return (
                  <li key={item.id} className="comics__item">
                    <a href={item.url}>
                      <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                      <div className="comics__item-name">{item.title}</div>
                      <div className="comics__item-price">{item.price}</div>
                    </a>
                  </li>
                )
              })}

            </ul>

            {function () {
              if (loading) return <Spinner/>
              if (offset >= 20) return
              return (
                <button className="button button__main button__long" onClick={getComics}>
                  <div className="inner">load more</div>
                </button>
              )
            }()}
          </>
        )
      }()}

    </div>
  )
}

export default ComicsList;