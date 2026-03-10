// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/AdminOrders.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { AdminShell, StatCard, THead, TRow, Badge } from "../../shared/components";
import { Icon } from "../../shared/icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { G } from "../../shared/constants";

export default function AdminOrders({ go }) {
  const weekData = [{d:"월",v:320},{d:"화",v:410},{d:"수",v:380},{d:"목",v:510},{d:"금",v:620},{d:"토",v:780},{d:"일",v:540}];
  const orders   = [
    { id:"ORD-2391", store:"맛있는 한식당", amount:"32,000", status:"배달중", statusColor:"#1565C0", statusBg:"#E3F2FD" },
    { id:"ORD-2390", store:"엄마손 분식",   amount:"15,000", status:"완료",   statusColor:"#2E7D32", statusBg:"#E8F5E9" },
    { id:"ORD-2389", store:"황금 중식당",   amount:"28,000", status:"취소",   statusColor:"#C62828", statusBg:"#FFEBEE" },
  ];
  return (
    <AdminShell title="주문 관리" go={go}>
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>
          {[{l:"오늘 주문",v:"2,391"},{l:"진행 중",v:"847"},{l:"취소율",v:"2.3%"}].map((s,i) =>
            <StatCard key={i} label={s.l} value={s.v}/>
          )}
        </div>
        <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
          <div style={{fontSize:"13px",fontWeight:800,marginBottom:"10px"}}>이번 주 주문 추이</div>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart data={weekData} margin={{top:4,right:4,left:-28,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={G[100]} vertical={false}/>
              <XAxis dataKey="d" tick={{fontSize:10,fill:G[400]}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:"11px",borderRadius:"8px"}}/>
              <Bar dataKey="v" fill="#1A237E" radius={[4,4,0,0]} maxBarSize={22}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}>
          <THead cols={[{v:"주문번호/가게",flex:2},{v:"금액",flex:1},{v:"상태",flex:1}]}/>
          {orders.map((o,i) => (
            <TRow key={i}
              cols={[
                { v:<div><div style={{fontSize:"11px",fontWeight:700}}>{o.id}</div><div style={{fontSize:"10px",color:G[400]}}>{o.store}</div></div>, flex:2 },
                { v:<span style={{fontSize:"11px",fontWeight:700}}>{o.amount}원</span>, flex:1 },
                { v:<Badge bg={o.statusBg} color={o.statusColor}>{o.status}</Badge>, flex:1 },
              ]}
              actions={[<button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>]}
            />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

