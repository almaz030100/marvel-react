import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {useState} from "react";

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null)

  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList onCharSelected={(id) => setSelectedChar(id)} selectedChar={selectedChar}/>
          <CharInfo charId={selectedChar}/>
        </div>
      </main>
    </div>
  )
}

export default App;