import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, TopBar, Btn } from '../../shared/components';
import { G, PRIMARY } from '../../shared/constants';

/** * 1. 환불 모달 컴포넌트
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
            <span style={{ fontWeight: 800, color: '#1565C0' }}>
              {orderAmount?.toLocaleString()}원
            </span>
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

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refundModal, setRefundModal] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // 백엔드 OrderController의 @GetMapping 경로에 맞게 수정
        // 페이지네이션이 필요한 경우 쿼리 파라미터 추가 가능 (예: /api/orders?page=0&size=10)
        const res = await fetch('/api/orders', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json'
            // 실제 환경에서는 Authorization: `Bearer ${token}` 사용
          }
        });
        
        const result = await res.json();

        // 백엔드 BaseResponse<GetOrdersResponse> 구조에 맞게 데이터 파싱
        // GetOrdersResponse 내부에 페이징된 데이터(content)가 있다고 가정
        if (res.ok && result.success) {
          const content = result.data?.orders?.content || result.data?.content || result.data;
          setOrders(Array.isArray(content) ? content : []);
        }
      } catch (err) {
        console.error('데이터 로드 에러:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 환불 신청 로직 (백엔드 cancelOrder API 호출)
  const handleRefund = async (reason) => {
    try {
      const res = await fetch(`/api/orders/${refundModal.id}/cancel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cancelReason: reason })
      });
      const result = await res.json();
      
      if (res.ok && result.success) {
        alert('환불 신청이 완료되었습니다.');
        setRefundModal(null);
        // 목록 새로고침 로직 추가 가능
        window.location.reload();
      } else {
        alert(result.message || '환불 신청에 실패했습니다.');
      }
    } catch (err) {
      console.error('환불 처리 에러:', err);
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
          onDone={handleRefund}
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
          <div style={{ textAlign: 'center', color: G[400], marginTop: '100px' }}>
            주문 내역이 없어요! 🍙
          </div>
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
                <span style={{ fontSize: '15px', fontWeight: 800 }}>
                  {o.storeName || '정보 없음'}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: o.status === 'COMPLETED' ? '#1565C0' : PRIMARY,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: o.status === 'COMPLETED' ? '#E3F2FD' : '#FFF3F0'
                  }}>
                  {o.status}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: G[500], marginTop: '6px' }}>
                주문일: {o.createdAt?.split('T')[0]} · {o.totalPrice?.toLocaleString()}원
              </div>

              <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                {(o.status === 'COMPLETED' || o.status === 'DELIVERED') && (
                  <Btn
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate('/customer/review', {
                        state: { 
                          orderId: o.id, 
                          storeName: o.storeName 
                        }
                      })
                    }>
                    리뷰 작성
                  </Btn>
                )}

                <button
                  onClick={() => setRefundModal(o)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${G[200]}`,
                    background: '#fff',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: G[700]
                  }}>
                  환불 문의
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Phone>
  );
}