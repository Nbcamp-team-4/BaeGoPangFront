// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/auth/Signup.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from 'react';
import { Phone, TopBar, Btn, Input, Divider } from '../../shared/components';
import { G, PRIMARY, PRIMARY_LIGHT } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../shared/api/apiClient';

const FIXED_LATITUDE = 37.575565;
const FIXED_LONGITUDE = 126.976785;

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState('ROLE_CUSTOMER');
  const [idStatus, setIdStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    loginId: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    businessNumber: '',
    addressName: '',
    addressPhone: '',
    address: '',
    detailAddress: '',
    latitude: FIXED_LATITUDE,
    longitude: FIXED_LONGITUDE,
    isDefault: true
  });

  const handleChange = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePhoneChange = (key) => (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);

    if (value.length <= 3) {
      value = value;
    } else if (value.length <= 7) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    }

    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleIdCheck = () => {
    setIdStatus('checking');
    setTimeout(() => setIdStatus(Math.random() > 0.4 ? 'available' : 'taken'), 900);
  };

  const validateForm = () => {
    if (!form.loginId.trim()) {
      alert('아이디를 입력해주세요.');
      return false;
    }

    if (!/^[a-z0-9]{4,10}$/.test(form.loginId)) {
      alert('아이디는 4~10자의 영문 소문자와 숫자만 가능합니다.');
      return false;
    }

    if (!form.name.trim()) {
      alert('이름을 입력해주세요.');
      return false;
    }

    if (!form.email.trim()) {
      alert('이메일을 입력해주세요.');
      return false;
    }

    if (!form.phone.trim()) {
      alert('전화번호를 입력해주세요.');
      return false;
    }

    if (!form.password) {
      alert('비밀번호를 입력해주세요.');
      return false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$/.test(form.password)) {
      alert('비밀번호는 8~15자의 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.');
      return false;
    }

    if (form.password !== form.passwordConfirm) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return false;
    }

    if (!form.addressName.trim()) {
      alert('배송지 이름을 입력해주세요.');
      return false;
    }

    if (!form.addressPhone.trim()) {
      alert('배송지 전화번호를 입력해주세요.');
      return false;
    }

    if (!form.address.trim()) {
      alert('주소를 입력해주세요.');
      return false;
    }

    if (!form.detailAddress.trim()) {
      alert('상세 주소를 입력해주세요.');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        loginId: form.loginId,
        password: form.password,
        name: form.name,
        email: form.email,
        phone: form.phone,
        role,
        addressName: form.addressName,
        addressPhone: form.addressPhone,
        address: form.address,
        detailAddress: form.detailAddress,
        latitude: FIXED_LATITUDE,
        longitude: FIXED_LONGITUDE,
        isDefault: form.isDefault
      };

      console.log('회원가입 요청 payload:', payload);

      const response = await apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        console.error('회원가입 실패 응답:', result);
        alert(result?.message || '회원가입에 실패했습니다.');
        return;
      }

      console.log('회원가입 성공 응답:', result);
      alert(result?.message || '회원가입이 완료되었습니다.');
      navigate('/auth/login');
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
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
                type="button"
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
            ['비밀번호', '8~15자 / 대소문자+숫자+특수문자 포함', 'password'],
            ['비밀번호 확인', '재입력', 'passwordConfirm']
          ].map(([label, placeholder, key]) => (
            <div key={key}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '4px' }}>{label}</div>
              <Input
                placeholder={placeholder}
                value={form[key]}
                onChange={key === 'phone' ? handlePhoneChange(key) : handleChange(key)}
                type={label.includes('비밀번호') ? 'password' : 'text'}
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

        <Divider />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: G[700] }}>주소 정보</div>

          {[
            ['배송지명', '예: 집 / 회사 / 매장', 'addressName'],
            ['배송지 연락처', '010-0000-0000', 'addressPhone'],
            ['주소', '예: 서울 강남구 테헤란로 123', 'address'],
            ['상세 주소', '예: 101호', 'detailAddress']
          ].map(([label, placeholder, key]) => (
            <div key={key}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '4px' }}>{label}</div>
              <Input
                placeholder={placeholder}
                value={form[key]}
                onChange={key === 'addressPhone' ? handlePhoneChange(key) : handleChange(key)}
                type="text"
              />
            </div>
          ))}

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: G[700],
              cursor: 'pointer'
            }}>
            <input type="checkbox" checked={form.isDefault} onChange={handleChange('isDefault')} />
            기본 배송지로 설정
          </label>
        </div>

        <Btn variant="primary" full onClick={handleSignup} disabled={loading}>
          {loading ? '가입 중...' : '가입하기'}
        </Btn>
      </div>
    </Phone>
  );
}
