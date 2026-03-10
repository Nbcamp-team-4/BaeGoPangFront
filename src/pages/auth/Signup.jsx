// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/auth/Signup.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from 'react';
import { Phone, TopBar, Btn, Input, Divider } from '../../shared/components';
import { G, PRIMARY, PRIMARY_LIGHT } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../shared/api/apiClient';

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState('ROLE_CUSTOMER');
  const [idStatus, setIdStatus] = useState(null);

  const [form, setForm] = useState({
    loginId: '',
    nickname: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    businessNumber: ''
  });

  const handleChange = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  const handleIdCheck = () => {
    setIdStatus('checking');
    setTimeout(() => setIdStatus(Math.random() > 0.4 ? 'available' : 'taken'), 900);
  };

  const handleSignup = async () => {
    try {
      await apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          loginId: form.loginId,
          password: form.password,
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: role
        })
      });

      navigate('/auth/login');
    } catch (error) {
      console.error('회원가입 실패', error);
    }
  };

  return (
    <Phone noNav>
      <TopBar title="회원가입" backTo="/auth/login" />
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
        {/* 역할 선택 */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: G[600], marginBottom: '7px' }}>회원 유형</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px' }}>
            {[
              { v: 'ROLE_CUSTOMER', icon: '🛒', label: '고객', desc: '음식 주문' },
              { v: 'ROLE_OWNER', icon: '🏪', label: '사장님', desc: '가게 운영' }
            ].map((r) => (
              <button
                key={r.v}
                onClick={() => setRole(r.v)}
                style={{
                  padding: '14px 10px',
                  border: `2px solid ${role === r.v ? PRIMARY : G[300]}`,
                  borderRadius: '12px',
                  background: role === r.v ? PRIMARY_LIGHT : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontFamily: 'inherit'
                }}>
                <div style={{ fontSize: '26px', marginBottom: '4px' }}>{r.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: role === r.v ? PRIMARY : G[800] }}>
                  {r.label}
                </div>
                <div style={{ fontSize: '11px', color: G[500], marginTop: '2px' }}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <Divider />

        {/* 폼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '4px' }}>아이디</div>
            <div style={{ display: 'flex', gap: '7px', alignItems: 'stretch' }}>
              <Input
                placeholder="영소문자+숫자 4~10자"
                value={form.loginId}
                onChange={handleChange('loginId')}
                style={{
                  flex: 1,
                  border: `1.5px solid ${
                    idStatus === 'available' ? '#2E7D32' : idStatus === 'taken' ? '#C62828' : G[300]
                  }`
                }}
              />
              <button
                onClick={handleIdCheck}
                style={{
                  padding: '0 13px',
                  borderRadius: '10px',
                  border: `1.5px solid ${PRIMARY}`,
                  background: idStatus === 'checking' ? G[100] : PRIMARY_LIGHT,
                  color: PRIMARY,
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  flexShrink: 0
                }}>
                {idStatus === 'checking' ? '확인중…' : '중복확인'}
              </button>
            </div>
            {idStatus === 'available' && (
              <div style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 600, marginTop: '5px' }}>
                ✓ 사용 가능한 아이디입니다.
              </div>
            )}
            {idStatus === 'taken' && (
              <div style={{ fontSize: '11px', color: '#C62828', fontWeight: 600, marginTop: '5px' }}>
                ✗ 이미 사용 중인 아이디입니다.
              </div>
            )}
          </div>

          {[
            ['이름', '실명 입력', 'name'],
            ['이메일', 'example@email.com', 'email'],
            ['전화번호', '010-0000-0000', 'phone'],
            ['비밀번호', '8~15자', 'password'],
            ['비밀번호 확인', '재입력', 'passwordConfirm']
          ].map(([l, p, key]) => (
            <div key={l}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '4px' }}>{l}</div>
              <Input
                placeholder={p}
                value={form[key]}
                onChange={handleChange(key)}
                type={l.includes('비밀번호') ? 'password' : 'text'}
              />
            </div>
          ))}

          {role === 'ROLE_OWNER' && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '4px' }}>사업자번호</div>
              <Input placeholder="000-00-00000" value={form.businessNumber} onChange={handleChange('businessNumber')} />
            </div>
          )}
        </div>

        <Btn variant="primary" full onClick={handleSignup}>
          가입하기
        </Btn>
      </div>
    </Phone>
  );
}
