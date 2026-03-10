// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/owner/OwnerInfo.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Img } from "../../shared/components";
import { Icon } from "../../shared/icons";
import { G, PRIMARY, PRIMARY_LIGHT } from "../../shared/constants";

export default function OwnerInfo() {
  const [open,    setOpen]    = useState(true);
  const [editing, setEditing] = useState(null);
  const days = ["월","화","수","목","금","토","일"];
  const [hours, setHours] = useState({월:"10:00~22:00",화:"10:00~22:00",수:"10:00~22:00",목:"10:00~22:00",금:"10:00~22:00",토:"11:00~23:00",일:"휴무"});
  return (
    <Phone noNav>
      <TopBar title="가게 정보" backTo="/owner/dash"
        right={
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"11px",color:open?"#2E7D32":"#C62828",fontWeight:700}}>{open?"영업중":"영업종료"}</span>
            <div onClick={()=>setOpen(v=>!v)} style={{width:"42px",height:"24px",borderRadius:"12px",background:open?"#2E7D32":G[300],position:"relative",cursor:"pointer"}}>
              <div style={{width:"20px",height:"20px",borderRadius:"50%",background:"#fff",position:"absolute",top:"2px",left:open?"20px":"2px",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.25)"}}/>
            </div>
          </div>
        }
      />
      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{position:"relative"}}>
          <Img h="170px" label="가게 대표 이미지" style={{borderRadius:0,border:"none"}}/>
          <button style={{position:"absolute",bottom:"10px",right:"10px",padding:"6px 12px",borderRadius:"8px",background:"rgba(0,0,0,0.55)",color:"#fff",border:"none",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:"5px"}}>{Icon.edit("#fff")} 사진 변경</button>
        </div>
        <div style={{padding:"14px",display:"flex",flexDirection:"column",gap:"14px"}}>
          {[
            {title:"기본 정보",key:"basic",rows:[["가게명","맛있는 한식당"],["카테고리","한식"],["최소주문금액","12,000원"],["기본배달비","2,000원"]]},
            {title:"연락처",   key:"contact",rows:[["대표번호","02-1234-5678"],["이메일","store@example.com"]]},
          ].map(sec => (
            <div key={sec.key} style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"13px",padding:"14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
                <span style={{fontSize:"14px",fontWeight:800}}>{sec.title}</span>
                <button onClick={()=>setEditing(editing===sec.key?null:sec.key)} style={{padding:"4px 10px",borderRadius:"7px",border:`1.5px solid ${editing===sec.key?PRIMARY:G[300]}`,background:editing===sec.key?PRIMARY_LIGHT:"#fff",color:editing===sec.key?PRIMARY:G[600],fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{editing===sec.key?"완료":"수정"}</button>
              </div>
              {sec.rows.map(([k,v]) => (
                <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${G[100]}`}}>
                  <span style={{fontSize:"12px",color:G[500],fontWeight:600,minWidth:"80px"}}>{k}</span>
                  {editing===sec.key ? <div style={{padding:"6px 10px",border:`1.5px solid ${PRIMARY}`,borderRadius:"7px",background:PRIMARY_LIGHT,fontSize:"12px",color:G[800],minWidth:"120px"}}>{v}</div> : <span style={{fontSize:"13px",color:G[800]}}>{v}</span>}
                </div>
              ))}
            </div>
          ))}
          {/* 영업 시간 */}
          <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"13px",padding:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
              <span style={{fontSize:"14px",fontWeight:800}}>영업 시간</span>
              <button onClick={()=>setEditing(editing==="hours"?null:"hours")} style={{padding:"4px 10px",borderRadius:"7px",border:`1.5px solid ${editing==="hours"?PRIMARY:G[300]}`,background:editing==="hours"?PRIMARY_LIGHT:"#fff",color:editing==="hours"?PRIMARY:G[600],fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{editing==="hours"?"완료":"수정"}</button>
            </div>
            {days.map(d => (
              <div key={d} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                <span style={{fontSize:"12px",fontWeight:700,color:G[700],width:"20px",textAlign:"center"}}>{d}</span>
                {editing==="hours"
                  ? <div style={{flex:1,display:"flex",gap:"6px",alignItems:"center"}}><div style={{flex:1,padding:"6px 10px",border:`1.5px solid ${G[300]}`,borderRadius:"7px",background:"#fff",fontSize:"12px",color:hours[d]==="휴무"?G[400]:G[800]}}>{hours[d]}</div><div onClick={()=>setHours(h=>({...h,[d]:h[d]==="휴무"?"10:00~22:00":"휴무"}))} style={{padding:"5px 10px",borderRadius:"7px",border:`1px solid ${G[300]}`,background:hours[d]==="휴무"?G[100]:PRIMARY_LIGHT,color:hours[d]==="휴무"?G[500]:PRIMARY,fontSize:"10px",fontWeight:700,cursor:"pointer"}}>{hours[d]==="휴무"?"영업":"휴무"}</div></div>
                  : <div style={{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:"12px",color:hours[d]==="휴무"?G[400]:G[700]}}>{hours[d]}</span>{hours[d]==="휴무"&&<span style={{fontSize:"10px",fontWeight:700,color:G[500]}}>휴무</span>}</div>
                }
              </div>
            ))}
          </div>
          <Btn variant="primary" full size="lg">변경사항 저장</Btn>
        </div>
      </div>
    </Phone>
  );
}

