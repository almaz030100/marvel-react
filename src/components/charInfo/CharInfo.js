import './charInfo.scss';
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({charId}) => {
  const [char, setChar] = useState()
  const {loading, error, getCharacter} = useMarvelService()

  async function updateChar() {
    if (charId) {
      const char = await getCharacter(charId)
      setChar(char)
    }
  }

  useEffect(() => {
    async function fetchData() {
      await updateChar()
    }
    fetchData()
    // eslint-disable-next-line
  }, [charId])

  return (
    <div className="char__info">

      {function () {
        if (loading) return <Spinner/>
        if (error) return <ErrorMessage/>
        if (!char) return <Skeleton/>

        const {name, description, thumbnail, homepage, wiki, comics} = char
        return (
          <>
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
          </>
        )
      }()}

    </div>
  )

}

export default CharInfo;