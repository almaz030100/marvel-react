import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {useState} from "react";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null)

  return (
    <main>
      <RandomChar/>
      <div className="char__content">
        <CharList onCharSelected={(id) => setSelectedChar(id)} selectedChar={selectedChar}/>
        <CharInfo charId={selectedChar}/>
      </div>
    </main>
  )
}

export default MainPage