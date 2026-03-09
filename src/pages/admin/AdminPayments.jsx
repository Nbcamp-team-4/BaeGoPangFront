// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/admin/AdminPayments.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { AdminShell, StatCard, Chip, Badge } from "../../shared/components";
import { G } from "../../shared/constants";

const METHOD_STATS = [
  { method:"신용/체크카드", icon:"💳", total:1842, success:1798, fail:44,  refund:12, revenue:"52.1M", successRate:97.6, failRate:2.4,  color:"#1565C0", bg:"#E3F2FD" },
  { method:"카카오페이",    icon:"💛", total:634,  success:621,  fail:13,  refund:5,  revenue:"18.3M", successRate:98.0, failRate:2.0,  color:"#F9A825", bg:"#FFF8E1" },
  { method:"토스",          icon:"🔵", total:412,  success:408,  fail:4,   refund:2,  revenue:"12.7M", successRate:99.0, failRate:1.0,  color:"#0064FF", bg:"#E8EAF6" },
  { method:"무통장입금",    icon:"🏦", total:89,   success:71,   fail:18,  refund:0,  revenue:"2.1M",  successRate:79.8, failRate:20.2, color:"#455A64", bg:"#ECEFF1" },
];
const LOGS = [
  { id:"PAY-8825", user:"user123", store:"맛있는 한식당", amount:"32,000", method:"카드",   status:"성공", time:"14:32:11", failReason:null },
  { id:"PAY-8824", user:"user789", store:"황금 중식당",   amount:"22,000", method:"카카오", status:"실패", time:"14:28:44", failReason:"잔액 부족" },
  { id:"PAY-8823", user:"user456", store:"엄마손 분식",   amount:"15,000", method:"토스",   status:"성공", time:"14:21:05", failReason:null },
  { id:"PAY-8822", user:"user111", store:"맛있는 한식당", amount:"41,000", method:"무통장", status:"실패", time:"14:15:33", failReason:"입금 미확인" },
  { id:"PAY-8821", user:"user222", store:"두부마을",       amount:"9,000",  method:"카드",   status:"환불", time:"13:58:22", failReason:"고객 요청" },
];
const FAIL_REASONS = [
  {reason:"잔액 부족",    count:31, pct:39, color:"#E53935"},
  {reason:"네트워크 오류",count:22, pct:28, color:"#E65100"},
  {reason:"입금 미확인",  count:18, pct:23, color:"#F9A825"},
  {reason:"카드 한도 초과",count:7, pct:9,  color:"#9C27B0"},
  {reason:"기타",          count:1, pct:1,  color:G[400]},
];
const STATUS_COLOR = {성공:"#2E7D32", 실패:"#C62828", 환불:"#E65100"};
const STATUS_BG    = {성공:"#E8F5E9", 실패:"#FFEBEE", 환불:"#FFF3E0"};

function MiniBar({ pct, color }) {
  return (
    <div style={{flex:1,height:"6px",background:G[200],borderRadius:"3px",overflow:"hidden"}}>
      <div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:"3px"}}/>
    </div>
  );
}

