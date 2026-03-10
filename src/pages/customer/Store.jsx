import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, TopBar, Img, Badge } from '../../shared/components';
import { G, PRIMARY } from '../../shared/constants';
import { getStoreDetail } from '../../shared/api/storeApi';
import { getProductsByStore } from '../../shared/api/productApi';

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

function numberOrDefault(value, defaultValue = 0) {
  if (value === null || value === undefined || value === '') return defaultValue;
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

function pickFirst(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

function normalizeStore(storeData) {
  return {
    id: storeData?.id ?? '',
    name: pickFirst(storeData?.name, storeData?.storeName, '가게명 없음'),
    imageUrl: pickFirst(storeData?.imageUrl, storeData?.storeImageUrl, ''),
    rating: numberOrDefault(pickFirst(storeData?.rating, storeData?.avgRating, storeData?.averageRating), 0),
    reviewCount: numberOrDefault(
      pickFirst(storeData?.reviewCount, storeData?.totalReviewCount, storeData?.reviewsCount),
      0
    ),
    distanceKm: numberOrDefault(pickFirst(storeData?.distanceKm, storeData?.distance, storeData?.distanceInKm), 0),
    minOrderAmount: numberOrDefault(
      pickFirst(storeData?.minOrderAmount, storeData?.minimumOrderAmount, storeData?.minimumPrice),
      0
    ),
    deliveryFee: numberOrDefault(
      pickFirst(storeData?.deliveryFee, storeData?.deliveryTip, storeData?.deliveryPrice),
      0
    ),
    deliveryTime:
      pickFirst(storeData?.deliveryTime, storeData?.estimatedDeliveryTime, storeData?.deliveryEta) ||
      (storeData?.deliveryMinMinutes !== undefined && storeData?.deliveryMaxMinutes !== undefined
        ? `${storeData.deliveryMinMinutes}~${storeData.deliveryMaxMinutes}분`
        : '배달 시간 정보 없음'),
    phone: pickFirst(storeData?.phone, storeData?.storePhone, ''),
    address: pickFirst(storeData?.address, storeData?.roadAddress, ''),
    liked: Boolean(pickFirst(storeData?.liked, storeData?.isLiked, false)),
    reviewPhotos: Array.isArray(storeData?.reviewPhotos) ? storeData.reviewPhotos : ['', '', '', '', ''],
    menuCategories: ['전체']
  };
}

function normalizeProducts(productData) {
  if (!Array.isArray(productData)) return [];

  return productData
    .map((product, index) => ({
      id: product?.id ?? `product-${index + 1}`,
      rank: index + 1,
      category: '전체',
      name: pickFirst(product?.name, product?.productName, `상품 ${index + 1}`),
      option: pickFirst(product?.description, ''),
      description: pickFirst(product?.description, ''),
      price: numberOrDefault(product?.price, 0),
      reviewCount: numberOrDefault(product?.reviewCount, 0),
      aiRecommended: Boolean(product?.useAiDescription ?? false),
      imageUrl: pickFirst(product?.imageUrl, product?.productImageUrl, ''),
      soldOut: Boolean(product?.soldOut ?? product?.isSoldOut ?? false),
      hidden: Boolean(product?.hidden ?? product?.isHidden ?? false)
    }))
    .filter((product) => !product.hidden);
}

export default function Store() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const storeId = searchParams.get('storeId');

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState('전체');
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const go = (target) => {
    const routeMap = {
      home: '/customer/home',
      'store-reviews': storeId ? `/customer/store-reviews?storeId=${storeId}` : '/customer/store-reviews',
      'menu-detail': storeId ? `/customer/menu-detail?storeId=${storeId}` : '/customer/menu-detail',
      cart: '/customer/cart',
      order: '/customer/order',
      mypage: '/customer/mypage'
    };

    navigate(routeMap[target] || `/customer/${target}`);
  };

  useEffect(() => {
    let mounted = true;

    async function fetchStorePageData() {
      if (!storeId) {
        setError('storeId가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const [storeResponse, productResponse] = await Promise.all([
          getStoreDetail(storeId),
          getProductsByStore(storeId)
        ]);

        console.log('storeResponse.status', storeResponse.status);
        console.log('productResponse.status', productResponse.status);

        if (!storeResponse.ok) {
          throw new Error(`가게 상세 조회 실패: ${storeResponse.status}`);
        }

        if (!productResponse.ok) {
          throw new Error(`상품 목록 조회 실패: ${productResponse.status}`);
        }

        const storeData = await storeResponse.json();
        const productData = await productResponse.json();

        console.log('storeData', storeData);
        console.log('productData', productData);

        if (!mounted) return;

        const normalizedStore = normalizeStore(storeData);
        const normalizedProducts = normalizeProducts(productData);

        console.log('normalizedStore', normalizedStore);
        console.log('normalizedProducts', normalizedProducts);

        setStore(normalizedStore);
        setProducts(normalizedProducts);
        setLiked(Boolean(normalizedStore?.liked));
        setActiveMenu('전체');
      } catch (err) {
        if (!mounted) return;
        console.error('가게 상세 페이지 조회 실패', err);
        setError('가게 정보를 불러오지 못했습니다.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStorePageData();

    return () => {
      mounted = false;
    };
  }, [storeId]);

  const filteredMenus = useMemo(() => {
    if (!products) return [];
    if (activeMenu === '전체') return products;
    return products.filter((menu) => menu.category === activeMenu);
  }, [products, activeMenu]);

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
                등록된 상품이 없습니다.
              </div>
            ) : (
              filteredMenus.map((menu) => (
                <div
                  key={menu.id}
                  onClick={() =>
                    navigate(
                      storeId
                        ? `/customer/menu-detail?storeId=${storeId}&menuId=${menu.id}`
                        : `/customer/menu-detail?menuId=${menu.id}`
                    )
                  }
                  style={{
                    border: `1.5px solid ${G[200]}`,
                    borderRadius: '11px',
                    padding: '11px',
                    display: 'flex',
                    gap: '10px',
                    background: '#fff',
                    cursor: 'pointer',
                    opacity: menu.soldOut ? 0.6 : 1
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

                      {menu.soldOut && (
                        <Badge color="#fff" bg="#E53935">
                          품절
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
