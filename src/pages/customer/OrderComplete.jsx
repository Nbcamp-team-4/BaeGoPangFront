// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/OrderComplete.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, Btn, Divider } from "../../shared/components";
import { FlatIcons } from "../../shared/icons";
import { G, PRIMARY } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

export default function OrderComplete() {
  const navigate = useNavigate();
  const goTo = (path) => navigate(`/customer/${path}`);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [cancelled,     setCancelled]     = useState(false);
  if (cancelled) return (
    <Phone noNav>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 22px",gap:"20px",textAlign:"center"}}>
        <div style={{width:"90px",height:"90px",borderRadius:"50%",background:"#FFEBEE",display:"flex",alignItems:"center",justifyContent:"center"}}>{FlatIcons.cancel("#C62828")}</div>
        <div><div style={{fontSize:"20px",fontWeight:900,color:"#C62828"}}>주문이 취소됐어요</div><div style={{fontSize:"13px",color:G[500],marginTop:"5px"}}>주문번호 ORD-2025-001</div></div>
        <div style={{fontSize:"12px",color:G[400],background:G[50],borderRadius:"10px",padding:"12px 16px",border:`1px solid ${G[200]}`}}>결제금액은 3~5 영업일 내에 환불됩니다.</div>
        <Btn variant="primary" full onClick={()=>goTo("home")}>홈으로</Btn>
      </div>
    </Phone>
  );
  return (
    <Phone noNav>
      {cancelConfirm && (
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:"320px",background:"#fff",borderRadius:"16px",padding:"22px 20px",display:"flex",flexDirection:"column",gap:"14px",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:"20px",fontWeight:900}}>주문을 취소할까요?</div><div style={{fontSize:"12px",color:G[500],marginTop:"5px",lineHeight:"1.7"}}>가게가 주문을 수락하기 전까지만 취소 가능합니다.</div></div>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>setCancelConfirm(false)} style={{flex:1,padding:"12px",borderRadius:"10px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:G[700]}}>아니요</button>
              <button onClick={()=>{setCancelConfirm(false);setCancelled(true);}} style={{flex:1,padding:"12px",borderRadius:"10px",border:"none",background:"#C62828",color:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>취소할게요</button>
            </div>
          </div>
        </div>
      )}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 22px",gap:"20px",textAlign:"center"}}>
        <div style={{width:"90px",height:"90px",borderRadius:"50%",background:"#E8F5E9",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2E7D32" opacity=".15"/><circle cx="12" cy="12" r="10" stroke="#2E7D32" strokeWidth="1.5"/><polyline points="8 12 11 15 16 9" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div><div style={{fontSize:"20px",fontWeight:900}}>주문이 완료됐어요!</div><div style={{fontSize:"13px",color:G[500],marginTop:"5px"}}>주문번호 ORD-2025-001</div></div>
        <div style={{width:"100%",padding:"14px",background:G[50],borderRadius:"13px",border:`1px solid ${G[200]}`,textAlign:"left"}}>
          {[{icon:FlatIcons.store(),label:"가게",value:"맛있는 한식당"},{icon:FlatIcons.moto(),label:"예상 배달",value:"25~35분"},{icon:FlatIcons.creditcard(),label:"결제 금액",value:"40,000원",bold:true}].map((row,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:i<2?`1px solid ${G[200]}`:"none"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",borderRadius:"7px",background:"#fff",border:`1px solid ${G[200]}`,flexShrink:0}}>{row.icon}</div>
              <span style={{fontSize:"12px",color:G[500],flex:1}}>{row.label}</span>
              <span style={{fontSize:row.bold?"15px":"13px",fontWeight:row.bold?900:600,color:row.bold?PRIMARY:G[800]}}>{row.value}</span>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"9px",width:"100%"}}>
          <Btn variant="primary" full onClick={()=>goTo("order-detail")}>주문 상세 보기</Btn>
          <button onClick={()=>setCancelConfirm(true)} style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1.5px solid #FFCDD2",background:"#FFF5F5",color:"#C62828",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}}>
            {FlatIcons.cancel()} 주문 취소하기
          </button>
          <div style={{fontSize:"10px",color:G[400],textAlign:"center"}}>가게 수락 전까지만 취소할 수 있어요</div>
          <Btn full onClick={()=>goTo("home")}>홈으로</Btn>
        </div>
      </div>
    </Phone>
  );
}