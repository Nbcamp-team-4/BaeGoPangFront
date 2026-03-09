// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/AdminCategories.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { AdminShell } from "../../shared/components";
import { G } from "../../shared/constants";

export default function AdminCategories({ go }) {
  const [cats, setCats] = useState([
    { name:"한식", icon:"🍚", stores:234, active:true  },
    { name:"중식", icon:"🥢", stores:87,  active:true  },
    { name:"분식", icon:"🌮", stores:156, active:true  },
    { name:"치킨", icon:"🍗", stores:312, active:true  },
    { name:"피자", icon:"🍕", stores:98,  active:true  },
    { name:"일식", icon:"🍣", stores:67,  active:false },
  ]);
  const toggle = i => setCats(c => c.map((x,j) => j===i ? {...x,active:!x.active} : x));
  return (
    <AdminShell title="카테고리 관리" go={go}>
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"8px"}}>
        {cats.map((c,i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",padding:"11px 13px",border:`1.5px solid ${G[200]}`,borderRadius:"10px",background:"#fff"}}>
            <span style={{fontSize:"22px",width:"32px",textAlign:"center"}}>{c.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:"13px",fontWeight:700}}>{c.name}</div>
              <div style={{fontSize:"10px",color:G[500]}}>가게 {c.stores}개</div>
            </div>
            <div onClick={()=>toggle(i)} style={{width:"36px",height:"20px",borderRadius:"10px",background:c.active?"#2E7D32":G[300],position:"relative",cursor:"pointer"}}>
              <div style={{width:"16px",height:"16px",borderRadius:"50%",background:"#fff",position:"absolute",top:"2px",left:c.active?"18px":"2px",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
            </div>
          </div>
        ))}
        <div style={{padding:"12px",border:`2px dashed ${G[300]}`,borderRadius:"10px",textAlign:"center",color:G[400],fontSize:"13px",cursor:"pointer"}}>
          + 새 카테고리 추가
        </div>
      </div>
    </AdminShell>
  );
}

