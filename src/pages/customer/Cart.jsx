import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, TopBar, Btn, Divider } from '../../shared/components';
import { G, PRIMARY, PRIMARY_LIGHT } from '../../shared/constants';
import { getMyCart, updateCartItem, deleteCartItem } from '../../shared/api/cartApi';

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

function getOptionText(option) {
  if (!option) return '';

  if (typeof option === 'string') return option;

  const optionName = pickFirst(option?.optionName, option?.productOptionName, option?.name, '');

  const optionItemName = pickFirst(
    option?.optionItemName,
    option?.productOptionItemName,
    option?.itemName,
    option?.label,
    option?.name,
    ''
  );

  if (optionName && optionItemName && optionName !== optionItemName) {
    return `${optionName}: ${optionItemName}`;
  }

  return optionItemName || optionName || '';
}

function getOptionAdditionalPrice(option) {
  return numberOrDefault(pickFirst(option?.additionalPrice, option?.extraPrice, option?.optionPrice, option?.price), 0);
}

function normalizeCartResponse(raw) {
  const cart = raw?.data ?? raw;

  return {
    cartId: cart?.cartId ?? '',
    storeId: cart?.storeId ?? '',
    storeName: cart?.storeName ?? '장바구니',
    deliveryFee: Number(cart?.deliveryFee ?? 0),
    items: Array.isArray(cart?.items)
      ? cart.items.map((item) => ({
          id: item.itemId,
          productId: item.productId,
          name: item.productName,
          opt: Array.isArray(item.options)
            ? item.options.map((opt) => `${opt.optionName}: ${opt.optionItemName}`).join(', ')
            : '',
          unitPrice:
            Number(item.productPrice ?? 0) +
            (Array.isArray(item.options)
              ? item.options.reduce((sum, opt) => sum + Number(opt.additionalPrice ?? 0), 0)
              : 0),
          qty: Number(item.quantity ?? 1)
        }))
      : []
  };
}

