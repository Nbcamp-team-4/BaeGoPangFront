import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, TopBar, Img, Badge } from '../../shared/components';
import { G, PRIMARY } from '../../shared/constants';
import { getStoreDetail } from '../../shared/api/storeApi';

function Stars({ v = 4.5, size = 12 }) {
  return (
    <span style={{ color: '#FFC107', fontSize: `${size}px` }}>
      {'★'.repeat(Math.floor(v))}
      {'☆'.repeat(5 - Math.floor(v))}
    </span>
  );
}

function formatPrice(value) {
  return `${Number(value || 0).toLocaleString()}원`;
}

export default function Store() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const storeId = searchParams.get('storeId') || '1';

  const [store, setStore] = useState(null);
  const [activeMenu, setActiveMenu] = useState('인기메뉴');
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const go = (target) => {
    const routeMap = {
      home: '/customer/home',
      'store-reviews': `/customer/store-reviews?storeId=${storeId}`,
      'menu-detail': `/customer/menu-detail?storeId=${storeId}`,
      cart: '/customer/cart',
      order: '/customer/order',
      mypage: '/customer/mypage'
    };

    navigate(routeMap[target] || `/customer/${target}`);
  };

  useEffect(() => {
    let mounted = true;

    async function fetchStoreDetail() {
      try {
        setLoading(true);
        setError('');

        const data = await getStoreDetail(storeId);

        if (!mounted) return;

        setStore(data);
        setLiked(Boolean(data?.liked));

        const firstCategory =
          Array.isArray(data?.menuCategories) && data.menuCategories.length > 0 ? data.menuCategories[0] : '인기메뉴';

        setActiveMenu(firstCategory);
      } catch (err) {
        if (!mounted) return;
        console.error(err);
        setError('가게 정보를 불러오지 못했습니다.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStoreDetail();

    return () => {
      mounted = false;
    };
  }, [storeId]);

  const filteredMenus = useMemo(() => {
    if (!store?.menus) return [];
    return store.menus.filter((menu) => menu.category === activeMenu);
  }, [store, activeMenu]);

  const reviewPhotos = useMemo(() => {
    if (!store?.reviewPhotos || store.reviewPhotos.length === 0) {
      return ['', '', '', '', ''];
    }
    return store.reviewPhotos.slice(0, 5);
  }, [store]);

  if (loading) {
    return (
      <Phone navActive="home" go={go}>
        <TopBar title="가게 상세" go={go} backTo="home" />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: G[600],
            fontSize: '14px',
            fontWeight: 600
          }}>
          가게 정보를 불러오는 중입니다...
        </div>
      </Phone>
    );
  }

  if (error || !store) {
    return (
      <Phone navActive="home" go={go}>
        <TopBar title="가게 상세" go={go} backTo="home" />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
            color: '#d32f2f',
            fontSize: '14px',
            fontWeight: 600
          }}>
          {error || '가게 정보를 찾을 수 없습니다.'}
        </div>
      </Phone>
    );
  }

  return (
    <Phone navActive="home" go={go}>
      <TopBar
        title={store.name}
        go={go}
        backTo="home"
        right={
          <button
            onClick={() => setLiked((prev) => !prev)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: liked ? `${PRIMARY}18` : '#f0f0f0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill={liked ? PRIMARY : 'none'}
              stroke={liked ? PRIMARY : G[500]}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Img
          h="180px"
          label={store.imageUrl ? undefined : '가게 대표 이미지'}
          src={store.imageUrl || undefined}
          style={{ borderRadius: 0, border: 'none' }}
        />

        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: G[900] }}>{store.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '5px' }}>
              <Stars v={store.rating} />
              <span style={{ fontSize: '13px', fontWeight: 700 }}>{store.rating}</span>
              <span
                onClick={() => go('store-reviews')}
                style={{ fontSize: '11px', color: PRIMARY, cursor: 'pointer', textDecoration: 'underline' }}>
                리뷰 {store.reviewCount}개 보기 →
              </span>
            </div>
          </div>

          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: G[900] }}>📸 사진 리뷰</span>
              <span
                onClick={() => go('store-reviews')}
                style={{ fontSize: '11px', color: PRIMARY, fontWeight: 600, cursor: 'pointer' }}>
                전체보기 →
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '6px',
                overflowX: 'auto',
                marginLeft: '-14px',
                paddingLeft: '14px',
                paddingRight: '14px',
                paddingBottom: '4px'
              }}>
              {reviewPhotos.map((photo, index) => (
                <div key={index} style={{ position: 'relative', flexShrink: 0 }}>
                  <Img
                    w="80px"
                    h="80px"
                    label={photo ? undefined : `리뷰${index + 1}`}
                    src={photo || undefined}
                    radius="9px"
                  />
                  {index === 4 && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.45)',
                        borderRadius: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => go('store-reviews')}>
                      <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800 }}>+더보기</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                marginTop: '6px',
                fontSize: '12px',
                color: G[600]
              }}>
              <span>📍 {store.distanceKm}km</span>
              <span>·</span>
              <span>최소 {formatPrice(store.minOrderAmount)}</span>
              <span>·</span>
              <span>배달비 {formatPrice(store.deliveryFee)}</span>
              <span>·</span>
              <span>⏱ {store.deliveryTime}</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '7px',
              overflowX: 'auto',
              paddingBottom: '3px',
              marginLeft: '-14px',
              paddingLeft: '14px'
            }}>
            {store.menuCategories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMenu(tab)}
                style={{
                  padding: '6px 13px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: 'none',
                  background: activeMenu === tab ? PRIMARY : G[100],
                  color: activeMenu === tab ? '#fff' : G[600],
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  fontFamily: 'inherit'
                }}>
                {tab}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {filteredMenus.length === 0 ? (
              <div
                style={{
                  border: `1.5px solid ${G[200]}`,
                  borderRadius: '11px',
                  padding: '20px',
                  textAlign: 'center',
                  color: G[500],
                  fontSize: '13px',
                  background: '#fff'
                }}>
                해당 카테고리의 메뉴가 없습니다.
              </div>
            ) : (
              filteredMenus.map((menu) => (
                <div
                  key={menu.id}
                  onClick={() => navigate(`/customer/menu-detail?storeId=${storeId}&menuId=${menu.id}`)}
                  style={{
                    border: `1.5px solid ${G[200]}`,
                    borderRadius: '11px',
                    padding: '11px',
                    display: 'flex',
                    gap: '10px',
                    background: '#fff',
                    cursor: 'pointer'
                  }}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        marginBottom: '5px',
                        flexWrap: 'wrap'
                      }}>
                      <Badge bg={menu.rank === 1 ? PRIMARY : G[200]} color={menu.rank === 1 ? '#fff' : G[500]}>
                        인기 {menu.rank}위
                      </Badge>

                      {menu.aiRecommended && (
                        <Badge color="#7B1FA2" bg="#F3E5F5">
                          ✨AI
                        </Badge>
                      )}
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: 800, color: G[900] }}>{menu.name}</div>
                    <div style={{ fontSize: '11px', color: G[500], marginTop: '2px' }}>{menu.option}</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '7px' }}>{formatPrice(menu.price)}</div>
                  </div>

                  <Img
                    w="74px"
                    h="74px"
                    label={menu.imageUrl ? undefined : menu.name}
                    src={menu.imageUrl || undefined}
                    radius="9px"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Phone>
  );
}
