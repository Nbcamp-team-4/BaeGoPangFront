// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/owner/OwnerOrders.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Badge } from "../../shared/components";
import { FlatIcons } from "../../shared/icons";
import { G, PRIMARY } from "../../shared/constants";

export default function OwnerOrders({ go }) {
  const [tab, setTab] = useState("전체");
  const [refundStates, setRefundStates] = useState({});

  const orders = [
    { id:"ORD-015", user:"user456", items:"김치찌개 × 2",   amount:"24,000원", label:"신규주문", color:"#E65100", bg:"#FFF3E0", type:"order", addr:"서울 종로구 세종대로 172, 101호" },
    { id:"ORD-014", user:"user789", items:"불고기 정식 × 1", amount:"12,000원", label:"조리중",   color:"#1565C0", bg:"#E3F2FD", type:"order", addr:"서울 종로구 청진동 33, 5층" },
    { id:"ORD-013", user:"user123", items:"된장찌개 × 2",   amount:"15,000원", label:"배달중",   color:"#2E7D32", bg:"#E8F5E9", type:"order", addr:"서울 종로구 율곡로 10, B동 302호" },
    { id:"ORD-005", user:"user111", items:"불고기 정식 × 1", amount:"12,000원", label:"환불요청", color:"#7B1FA2", bg:"#F3E5F5", type:"refund", addr:"서울 종로구 새문안로 5, 303호", refundReason:"음식 품질 불량", refundTime:"14:22" },
    { id:"ORD-003", user:"user222", items:"김치찌개 × 1",   amount:"8,000원",  label:"환불요청", color:"#7B1FA2", bg:"#F3E5F5", type:"refund", addr:"서울 종로구 율곡로 55, 101호", refundReason:"배달 지연",    refundTime:"13:47" },
  ];
  const pendingRefunds = orders.filter(o=>o.type==="refund"&&!refundStates[o.id]);
  const tabs = ["전체","신규주문","진행중",`환불요청${pendingRefunds.length>0?`(${pendingRefunds.length})`:""}` ,"완료"];
  const filtered = tab.startsWith("환불요청") ? orders.filter(o=>o.type==="refund")
    : tab==="신규주문" ? orders.filter(o=>o.label==="신규주문")
    : tab==="진행중"   ? orders.filter(o=>["조리중","배달중"].includes(o.label))
    : tab==="완료"     ? orders.filter(o=>["배달완료","주문취소"].includes(o.label))
    : orders;
  const handleRefund = (id,action) => setRefundStates(s=>({...s,[id]:action}));

  return (
    <Phone noNav>
      <TopBar title="주문 관리" go={go} backTo="owner-dash"/>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
        {pendingRefunds.length>0 && (
          <div style={{margin:"12px 14px 0",padding:"10px 13px",background:"#F3E5F5",border:"1.5px solid #CE93D8",borderRadius:"11px",display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} onClick={()=>setTab(`환불요청(${pendingRefunds.length})`)}>
            <div style={{width:"34px",height:"34px",borderRadius:"50%",background:"#7B1FA2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:"16px"}}>↩</span></div>
            <div style={{flex:1}}><div style={{fontSize:"13px",fontWeight:800,color:"#7B1FA2"}}>환불 요청 {pendingRefunds.length}건 대기 중</div><div style={{fontSize:"11px",color:"#9C27B0",marginTop:"1px"}}>처리가 필요합니다</div></div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B1FA2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        )}
        <div style={{display:"flex",gap:"5px",overflowX:"auto",padding:"10px 14px 0",flexShrink:0}}>
          {tabs.map(t => {
            const isR = t.startsWith("환불요청");
            const isA = tab===t||(isR&&tab.startsWith("환불요청"));
            return <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 13px",borderRadius:"20px",fontSize:"11px",fontWeight:700,border:`1.5px solid ${isA?(isR?"#7B1FA2":PRIMARY):G[300]}`,background:isA?(isR?"#7B1FA2":PRIMARY):"#fff",color:isA?"#fff":G[600],cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:"inherit"}}>{t}</button>;
          })}
        </div>
        <div style={{padding:"10px 14px 14px",display:"flex",flexDirection:"column",gap:"9px"}}>
          {filtered.length===0 && <div style={{padding:"32px",textAlign:"center",color:G[400],fontSize:"13px"}}>해당 주문이 없습니다</div>}
          {filtered.map((o,i) => {
            const rs = refundStates[o.id];
            if (o.type==="refund") return (
              <div key={i} style={{border:`1.5px solid ${rs?"#E0E0E0":"#CE93D8"}`,borderLeft:`4px solid ${rs==="수락"?"#2E7D32":rs==="거절"?"#C62828":"#7B1FA2"}`,borderRadius:"11px",padding:"13px",background:rs?"#FAFAFA":"#FDF6FF"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{display:"flex",gap:"7px",alignItems:"center",flexWrap:"wrap"}}><span style={{fontSize:"13px",fontWeight:800}}>{o.id}</span>{!rs&&<Badge bg="#F3E5F5" color="#7B1FA2">환불요청</Badge>}{rs==="수락"&&<Badge bg="#E8F5E9" color="#2E7D32">환불수락</Badge>}{rs==="거절"&&<Badge bg="#FFEBEE" color="#C62828">환불거절</Badge>}</div><span style={{fontSize:"13px",fontWeight:800}}>{o.amount}</span></div>
                <div style={{fontSize:"11px",color:G[600],marginTop:"5px"}}>{o.user} · {o.items}</div>
                <div style={{display:"flex",alignItems:"center",gap:"4px",marginTop:"5px",padding:"5px 8px",background:G[50],borderRadius:"6px",border:`1px solid ${G[200]}`}}>{FlatIcons.location()}<span style={{fontSize:"11px",color:G[600]}}>{o.addr}</span></div>
                <div style={{marginTop:"8px",padding:"8px 10px",background:"#F3E5F5",borderRadius:"8px",border:"1px solid #CE93D8",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{fontSize:"10px",fontWeight:700,color:"#7B1FA2",marginBottom:"2px"}}>환불 사유</div><div style={{fontSize:"12px",color:"#6A1B9A",fontWeight:600}}>{o.refundReason}</div></div>
                  <div style={{fontSize:"10px",color:"#9C27B0"}}>{o.refundTime}</div>
                </div>
                {!rs && <div style={{display:"flex",gap:"7px",marginTop:"10px"}}>
                  <button onClick={()=>handleRefund(o.id,"수락")} style={{flex:1,padding:"9px 0",borderRadius:"9px",border:"none",background:"#2E7D32",color:"#fff",fontSize:"12px",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>✓ 환불 수락</button>
                  <button onClick={()=>handleRefund(o.id,"거절")} style={{flex:1,padding:"9px 0",borderRadius:"9px",border:"1.5px solid #FFCDD2",background:"#fff",color:"#C62828",fontSize:"12px",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>✗ 환불 거절</button>
                </div>}
                {rs && <div style={{marginTop:"9px",padding:"8px 11px",background:rs==="수락"?"#E8F5E9":"#FFEBEE",borderRadius:"8px",fontSize:"11px",fontWeight:700,color:rs==="수락"?"#2E7D32":"#C62828",textAlign:"center"}}>{rs==="수락"?"✓ 환불 수락 완료":"✗ 환불 거절 완료"} — 고객에게 알림이 발송됩니다</div>}
              </div>
            );
            const actionMap = {"신규주문":["수락","거절"],"조리중":["조리완료"],"배달중":["배달완료"]};
            const actions   = actionMap[o.label]||[];
            return (
              <div key={i} style={{border:`1.5px solid ${G[200]}`,borderLeft:`4px solid ${o.color}`,borderRadius:"11px",padding:"13px",background:"#fff"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",gap:"7px",alignItems:"center"}}><span style={{fontSize:"13px",fontWeight:800}}>{o.id}</span><span style={{fontSize:"10px",fontWeight:700,color:o.color,padding:"2px 7px",borderRadius:"4px",background:o.bg}}>{o.label}</span></div><span style={{fontSize:"13px",fontWeight:800}}>{o.amount}</span></div>
                <div style={{fontSize:"11px",color:G[600],marginTop:"5px"}}>{o.user} · {o.items}</div>
                <div style={{display:"flex",alignItems:"center",gap:"4px",marginTop:"5px",padding:"5px 8px",background:G[50],borderRadius:"6px",border:`1px solid ${G[200]}`}}>{FlatIcons.location()}<span style={{fontSize:"11px",color:G[600]}}>{o.addr}</span></div>
                {actions.length>0 && <div style={{display:"flex",gap:"5px",marginTop:"9px"}}>{actions.map((a,j)=><Btn key={j} size="sm" variant={j===0?"primary":"outline"}>{a}</Btn>)}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </Phone>
  );
}