export default function Cart() {
  const navigate = useNavigate();

  const go = (target) => {
    const routeMap = {
      home: '/customer/home',
      order: '/customer/order'
    };

    navigate(routeMap[target] || `/customer/${target}`);
  };

  const [cart, setCart] = useState(null);
  const [checked, setChecked] = useState(true);
  const [itemChecked, setItemChecked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function fetchCart() {
      try {
        setLoading(true);
        setError('');

        const response = await getMyCart();

        if (!response.ok) {
          throw new Error(`장바구니 조회 실패: ${response.status}`);
        }

        const data = await response.json();
        console.log('장바구니 원본 응답', data);

        const normalized = normalizeCartResponse(data);
        console.log('장바구니 정규화 결과', normalized);

        if (!mounted) return;

        setCart(normalized);
        setChecked(true);
        setItemChecked(normalized.items.map(() => true));
      } catch (err) {
        if (!mounted) return;
        console.error('장바구니 조회 실패', err);
        setError('장바구니 정보를 불러오지 못했습니다.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCart();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleStore = () => {
    const nextChecked = !checked;
    setChecked(nextChecked);
    setItemChecked((prev) => prev.map(() => nextChecked));
  };

  const toggleItem = (index) => {
    setItemChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  async function handleQuantityChange(itemId, nextQty) {
    if (!cart || nextQty < 1) return;

    try {
      setUpdatingId(itemId);

      const targetItem = cart.items.find((item) => item.id === itemId);
      if (!targetItem) return;

      const response = await updateCartItem(cart.cartId, itemId, {
        quantity: nextQty
      });

      if (!response.ok) {
        throw new Error(`수량 변경 실패: ${response.status}`);
      }

      setCart((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          items: prev.items.map((item) => (item.id === itemId ? { ...item, qty: nextQty } : item))
        };
      });
    } catch (err) {
      console.error('수량 변경 실패', err);
      alert('수량 변경에 실패했습니다.');
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDeleteItem(itemId) {
    try {
      setUpdatingId(itemId);

      const response = await deleteCartItem(itemId);

      if (!response.ok) {
        throw new Error(`상품 삭제 실패: ${response.status}`);
      }

      setCart((prev) => {
        if (!prev) return prev;

        const nextItems = prev.items.filter((item) => item.id !== itemId);
        return {
          ...prev,
          items: nextItems
        };
      });

      setItemChecked((prev) =>
        cart?.items
          ? cart.items
              .filter((item) => item.id !== itemId)
              .map((item) => {
                const oldIndex = cart.items.findIndex((oldItem) => oldItem.id === item.id);
                return prev[oldIndex] ?? true;
              })
          : []
      );
    } catch (err) {
      console.error('상품 삭제 실패', err);
      alert('상품 삭제에 실패했습니다.');
    } finally {
      setUpdatingId(null);
    }
  }

  const totalGoods = useMemo(() => {
    if (!cart?.items) return 0;

    return cart.items.reduce((sum, item, index) => {
      if (!checked || !itemChecked[index]) return sum;
      return sum + item.unitPrice * item.qty;
    }, 0);
  }, [cart, checked, itemChecked]);

  const totalFee = useMemo(() => {
    if (!cart?.items?.length) return 0;
    const hasCheckedItem = checked && itemChecked.some(Boolean);
    return hasCheckedItem ? cart.deliveryFee : 0;
  }, [cart, checked, itemChecked]);

  const orderableItems = useMemo(() => {
    if (!cart?.items) return [];
    if (!checked) return [];
    return cart.items.filter((_, index) => itemChecked[index]);
  }, [cart, checked, itemChecked]);

  if (loading) {
    return (
      <Phone navActive="cart" go={go}>
        <TopBar title="🛒 장바구니" go={go} backTo="home" />
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
          장바구니를 불러오는 중입니다...
        </div>
      </Phone>
    );
  }

  if (error) {
    return (
      <Phone navActive="cart" go={go}>
        <TopBar title="🛒 장바구니" go={go} backTo="home" />
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
          {error}
        </div>
      </Phone>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Phone navActive="cart" go={go}>
        <TopBar title="🛒 장바구니" go={go} backTo="home" />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            color: G[600]
          }}>
          <div style={{ fontSize: '16px', fontWeight: 800 }}>장바구니가 비어 있습니다.</div>
          <Btn variant="primary" onClick={() => go('home')}>
            홈으로 가기
          </Btn>
        </div>
      </Phone>
    );
  }

  return (
    <Phone navActive="cart" go={go}>
      <TopBar title="🛒 장바구니" go={go} backTo="home" />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
        <div
          style={{
            border: `1.5px solid ${checked ? PRIMARY : G[200]}`,
            borderRadius: '13px',
            overflow: 'hidden'
          }}>
          <div
            style={{
              padding: '10px 12px',
              background: checked ? PRIMARY_LIGHT : G[50],
              borderBottom: `1px solid ${G[200]}`,
              display: 'flex',
              alignItems: 'center',
              gap: '9px'
            }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={toggleStore}
              style={{ accentColor: PRIMARY, width: '16px', height: '16px' }}
            />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 800,
                flex: 1,
                color: checked ? PRIMARY : G[700]
              }}>
              {cart.storeName}
            </span>
          </div>

          <div
            style={{
              padding: '11px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              background: '#fff'
            }}>
            {cart.items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  opacity: !checked || !itemChecked[index] ? 0.4 : 1
                }}>
                <input
                  type="checkbox"
                  checked={itemChecked[index] ?? false}
                  onChange={() => toggleItem(index)}
                  style={{
                    accentColor: PRIMARY,
                    width: '15px',
                    height: '15px',
                    flexShrink: 0
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: G[500] }}>{item.opt || '옵션 없음'}</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, marginTop: '2px' }}>
                    {formatPrice(item.unitPrice * item.qty)}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    border: `1.5px solid ${G[300]}`,
                    borderRadius: '7px',
                    padding: '3px 7px'
                  }}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                    disabled={updatingId === item.id}
                    style={{
                      width: '24px',
                      height: '24px',
                      border: 'none',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '15px',
                      color: G[500],
                      fontWeight: 700
                    }}>
                    −
                  </button>

                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      minWidth: '14px',
                      textAlign: 'center'
                    }}>
                    {item.qty}
                  </span>

                  <button
                    onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                    disabled={updatingId === item.id}
                    style={{
                      width: '24px',
                      height: '24px',
                      border: 'none',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '15px',
                      color: PRIMARY,
                      fontWeight: 700
                    }}>
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  disabled={updatingId === item.id}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#E53935',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}>
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: '12px',
            background: PRIMARY_LIGHT,
            borderRadius: '11px'
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: G[600],
              marginBottom: '4px'
            }}>
            <span>상품금액</span>
            <span>{formatPrice(totalGoods)}</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: G[600],
              marginBottom: '8px'
            }}>
            <span>배달비</span>
            <span>{formatPrice(totalFee)}</span>
          </div>

          <Divider />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '16px',
              fontWeight: 900,
              marginTop: '7px'
            }}>
            <span>결제예정</span>
            <span style={{ color: PRIMARY }}>{formatPrice(totalGoods + totalFee)}</span>
          </div>
        </div>

        <Btn
          variant="primary"
          full
          size="lg"
          onClick={() => navigate('/customer/order')}
          disabled={orderableItems.length === 0}>
          전체 주문하기
        </Btn>
      </div>
    </Phone>
  );
}
