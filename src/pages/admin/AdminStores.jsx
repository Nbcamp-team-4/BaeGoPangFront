// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/AdminStores.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { AdminShell, SearchBar, StatCard, THead, TRow, Badge } from "../../shared/components";
import { Icon } from "../../shared/icons";
import { G } from "../../shared/constants";

export default function AdminStores({ go }) {
  const stores = [
    { name:"맛있는 한식당", owner:"owner01", cat:"한식", status:"승인"  },
    { name:"신규 피자집",   owner:"owner05", cat:"피자", status:"심사중" },
    { name:"황금 중식당",   owner:"owner02", cat:"중식", status:"승인"  },
    { name:"이상한 분식",   owner:"owner09", cat:"분식", status:"정지"  },
  ];
  return (
    <AdminShell title="가게 관리" go={go}>
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <SearchBar placeholder="가게명 검색"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>
          {[{l:"전체",v:"843"},{l:"심사중",v:"5",alert:true},{l:"정지",v:"7"}].map((s,i) =>
            <StatCard key={i} label={s.l} value={s.v} color={s.alert?"#E65100":undefined} bg={s.alert?"#FFF3E0":undefined}/>
          )}
        </div>
        <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}>
          <THead cols={[{v:"가게",flex:2},{v:"카테고리",flex:1},{v:"상태",flex:1}]}/>
          {stores.map((s,i) => (
            <TRow key={i}
              cols={[
                { v:<div><div style={{fontSize:"12px",fontWeight:700}}>{s.name}</div><div style={{fontSize:"10px",color:G[400]}}>{s.owner}</div></div>, flex:2 },
                { v:<Badge>{s.cat}</Badge>, flex:1 },
                { v:<Badge bg={s.status==="승인"?"#E8F5E9":s.status==="심사중"?"#FFF3E0":"#FFEBEE"} color={s.status==="승인"?"#2E7D32":s.status==="심사중"?"#E65100":"#C62828"}>{s.status}</Badge>, flex:1 },
              ]}
              actions={[
                <button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>,
                <button key="b" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.block()}</button>,
              ]}
            />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}