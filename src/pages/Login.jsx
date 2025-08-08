import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onGoSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setError('');
      localStorage.setItem('currentUser', JSON.stringify(found));
      if (onLoginSuccess) onLoginSuccess(found);
    } else {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px' }}>
      <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Entrar</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 10 }}>Entrar</button>
      </form>
      <p style={{ marginTop: 12, textAlign: 'center' }}>
        Não possui conta?{' '}
        <button
          type="button"
          className="btn btn-link"
          style={{ color: '#007bff', background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}
          onClick={onGoSignup}
        >
          Criar conta
        </button>
      </p>
    </div>
  );
}
