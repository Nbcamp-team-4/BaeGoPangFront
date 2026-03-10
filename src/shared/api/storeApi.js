const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const MOCK_STORE_DETAIL = {
  id: 1,
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
  menuCategories: ['인기메뉴', '세트메뉴', '단품', '특가'],
  menus: [
    {
      id: 101,
      rank: 1,
      category: '인기메뉴',
      name: '김치찌개',
      option: '공기밥 포함',
      price: 8000,
      reviewCount: 89,
      aiRecommended: true,
      imageUrl: '',
      description: '진한 국물의 김치찌개'
    },
    {
      id: 102,
      rank: 2,
      category: '인기메뉴',
      name: '된장찌개',
      option: '공기밥 포함',
      price: 7500,
      reviewCount: 62,
      aiRecommended: false,
      imageUrl: '',
      description: '구수한 된장찌개'
    },
    {
      id: 103,
      rank: 3,
      category: '인기메뉴',
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
  const response = await fetch(url, {
    method: options.method || 'GET',
    credentials: 'include',
    headers: buildHeaders(options.headers),
    body: options.body
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data?.data ?? data?.result ?? data;
}

function numberOrDefault(value, defaultValue = 0) {
  if (value === null || value === undefined || value === '') return defaultValue;
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

function pickFirst(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

function normalizeReviewPhotos(data) {
  const photos = data?.reviewPhotos || data?.photoReviews || data?.reviewImageUrls || data?.images || [];

  if (!Array.isArray(photos)) {
    return [];
  }

  return photos
    .map((photo) => {
      if (typeof photo === 'string') return photo;
      return photo?.imageUrl || photo?.url || photo?.photoUrl || photo?.reviewImageUrl || '';
    })
    .filter(Boolean);
}

function normalizeMenu(menu, index = 0) {
  return {
    id: pickFirst(menu?.id, menu?.menuId, index + 1),
    rank: numberOrDefault(pickFirst(menu?.rank, menu?.popularRank, index + 1), index + 1),
    category: pickFirst(menu?.category, menu?.menuCategoryName, menu?.groupName, '전체'),
    name: pickFirst(menu?.name, menu?.menuName, `메뉴 ${index + 1}`),
    option: pickFirst(menu?.option, menu?.summary, menu?.subtitle, menu?.description, ''),
    description: pickFirst(menu?.description, menu?.menuDescription, ''),
    price: numberOrDefault(pickFirst(menu?.price, menu?.salePrice, menu?.amount), 0),
    reviewCount: numberOrDefault(pickFirst(menu?.reviewCount, menu?.menuReviewCount), 0),
    aiRecommended: Boolean(pickFirst(menu?.aiRecommended, menu?.ai, menu?.recommendedByAi, false)),
    imageUrl: pickFirst(menu?.imageUrl, menu?.menuImageUrl, menu?.thumbnailUrl, ''),
    soldOut: Boolean(pickFirst(menu?.soldOut, menu?.isSoldOut, false))
  };
}

function normalizeMenus(data) {
  const rawMenus = data?.menus || data?.menuList || data?.menuResponses || data?.storeMenus || [];

  if (!Array.isArray(rawMenus)) {
    return MOCK_STORE_DETAIL.menus;
  }

  return rawMenus.map((menu, index) => normalizeMenu(menu, index));
}

function normalizeMenuCategories(data, menus) {
  const rawCategories = data?.menuCategories || data?.categories || data?.menuCategoryNames || [];

  if (Array.isArray(rawCategories) && rawCategories.length > 0) {
    return rawCategories.map((category) => {
      if (typeof category === 'string') return category;
      return category?.name || category?.categoryName || category?.menuCategoryName || '전체';
    });
  }

  const categoriesFromMenus = [...new Set(menus.map((menu) => menu.category).filter(Boolean))];
  return categoriesFromMenus.length > 0 ? categoriesFromMenus : ['전체'];
}

function normalizeStoreDetail(data) {
  if (!data) {
    return MOCK_STORE_DETAIL;
  }

  const menus = normalizeMenus(data);
  const reviewPhotos = normalizeReviewPhotos(data);
  const menuCategories = normalizeMenuCategories(data, menus);

  return {
    id: pickFirst(data?.id, data?.storeId, MOCK_STORE_DETAIL.id),
    name: pickFirst(data?.name, data?.storeName, MOCK_STORE_DETAIL.name),
    imageUrl: pickFirst(data?.imageUrl, data?.storeImageUrl, data?.thumbnailUrl, ''),
    rating: Number(pickFirst(data?.rating, data?.avgRating, data?.averageRating, MOCK_STORE_DETAIL.rating)),
    reviewCount: numberOrDefault(
      pickFirst(data?.reviewCount, data?.totalReviewCount, data?.reviewsCount),
      MOCK_STORE_DETAIL.reviewCount
    ),
    distanceKm: numberOrDefault(
      pickFirst(data?.distanceKm, data?.distance, data?.distanceInKm),
      MOCK_STORE_DETAIL.distanceKm
    ),
    minOrderAmount: numberOrDefault(
      pickFirst(data?.minOrderAmount, data?.minimumOrderAmount, data?.minimumPrice),
      MOCK_STORE_DETAIL.minOrderAmount
    ),
    deliveryFee: numberOrDefault(
      pickFirst(data?.deliveryFee, data?.deliveryTip, data?.deliveryPrice),
      MOCK_STORE_DETAIL.deliveryFee
    ),
    deliveryTime: pickFirst(
      data?.deliveryTime,
      data?.estimatedDeliveryTime,
      data?.deliveryEta,
      MOCK_STORE_DETAIL.deliveryTime
    ),
    phone: pickFirst(data?.phone, data?.storePhone, data?.contactNumber, MOCK_STORE_DETAIL.phone),
    address: pickFirst(data?.address, data?.roadAddress, data?.storeAddress, MOCK_STORE_DETAIL.address),
    liked: Boolean(pickFirst(data?.liked, data?.isLiked, false)),
    reviewPhotos,
    menuCategories,
    menus
  };
}

/**
 * 가게 상세 조회
 * 예상 엔드포인트:
 * GET /stores/{storeId}
 */
export async function getStoreDetail(storeId) {
  if (!storeId) {
    throw new Error('storeId가 필요합니다.');
  }

  try {
    const payload = await request(`${BASE_URL}/stores/${storeId}`);
    return normalizeStoreDetail(payload);
  } catch (error) {
    console.error('[getStoreDetail] fallback mock 사용', error);
    return {
      ...MOCK_STORE_DETAIL,
      id: Number(storeId) || MOCK_STORE_DETAIL.id
    };
  }
}

/**
 * 가게 찜 토글
 * 예상 엔드포인트:
 * POST /stores/{storeId}/like
 * 또는
 * PUT /stores/{storeId}/like
 */
export async function toggleStoreLike(storeId, liked) {
  if (!storeId) {
    throw new Error('storeId가 필요합니다.');
  }

  try {
    const payload = await request(`${BASE_URL}/stores/${storeId}/like`, {
      method: 'POST',
      body: JSON.stringify({ liked })
    });

    return {
      liked: Boolean(pickFirst(payload?.liked, payload?.isLiked, liked))
    };
  } catch (error) {
    console.error('[toggleStoreLike] fallback 사용', error);
    return { liked };
  }
}
