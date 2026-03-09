// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/OrderFail.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Divider } from "../../shared/components";
import { G, PRIMARY } from "../../shared/constants";

export default function OrderFail({ go }) {
  const [retrying, setRetrying] = useState(false);
  const [retried,  setRetried]  = useState(false);
  const [reasonIdx, setReasonIdx] = useState(0);
  const failReasons = [
    { code:"INSUFFICIENT_BALANCE", title:"잔액 부족",    desc:"카드 잔액이 부족합니다. 다른 결제 수단을 이용하거나 충전 후 다시 시도해 주세요.", icon:"💳", tip:"다른 카드나 간편결제를 사용해 보세요." },
    { code:"NETWORK_ERROR",         title:"네트워크 오류", desc:"결제 처리 중 네트워크 연결이 끊겼습니다. 잠시 후 다시 시도해 주세요.",               icon:"📶", tip:"Wi-Fi 또는 데이터 연결을 확인하세요." },
    { code:"CARD_LIMIT",            title:"카드 한도 초과", desc:"이번 달 카드 한도를 초과했습니다. 다른 결제 수단을 이용해 주세요.",                  icon:"🚫", tip:"다른 카드 혹은 계좌이체를 이용하세요." },
  ];
  const reason = failReasons[reasonIdx];
  const handleRetry = () => { setRetrying(true); setTimeout(()=>{ setRetrying(false); setRetried(true); }, 2000); };

  if (retried) return (
    <Phone noNav>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 22px",gap:"20px",textAlign:"center"}}>
        <div style={{width:"90px",height:"90px",borderRadius:"50%",background:"#E8F5E9",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2E7D32" opacity=".15"/><circle cx="12" cy="12" r="10" stroke="#2E7D32" strokeWidth="1.5"/><polyline points="8 12 11 15 16 9" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div><div style={{fontSize:"20px",fontWeight:900,color:"#2E7D32"}}>재결제 성공!</div><div style={{fontSize:"13px",color:G[500],marginTop:"5px"}}>주문이 완료되었습니다</div></div>
        <Btn variant="primary" full onClick={()=>go("order-complete")}>주문 완료 보기</Btn>
      </div>
    </Phone>
  );
  return (
    <Phone noNav>
      <TopBar title="결제 실패" go={go} backTo="order"/>
      <div style={{flex:1,overflowY:"auto",padding:"20px 18px",display:"flex",flexDirection:"column",gap:"16px"}}>
        <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"}}>
          <div style={{width:"88px",height:"88px",borderRadius:"50%",background:"#FFEBEE",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#C62828" opacity=".12"/><circle cx="12" cy="12" r="10" stroke="#C62828" strokeWidth="1.8"/><path d="M15 9l-6 6M9 9l6 6" stroke="#C62828" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div><div style={{fontSize:"20px",fontWeight:900,color:"#C62828"}}>결제에 실패했어요</div><div style={{fontSize:"12px",color:G[500],marginTop:"4px"}}>주문은 취소되지 않았습니다</div></div>
        </div>
        {/* 실패 유형 선택 */}
        <div style={{padding:"9px 11px",background:G[50],borderRadius:"9px",border:`1px solid ${G[200]}`}}>
          <div style={{fontSize:"10px",fontWeight:700,color:G[400],marginBottom:"6px"}}>실패 유형 미리보기 (테스트)</div>
          <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
            {failReasons.map((r,i) => (
              <button key={i} onClick={()=>setReasonIdx(i)} style={{padding:"4px 9px",borderRadius:"6px",border:`1.5px solid ${reasonIdx===i?"#C62828":G[300]}`,background:reasonIdx===i?"#FFEBEE":"#fff",color:reasonIdx===i?"#C62828":G[600],fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{r.title}</button>
            ))}
          </div>
        </div>
        <div style={{padding:"16px",background:"#FFF5F5",border:"1.5px solid #FFCDD2",borderRadius:"13px",display:"flex",flexDirection:"column",gap:"10px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"42px",height:"42px",borderRadius:"12px",background:"#FFEBEE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",flexShrink:0}}>{reason.icon}</div>
            <div>
              <div style={{fontSize:"14px",fontWeight:900,color:"#C62828"}}>실패 원인: {reason.title}</div>
              <div style={{fontSize:"10px",color:G[400],marginTop:"2px",fontWeight:600}}>오류 코드: {reason.code}</div>
            </div>
          </div>
          <div style={{fontSize:"12px",color:G[700],lineHeight:"1.7",padding:"10px 12px",background:"#fff",borderRadius:"9px",border:"1px solid #FFCDD2"}}>{reason.desc}</div>
          <div style={{fontSize:"11px",color:"#E65100",fontWeight:600}}>💡 {reason.tip}</div>
        </div>
        <div style={{padding:"12px 13px",background:G[50],borderRadius:"11px",border:`1px solid ${G[200]}`,fontSize:"12px",color:G[600],lineHeight:"1.9"}}>
          <div style={{fontWeight:700,color:G[800],marginBottom:"3px"}}>맛있는 한식당</div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>김치찌개 × 1</span><span>8,000원</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>불고기 정식 × 2</span><span>24,000원</span></div>
          <Divider/>
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:800,color:G[900]}}><span>결제 시도 금액</span><span style={{color:"#C62828"}}>40,000원</span></div>
        </div>
        <button onClick={handleRetry} disabled={retrying} style={{width:"100%",padding:"15px",borderRadius:"12px",border:"none",background:retrying?G[300]:PRIMARY,color:"#fff",fontSize:"15px",fontWeight:800,cursor:retrying?"not-allowed":"pointer",fontFamily:"inherit"}}>
          {retrying ? "결제 처리 중..." : "40,000원 재결제하기"}
        </button>
        <div style={{display:"flex",gap:"8px"}}>
          <Btn style={{flex:1}} onClick={()=>go("order")}>← 결제 수단 변경</Btn>
          <Btn style={{flex:1}} onClick={()=>go("cart")}>장바구니로</Btn>
        </div>
        <div style={{textAlign:"center",fontSize:"11px",color:G[400],lineHeight:"1.6"}}>
          결제 실패 시 금액이 청구되지 않습니다.<br/>
          문제가 지속되면 <span style={{color:PRIMARY,fontWeight:700,cursor:"pointer"}}>고객센터</span>로 문의해 주세요.
        </div>
      </div>
    </Phone>
  );
}
