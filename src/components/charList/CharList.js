import './charList.scss';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";
import {useState, useEffect} from "react";

const CharList = ({onCharSelected, selectedChar}) => {
  const [chars, setChars] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  const total = 20
  const limit = 9

  const marvelService = new MarvelService()

  async function getChars() {
    const newChars = await marvelService.getAllCharacters({limit, offset})
    setChars(chars => [...chars, ...newChars])
    setOffset(offset => offset + 9)
  }

  async function loadMore() {
    setLoadMoreLoading(true)
    await getChars()
    setLoadMoreLoading(false)
  }

  useEffect(() => {
    async function fetchData() {
      await getChars()
      setPageLoading(false)
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  if (pageLoading) return <Spinner/>

  return (
    <div className="char__list">
      <ul className="char__grid">

        {chars.map(item => {
          const className = classNames(
            'char__item',
            {
              'char__item_selected': item.id === selectedChar
            }
          )
          return (
            <li key={item.id} className={className} tabIndex={0} onFocus={() => onCharSelected(item.id)}>
              <img src={item.thumbnail} alt={item.name}/>
              <div className="char__name">{item.name}</div>
            </li>
          )
        })}

      </ul>

      {function () {
        if (loadMoreLoading) return <Spinner/>
        if (offset >= total) return
        return (
          <button className="button button__main button__long" onClick={loadMore}>
            <div className="inner">load more</div>
          </button>
        )
      }()}

    </div>
  )

}

export default CharList;