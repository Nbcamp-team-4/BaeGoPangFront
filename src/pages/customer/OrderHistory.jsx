// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/OrderHistory.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, TopBar, Btn } from "../../shared/components";
import { FlatIcons } from "../../shared/icons";
import { G, PRIMARY } from "../../shared/constants";

/** * 1. 환불 모달 (같은 파일에 선언)
 * export를 붙여두면 다른 파일(OrderDetail 등)에서도 쓸 수 있습니다.
 */
export function RefundModal({ orderId, orderStore, orderAmount, onClose, onDone }) {
  const [sel, setSel] = useState("");
  const reasons = ["단순 변심", "음식 품질 불량", "배달 지연", "오배송", "기타"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "396px", background: "#fff", borderRadius: "20px 20px 0 0", padding: "20px 18px 32px", display: "flex", flexDirection: "column", gap: "13px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "15px", fontWeight: 900 }}>환불 신청</span>
          <span onClick={onClose} style={{ fontSize: "22px", cursor: "pointer", color: G[400] }}>×</span>
        </div>
        <div style={{ padding: "10px 12px", background: G[50], borderRadius: "9px", fontSize: "12px", border: `1px solid ${G[200]}` }}>
          <div style={{ fontWeight: 700, color: G[800] }}>{orderStore}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            <span>환불 예정 금액</span>
            <span style={{ fontWeight: 800, color: "#1565C0" }}>{orderAmount}</span>
          </div>
        </div>
        <div>
          {reasons.map((r, i) => (
            <div key={i} onClick={() => setSel(r)} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 12px", marginBottom: "6px", border: `1.5px solid ${sel === r ? "#1565C0" : G[300]}`, borderRadius: "9px", background: sel === r ? "#E3F2FD" : "#fff", cursor: "pointer" }}>
              <span style={{ fontSize: "13px", fontWeight: sel === r ? 700 : 400, color: sel === r ? "#1565C0" : G[800] }}>{r}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "13px", borderRadius: "10px", border: `1.5px solid ${G[300]}`, background: "#fff", fontWeight: 700 }}>취소</button>
          <button onClick={() => sel && onDone(sel)} disabled={!sel} style={{ flex: 1, padding: "13px", borderRadius: "10px", border: "none", background: sel ? "#1565C0" : G[300], color: "#fff", fontWeight: 700 }}>환불 신청</button>
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

  // 테스트용 유저 ID (실제 운영 시 세션에서 가져옴)
  const USER_ID = "89736f33-6593-4a12-8877-333333333333";

  // API 호출
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // 백엔드 주소 확인 필수! (예: /api/orders/customer)
        const res = await fetch("/api/orders/customer", {
          headers: { "X-User-Id": USER_ID }
        });
        const result = await res.json();
        
        if (res.ok && result.success) {
          setOrders(result.data); // BaseResponse 구조에 맞춤
        }
      } catch (err) {
        console.error("데이터 로드 에러:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Phone go={go}><div style={{padding:"50px", textAlign:"center"}}>불러오는 중... 🍊</div></Phone>;

  return (
    <Phone navActive="order-history" go={go}>
      {refundModal && (
        <RefundModal 
          orderId={refundModal.id} 
          orderStore={refundModal.storeName} 
          orderAmount={refundModal.totalPrice} 
          onClose={() => setRefundModal(null)} 
          onDone={() => setRefundModal(null)}
        />
      )}
      
      <TopBar title="주문 내역" go={go} backTo="customer/home" />
      
      <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", color: G[400], marginTop: "100px" }}>주문 내역이 없어요! 🍙</div>
        ) : (
          orders.map((o) => (
            <div key={o.id} style={{ border: `1.5px solid ${G[200]}`, borderRadius: "12px", padding: "15px", background: "#fff", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "15px", fontWeight: 800 }}>{o.storeName}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: PRIMARY, padding: "3px 8px", borderRadius: "6px", background: "#FFF3F0" }}>
                  {o.status}
                </span>
              </div>
              
              <div style={{ fontSize: "12px", color: G[500], marginTop: "6px" }}>
                주문일: {o.createdAt?.split('T')[0]} · {o.totalPrice?.toLocaleString()}원
              </div>
              
              <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                {/* ✅ 배달 완료 상태일 때만 리뷰 작성 버튼 노출 */}
                {(o.status === "DELIVERED" || o.status === "배달완료") && (
                  <Btn 
                    size="sm" 
                    variant="primary" 
                    onClick={() => navigate("/customer/review", { 
                      state: { orderId: o.id, storeName: o.storeName } 
                    })}
                  >
                    리뷰 작성
                  </Btn>
                )}
                
                <button 
                  onClick={() => setRefundModal(o)}
                  style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${G[200]}`, background: "#fff", fontSize: "12px", cursor: "pointer" }}
                >
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