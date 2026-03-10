// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/AdminUsers.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { AdminShell, SearchBar, StatCard, THead, TRow, Badge } from "../../shared/components";
import { Icon } from "../../shared/icons";
import { G, PRIMARY, PRIMARY_LIGHT } from "../../shared/constants";

export default function AdminUsers() {
  const users = [
    { name:"user123", role:"고객",   date:"2025-01-12", status:"정상" },
    { name:"owner01", role:"사장님", date:"2025-01-08", status:"정상" },
    { name:"user456", role:"고객",   date:"2025-02-01", status:"정지" },
    { name:"user789", role:"고객",   date:"2025-02-14", status:"정상" },
  ];
  return (
    <AdminShell title="사용자 관리" back="/admin">
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <SearchBar placeholder="이름, 이메일, ID 검색"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>
          {[{l:"전체 회원",v:"12,847"},{l:"오늘 가입",v:"43"},{l:"정지 계정",v:"12",alert:true}].map((s,i) =>
            <StatCard key={i} label={s.l} value={s.v} color={s.alert?"#C62828":undefined} bg={s.alert?"#FFEBEE":undefined}/>
          )}
        </div>
        <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}>
          <THead cols={[{v:"사용자",flex:2},{v:"역할",flex:1},{v:"상태",flex:1}]}/>
          {users.map((u,i) => (
            <TRow key={i}
              cols={[
                { v:<div><div style={{fontSize:"12px",fontWeight:700}}>{u.name}</div><div style={{fontSize:"10px",color:G[400]}}>{u.date}</div></div>, flex:2 },
                { v:<Badge bg={u.role==="사장님"?PRIMARY_LIGHT:G[100]} color={u.role==="사장님"?PRIMARY:G[700]}>{u.role}</Badge>, flex:1 },
                { v:<Badge bg={u.status==="정지"?"#FFEBEE":"#E8F5E9"} color={u.status==="정지"?"#C62828":"#2E7D32"}>{u.status}</Badge>, flex:1 },
              ]}
              actions={[
                <button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>,
                <button key="b" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.block()}</button>,
                <button key="d" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.trash()}</button>,
              ]}
            />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}