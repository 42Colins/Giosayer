import Image from './components/Image'
import img from './img/template.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Discover the g_art
        </p>
      </header>
        <Image/>
        {/* <img src={img} className="Img-logo" alt="img"/> */}
    </div>
  );
}

export default App;