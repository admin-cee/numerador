// frontend/src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Dashboard CEE-Numerador</h1>
      <p>Bem-vindo ao sistema de numeração de documentos do CEE-SC.</p>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '0.5rem 0' }}>
            <Link to="/login">Login</Link>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Link to="/register">Registrar-se</Link>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Link to="/dashboard">Acessar Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
