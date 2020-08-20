import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      id: "",
      title: 'Desafio ReactJS',
      url: 'https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      techs: 'ReactJS',
      likes: 0
    });

    const repositories = response.data;

    setRepository([...repository, repositories]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`http://localhost:3333/repositories/${id}`, {
    });

    setRepository(repository.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repository.map((repositories) => (
        <li key={repositories.id}>
          {repositories.title}

          <button 
            onClick={() => handleRemoveRepository(repositories.id)}
          >
            Remover
          </button>
        </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
