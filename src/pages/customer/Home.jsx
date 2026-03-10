// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/Home.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useEffect, useState } from 'react';
import { Phone, Chip, Img, Badge, Section } from '../../shared/components';
import { Icon } from '../../shared/icons';
import { G, PRIMARY, AI_COLOR } from '../../shared/constants';

import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../shared/api/apiClient';

import { getStores } from '../../shared/api/storeApi';

function Stars({ v = 4.5, size = 12 }) {
  return (
    <span style={{ color: '#FFC107', fontSize: `${size}px` }}>
      {'★'.repeat(Math.floor(v))}
      {'☆'.repeat(5 - Math.floor(v))}
    </span>
  );
}

export default function Home() {
  // 라우터
  const navigate = useNavigate();
  // 카테고리
  const mockCats = [
    { id: null, name: '전체', icon: '' },
    { id: 'korean', name: '한식', icon: '🍚' },
    { id: 'chinese', name: '중식', icon: '🥢' },
    { id: 'snack', name: '분식', icon: '🌮' },
    { id: 'chicken', name: '치킨', icon: '🍗' },
    { id: 'pizza', name: '피자', icon: '🍕' },
    { id: 'japanese', name: '일식', icon: '🍣' }
  ];

  const [categories, setCategories] = useState(mockCats);
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiFetch('/api/categories', {
          method: 'GET'
        });

        if (!res.ok) {
          const bodyText = await res.text().catch(() => '');
          throw new Error(`categories request failed: ${res.status} ${res.statusText} ${bodyText}`);
        }

        const json = await res.json();
        console.log('카테고리 전체 응답:', json);

        const rawList = json?.data?.content ?? json?.content ?? json?.data ?? [];

        const categoryList = Array.isArray(rawList) ? rawList : [];

        const normalizedCategories = categoryList.map((item) => ({
          id: item.id,
          name: item.name,
          icon: ''
        }));

        setCategories([{ id: null, name: '전체', icon: '' }, ...normalizedCategories]);

        console.log('성공적으로 카테고리를 불러왔습니다.');
      } catch (e) {
        console.error('카테고리 조회 실패', e);
      }
    };

    fetchCategories();
  }, []);

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
        setLoading(true);
        setError(null);

        const res = await getStores(cat);

        // `getStores`는 내부 조건에 따라 [] 또는 fetch Response를 반환함
        if (Array.isArray(res)) {
          setStores(res.length ? res : mockStores);
          return;
        }

        if (!res.ok) {
          const bodyText = await res.text().catch(() => '');
          throw new Error(`stores request failed: ${res.status} ${res.statusText} ${bodyText}`);
        }

        const json = await res.json();
        console.log('가게 전체 응답:', json);

        const rawList = json?.data?.content ?? json?.content ?? json?.data ?? [];
        const list = Array.isArray(rawList) ? rawList : [];

        const normalized = list.map((s) => ({
          name: s.name ?? s.storeName ?? s.title ?? '가게',
          cat: s.categoryName ?? s.category ?? s.cat ?? '',
          rating: s.rating ?? s.averageRating ?? 0,
          reviews: s.reviewCount ?? s.reviews ?? 0,
          dist: s.distanceKm != null ? `${s.distanceKm}km` : s.dist ?? '',
          minOrder: s.minOrderAmount != null ? s.minOrderAmount.toLocaleString() : s.minOrder ?? '',
          fee: s.deliveryFee != null ? s.deliveryFee.toLocaleString() : s.fee ?? '',
          speed: s.eta ?? s.speed ?? ''
        }));

        setStores(normalized.length ? normalized : mockStores);
      } catch (e) {
        console.error('가게 조회 실패', e);
        setError(e);
        setStores(mockStores);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [cat]);

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
          {categories.map((c) => (
            <Chip
              key={c.id ?? 'all'}
              label={c.icon ? `${c.icon} ${c.name}` : c.name}
              active={cat === c.id}
              onClick={() => setCat(c.id)}
            />
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
