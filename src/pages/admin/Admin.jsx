// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/Admin.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { Phone } from "../../shared/components";
import { Icon } from "../../shared/icons";
import { G, PH, STATUS_H } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const stats = [{l:"총 사용자",v:"12,847"},{l:"활성 가게",v:"843"},{l:"오늘 주문",v:"2,391"},{l:"오늘 매출",v:"58.2M"}];
  const menus  = [
    {icon:"👥",l:"사용자 관리",to:"/admin/users",badge:null},
    {icon:"🏪",l:"가게 관리",to:"/admin/stores",badge:"5"},
    {icon:"📦",l:"주문 관리",to:"/admin/orders",badge:null},
    {icon:"📂",l:"카테고리",to:"/admin/categories",badge:null},
    {icon:"📍",l:"지역 관리",to:"/admin/regions",badge:null},
    {icon:"🤖",l:"AI 관리",to:"/admin/ai",badge:null},
    {icon:"💳",l:"결제 관리",to:"/admin/payments",badge:"2"},
    {icon:"⭐",l:"리뷰 관리",to:"/admin/reviews",badge:"8"},
  ];
  return (
    <Phone noNav>
      <div style={{height:"44px",background:"#1A237E",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",fontSize:"12px",color:"#fff",fontWeight:600,flexShrink:0}}></div>
      <div style={{height:`${PH-STATUS_H}px`,overflowY:"auto",display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"14px 16px 12px",background:"#1A237E"}}><div style={{fontSize:"18px",fontWeight:900,color:"#fff"}}>⚙️ 관리자 패널</div><div style={{fontSize:"12px",color:"rgba(255,255,255,0.6)",marginTop:"2px"}}>admin01 · MASTER</div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"14px 14px 0"}}>
          {stats.map((s,i) => <div key={i} style={{padding:"11px 13px",background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px"}}><div style={{fontSize:"10px",color:G[500],fontWeight:600}}>{s.l}</div><div style={{fontSize:"18px",fontWeight:900,color:G[900],marginTop:"2px"}}>{s.v}</div></div>)}
        </div>
        <div style={{padding:"14px",display:"flex",flexDirection:"column",gap:"10px"}}>
          <div style={{padding:"10px 12px",background:"#FFF8E1",border:"1px solid #FFD54F",borderRadius:"9px",display:"flex",alignItems:"center",gap:"8px"}}>{Icon.alert()}<span style={{fontSize:"12px",color:"#E65100",fontWeight:600}}>미승인 가게 5건 · 환불 요청 2건</span></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {menus.map((m,i) => (
              <div key={i} onClick={()=>navigate(m.to)} style={{padding:"14px 13px",border:`1.5px solid ${G[200]}`,borderRadius:"12px",background:"#fff",cursor:"pointer",position:"relative"}}>
                {m.badge && <div style={{position:"absolute",top:"10px",right:"10px",background:"#E53935",color:"#fff",borderRadius:"10px",fontSize:"10px",fontWeight:700,padding:"1px 6px"}}>{m.badge}</div>}
                <div style={{fontSize:"24px",marginBottom:"5px"}}>{m.icon}</div>
                <div style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Phone>
  );
}
