import React, { useState } from 'react';

export default function Signup({ onSignupSuccess, onGoLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Senhas não coincidem.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u) => u.email === email)) {
      setError('Já existe uma conta com esse e-mail.');
      return;
    }
    const newUser = {
      name,
      email,
      address,
      password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setError('');
    if (onSignupSuccess) onSignupSuccess(newUser);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px' }}>
      <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Criar conta</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Nome completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
          />
        </div>
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
          <label style={{ display: 'block', marginBottom: 4 }}>Endereço completo</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Confirmar senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 10 }}>
          Criar conta
        </button>
      </form>
      <p style={{ marginTop: 12, textAlign: 'center' }}>
        Já possui conta?{' '}
        <button
          type="button"
          className="btn btn-link"
          style={{ color: '#007bff', background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}
          onClick={onGoLogin}
        >
          Entrar
        </button>
      </p>
    </div>
  );
}
