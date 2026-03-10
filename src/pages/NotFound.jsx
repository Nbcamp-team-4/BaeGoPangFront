import { useNavigate } from 'react-router-dom';
import { Phone } from '../shared/components';

export default function NotFound() {
  const navigate = useNavigate();
  // 실제 홈 경로에 맞게 수정
  const HOME = '/customer/home';

  return (
    <Phone noNav>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #FFF3F0 0%, #fff 50%, #FFF8E1 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          fontFamily: "'Noto Sans KR', 'Helvetica Neue', sans-serif",
          textAlign: 'center'
        }}>
        {/* 일러스트 영역 */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          {/* 그림자 */}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '16px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.08)',
              filter: 'blur(6px)'
            }}
          />

          {/* 배달 박스 SVG */}
          <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 박스 몸통 */}
            <rect x="30" y="60" width="120" height="85" rx="8" fill="#FFB74D" />
            {/* 박스 윗면 */}
            <path d="M30 68C30 63.58 33.58 60 38 60H142C146.42 60 150 63.58 150 68V82H30V68Z" fill="#FFA726" />
            {/* 박스 테이프 세로 */}
            <rect x="84" y="60" width="12" height="85" fill="#FF8F00" opacity="0.5" />
            {/* 박스 테이프 가로 */}
            <rect x="30" y="75" width="120" height="10" fill="#FF8F00" opacity="0.5" />
            {/* 박스 뚜껑 왼쪽 */}
            <path d="M30 60L50 38H90L90 60H30Z" fill="#FFB74D" />
            {/* 박스 뚜껑 오른쪽 */}
            <path d="M150 60L130 38H90L90 60H150Z" fill="#FFA726" />
            {/* 뚜껑 중앙 테이프 */}
            <rect x="84" y="38" width="12" height="22" fill="#FF8F00" opacity="0.5" />

            {/* 물음표 */}
            <text x="90" y="118" textAnchor="middle" fontSize="36" fontWeight="900" fill="#fff" opacity="0.9">
              ?
            </text>

            {/* 별 장식들 */}
            <circle cx="22" cy="45" r="4" fill="#FF5722" opacity="0.6" />
            <circle cx="160" cy="55" r="3" fill="#FFC107" opacity="0.7" />
            <circle cx="15" cy="90" r="2.5" fill="#FF9800" opacity="0.5" />
            <circle cx="168" cy="100" r="2" fill="#FF5722" opacity="0.4" />

            {/* 별 */}
            <polygon
              points="155,30 157,36 163,36 158,40 160,46 155,42 150,46 152,40 147,36 153,36"
              fill="#FFC107"
              opacity="0.8"
            />
            <polygon
              points="25,115 26.5,119.5 31,119.5 27.5,122 29,126.5 25,124 21,126.5 22.5,122 19,119.5 23.5,119.5"
              fill="#FF5722"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* 404 텍스트 */}
        <div
          style={{
            fontSize: '88px',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #FF5722, #FF9800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-4px'
          }}>
          404
        </div>

        {/* 타이틀 */}
        <div
          style={{
            fontSize: '20px',
            fontWeight: 900,
            color: '#212121',
            marginBottom: '10px'
          }}>
          페이지를 찾을 수 없어요
        </div>

        {/* 서브 메시지 */}
        <div
          style={{
            fontSize: '14px',
            color: '#9E9E9E',
            lineHeight: '1.8',
            marginBottom: '36px',
            maxWidth: '280px'
          }}>
          요청하신 페이지가 사라졌거나
          <br />
          주소가 잘못 입력됐을 수 있어요.
          <br />
          배달은 제때 가는데… 페이지는 잃었네요 🛵
        </div>

        {/* 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '280px' }}>
          <button
            onClick={() => navigate(HOME)}
            style={{
              padding: '15px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #FF5722, #FF7043)',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 4px 16px rgba(255, 87, 34, 0.35)',
              transition: 'all .15s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
            🏠 홈으로 돌아가기
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '14px',
              borderRadius: '14px',
              border: '1.5px solid #E0E0E0',
              background: '#fff',
              color: '#616161',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all .15s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = '#FF5722')}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}>
            ← 이전 페이지
          </button>
        </div>

        {/* 하단 브랜드 */}
        <div
          style={{
            marginTop: '48px',
            fontSize: '13px',
            color: '#BDBDBD',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
          🍽️ 배고팡
        </div>
      </div>
    </Phone>
  );
}
