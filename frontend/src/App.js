import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import headerImg from './img/Doggo.png'; // ajuste o caminho conforme a sua estrutura de pastas

function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/dogs')
      .then(res => {
        console.log('Dados recebidos do backend: ', res.data);
        setDogs(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="app">
      <header className="app-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
      <img src={headerImg} alt="Cachorrinhos felizes" className="header-img" />

      </header>

      <h1>🐶 Adoção de Cachorrinhos</h1>

      {selectedDog ? (
        <div className="dog-detail">
          <button onClick={() => setSelectedDog(null)}>← Voltar</button>
          <img src={selectedDog.image} alt={selectedDog.name} />
          <h2>{selectedDog.name}</h2>
          <p><strong>Idade:</strong> {selectedDog.age} anos</p>
          <p><strong>Localização:</strong> {selectedDog.city}</p>
          <p>{selectedDog.description}</p>
          <p>Entre em contato através do número <strong>{selectedDog.phone}</strong></p>
        </div>
      ) : (
        <div className="dog-list">
          {dogs.map(dog => (
            <div
              key={dog.id}
              className="dog-card"
              onClick={() => setSelectedDog(dog)}
            >
              <img src={dog.image} alt={`Cachorro ${dog.id}`} />
              <h3>Doggo #{dog.id}</h3> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
