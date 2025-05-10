import React, { useState } from 'react';
import { login } from '../api/authApi';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login({ username, password });
      localStorage.setItem('jwt', token);
      // TODO: 로그인 후 페이지 이동 로직 추가
      alert('로그인 성공');
    } catch (err) {
      setError('로그인 실패: 아이디/비밀번호를 확인하세요');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>SVN 로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
