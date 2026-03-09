// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/owner/OwnerMenu.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { Phone, TopBar, Btn, Badge } from "../../shared/components";
import { G, PRIMARY } from "../../shared/constants";

export default function OwnerMenu({ go }) {
  const items = [{name:"김치찌개",price:"8,000원",ai:true,hidden:false},{name:"된장찌개",price:"7,500원",ai:false,hidden:false},{name:"냉면",price:"9,000원",ai:false,hidden:true}];
  return (
    <Phone noNav>
      <TopBar title="메뉴 관리" go={go} backTo="owner-dash"/>
      <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <Btn variant="primary" full>+ 새 메뉴 등록</Btn>
        {items.map((m,i) => (
          <div key={i} style={{border:`1.5px solid ${G[200]}`,borderRadius:"9px",padding:"11px",opacity:m.hidden?0.5:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{display:"flex",gap:"5px",alignItems:"center"}}><span style={{fontSize:"13px",fontWeight:700}}>{m.name}</span>{m.ai&&<Badge color="#7B1FA2" bg="#F3E5F5">AI</Badge>}{m.hidden&&<Badge color="#C62828" bg="#FFEBEE">숨김</Badge>}</div><span style={{fontSize:"11px",color:G[500]}}>{m.price}</span></div>
              <div style={{display:"flex",gap:"3px"}}><Btn size="sm">수정</Btn><Btn size="sm">{m.hidden?"노출":"숨김"}</Btn><Btn size="sm" style={{color:"#C62828"}}>삭제</Btn></div>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}