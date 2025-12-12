import './charInfo.scss';
import {useEffect, useState} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharInfo = ({charId}) => {
  const [char, setChar] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const marvelService = new MarvelService()

  async function updateChar() {
    if (!charId) return
    try {
      setLoading(true)
      const char = await marvelService.getCharacter(charId)
      setChar(char)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function fetchData() {
      await updateChar()
    }
    fetchData()
    // eslint-disable-next-line
  }, [charId])

  const {name, description, thumbnail, homepage, wiki, comics, id} = char

  if (loading) return <Spinner/>
  if (error) return <ErrorMessage/>
  if (!id) return null
  return (
    <div className="char__info">
      <div className="char__basics">
        <img src={thumbnail} alt={name}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} target="_blank" rel="noreferrer" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics?.map(item => {
          return (
            <li key={item} className="char__comics-item">
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )

}

export default CharInfo;