import logo from './logo.svg';
import './App.css';
let pessoas = [
  {
    "COD": "001",
    "NOME": "Peter 1"
  },
  {
    "COD": "002",
    "NOME": "Peter 2"
  },
  {
    "COD": "003",
    "NOME": "Peter 3"
  },
]
function MyButton() {
  return (
    <button>Buenos Días</button>
  );
}

function TabelaPessoas() {
  return (
    <table>
      <tr>
        <th>COD</th>
        <th>Nome</th>
      </tr>
      {pessoas.map((pessoa) => (
        <tr key={pessoa.COD}>
          <td>{pessoa.COD}</td>
          <td>{pessoa.NOME}</td>
        </tr>
      ))}
    </table>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TabelaPessoas></TabelaPessoas>
        <p>
          Edit <code>src/App.js</code> and save to reload <MyButton />.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
