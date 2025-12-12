import './randomChar.scss';
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

const RandomChar = () => {
  const [char, setChar] = useState()
  const {loading, error, getCharacter} = useMarvelService()

  async function updateChar() {
    const id = Math.floor(Math.random() * 20) + 1
    const char = await getCharacter(id)
    setChar(char)
  }

  useEffect(() => {
    async function fetchData() {
      await updateChar()
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="randomchar">

      {function () {
        if (loading) return <Spinner/>
        if (error) return <ErrorMessage/>

        if (char) {
          const {name, description, thumbnail, homepage, wiki} = char
          return (
            <div className="randomchar__block">
              <img src={thumbnail} alt={name} className="randomchar__img"/>
              <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                  {description}
                </p>
                <div className="randomchar__btns">
                  <a href={homepage} target="_blank" rel="noreferrer" className="button button__main">
                    <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
                    <div className="inner">Wiki</div>
                  </a>
                </div>
              </div>
            </div>
          )
        }
      }()}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src="/img/mjolnir.png" alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )

}

export default RandomChar;