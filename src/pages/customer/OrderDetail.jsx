// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/OrderDetail.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Divider } from "../../shared/components";
import { RefundModal } from "./OrderHistory";
import { G, PRIMARY } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

export default function OrderDetail() {
  const navigate = useNavigate();
  const goTo = (path) => navigate(`/customer/${path}`);
  const [refundModal, setRefundModal] = useState(false);
  const [refundDone,  setRefundDone]  = useState(false);
  const [refundReason,setRefundReason]= useState("");
  return (
    <Phone navActive="order-history">
      {refundModal && (
        <RefundModal orderId="ORD-001" orderStore="맛있는 한식당" orderAmount="37,000원" onClose={()=>setRefundModal(false)} onDone={reason=>{ setRefundReason(reason); setRefundDone(true); setRefundModal(false); }}/>
      )}
      <TopBar title="주문 상세" backTo="/customer/order-history"/>
      <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"12px",fontSize:"12px"}}>
        {refundDone
          ? <div style={{padding:"14px",background:"#EDE7FF",borderRadius:"11px",textAlign:"center",border:"1px solid #CE93D8"}}><div style={{fontSize:"24px",marginBottom:"5px"}}>↩</div><div style={{fontSize:"15px",fontWeight:800,color:"#7B1FA2"}}>환불 신청 완료</div><div style={{fontSize:"11px",color:"#9C27B0",marginTop:"4px"}}>사유: {refundReason}<br/>3~5 영업일 내 처리됩니다</div></div>
          : <div style={{padding:"14px",background:"#E8F5E9",borderRadius:"11px",textAlign:"center",border:"1px solid #A5D6A7"}}><div style={{fontSize:"24px",marginBottom:"5px"}}>✅</div><div style={{fontSize:"15px",fontWeight:800,color:"#2E7D32"}}>배달 완료</div></div>
        }
        <div style={{padding:"11px",background:G[50],borderRadius:"9px",border:`1px solid ${G[200]}`,lineHeight:"2",color:G[600]}}>
          {[["주문번호","ORD-001"],["가게","맛있는 한식당"],["배달주소","세종대로 172"],["결제수단","카드 결제"],["결제금액","37,000원"]].map(([k,v]) => (
            <div key={k} style={{display:"flex",justifyContent:"space-between"}}><span>{k}</span><span style={{color:G[900],fontWeight:700}}>{v}</span></div>
          ))}
        </div>
        <div style={{padding:"11px",border:`1px solid ${G[200]}`,borderRadius:"9px",background:"#fff",display:"flex",flexDirection:"column",gap:"5px"}}>
          <div style={{fontWeight:700,color:G[800],marginBottom:"3px"}}>주문 메뉴</div>
          {[["김치찌개","8,000원"],["불고기 정식 × 2","24,000원"],["배달비","3,000원"]].map(([k,v]) => (
            <div key={k} style={{display:"flex",justifyContent:"space-between",color:G[600]}}><span>{k}</span><span style={{fontWeight:600}}>{v}</span></div>
          ))}
        </div>
        <div style={{display:"flex",gap:"7px"}}>
          {!refundDone && <>
            <Btn style={{flex:1}} disabled>취소 불가</Btn>
            <button onClick={()=>setRefundModal(true)} style={{flex:1,padding:"10px 0",borderRadius:"10px",border:"1.5px solid #CE93D8",background:"#F3E5F5",color:"#7B1FA2",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>↩ 환불 신청</button>
            <Btn variant="primary" style={{flex:1}} onClick={()=>goTo("review")}>리뷰 작성</Btn>
          </>}
          {refundDone && <div style={{flex:1,padding:"10px",background:"#F3E5F5",borderRadius:"10px",textAlign:"center",fontSize:"12px",color:"#7B1FA2",fontWeight:700}}>✅ 환불 신청 완료 · 처리 중</div>}
        </div>
      </div>
    </Phone>
  );
}