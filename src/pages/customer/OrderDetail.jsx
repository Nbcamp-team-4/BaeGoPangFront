// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/OrderDetail.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from 'react';
import { Phone, TopBar, Btn } from '../../shared/components';
import { RefundModal } from './OrderHistory';
import { G, PRIMARY, PRIMARY_LIGHT } from '../../shared/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrder, cancelOrder } from '../../shared/api/orderApi';

// ── 상태별 배너 컴포넌트 ──────────────────────────────────

function StatusBanner_PendingPayment() {
  return (
    <div
      style={{
        padding: '18px 14px',
        background: 'linear-gradient(120deg,#FFF8E1,#FFF3E0)',
        borderRadius: '13px',
        border: '1.5px solid #FFD54F',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: '#FFF3CD',
          border: '2px solid #FFD54F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px'
        }}>
        💳
      </div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#E65100' }}>결제 처리 중...</div>
        <div style={{ fontSize: '11px', color: '#F57F17', marginTop: '4px', lineHeight: '1.6' }}>
          잠시만 기다려 주세요.
          <br />
          결제가 완료되면 주문이 접수됩니다.
        </div>
      </div>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#FFA000',
              opacity: 0.3 + i * 0.35
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StatusBanner_Accepted() {
  return (
    <div
      style={{
        padding: '18px 14px',
        background: 'linear-gradient(120deg,#E8F5E9,#F1F8E9)',
        borderRadius: '13px',
        border: '1.5px solid #A5D6A7',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: '#C8E6C9',
          border: '2px solid #66BB6A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px'
        }}>
        🎉
      </div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#2E7D32' }}>주문이 수락되었습니다!</div>
        <div style={{ fontSize: '11px', color: '#388E3C', marginTop: '4px', lineHeight: '1.6' }}>
          사장님이 주문을 확인했어요.
          <br />
          맛있는 음식을 준비 중입니다.
        </div>
      </div>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 10px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 700,
          background: '#E8F5E9',
          color: '#2E7D32'
        }}>
        ✓ 수락 완료
      </span>
    </div>
  );
}

function StatusBanner_Cooking() {
  return (
    <div
      style={{
        padding: '18px 14px',
        background: 'linear-gradient(120deg,#FFF3E0,#FBE9E7)',
        borderRadius: '13px',
        border: '1.5px solid #FFCC80',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: '#FFE0B2',
          border: '2px solid #FFA726',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px'
        }}>
        🍳
      </div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#E65100' }}>음식을 만드는 중입니다!</div>
        <div style={{ fontSize: '11px', color: '#F57F17', marginTop: '4px', lineHeight: '1.6' }}>
          사장님이 정성껏 요리하고 있어요.
          <br />
          조금만 기다려 주세요 😊
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          fontSize: '11px',
          color: '#E65100',
          fontWeight: 600,
          background: '#FFF8E1',
          padding: '7px 14px',
          borderRadius: '20px',
          border: '1px solid #FFD54F'
        }}>
        <span>⏱ 예상 완료</span>
        <span style={{ fontWeight: 900 }}>약 15~20분</span>
      </div>
    </div>
  );
}

