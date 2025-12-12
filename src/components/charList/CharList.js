import './charList.scss';
import Spinner from "../spinner/Spinner";
import classNames from "classnames";
import {useState, useEffect} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

const CharList = ({onCharSelected, selectedChar}) => {
  const [chars, setChars] = useState([])
  const [offset, setOffset] = useState(0)
  const {error, loading, getAllCharacters} = useMarvelService()

  async function getChars() {
    const newChars = await getAllCharacters({limit: 9, offset})
    setChars(chars => [...chars, ...newChars])
    setOffset(offset => offset + 9)
  }

  useEffect(() => {
    async function fetchData() {
      await getChars()
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  if (loading && !chars?.length) return <Spinner/>

  if (error) return <ErrorMessage/>

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
        if (loading) return <Spinner/>
        if (offset >= 20) return
        return (
          <button className="button button__main button__long" onClick={getChars}>
            <div className="inner">load more</div>
          </button>
        )
      }()}

    </div>
  )

}

export default CharList;