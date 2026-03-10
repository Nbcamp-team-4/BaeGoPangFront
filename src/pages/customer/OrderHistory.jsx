import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, TopBar, Btn } from '../../shared/components';
import { G, PRIMARY } from '../../shared/constants';

import { getMyOrders, cancelOrder } from '../../shared/api/orderApi';
import { getUserId } from '../../shared/utils/user';
function getStatusLabel(status) {
  switch (status) {
    case 'PENDING_PAYMENT':
      return '처리중';
    case 'PAID':
      return '결제완료';
    case 'ACCEPTED':
      return '수락됨';
    case 'REJECTED':
      return '거절됨';
    case 'COOKING':
      return '조리중';
    case 'DELIVERING':
      return '배달중';
    case 'COMPLETED':
      return '배달완료';
    case 'CANCELED':
      return '취소됨';
    default:
      return status;
  }
}

function getStatusMessage(status) {
  switch (status) {
    case 'PENDING_PAYMENT':
      return '결제 처리 중입니다.';
    case 'PAID':
      return '주문 확인 전입니다.';
    case 'ACCEPTED':
      return '주문이 수락되었어요, 약 15~20분 걸려요.';
    case 'REJECTED':
      return '주문이 거절되었어요, 곧 환불됩니다.';
    case 'COOKING':
      return '음식을 조리 중이에요, 약 15~20분 걸려요.';
    case 'DELIVERING':
      return '배달 중입니다, 약 10~15분 걸려요.';
    case 'COMPLETED':
      return '배달이 완료되었어요.';
    case 'CANCELED':
      return '주문이 취소되었어요, 곧 환불됩니다.';
    default:
      return '';
  }
}
function renderOrderActions(o, goToReview, setRefundModal) {
  switch (o.status) {
    case 'PAID':
      return (
        <button onClick={() => setRefundModal(o)} style={secondaryButtonStyle}>
          주문 취소
        </button>
      );

    case 'COMPLETED':
      return (
        <>
          <Btn size="sm" variant="primary" onClick={() => goToReview(o.id)}>
            리뷰 작성
          </Btn>

          <button onClick={() => setRefundModal(o)} style={secondaryButtonStyle}>
            환불 문의
          </button>
        </>
      );

    default:
      return null;
  }
}
const secondaryButtonStyle = {
  padding: '6px 12px',
  borderRadius: '8px',
  border: `1px solid ${G[200]}`,
  background: '#fff',
  fontSize: '12px',
  cursor: 'pointer'
};
/** * 1. 환불 모달 (같은 파일에 선언)
 * export를 붙여두면 다른 파일(OrderDetail 등)에서도 쓸 수 있습니다.
 */
export function RefundModal({ orderId, orderStore, orderAmount, onClose, onDone }) {
  const [sel, setSel] = useState('');
  const reasons = ['단순 변심', '음식 품질 불량', '배달 지연', '오배송', '기타'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}>
      <div
        style={{
          width: '100%',
          maxWidth: '396px',
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          padding: '20px 18px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '13px'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '15px', fontWeight: 900 }}>환불 신청</span>
          <span onClick={onClose} style={{ fontSize: '22px', cursor: 'pointer', color: G[400] }}>
            ×
          </span>
        </div>
        <div
          style={{
            padding: '10px 12px',
            background: G[50],
            borderRadius: '9px',
            fontSize: '12px',
            border: `1px solid ${G[200]}`
          }}>
          <div style={{ fontWeight: 700, color: G[800] }}>{orderStore || '상점 정보 없음'}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span>환불 예정 금액</span>
            <span style={{ fontWeight: 800, color: '#1565C0' }}>{orderAmount?.toLocaleString()}원</span>
          </div>
        </div>
        <div>
          {reasons.map((r, i) => (
            <div
              key={i}
              onClick={() => setSel(r)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '10px 12px',
                marginBottom: '6px',
                border: `1.5px solid ${sel === r ? '#1565C0' : G[300]}`,
                borderRadius: '9px',
                background: sel === r ? '#E3F2FD' : '#fff',
                cursor: 'pointer'
              }}>
              <span
                style={{ fontSize: '13px', fontWeight: sel === r ? 700 : 400, color: sel === r ? '#1565C0' : G[800] }}>
                {r}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: '10px',
              border: `1.5px solid ${G[300]}`,
              background: '#fff',
              fontWeight: 700
            }}>
            취소
          </button>
          <button
            onClick={() => sel && onDone(sel)}
            disabled={!sel}
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: '10px',
              border: 'none',
              background: sel ? '#1565C0' : G[300],
              color: '#fff',
              fontWeight: 700
            }}>
            환불 신청
          </button>
        </div>
      </div>
    </div>
  );
}

/** * 2. 주문 내역 메인 컴포넌트
 */
export default function OrderHistory() {
  const navigate = useNavigate();
  const go = (path) => navigate(`/${path}`);

  const goToReview = (orderId) => navigate(`/customer/review?orderId=${orderId}`);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refundModal, setRefundModal] = useState(null);

  // 테스트용 유저 ID (실제 운영 시 세션에서 가져옴)
  const USER_ID = getUserId();

  // API 호출
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getMyOrders();
      const result = await res.json();
      const ordersData = result;
      console.log(ordersData.data.content);
      setOrders(ordersData.data.content);
    } catch (err) {
      console.error('데이터 로드 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleRefundRequest = async (reason) => {
    if (!refundModal?.id) return;

    try {
      const res = await cancelOrder(refundModal.id, { reason });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || '환불 요청에 실패했습니다.');
      }

      alert('주문이 취소되었습니다.');
      setRefundModal(null);
      fetchOrders();
    } catch (err) {
      console.error('환불 요청 실패:', err);
      alert('환불 요청에 실패했습니다.');
    }
  };
  if (loading)
    return (
      <Phone go={go}>
        <div style={{ padding: '100px 0', textAlign: 'center', fontSize: '14px', color: G[500] }}>
          주문 내역을 불러오는 중... 🍱
        </div>
      </Phone>
    );

  return (
    <Phone navActive="order-history" go={go}>
      {refundModal && (
        <RefundModal
          orderId={refundModal.id}
          orderStore={refundModal.storeName}
          orderAmount={refundModal.totalPrice}
          onClose={() => setRefundModal(null)}
          onDone={handleRefundRequest}
        />
      )}

      <TopBar title="주문 내역" go={go} backTo="customer/home" />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: G[50]
        }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', color: G[400], marginTop: '100px' }}>주문 내역이 없어요! 🍙</div>
        ) : (
          orders.map((o) => (
            <div
              key={o.id}
              style={{
                border: `1px solid ${G[200]}`,
                borderRadius: '12px',
                padding: '16px',
                background: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: 800 }}>{o.storeName || '정보 없음'}</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: o.status === 'COMPLETED' ? '#1565C0' : PRIMARY,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: o.status === 'COMPLETED' ? '#E3F2FD' : '#FFF3F0'
                  }}>
                  {getStatusLabel(o.status)}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: G[500], marginTop: '6px' }}>
                주문일: {o.createdAt?.split('T')[0]} · {o.totalPrice?.toLocaleString()}원
              </div>

              <div style={{ fontSize: '12px', color: G[700], marginTop: '8px', fontWeight: 600 }}>
                {getStatusMessage(o.status)}
              </div>

              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                {renderOrderActions(o, goToReview, setRefundModal)}
              </div>
            </div>
          ))
        )}
      </div>
    </Phone>
  );
}
