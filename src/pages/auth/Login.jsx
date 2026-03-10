// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/auth/Login.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from 'react';
import { Phone, Btn, Input, Divider } from '../../shared/components';
import { PRIMARY } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { login } from '../../shared/api/authApi';
import { apiFetch } from '../../shared/api/apiClient';

export default function Login() {
  // 1. 라우터
  const navigate = useNavigate();

  // 2. 상태 관리
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  // 3. 로그인 핸들러
  const handleLogin = async () => {
    try {
      // 3-1. 로그인 API 호출
      const data = await login(loginId, password);

      // 3-2. 로그인 성공 시 홈으로 이동
      navigate('/customer/home');
    } catch (error) {
      console.error('로그인 요청 중 오류', error);
    }
  };

  const handleTest = async () => {
    try {
      const response = await apiFetch('/api/test');
      const data = await response.json();
      console.log('test 응답', data);
    } catch (error) {
      console.error('test 요청 실패', error);
    }
  };

  return (
    <Phone noNav>
      <div
        style={{
          flex: 1,
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          justifyContent: 'center'
        }}>
        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <div style={{ fontSize: '52px' }}>🍽️</div>
          <div style={{ fontSize: '22px', fontWeight: 900 }}>배고팡</div>
        </div>
        <Btn variant="kakao" full onClick={handleTest}>
          <span style={{ fontSize: '17px' }}>💬</span>카카오로 시작하기
        </Btn>
        <Divider label="또는 아이디로 로그인" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <Input placeholder="아이디" onChange={(e) => setLoginId(e.target.value)} />

          <Input placeholder="비밀번호" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Btn variant="primary" full onClick={handleLogin}>
          로그인
        </Btn>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: '#9E9E9E' }}>
          <span style={{ cursor: 'pointer' }}>아이디 찾기</span>
          <span>|</span>
          <span style={{ cursor: 'pointer' }}>비밀번호 찾기</span>
          <span>|</span>
          <span onClick={() => navigate('/auth/signup')} style={{ color: PRIMARY, fontWeight: 700, cursor: 'pointer' }}>
            회원가입
          </span>
        </div>
      </div>
    </Phone>
  );
}
