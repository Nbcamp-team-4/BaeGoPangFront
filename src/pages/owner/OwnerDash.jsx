// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/owner/OwnerDash.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { Phone, TopBar, Btn } from "../../shared/components";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { G, PRIMARY, PRIMARY_LIGHT } from "../../shared/constants";
import { Icon } from "../../shared/icons";

function Stars({ v=4.5 }) {
  return <span style={{color:"#FFC107",fontSize:"12px"}}>{"★".repeat(Math.floor(v))}{"☆".repeat(5-Math.floor(v))}</span>;
}

const hourlyData = [
  {t:"10시",v:0},{t:"11시",v:12},{t:"12시",v:89},{t:"13시",v:134},
  {t:"14시",v:67},{t:"15시",v:23},{t:"16시",v:18},{t:"17시",v:31},
  {t:"18시",v:112},{t:"19시",v:178},{t:"20시",v:156},{t:"21시",v:98},{t:"22시",v:34},
];

export default function OwnerDash({ go }) {
  return (
    <Phone noNav>
      <TopBar title="🏪 사장님 홈" go={go} backTo="home"/>
      <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"14px"}}>
        {/* 가게 요약 */}
        <div style={{padding:"13px",background:PRIMARY_LIGHT,borderRadius:"11px",border:`1.5px solid ${PRIMARY}33`}}>
          <div style={{fontSize:"15px",fontWeight:800}}>맛있는 한식당</div>
          <div style={{display:"flex",alignItems:"center",gap:"4px",marginTop:"3px"}}><Stars/><span style={{fontSize:"12px",fontWeight:700}}>4.7</span></div>
          <div style={{display:"flex",gap:"10px",marginTop:"7px",fontSize:"11px",color:G[500]}}><span>📍 광화문</span><span>🕐 10:00-22:00</span><span style={{color:"#2E7D32",fontWeight:700}}>● 영업중</span></div>
        </div>
        {/* 오늘 통계 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>
          {[{l:"오늘주문",v:"28건"},{l:"신규대기",v:"3건",alert:true},{l:"오늘매출",v:"742K"}].map((s,i) => (
            <div key={i} style={{padding:"11px",border:`1.5px solid ${s.alert?PRIMARY:G[200]}`,borderRadius:"9px",textAlign:"center",background:s.alert?PRIMARY_LIGHT:"#fff"}}>
              <div style={{fontSize:"10px",color:s.alert?PRIMARY:G[500],fontWeight:600}}>{s.l}</div>
              <div style={{fontSize:"17px",fontWeight:900,color:s.alert?PRIMARY:G[900],marginTop:"2px"}}>{s.v}</div>
            </div>
          ))}
        </div>
        {/* 신규 주문 */}
        <div style={{padding:"13px",border:"2px solid #FFA000",borderRadius:"11px",background:"#FFF8E1"}}>
          <div style={{fontSize:"12px",fontWeight:800,color:"#E65100",marginBottom:"7px"}}>🔔 신규 주문 접수</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:"12px",fontWeight:700}}>ORD-015 · 김치찌개 외 1건</div><div style={{fontSize:"11px",color:G[500],marginTop:"2px"}}>user456 · 방금 전 · 32,000원</div></div>
            <div style={{display:"flex",gap:"5px"}}><Btn size="sm" variant="primary">수락</Btn><Btn size="sm">거절</Btn></div>
          </div>
        </div>
        {/* 매출 차트 */}
        <div onClick={()=>go("owner-sales")} style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"13px",padding:"14px",cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
            <div style={{fontSize:"14px",fontWeight:800,color:G[900]}}>시간대별 매출</div>
            <div style={{display:"flex",alignItems:"center",gap:"5px"}}><span style={{fontSize:"11px",color:PRIMARY,fontWeight:700}}>상세 보기</span>{Icon.chevron(PRIMARY)}</div>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={hourlyData} margin={{top:4,right:4,left:-24,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={G[100]} vertical={false}/>
              <XAxis dataKey="t" tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false} interval={1}/>
              <YAxis tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:"11px",borderRadius:"8px",border:`1px solid ${G[200]}`}}/>
              <Bar dataKey="v" fill={PRIMARY} radius={[4,4,0,0]} maxBarSize={18}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* 빠른 메뉴 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
          {[{icon:"📋",l:"주문관리",g:"owner-orders"},{icon:"🍽️",l:"메뉴관리",g:"owner-menu"},{icon:"⭐",l:"리뷰관리",g:"owner-reviews"},{icon:"🏪",l:"가게정보",g:"owner-info"},{icon:"👤",l:"마이페이지",g:"owner-my"}].map((m,i) => (
            <div key={i} onClick={()=>go(m.g)} style={{padding:"14px",border:`1.5px solid ${G[200]}`,borderRadius:"11px",textAlign:"center",cursor:"pointer",background:"#fff"}}>
              <div style={{fontSize:"26px",marginBottom:"3px"}}>{m.icon}</div>
              <div style={{fontSize:"12px",fontWeight:700,color:G[800]}}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}