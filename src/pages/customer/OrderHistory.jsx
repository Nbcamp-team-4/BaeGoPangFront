// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/OrderHistory.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Badge } from "../../shared/components";
import { FlatIcons } from "../../shared/icons";
import { G, PRIMARY } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

/** 공통 환불 모달 — OrderHistory, OrderDetail에서 재사용 */
export function RefundModal({ orderId, orderStore, orderAmount, onClose, onDone }) {
  const reasons = ["단순 변심","음식 품질 불량","배달 지연","오배송","기타"];
  const [sel, setSel] = useState("");
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{width:"100%",maxWidth:"396px",background:"#fff",borderRadius:"20px 20px 0 0",padding:"20px 18px 32px",display:"flex",flexDirection:"column",gap:"13px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:"15px",fontWeight:900}}>환불 신청</span><span onClick={onClose} style={{fontSize:"22px",cursor:"pointer",color:G[400]}}>×</span></div>
        <div style={{padding:"10px 12px",background:G[50],borderRadius:"9px",fontSize:"12px",color:G[600],border:`1px solid ${G[200]}`}}>
          <div style={{fontWeight:700,color:G[800],marginBottom:"2px"}}>{orderStore}</div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>환불 예정 금액</span><span style={{fontWeight:800,color:"#1565C0"}}>{orderAmount}</span></div>
        </div>
        <div>
          <div style={{fontSize:"12px",fontWeight:700,color:G[700],marginBottom:"7px"}}>환불 사유를 선택해 주세요</div>
          {reasons.map((r,i) => (
            <div key={i} onClick={()=>setSel(r)} style={{display:"flex",alignItems:"center",gap:"9px",padding:"10px 12px",marginBottom:"6px",border:`1.5px solid ${sel===r?"#1565C0":G[300]}`,borderRadius:"9px",background:sel===r?"#E3F2FD":"#fff",cursor:"pointer"}}>
              <div style={{width:"16px",height:"16px",borderRadius:"50%",border:`2px solid ${sel===r?"#1565C0":G[400]}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {sel===r && <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#1565C0"}}/>}
              </div>
              <span style={{fontSize:"13px",fontWeight:sel===r?700:400,color:sel===r?"#1565C0":G[800]}}>{r}</span>
            </div>
          ))}
        </div>
        <div style={{fontSize:"11px",color:G[500],background:"#EDE7FF",padding:"9px 12px",borderRadius:"9px",lineHeight:"1.7"}}>💡 환불은 영업일 <b>3~5일</b> 내 처리됩니다.</div>
        <div style={{display:"flex",gap:"8px"}}>
          <button onClick={onClose} style={{flex:1,padding:"13px",borderRadius:"10px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:G[700]}}>취소</button>
          <button onClick={()=>{ if(sel) onDone(sel); }} disabled={!sel} style={{flex:1,padding:"13px",borderRadius:"10px",border:"none",background:sel?"#1565C0":G[300],color:"#fff",fontSize:"13px",fontWeight:700,cursor:sel?"pointer":"not-allowed",fontFamily:"inherit"}}>환불 신청</button>
        </div>
      </div>
    </div>
  );
}

export default function OrderHistory() {
  const navigate = useNavigate();
  const goTo = (path) => navigate(`/customer/${path}`);
  const orders = [
    { id:"ORD-016", store:"엄마손 분식",   amount:"13,000원", date:"2025-03-02", status:"주문대기",  color:PRIMARY,    bg:"#FFF3F0", canCancel:true,  canRefund:false, payFailed:false },
    { id:"ORD-001", store:"맛있는 한식당", amount:"37,000원", date:"2025-03-01", status:"배달완료",  color:"#2E7D32",  bg:"#E8F5E9", canCancel:false, canRefund:true,  payFailed:false },
    { id:"ORD-002", store:"황금 중식당",   amount:"22,000원", date:"2025-02-28", status:"조리중",    color:"#E65100",  bg:"#FFF3E0", canCancel:false, canRefund:false, payFailed:false },
    { id:"ORD-005", store:"두부마을",       amount:"9,000원",  date:"2025-02-27", status:"환불요청",  color:"#7B1FA2",  bg:"#F3E5F5", canCancel:false, canRefund:false, payFailed:false, isRefundPending:true },
    { id:"ORD-006", store:"엄마손 분식",   amount:"11,000원", date:"2025-02-26", status:"환불완료",  color:"#4A148C",  bg:"#EDE7FF", canCancel:false, canRefund:false, payFailed:false, isRefundDoneServer:true },
    { id:"ORD-003", store:"엄마손 분식",   amount:"15,000원", date:"2025-02-25", status:"결제실패",  color:"#C62828",  bg:"#FFEBEE", canCancel:false, canRefund:false, payFailed:true },
    { id:"ORD-004", store:"두부마을",       amount:"9,000원",  date:"2025-02-24", status:"주문취소",  color:G[500],     bg:G[100],    canCancel:false, canRefund:false, payFailed:false },
  ];
  const [cancelled,   setCancelled]   = useState([]);
  const [refundDone,  setRefundDone]  = useState([]);
  const [refundModal, setRefundModal] = useState(null);

  return (
    <Phone navActive="order-history">
      {refundModal && (
        <RefundModal orderId={refundModal.id} orderStore={refundModal.store} orderAmount={refundModal.amount} onClose={()=>setRefundModal(null)} onDone={()=>{ setRefundDone(v=>[...v,refundModal.id]); setRefundModal(null); }}/>
      )}
      <TopBar title="주문 내역" backTo="/customer/home"/>
      <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"9px"}}>
        {orders.map((o,i) => {
          const isCancelled = cancelled.includes(o.id);
          const isRefunded  = refundDone.includes(o.id);
          const displayStatus = isCancelled?"주문취소":isRefunded?"환불요청":o.isRefundPending?"환불요청":o.isRefundDoneServer?"환불완료":o.status;
          const displayColor  = isCancelled?"#C62828":isRefunded||o.isRefundPending?"#7B1FA2":o.isRefundDoneServer?"#4A148C":o.color;
          const displayBg     = isCancelled?"#FFEBEE":isRefunded||o.isRefundPending?"#F3E5F5":o.isRefundDoneServer?"#EDE7FF":o.bg;
          return (
            <div key={i} onClick={()=>goTo("order-detail")} style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"13px",cursor:"pointer",borderLeftWidth:"4px",borderLeftColor:displayColor,background:"#fff"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"14px",fontWeight:800}}>{o.store}</span>
                <span style={{fontSize:"11px",fontWeight:700,color:displayColor,padding:"3px 7px",borderRadius:"5px",background:displayBg}}>{displayStatus}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:G[500],marginTop:"5px"}}>
                <span>{o.id} · {o.date}</span><span style={{fontWeight:700,color:G[800]}}>{o.amount}</span>
              </div>
              <div style={{marginTop:"9px",display:"flex",gap:"6px",flexWrap:"wrap"}} onClick={e=>e.stopPropagation()}>
                {o.status==="배달완료" && !isCancelled && !isRefunded && <Btn size="sm" variant="primary" onClick={e=>{e.stopPropagation();goTo("review");}}>리뷰 작성</Btn>}
                {o.canCancel && !isCancelled && (
                  <button onClick={e=>{e.stopPropagation();setCancelled(v=>[...v,o.id]);}} style={{padding:"5px 11px",borderRadius:"7px",border:"1.5px solid #FFCDD2",background:"#FFF5F5",color:"#C62828",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:"5px"}}>
                    {FlatIcons.cancel()} 주문 취소
                  </button>
                )}
                {o.canRefund && !isRefunded && !isCancelled && (
                  <button onClick={e=>{e.stopPropagation();setRefundModal({id:o.id,store:o.store,amount:o.amount});}} style={{padding:"5px 11px",borderRadius:"7px",border:"1.5px solid #CE93D8",background:"#F3E5F5",color:"#7B1FA2",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>↩ 환불 신청</button>
                )}
                {o.payFailed && (
                  <button onClick={e=>{e.stopPropagation();goTo("order-fail");}} style={{padding:"5px 11px",borderRadius:"7px",border:`1.5px solid ${PRIMARY}44`,background:"#FFF3F0",color:PRIMARY,fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>💳 재결제</button>
                )}
                {isCancelled && <span style={{fontSize:"11px",color:"#C62828",fontWeight:600}}>✗ 취소 완료</span>}
                {(isRefunded||o.isRefundPending)&&!o.isRefundDoneServer && <span style={{fontSize:"11px",color:"#7B1FA2",fontWeight:600}}>↩ 환불 요청중</span>}
                {o.isRefundDoneServer && <span style={{fontSize:"11px",color:"#4A148C",fontWeight:600}}>✅ 환불 완료</span>}
              </div>
            </div>
          );
        })}
      </div>
    </Phone>
  );
}