import './singleComicPage.scss';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SingleComicPage = () => {
  const params = useParams()
  const [comic, setComic] = useState()
  const {loading, error, getComic} = useMarvelService()

  useEffect(() => {
    async function fetchData() {
      const res = await getComic(params.id)
      setComic(res)
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <main>

      {function () {
        if (loading) return <Spinner/>
        if (error || !comic) return <ErrorMessage/>

        const {thumbnail, title, description, pageCount, language, price} = comic
        return (
          <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
              <h2 className="single-comic__name">{title}</h2>
              <p className="single-comic__descr">{description}</p>
              <p className="single-comic__descr">{pageCount} pages</p>
              <p className="single-comic__descr">Language: {language}</p>
              <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
          </div>
        )
      }()}

    </main>
  )
}

export default SingleComicPage;