const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const MOCK_STORE_DETAIL = {
  id: '00000000-0000-0000-0000-000000000001',
  name: '맛있는 한식당',
  imageUrl: '',
  rating: 4.7,
  reviewCount: 234,
  distanceKm: 0.8,
  minOrderAmount: 12000,
  deliveryFee: 2000,
  deliveryTime: '25~35분',
  phone: '02-1234-5678',
  address: '서울시 강남구 테헤란로 123',
  liked: false,
  reviewPhotos: ['', '', '', '', ''],
  menuCategories: ['전체'],
  menus: [
    {
      id: '10000000-0000-0000-0000-000000000101',
      rank: 1,
      category: '전체',
      name: '김치찌개',
      option: '공기밥 포함',
      price: 8000,
      reviewCount: 89,
      aiRecommended: true,
      imageUrl: '',
      description: '진한 국물의 김치찌개'
    },
    {
      id: '10000000-0000-0000-0000-000000000102',
      rank: 2,
      category: '전체',
      name: '된장찌개',
      option: '공기밥 포함',
      price: 7500,
      reviewCount: 62,
      aiRecommended: false,
      imageUrl: '',
      description: '구수한 된장찌개'
    },
    {
      id: '10000000-0000-0000-0000-000000000103',
      rank: 3,
      category: '전체',
      name: '불고기 정식',
      option: '밥+국+반찬3종',
      price: 12000,
      reviewCount: 45,
      aiRecommended: true,
      imageUrl: '',
      description: '든든한 정식 메뉴'
    }
  ]
};

function getAccessToken() {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '';
}

function buildHeaders(extraHeaders = {}) {
  const token = getAccessToken();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders
  };
}

async function request(url, options = {}) {
  console.log('[request url]', url);

  const response = await fetch(url, {
    method: options.method || 'GET',
    credentials: 'include',
    headers: buildHeaders(options.headers),
    body: options.body
  });

  console.log('[response status]', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[response error body]', errorText);
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data?.data ?? data?.result ?? data;
}

function isValidUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function numberOrDefault(value, defaultValue = 0) {
  if (value === null || value === undefined || value === '') return defaultValue;
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

function pickFirst(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

function normalizeProducts(products) {
  if (!Array.isArray(products)) {
    return MOCK_STORE_DETAIL.menus;
  }

  return products.map((product, index) => ({
    id: String(pickFirst(product?.id, product?.productId, product?.menuId, `menu-${index + 1}`)),
    rank: index + 1,
    category: '전체',
    name: pickFirst(product?.name, product?.productName, product?.menuName, `메뉴 ${index + 1}`),
    option: pickFirst(product?.description, product?.summary, ''),
    description: pickFirst(product?.description, ''),
    price: numberOrDefault(pickFirst(product?.price, product?.amount), 0),
    reviewCount: numberOrDefault(product?.reviewCount, 0),
    aiRecommended: Boolean(product?.aiRecommended ?? false),
    imageUrl: pickFirst(product?.imageUrl, product?.productImageUrl, product?.menuImageUrl, ''),
    soldOut: Boolean(product?.soldOut ?? product?.isSoldOut ?? false)
  }));
}

function normalizeStoreDetail(data) {
  if (!data) {
    return MOCK_STORE_DETAIL;
  }

  const menus = normalizeProducts(pickFirst(data?.products, data?.productResponses, data?.storeProducts, data?.menus));

  return {
    id: String(pickFirst(data?.id, data?.storeId, MOCK_STORE_DETAIL.id)),
    name: pickFirst(data?.name, data?.storeName, MOCK_STORE_DETAIL.name),
    imageUrl: pickFirst(data?.imageUrl, data?.storeImageUrl, data?.thumbnailUrl, ''),
    rating: numberOrDefault(pickFirst(data?.rating, data?.avgRating, data?.averageRating), 0),
    reviewCount: numberOrDefault(pickFirst(data?.reviewCount, data?.totalReviewCount, data?.reviewsCount), 0),
    distanceKm: numberOrDefault(pickFirst(data?.distanceKm, data?.distance, data?.distanceInKm), 0),
    minOrderAmount: numberOrDefault(pickFirst(data?.minOrderAmount, data?.minimumOrderAmount, data?.minimumPrice), 0),
    deliveryFee: numberOrDefault(pickFirst(data?.deliveryFee, data?.deliveryTip, data?.deliveryPrice), 0),
    deliveryTime: pickFirst(data?.deliveryTime, data?.estimatedDeliveryTime, data?.deliveryEta, '배달 시간 정보 없음'),
    phone: pickFirst(data?.phone, data?.storePhone, data?.contactNumber, ''),
    address: pickFirst(data?.address, data?.roadAddress, data?.storeAddress, ''),
    liked: Boolean(pickFirst(data?.liked, data?.isLiked, false)),
    reviewPhotos: Array.isArray(data?.reviewPhotos) ? data.reviewPhotos : [],
    menuCategories: ['전체'],
    menus
  };
}

export async function getStoreDetail(storeId) {
  if (!storeId || !isValidUuid(storeId)) {
    console.warn('[getStoreDetail] 유효한 UUID가 없어 mock 데이터 반환', storeId);
    return MOCK_STORE_DETAIL;
  }

  try {
    const payload = await request(`${BASE_URL}/stores/${storeId}`);
    return normalizeStoreDetail(payload);
  } catch (error) {
    console.error('[getStoreDetail] fallback mock 사용', error);
    return {
      ...MOCK_STORE_DETAIL,
      id: storeId
    };
  }
}