function StatusBanner_Delivering() {
  return (
    <div
      style={{
        padding: '18px 14px',
        background: `linear-gradient(120deg,${PRIMARY_LIGHT},#FFF8F0)`,
        borderRadius: '13px',
        border: `1.5px solid ${PRIMARY}66`,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: `${PRIMARY}22`,
          border: `2px solid ${PRIMARY}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px'
        }}>
        🛵
      </div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: PRIMARY }}>배달 중입니다!</div>
        <div style={{ fontSize: '11px', color: '#BF360C', marginTop: '4px', lineHeight: '1.6' }}>
          라이더가 음식을 픽업해서 출발했어요.
          <br />곧 도착할 예정입니다!
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          fontSize: '11px',
          color: PRIMARY,
          fontWeight: 600,
          background: PRIMARY_LIGHT,
          padding: '7px 14px',
          borderRadius: '20px',
          border: `1px solid ${PRIMARY}44`
        }}>
        <span>📍 예상 도착</span>
        <span style={{ fontWeight: 900 }}>약 10~15분</span>
      </div>
    </div>
  );
}

function StatusBanner_Canceled() {
  return (
    <div
      style={{
        padding: '18px 14px',
        background: 'linear-gradient(120deg,#FFEBEE,#FCE4EC)',
        borderRadius: '13px',
        border: '1.5px solid #FFCDD2',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: '#FFCDD2',
          border: '2px solid #EF9A9A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px'
        }}>
        ❌
      </div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#C62828' }}>주문이 취소되었습니다</div>
        <div style={{ fontSize: '11px', color: '#C62828', marginTop: '4px', lineHeight: '1.6' }}>
          결제 금액은 3~5 영업일 내에
          <br />
          자동으로 환불됩니다.
        </div>
      </div>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 10px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 700,
          background: '#FFEBEE',
          color: '#C62828'
        }}>
        ✗ 취소 완료
      </span>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────

export default function OrderDetail() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const goTo = (path) => navigate(`/customer/review?orderId=${orderId}`);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [refundModal, setRefundModal] = useState(false);
  const [refundDone, setRefundDone] = useState(false);
  const [refundReason, setRefundReason] = useState('');

  useEffect(() => {
    if (!orderId) {
      alert('주문 정보가 없습니다.');
      navigate(-1);
      return;
    }
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getOrder(orderId);
      const json = await res.json();

      const order = json?.data ?? json;
      if (!order) {
        throw new Error('주문 정보를 불러올 수 없습니다.');
      }

      // setData(json.content);
      setData({
        status: order.status,
        store: '테스트',
        addr: '테스트',
        pay: '토스',
        amount: order.totalAmount,
        items: [] // 빈 배열이라도 있어야 함
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const status = data?.status;

  // ── 상태별 배너 ──
  const renderBanner = () => {
    if (refundDone) {
      return (
        <div
          style={{
            padding: '14px',
            background: '#EDE7FF',
            borderRadius: '13px',
            textAlign: 'center',
            border: '1px solid #CE93D8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px'
          }}>
          <div style={{ fontSize: '26px' }}>↩</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#7B1FA2' }}>환불 신청 완료</div>
          <div style={{ fontSize: '11px', color: '#9C27B0', lineHeight: '1.7' }}>
            사유: {refundReason}
            <br />
            3~5 영업일 내 처리됩니다
          </div>
        </div>
      );
    }
    switch (status) {
      case 'PENDING_PAYMENT':
        return <StatusBanner_PendingPayment />;
      case 'ACCEPTED':
        return <StatusBanner_Accepted />;
      case 'COOKING':
        return <StatusBanner_Cooking />;
      case 'DELIVERING':
        return <StatusBanner_Delivering />;
      case 'CANCELED':
        return <StatusBanner_Canceled />;
      case 'REJECTED':
        return (
          <div
            style={{
              padding: '18px 14px',
              background: 'linear-gradient(120deg,#F3E5F5,#EDE7FF)',
              borderRadius: '13px',
              border: '1.5px solid #CE93D8',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#E1BEE7',
                border: '2px solid #CE93D8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px'
              }}>
              🚫
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#7B1FA2' }}>주문이 거절되었습니다</div>
              <div style={{ fontSize: '11px', color: '#9C27B0', marginTop: '4px', lineHeight: '1.6' }}>
                죄송합니다. 사장님이 주문을 거절했어요.
                <br />
                결제 금액은 <b>1~2분 내</b>로 자동 환불됩니다.
              </div>
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 700,
                background: '#F3E5F5',
                color: '#7B1FA2'
              }}>
              ↩ 자동 환불 처리 중
            </span>
          </div>
        );
      case 'PAID':
        return (
          <div
            style={{
              padding: '14px',
              background: '#E3F2FD',
              borderRadius: '13px',
              border: '1.5px solid #90CAF9',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
            <div style={{ fontSize: '26px' }}>✅</div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#1565C0' }}>결제 완료 — 주문 접수 대기 중</div>
            <div style={{ fontSize: '11px', color: '#1976D2', lineHeight: '1.6' }}>
              사장님이 주문을 확인하고 있어요.
            </div>
          </div>
        );
      case 'COMPLETED':
        return (
          <div
            style={{
              padding: '14px',
              background: '#E8F5E9',
              borderRadius: '13px',
              textAlign: 'center',
              border: '1px solid #A5D6A7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}>
            <div style={{ fontSize: '26px' }}>✅</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#2E7D32' }}>배달 완료!</div>
            <div style={{ fontSize: '11px', color: '#388E3C', lineHeight: '1.6' }}>
              맛있게 드셨나요? 리뷰를 남겨주세요 😊
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // ── 상태별 액션 버튼 ──
  const renderActions = () => {
    if (refundDone) {
      return (
        <div
          style={{
            flex: 1,
            padding: '11px',
            background: '#F3E5F5',
            borderRadius: '10px',
            textAlign: 'center',
            fontSize: '12px',
            color: '#7B1FA2',
            fontWeight: 700
          }}>
          ✅ 환불 신청 완료 · 처리 중
        </div>
      );
    }
    switch (status) {
      case 'PAID':
        return (
          <button
            onClick={async () => {
              /* TODO: 주문 취소 API 호출 */
              const res = await cancelOrder(orderId, { reason: '사용자 취소' });
              alert('주문이 취소되었습니다.');
              fetchOrder(); // ← 이 줄 추가
            }}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              border: '1.5px solid #FFCDD2',
              background: '#FFF5F5',
              color: '#C62828',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
            ❌ 주문 취소하기
          </button>
        );
      case 'COMPLETED':
        return (
          <div style={{ display: 'flex', gap: '7px', width: '100%' }}>
            <button
              onClick={() => setRefundModal(true)}
              style={{
                flex: 1,
                padding: '11px 0',
                borderRadius: '10px',
                border: '1.5px solid #CE93D8',
                background: '#F3E5F5',
                color: '#7B1FA2',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}>
              ↩ 환불 신청
            </button>
            <Btn variant="primary" style={{ flex: 1 }} onClick={() => goTo('review')}>
              ⭐ 리뷰 작성
            </Btn>
          </div>
        );
      default:
        return null;
    }
  };

  // ── 렌더 ──
  return (
    <Phone navActive="order-history">
      {refundModal && (
        <RefundModal
          orderId={orderId}
          orderStore={data?.store ?? ''}
          orderAmount={data?.amount ?? ''}
          onClose={() => setRefundModal(false)}
          onDone={(reason) => {
            setRefundReason(reason);
            setRefundDone(true);
            setRefundModal(false);
          }}
        />
      )}

      <TopBar title="주문 상세" backTo="/customer/order-history" />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '12px'
        }}>
        {/* 로딩 */}
        {loading && (
          <div
            style={{
              padding: '32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
            <div style={{ fontSize: '32px' }}>⏳</div>
            <div style={{ fontSize: '13px', color: G[500], fontWeight: 600 }}>주문 정보를 불러오는 중...</div>
          </div>
        )}

        {/* 에러 */}
        {error && !loading && (
          <div
            style={{
              padding: '20px',
              background: '#FFEBEE',
              borderRadius: '11px',
              border: '1.5px solid #FFCDD2',
              textAlign: 'center',
              fontSize: '13px',
              color: '#C62828',
              fontWeight: 700
            }}>
            {error}
          </div>
        )}

        {/* 정상 데이터 */}
        {data && !loading && (
          <>
            {renderBanner()}

            {/* 주문 기본 정보 */}
            <div
              style={{
                padding: '11px',
                background: G[50],
                borderRadius: '9px',
                border: `1px solid ${G[200]}`,
                lineHeight: '2',
                color: G[600]
              }}>
              {[
                ['주문번호', orderId],
                ['가게', data.store],
                ['배달주소', data.addr],
                ['결제수단', data.pay],
                ['결제금액', data.amount]
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{k}</span>
                  <span style={{ color: G[900], fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* 주문 메뉴 */}
            <div
              style={{
                padding: '11px',
                border: `1px solid ${G[200]}`,
                borderRadius: '9px',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
              <div style={{ fontWeight: 700, color: G[800], marginBottom: '3px' }}>주문 메뉴</div>
              {data.items.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: G[600] }}>
                  <span>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* 액션 버튼 */}
            <div style={{ display: 'flex', gap: '7px' }}>{renderActions()}</div>
          </>
        )}
      </div>
    </Phone>
  );
}
