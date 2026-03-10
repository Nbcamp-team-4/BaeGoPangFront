import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, TopBar, Btn, Badge, Divider, Img } from '../../shared/components';
import { G, PRIMARY, PRIMARY_LIGHT } from '../../shared/constants';
import { getProductDetail } from '../../shared/api/productApi';
import { addCartItem } from '../../shared/api/cartApi';

function numberOrDefault(value, defaultValue = 0) {
  if (value === null || value === undefined || value === '') return defaultValue;
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

function pickFirst(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

function formatPrice(value) {
  return `${Number(value || 0).toLocaleString()}원`;
}

function normalizeOptionItem(item, index = 0) {
  return {
    id: pickFirst(item?.id, item?.optionItemId, `option-item-${index + 1}`),
    name: pickFirst(item?.name, item?.optionItemName, `옵션 ${index + 1}`),
    additionalPrice: numberOrDefault(pickFirst(item?.additionalPrice, item?.extraPrice, item?.price), 0)
  };
}

function normalizeOption(option, index = 0) {
  const rawItems = pickFirst(option?.items, option?.optionItems, option?.productOptionItems, []);

  return {
    id: pickFirst(option?.id, option?.optionId, `option-${index + 1}`),
    name: pickFirst(option?.name, option?.optionName, `옵션그룹 ${index + 1}`),
    required: Boolean(pickFirst(option?.required, option?.isRequired, false)),
    items: Array.isArray(rawItems) ? rawItems.map((item, itemIndex) => normalizeOptionItem(item, itemIndex)) : []
  };
}

function normalizeProductDetail(productData) {
  const rawOptions = pickFirst(productData?.options, productData?.productOptions, productData?.optionGroups, []);

  return {
    id: pickFirst(productData?.id, productData?.productId, ''),
    name: pickFirst(productData?.name, productData?.productName, '상품명 없음'),
    description: pickFirst(productData?.description, productData?.content, ''),
    imageUrl: pickFirst(productData?.imageUrl, productData?.productImageUrl, ''),
    price: numberOrDefault(productData?.price, 0),
    rating: numberOrDefault(pickFirst(productData?.rating, productData?.avgRating, productData?.averageRating), 0),
    reviewCount: numberOrDefault(pickFirst(productData?.reviewCount, productData?.totalReviewCount), 0),
    aiRecommended: Boolean(pickFirst(productData?.useAiDescription, productData?.aiRecommended, false)),
    rank: numberOrDefault(pickFirst(productData?.rank, productData?.popularRank), 1),
    soldOut: Boolean(pickFirst(productData?.soldOut, productData?.isSoldOut, false)),
    options: Array.isArray(rawOptions) ? rawOptions.map((option, index) => normalizeOption(option, index)) : []
  };
}

export default function MenuDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const storeId = searchParams.get('storeId');
  const menuId = searchParams.get('menuId');

  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const go = (target) => {
    const routeMap = {
      home: '/customer/home',
      store: storeId ? `/customer/store?storeId=${storeId}` : '/customer/store',
      cart: '/customer/cart'
    };

    navigate(routeMap[target] || `/customer/${target}`);
  };

  useEffect(() => {
    let mounted = true;

    async function fetchProductDetail() {
      if (!menuId) {
        setError('menuId가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await getProductDetail(menuId);

        if (!response.ok) {
          throw new Error(`상품 상세 조회 실패: ${response.status}`);
        }

        const data = await response.json();
        const raw = data?.data ?? data;
        const normalized = normalizeProductDetail(raw);

        if (!mounted) return;

        setProduct(normalized);

        const initialSelectedOptions = {};
        normalized.options.forEach((option) => {
          if (option.items.length > 0) {
            initialSelectedOptions[option.id] = option.items[0];
          }
        });

        setSelectedOptions(initialSelectedOptions);
      } catch (err) {
        if (!mounted) return;
        console.error('상품 상세 조회 실패', err);
        setError('상품 정보를 불러오지 못했습니다.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProductDetail();

    return () => {
      mounted = false;
    };
  }, [menuId]);

  const optionExtraPrice = useMemo(() => {
    return Object.values(selectedOptions).reduce((sum, item) => {
      return sum + numberOrDefault(item?.additionalPrice, 0);
    }, 0);
  }, [selectedOptions]);

  const total = useMemo(() => {
    if (!product) return 0;
    return (product.price + optionExtraPrice) * qty;
  }, [product, optionExtraPrice, qty]);

  async function handleAddToCart() {
    if (!product) return;

    if (!storeId) {
      alert('storeId가 없어 장바구니에 담을 수 없습니다.');
      return;
    }

    try {
      setAdding(true);

      const options = Object.entries(selectedOptions).map(([productOptionId, selectedItem]) => ({
        productOptionId,
        productOptionItemId: selectedItem?.id
      }));

      const payload = {
        storeId,
        productId: product.id,
        quantity: qty,
        options
      };

      const response = await addCartItem(payload);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('장바구니 담기 실패 응답:', errorText);
        throw new Error(`장바구니 담기 실패: ${response.status}`);
      }

      await response.json();
      alert('장바구니에 담았습니다.');
      navigate('/customer/cart');
    } catch (err) {
      console.error('장바구니 담기 실패', err);
      alert('장바구니 담기에 실패했습니다.');
    } finally {
      setAdding(false);
    }
  }

  if (loading) {
    return (
      <Phone navActive="home" go={go}>
        <TopBar title="메뉴 상세" go={go} backTo="store" />
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
          상품 정보를 불러오는 중입니다...
        </div>
      </Phone>
    );
  }

  if (error || !product) {
    return (
      <Phone navActive="home" go={go}>
        <TopBar title="메뉴 상세" go={go} backTo="store" />
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
          {error || '상품 정보를 찾을 수 없습니다.'}
        </div>
      </Phone>
    );
  }

  return (
    <Phone navActive="home" go={go}>
      <TopBar title="메뉴 상세" go={go} backTo="store" />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Img
          h="210px"
          label={product.imageUrl ? undefined : `${product.name} 이미지`}
          src={product.imageUrl || undefined}
          style={{ borderRadius: 0, border: 'none', flexShrink: 0 }}
        />

        <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap', marginBottom: '5px' }}>
              <span style={{ fontSize: '20px', fontWeight: 900, color: G[900] }}>{product.name}</span>

              {product.aiRecommended && (
                <Badge color="#7B1FA2" bg="#F3E5F5">
                  ✨ AI 추천
                </Badge>
              )}

              <Badge color="#fff" bg={PRIMARY}>
                인기 {product.rank}위
              </Badge>

              {product.soldOut && (
                <Badge color="#fff" bg="#E53935">
                  품절
                </Badge>
              )}
            </div>

            <div style={{ fontSize: '13px', color: G[500], lineHeight: '1.7' }}>
              {product.description || '상품 설명이 없습니다.'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              style={{
                flex: 1,
                padding: '12px',
                background: PRIMARY_LIGHT,
                borderRadius: '11px',
                textAlign: 'center'
              }}>
              <div style={{ fontSize: '10px', color: G[500], fontWeight: 600 }}>기본 가격</div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: PRIMARY, marginTop: '2px' }}>
                {formatPrice(product.price)}
              </div>
            </div>

            <div
              style={{
                flex: 1,
                padding: '12px',
                background: G[50],
                borderRadius: '11px',
                textAlign: 'center'
              }}>
              <div style={{ fontSize: '10px', color: G[500], fontWeight: 600 }}>평점</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: G[900], marginTop: '2px' }}>
                {product.rating} ★
              </div>
            </div>
          </div>

          <Divider />

          {product.options.length > 0 && (
            <>
              {product.options.map((optionGroup) => (
                <div key={optionGroup.id}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: G[900], marginBottom: '8px' }}>
                    {optionGroup.name}{' '}
                    {optionGroup.required && (
                      <Badge bg={PRIMARY} color="#fff">
                        필수
                      </Badge>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {optionGroup.items.map((opt) => {
                      const isSelected = selectedOptions?.[optionGroup.id]?.id === opt.id;

                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [optionGroup.id]: opt
                            }))
                          }
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 13px',
                            border: `1.5px solid ${isSelected ? PRIMARY : G[200]}`,
                            borderRadius: '9px',
                            background: isSelected ? PRIMARY_LIGHT : '#fff',
                            cursor: 'pointer'
                          }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                            <div
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                border: `2px solid ${isSelected ? PRIMARY : G[300]}`,
                                background: isSelected ? PRIMARY : '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                              {isSelected && (
                                <div
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#fff'
                                  }}
                                />
                              )}
                            </div>

                            <span
                              style={{
                                fontSize: '13px',
                                fontWeight: isSelected ? 700 : 400,
                                color: isSelected ? PRIMARY : G[800]
                              }}>
                              {opt.name}
                            </span>
                          </div>

                          {opt.additionalPrice > 0 && (
                            <span style={{ fontSize: '12px', fontWeight: 700, color: G[600] }}>
                              +{opt.additionalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <Divider />
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: G[900] }}>수량</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                border: `1.5px solid ${G[300]}`,
                borderRadius: '10px',
                padding: '6px 14px'
              }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: `1.5px solid ${G[300]}`,
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                −
              </button>

              <span style={{ fontSize: '16px', fontWeight: 900, minWidth: '20px', textAlign: 'center' }}>{qty}</span>

              <button
                onClick={() => setQty((q) => q + 1)}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: 'none',
                  background: PRIMARY,
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '12px 16px',
          borderTop: `1px solid ${G[200]}`,
          background: '#fff',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          flexShrink: 0
        }}>
        <div>
          <div style={{ fontSize: '10px', color: G[500] }}>총 금액</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: PRIMARY }}>{total.toLocaleString()}원</div>
        </div>

        <Btn variant="primary" full style={{ flex: 1 }} onClick={handleAddToCart} disabled={product.soldOut || adding}>
          {product.soldOut ? '품절된 상품입니다' : adding ? '담는 중...' : '🛒 장바구니 담기'}
        </Btn>
      </div>
    </Phone>
  );
}
