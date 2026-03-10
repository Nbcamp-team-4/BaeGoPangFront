// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/Review.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Badge } from "../../shared/components";
import { FlatIcons } from "../../shared/icons";
import { G, PRIMARY } from "../../shared/constants";

export default function Review({ go }) {
  const [stars, setStars] = useState(4);
  const labels     = ["","별로예요","그냥그래요","괜찮아요","좋아요","최고예요!"];
  const starColors = ["","#E53935","#FF7043","#FFA726","#FFC107","#FFD600"];
  return (
    <Phone navActive="order-history" go={go}>
      <TopBar title="리뷰 작성" go={go} backTo="order-detail"/>
      <div style={{flex:1,overflowY:"auto",padding:"18px 20px",display:"flex",flexDirection:"column",gap:"16px"}}>
        <div style={{padding:"11px",background:G[50],borderRadius:"9px",textAlign:"center",border:`1px solid ${G[200]}`}}>
          <div style={{fontSize:"13px",fontWeight:700}}>맛있는 한식당</div>
          <div style={{fontSize:"11px",color:G[500],marginTop:"2px"}}>ORD-001 · 김치찌개 외 1건</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"12px",fontWeight:700,color:G[600],marginBottom:"12px"}}>이 가게는 어떠셨나요?</div>
          <div style={{display:"flex",justifyContent:"center",gap:"6px"}}>
            {[1,2,3,4,5].map(s => (
              <div key={s} onClick={()=>setStars(s)} style={{cursor:"pointer",transform:s===stars?"scale(1.2)":"scale(1)"}}>
                {s<=stars ? FlatIcons.starFilled(starColors[stars]||"#FFC107") : FlatIcons.starEmpty(G[300])}
              </div>
            ))}
          </div>
          {stars>0 && (
            <div style={{marginTop:"9px",display:"inline-flex",alignItems:"center",gap:"5px",padding:"5px 14px",borderRadius:"20px",background:starColors[stars]+"22"}}>
              <span style={{fontSize:"13px",fontWeight:800,color:starColors[stars]}}>{labels[stars]}</span>
            </div>
          )}
        </div>
        <div>
          <div style={{fontSize:"12px",fontWeight:700,color:G[600],marginBottom:"5px"}}>리뷰 내용</div>
          <div style={{padding:"13px",border:`1.5px dashed ${G[300]}`,borderRadius:"9px",minHeight:"90px",color:G[400],fontSize:"12px",background:G[50]}}>음식 맛, 배달 속도, 포장 상태 등을 알려주세요 :)</div>
        </div>
        <Btn variant="primary" full onClick={()=>go("order-history")}>리뷰 등록</Btn>
      </div>
    </Phone>
  );
}