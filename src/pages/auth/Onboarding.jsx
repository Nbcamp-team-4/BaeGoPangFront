// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/auth/Onboarding.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone } from "../../shared/components";
import { G, PRIMARY, AI_COLOR } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const slides = [
    { icon:"🍽️", color:PRIMARY,   bg:"#FFF3F0", title:"배고팡에 오신걸\n환영해요!",        sub:"배고프면 팡! 원하는 음식을\n빠르게 주문해보세요" },
    { icon:"✨",  color:AI_COLOR,  bg:"#F3EFFF", title:"AI가 오늘 메뉴를\n골라드려요",      sub:"기분·인원·예산만 알려주면\nAI가 딱 맞는 메뉴를 추천해요" },
    { icon:"🛵",  color:"#2E7D32", bg:"#E8F5E9", title:"빠르고 안전한\n배달 서비스",        sub:"실시간 배달 현황을 확인하고\n정확한 도착 시간을 받아보세요" },
    { icon:"⭐",  color:"#F57F17", bg:"#FFF8E1", title:"솔직한 리뷰로\n현명하게 선택",      sub:"실제 주문자의 생생한 리뷰와\n사진으로 믿을 수 있는 정보를" },
  ];
  const s = slides[page];
  return (
    <Phone noNav noStatus>
      <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:s.bg,transition:"background .4s"}}>
        <div style={{padding:"16px 20px 0",display:"flex",justifyContent:"flex-end"}}>
          {page < 3 && <span onClick={()=>navigate("/auth/login")} style={{fontSize:"13px",color:G[500],fontWeight:600,cursor:"pointer"}}>건너뛰기</span>}
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 32px",gap:"24px",textAlign:"center"}}>
          <div style={{width:"130px",height:"130px",borderRadius:"36px",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"64px",boxShadow:`0 12px 40px ${s.color}33`}}>{s.icon}</div>
          <div>
            <div style={{fontSize:"22px",fontWeight:900,color:G[900],lineHeight:"1.35",whiteSpace:"pre-line"}}>{s.title}</div>
            <div style={{fontSize:"13px",color:G[600],marginTop:"10px",lineHeight:"1.7",whiteSpace:"pre-line"}}>{s.sub}</div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"8px",padding:"16px 0 6px"}}>
          {slides.map((_,i) => (
            <div key={i} onClick={()=>setPage(i)} style={{height:"7px",borderRadius:"4px",cursor:"pointer",transition:"all .3s",width:i===page?"26px":"7px",background:i===page?s.color:G[300]}}/>
          ))}
        </div>
        <div style={{padding:"14px 24px 32px",display:"flex",flexDirection:"column",gap:"10px"}}>
          {page < 3
            ? <button onClick={()=>setPage(p=>p+1)} style={{padding:"15px",borderRadius:"14px",border:"none",background:s.color,color:"#fff",fontSize:"15px",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>다음 →</button>
            : <>
                <button onClick={()=>navigate("/auth/login")}  style={{padding:"15px",borderRadius:"14px",border:"none",background:PRIMARY,color:"#fff",fontSize:"15px",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>로그인하기</button>
                <button onClick={()=>navigate("/auth/signup")} style={{padding:"13px",borderRadius:"14px",border:`2px solid ${G[300]}`,background:"#fff",color:G[700],fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>회원가입</button>
              </>
          }
        </div>
      </div>
    </Phone>
  );
}