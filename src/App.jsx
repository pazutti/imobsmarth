import React, { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Vistoria from './pages/Vistoria.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

/**
 * Componente raiz da aplicação.
 *
 * Gerencia as diferentes páginas (home, login, cadastro e vistoria) através
 * de um estado simples em vez de um roteador completo. Também controla o
 * usuário autenticado e persiste as informações no localStorage para que
 * a sessão se mantenha entre recarregamentos.
 */
export default function App() {
  // 'page' indica qual tela está sendo exibida: 'home', 'login', 'signup' ou 'vistoria'
  const [page, setPage] = useState('home');
  // objeto do usuário atualmente logado ou null
  const [currentUser, setCurrentUser] = useState(null);

  // Carrega usuário e lista de usuários do armazenamento local ao inicializar.
  useEffect(() => {
    // Garante que existe ao menos um usuário de demonstração
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      localStorage.setItem(
        'users',
        JSON.stringify([
          {
            name: 'Usuário Teste',
            email: 'test@example.com',
            password: '123456',
            address: 'Rua Exemplo, 123, Centro, São Paulo',
          },
        ])
      );
    }
    // Verifica se há sessão ativa
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setPage('vistoria');
    }
  }, []);

  // Lida com login bem‑sucedido. Recebe o usuário encontrado e o armazena.
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setPage('vistoria');
  };

  // Lida com cadastro bem‑sucedido. Recebe o usuário criado e o armazena.
  const handleSignupSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setPage('vistoria');
  };

  // Sai da sessão atual.
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setPage('home');
  };

  return page === 'vistoria'
    ? <Vistoria onLogout={handleLogout} />
    : page === 'login'
    ? <Login onLoginSuccess={handleLoginSuccess} onNavigateSignup={() => setPage('signup')} />
    : page === 'signup'
    ? <Signup onSignupSuccess={handleSignupSuccess} onNavigateLogin={() => setPage('login')} />
    : <Home onLogin={() => setPage('login')} onSignup={() => setPage('signup')} />;
}
