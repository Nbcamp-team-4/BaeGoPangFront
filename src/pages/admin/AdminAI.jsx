// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/AdminAI.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { AdminShell, StatCard, THead, TRow, Badge } from "../../shared/components";
import { Icon } from "../../shared/icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { G, AI_COLOR, AI_LIGHT } from "../../shared/constants";

export default function AdminAI({ go }) {
  const aiData = [{t:"00시",v:12},{t:"08시",v:45},{t:"12시",v:234},{t:"16시",v:187},{t:"20시",v:312},{t:"24시",v:98}];
  const logs   = [
    { id:"AI-001", type:"메뉴추천", user:"user123", time:"12:34", tokens:842, status:"성공" },
    { id:"AI-002", type:"리뷰답글", user:"owner01", time:"12:31", tokens:412, status:"성공" },
    { id:"AI-003", type:"메뉴추천", user:"user456", time:"12:28", tokens:0,   status:"실패" },
  ];
  return (
    <AdminShell title="AI 관리" go={go}>
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>
          {[{l:"오늘 요청",v:"1,247",c:AI_COLOR,bg:AI_LIGHT},{l:"성공률",v:"98.2%"},{l:"평균 응답",v:"310ms"}].map((s,i) =>
            <StatCard key={i} label={s.l} value={s.v} color={s.c} bg={s.bg}/>
          )}
        </div>
        <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
          <div style={{fontSize:"13px",fontWeight:800,marginBottom:"10px"}}>시간대별 AI 요청</div>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart data={aiData} margin={{top:4,right:4,left:-28,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={G[100]} vertical={false}/>
              <XAxis dataKey="t" tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:"11px",borderRadius:"8px"}}/>
              <Bar dataKey="v" fill={AI_COLOR} radius={[4,4,0,0]} maxBarSize={22}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{padding:"12px",background:AI_LIGHT,border:`1.5px solid ${AI_COLOR}44`,borderRadius:"11px"}}>
          <div style={{fontSize:"13px",fontWeight:800,color:AI_COLOR,marginBottom:"8px"}}>모델 설정</div>
          {[["사용 모델","claude-sonnet-4-6"],["Max Tokens","1,000"],["Temperature","0.7"]].map(([k,v]) => (
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${AI_COLOR}22`}}>
              <span style={{fontSize:"11px",color:G[600],fontWeight:600}}>{k}</span>
              <span style={{fontSize:"11px",fontWeight:700,color:AI_COLOR}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}>
          <THead cols={[{v:"유형/사용자",flex:2},{v:"토큰",flex:1},{v:"상태",flex:1}]}/>
          {logs.map((l,i) => (
            <TRow key={i}
              cols={[
                { v:<div><div style={{fontSize:"11px",fontWeight:700,color:AI_COLOR}}>{l.type}</div><div style={{fontSize:"10px",color:G[400]}}>{l.user} · {l.time}</div></div>, flex:2 },
                { v:<span style={{fontSize:"11px"}}>{l.tokens>0?l.tokens:"-"}</span>, flex:1 },
                { v:<Badge bg={l.status==="성공"?"#E8F5E9":"#FFEBEE"} color={l.status==="성공"?"#2E7D32":"#C62828"}>{l.status}</Badge>, flex:1 },
              ]}
              actions={[<button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>]}
            />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}