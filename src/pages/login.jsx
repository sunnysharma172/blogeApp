import React, { useState } from 'react';
import authService from '../appwrite/auth';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await authService.login(email, password);
      if (res) {
        console.log(res, 'Login res');
      }
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const login =useAuthStore((state)=>state.login)
  const handleGetLoginUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        login(user)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8,
        maxHeight: '80vh',
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 10 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button onClick={handleGetLoginUser}>Get Login User</button>
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
        {success && (
          <div style={{ color: 'green', marginTop: 12 }}>
            Account created successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
