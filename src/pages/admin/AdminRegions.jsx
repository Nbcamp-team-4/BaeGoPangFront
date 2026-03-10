// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/AdminRegions.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { AdminShell, SearchBar } from "../../shared/components";
import { G } from "../../shared/constants";

export default function AdminRegions() {
  const regions = [
    { name:"서울 종로구", zones:["광화문","경복궁","종로"], stores:127 },
    { name:"서울 강남구", zones:["강남","역삼","선릉"],     stores:342 },
    { name:"서울 마포구", zones:["홍대","합정","상수"],     stores:198 },
  ];
  return (
    <AdminShell title="지역 관리" back="/admin">
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"9px"}}>
        <SearchBar placeholder="지역명, 구역 검색"/>
        {regions.map((r,i) => (
          <div key={i} style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px 13px",background:"#fff"}}>
            <div style={{fontSize:"13px",fontWeight:800,marginBottom:"7px"}}>
              {r.name} <span style={{fontSize:"10px",color:G[500],fontWeight:400}}>가게 {r.stores}개</span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
              {r.zones.map(z => (
                <span key={z} style={{padding:"3px 8px",background:G[100],borderRadius:"4px",fontSize:"10px",color:G[600],fontWeight:600}}>{z}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
