import React, { useEffect, useState } from "react";

function App() {
  const [piada, setPiada] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos"));
    if (favoritosSalvos) {
      setFavoritos(favoritosSalvos);
    }

    fetch("https://api.chucknorris.io/jokes/random")
      .then((resposta) => resposta.json())
      .then((dados) => setPiada(dados.value));
  }, []);

  const curtirPiada = () => {
    if (piada) {
      const novosFavoritos = [...favoritos, piada];
      setFavoritos(novosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    }
  };

  const deletarFavorito = (indice) => {
    const confirma = window.confirm("Tem certeza que deseja excluir?");
    if (confirma) {
      const novosFavoritos = [...favoritos];
      novosFavoritos.splice(indice, 1);
      setFavoritos(novosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    }
  };

  return (
    <div>
      <h1>Piadas </h1>
      {piada && (
        <div>
          <p>{piada}</p>
          <button onClick={curtirPiada}>Curtir</button>
        </div>
      )}
      <h2>Favoritos</h2>
      <ul>
        {favoritos.map((favorito, indice) => (
          <li key={indice}>
            {favorito}
            <button onClick={() => deletarFavorito(indice)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
