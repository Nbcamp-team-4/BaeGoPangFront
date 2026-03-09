// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/AdminReviews.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { AdminShell, StatCard, THead, TRow, Badge } from "../../shared/components";
import { Icon } from "../../shared/icons";
import { G } from "../../shared/constants";

export default function AdminReviews({ go }) {
  const reviews = [
    { id:"REV-501", user:"user123",  store:"맛있는 한식당", rating:5, content:"국물이 진짜 맛있어요!",   reported:false },
    { id:"REV-500", user:"user_bad", store:"황금 중식당",   rating:1, content:"욕설 포함 리뷰 내용...", reported:true  },
    { id:"REV-499", user:"user456",  store:"엄마손 분식",   rating:4, content:"맛있고 빠르게 배달됐어요", reported:false },
  ];
  function Stars({ v }) { return <span style={{color:"#FFC107",fontSize:"11px"}}>{"★".repeat(v)}{"☆".repeat(5-v)}</span>; }
  return (
    <AdminShell title="리뷰 관리" go={go}>
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>
          {[{l:"전체 리뷰",v:"48,291"},{l:"신고 접수",v:"8건",alert:true},{l:"평균 평점",v:"4.3"}].map((s,i) =>
            <StatCard key={i} label={s.l} value={s.v} color={s.alert?"#C62828":undefined} bg={s.alert?"#FFEBEE":undefined}/>
          )}
        </div>
        <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}>
          <THead cols={[{v:"리뷰/가게",flex:2},{v:"평점",flex:1},{v:"상태",flex:1}]}/>
          {reviews.map((r,i) => (
            <TRow key={i} highlight={r.reported}
              cols={[
                { v:<div><div style={{fontSize:"11px",fontWeight:700}}>{r.content.slice(0,16)}...</div><div style={{fontSize:"10px",color:G[400]}}>{r.user} · {r.store}</div></div>, flex:2 },
                { v:<Stars v={r.rating}/>, flex:1 },
                { v:<Badge bg={r.reported?"#FFEBEE":"#E8F5E9"} color={r.reported?"#C62828":"#2E7D32"}>{r.reported?"신고":"정상"}</Badge>, flex:1 },
              ]}
              actions={[
                <button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>,
                <button key="d" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.trash()}</button>,
              ]}
            />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}