// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/Home.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useEffect, useState } from 'react';
import { Phone, Chip, Img, Badge, Section } from '../../shared/components';
import { Icon } from '../../shared/icons';
import { G, PRIMARY, AI_COLOR } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../shared/api/apiClient';

function Stars({ v = 4.5, size = 12 }) {
  return (
    <span style={{ color: '#FFC107', fontSize: `${size}px` }}>
      {'★'.repeat(Math.floor(v))}
      {'☆'.repeat(5 - Math.floor(v))}
    </span>
  );
}

export default function Home({ go }) {
  // 라우터
  const navigate = useNavigate();
  // 태그
  const [cat, setCat] = useState('전체');
  const cats = ['전체', '🍚 한식', '🥢 중식', '🌮 분식', '🍗 치킨', '🍕 피자', '🍣 일식'];

  // 가게 데이터
  const mockStores = [
    {
      name: '맛있는 한식당',
      cat: '한식',
      rating: 4.7,
      reviews: 234,
      dist: '0.8km',
      minOrder: '12,000',
      fee: '2,000',
      speed: '25~35분'
    },
    {
      name: '황금 중식당',
      cat: '중식',
      rating: 4.4,
      reviews: 98,
      dist: '1.2km',
      minOrder: '15,000',
      fee: '3,000',
      speed: '30~40분'
    },
    {
      name: '엄마손 분식',
      cat: '분식',
      rating: 4.9,
      reviews: 412,
      dist: '0.4km',
      minOrder: '8,000',
      fee: '1,000',
      speed: '15~25분'
    }
  ];

  const [stores, setStores] = useState(mockStores);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStores = async () => {
      try {
        // const data = await apiFetch('/api/stores/nearby', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     loginId: form.loginId,
        //     password: form.password,
        //     name: form.name,
        //     email: form.email,
        //     phone: form.phone,
        //     type: role
        //   })
        // });

        setStores(data.data); // 실제 데이터로 교체
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <Phone navActive="home">
      {/* 상단 주소 + 검색 */}
      <div style={{ padding: '14px 14px 8px', background: '#fff', borderBottom: `1px solid ${G[100]}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '9px' }}>
          <div>
            <div style={{ fontSize: '11px', color: G[500] }}>배달 주소</div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: G[900],
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
              📍 광화문 1가 <span style={{ fontSize: '11px', color: PRIMARY }}>▾</span>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '9px 13px',
            border: `1.5px solid ${G[200]}`,
            borderRadius: '11px',
            background: G[50],
            color: G[400],
            fontSize: '13px',
            display: 'flex',
            gap: '8px'
          }}>
          {Icon.search()}
          <span>가게 이름, 메뉴를 검색해보세요</span>
        </div>
      </div>
      {/* AI 추천 배너 */}
      <div
        onClick={() => {
          navigate('/customer/ai-recommend');
        }}
        style={{
          margin: '10px 14px 0',
          padding: '12px 14px',
          borderRadius: '13px',
          background: `linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
        <span style={{ fontSize: '26px' }}>✨</span>
        <div style={{ color: '#fff' }}>
          <div style={{ fontSize: '13px', fontWeight: 800 }}>AI 메뉴 추천 받기</div>
          <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '2px' }}>오늘 뭐 먹을지 모르겠다면?</div>
        </div>
        <span style={{ marginLeft: 'auto', color: '#fff', fontSize: '18px', opacity: 0.8 }}>›</span>
      </div>
      <Img
        h="180px"
        label="프로모션 배너"
        style={{ borderRadius: 0, border: 'none', margin: '10px 0 0', flexShrink: 0 }}
      />
      {/* 카테고리 + 리스트 */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          style={{
            display: 'flex',
            gap: '7px',
            overflowX: 'auto',
            paddingBottom: '4px',
            marginLeft: '-14px',
            paddingLeft: '14px'
          }}>
          {cats.map((c) => (
            <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />
          ))}
        </div>
        <Section title="🔥 인기 가게">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stores.map((s, i) => (
              <div
                key={i}
                onClick={() => navigate('/customer/ai-recommend')}
                style={{
                  border: `1.5px solid ${G[200]}`,
                  borderRadius: '13px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#fff'
                }}>
                <Img h="115px" label={s.name} style={{ borderRadius: 0, border: 'none' }} />
                <div style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: G[900] }}>{s.name}</span>
                    <Badge color="#fff" bg={PRIMARY}>
                      {s.cat}
                    </Badge>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '3px 0' }}>
                    <Stars v={s.rating} />
                    <span style={{ fontSize: '12px', fontWeight: 700 }}>{s.rating}</span>
                    <span style={{ fontSize: '11px', color: G[400] }}>{s.reviews}개</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', fontSize: '11px', color: G[500] }}>
                    <span>📍{s.dist}</span>
                    <span>·</span>
                    <span>최소 {s.minOrder}원</span>
                    <span>·</span>
                    <span>배달비 {s.fee}원</span>
                    <span>·</span>
                    <span>⏱{s.speed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </Phone>
  );
}