export default function AdminPayments({ go }) {
  const [tab,       setTab]       = useState("개요");
  const [logFilter, setLogFilter] = useState("전체");
  const tabs         = ["개요","결제 로그","수단별 분석"];
  const filteredLogs = logFilter==="전체" ? LOGS : LOGS.filter(l=>l.status===logFilter);

  return (
    <AdminShell title="결제 관리" go={go}>
      <div style={{display:"flex",borderBottom:`1px solid ${G[200]}`,background:"#fff",flexShrink:0}}>
        {tabs.map(t => (
          <div key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"11px 0",textAlign:"center",fontSize:"11px",fontWeight:700,cursor:"pointer",color:tab===t?"#1A237E":G[500],borderBottom:`2px solid ${tab===t?"#1A237E":"transparent"}`}}>{t}</div>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>

        {/* ── 개요 탭 ── */}
        {tab==="개요" && <>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
            {[
              {l:"오늘 결제액",v:"58.2M"},
              {l:"환불 요청",  v:"2건",  alert:true},
              {l:"전체 성공률",v:"96.8%",good:true},
              {l:"평균 실패율",v:"3.2%", warn:true},
            ].map((s,i) => <StatCard key={i} label={s.l} value={s.v} color={s.alert?"#C62828":s.warn?"#E65100":s.good?"#2E7D32":undefined} bg={s.alert?"#FFEBEE":s.warn?"#FFF3E0":s.good?"#E8F5E9":undefined}/>)}
          </div>
          <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"13px"}}>
            <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"11px"}}>결제 수단별 성공률</div>
            {METHOD_STATS.map((m,i) => (
              <div key={i} style={{marginBottom:"10px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
                  <span style={{fontSize:"12px",fontWeight:700,color:G[800]}}>{m.method}</span>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <span style={{fontSize:"11px",fontWeight:700,color:m.successRate>=95?"#2E7D32":m.successRate>=85?"#E65100":"#C62828"}}>{m.successRate}%</span>
                    <span style={{fontSize:"10px",color:G[400]}}>{m.total.toLocaleString()}건</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:"3px",height:"8px"}}>
                  <div style={{width:`${m.successRate}%`,height:"100%",background:m.successRate>=95?"#2E7D32":m.successRate>=85?"#FFC107":"#E53935",borderRadius:"4px 0 0 4px"}}/>
                  <div style={{flex:1,height:"100%",background:"#FFCDD2",borderRadius:"0 4px 4px 0"}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"13px"}}>
            <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"11px"}}>결제 실패 원인 분포</div>
            {FAIL_REASONS.map((f,i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"8px"}}>
                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:f.color,flexShrink:0}}/>
                <span style={{fontSize:"12px",color:G[700],flex:1}}>{f.reason}</span>
                <MiniBar pct={f.pct} color={f.color}/>
                <span style={{fontSize:"11px",fontWeight:700,color:f.color,width:"30px",textAlign:"right"}}>{f.pct}%</span>
                <span style={{fontSize:"10px",color:G[400],width:"26px",textAlign:"right"}}>{f.count}건</span>
              </div>
            ))}
          </div>
        </>}

        {/* ── 결제 로그 탭 ── */}
        {tab==="결제 로그" && <>
          <div style={{display:"flex",gap:"5px",overflowX:"auto"}}>
            {["전체","성공","실패","환불"].map(f => (
              <Chip key={f} label={f} active={logFilter===f} onClick={()=>setLogFilter(f)} color={f==="성공"?"#2E7D32":f==="실패"?"#C62828":f==="환불"?"#E65100":"#1A237E"}/>
            ))}
          </div>
          {filteredLogs.map((p,i) => (
            <div key={i} style={{border:`1.5px solid ${G[200]}`,borderLeft:`4px solid ${STATUS_COLOR[p.status]||G[400]}`,borderRadius:"10px",padding:"11px 12px",background:"#fff"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <span style={{fontSize:"12px",fontWeight:800,color:G[900]}}>{p.id}</span>
                    <Badge bg={STATUS_BG[p.status]||G[100]} color={STATUS_COLOR[p.status]||G[600]}>{p.status}</Badge>
                  </div>
                  <div style={{fontSize:"10px",color:G[400],marginTop:"2px"}}>{p.user} · {p.store}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{parseInt(p.amount.replace(",","")).toLocaleString()}원</div>
                  <div style={{fontSize:"10px",color:G[400],marginTop:"2px"}}>{p.time}</div>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"7px"}}>
                <span style={{fontSize:"10px",color:G[500],padding:"2px 7px",background:G[100],borderRadius:"4px",fontWeight:600}}>{p.method}</span>
                {p.failReason && <span style={{fontSize:"10px",color:"#C62828",fontWeight:600}}>⚠ {p.failReason}</span>}
              </div>
            </div>
          ))}
        </>}

        {/* ── 수단별 분석 탭 ── */}
        {tab==="수단별 분석" && METHOD_STATS.map((m,i) => (
          <div key={i} style={{border:`1.5px solid ${G[200]}`,borderLeft:`4px solid ${m.color}`,borderRadius:"11px",padding:"13px",background:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
                <span style={{fontSize:"20px"}}>{m.icon}</span>
                <div>
                  <div style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{m.method}</div>
                  <div style={{fontSize:"10px",color:G[400]}}>총 {m.total.toLocaleString()}건 · {m.revenue}원</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:"16px",fontWeight:900,color:m.successRate>=95?"#2E7D32":m.successRate>=85?"#E65100":"#C62828"}}>{m.successRate}%</div>
                <div style={{fontSize:"9px",color:G[400]}}>성공률</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginBottom:"10px"}}>
              {[{l:"성공",v:m.success,c:"#2E7D32",bg:"#E8F5E9"},{l:"실패",v:m.fail,c:"#C62828",bg:"#FFEBEE"},{l:"환불",v:m.refund,c:"#E65100",bg:"#FFF3E0"}].map((s,j) => (
                <div key={j} style={{padding:"7px",background:s.bg,borderRadius:"7px",textAlign:"center"}}>
                  <div style={{fontSize:"14px",fontWeight:900,color:s.c}}>{s.v}</div>
                  <div style={{fontSize:"9px",color:s.c,opacity:0.75,marginTop:"1px"}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:G[400],marginBottom:"3px"}}>
                <span style={{color:"#2E7D32"}}>성공 {m.successRate}%</span>
                <span style={{color:"#C62828"}}>실패 {m.failRate}%</span>
              </div>
              <div style={{display:"flex",height:"8px",borderRadius:"4px",overflow:"hidden"}}>
                <div style={{width:`${m.successRate}%`,background:"#2E7D32",borderRadius:"4px 0 0 4px"}}/>
                <div style={{flex:1,background:"#FFCDD2",borderRadius:"0 4px 4px 0"}}/>
              </div>
            </div>
            {m.successRate < 85 && (
              <div style={{marginTop:"8px",padding:"7px 9px",background:"#FFEBEE",borderRadius:"7px",fontSize:"10px",color:"#C62828",fontWeight:600}}>
                ⚠️ 실패율이 높습니다. 프로세스 점검 권고
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
