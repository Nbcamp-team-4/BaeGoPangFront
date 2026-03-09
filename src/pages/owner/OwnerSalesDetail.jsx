// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/owner/OwnerSalesDetail.jsx
//  (탭 서브 컴포넌트 포함)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Badge, StatCard } from "../../shared/components";
import { G, PRIMARY, PRIMARY_LIGHT, AI_COLOR, AI_LIGHT } from "../../shared/constants";

// ── 매출 데이터 ──────────────────────────
const SALES_DATA = {
  오늘:  { revenue:1449000, orders:128, cancelCount:6,  cancelRate:4.7, prev:{revenue:1401000,orders:121}, hourly:[{t:"10",orders:2,revenue:18000},{t:"11",orders:5,revenue:42000},{t:"12",orders:18,revenue:156000},{t:"13",orders:24,revenue:198000},{t:"14",orders:11,revenue:89000},{t:"15",orders:4,revenue:31000},{t:"16",orders:3,revenue:24000},{t:"17",orders:6,revenue:51000},{t:"18",orders:19,revenue:163000},{t:"19",orders:31,revenue:267000},{t:"20",orders:27,revenue:231000},{t:"21",orders:15,revenue:129000},{t:"22",orders:6,revenue:48000}], weekday:[{t:"월",orders:134,revenue:1142000},{t:"화",orders:148,revenue:1260000},{t:"수",orders:121,revenue:1028000},{t:"목",orders:156,revenue:1330000},{t:"금",orders:189,revenue:1612000},{t:"토",orders:231,revenue:1968000},{t:"일",orders:128,revenue:1449000}], payMethods:[{name:"카드",icon:"💳",revenue:821000,orders:72,cancel:3,success:69,color:"#1565C0"},{name:"카카오페이",icon:"💛",revenue:376000,orders:33,cancel:2,success:31,color:"#F9A825"},{name:"토스",icon:"🔵",revenue:193000,orders:17,cancel:1,success:16,color:"#0064FF"},{name:"무통장",icon:"🏦",revenue:59000,orders:6,cancel:0,success:6,color:"#455A64"}], cancelReasons:[{reason:"고객 변심",count:3,pct:50},{reason:"배달 지연",count:2,pct:33},{reason:"품절",count:1,pct:17}], regulars:{rate:38,avgInterval:6,newCustomers:34,returning:94}, prediction:{tomorrow:1520000,weekend:2310000,confidence:82} },
  어제:  { revenue:1401000, orders:121, cancelCount:4,  cancelRate:3.3, prev:{revenue:1285000,orders:112}, hourly:[{t:"10",orders:1,revenue:8000},{t:"11",orders:4,revenue:33000},{t:"12",orders:21,revenue:179000},{t:"13",orders:26,revenue:221000},{t:"14",orders:9,revenue:72000},{t:"15",orders:5,revenue:40000},{t:"16",orders:3,revenue:24000},{t:"17",orders:7,revenue:59000},{t:"18",orders:22,revenue:187000},{t:"19",orders:28,revenue:240000},{t:"20",orders:24,revenue:204000},{t:"21",orders:13,revenue:111000},{t:"22",orders:4,revenue:32000}], weekday:[{t:"월",orders:119,revenue:1013000},{t:"화",orders:135,revenue:1148000},{t:"수",orders:112,revenue:952000},{t:"목",orders:145,revenue:1234000},{t:"금",orders:178,revenue:1515000},{t:"토",orders:208,revenue:1770000},{t:"일",orders:121,revenue:1401000}], payMethods:[{name:"카드",icon:"💳",revenue:795000,orders:68,cancel:2,success:66,color:"#1565C0"},{name:"카카오페이",icon:"💛",revenue:361000,orders:31,cancel:1,success:30,color:"#F9A825"},{name:"토스",icon:"🔵",revenue:181000,orders:16,cancel:1,success:15,color:"#0064FF"},{name:"무통장",icon:"🏦",revenue:64000,orders:6,cancel:0,success:6,color:"#455A64"}], cancelReasons:[{reason:"고객 변심",count:2,pct:50},{reason:"배달 지연",count:1,pct:25},{reason:"품절",count:1,pct:25}], regulars:{rate:35,avgInterval:6,newCustomers:29,returning:92}, prediction:{tomorrow:1449000,weekend:2180000,confidence:79} },
  이번주:{ revenue:9831000, orders:1082, cancelCount:41, cancelRate:3.8, prev:{revenue:9120000,orders:998}, hourly:[{t:"10",orders:71,revenue:604000},{t:"11",orders:89,revenue:757000},{t:"12",orders:187,revenue:1592000},{t:"13",orders:201,revenue:1709000},{t:"14",orders:98,revenue:834000},{t:"15",orders:52,revenue:443000},{t:"16",orders:41,revenue:349000},{t:"17",orders:67,revenue:570000},{t:"18",orders:192,revenue:1634000},{t:"19",orders:228,revenue:1941000},{t:"20",orders:199,revenue:1694000},{t:"21",orders:134,revenue:1141000},{t:"22",orders:56,revenue:477000}], weekday:[{t:"월",orders:134,revenue:1142000},{t:"화",orders:148,revenue:1260000},{t:"수",orders:121,revenue:1028000},{t:"목",orders:156,revenue:1330000},{t:"금",orders:189,revenue:1612000},{t:"토",orders:231,revenue:1968000},{t:"일",orders:128,revenue:1449000}], payMethods:[{name:"카드",icon:"💳",revenue:5567000,orders:612,cancel:22,success:590,color:"#1565C0"},{name:"카카오페이",icon:"💛",revenue:2556000,orders:281,cancel:11,success:270,color:"#F9A825"},{name:"토스",icon:"🔵",revenue:1312000,orders:144,cancel:5,success:139,color:"#0064FF"},{name:"무통장",icon:"🏦",revenue:396000,orders:45,cancel:3,success:42,color:"#455A64"}], cancelReasons:[{reason:"고객 변심",count:19,pct:46},{reason:"배달 지연",count:13,pct:32},{reason:"품절",count:9,pct:22}], regulars:{rate:41,avgInterval:5,newCustomers:198,returning:884}, prediction:{tomorrow:1520000,weekend:4280000,confidence:85} },
};

function GrowthTag({ v }) {
  const pos = v >= 0;
  return <span style={{fontSize:"10px",fontWeight:700,color:pos?"#2E7D32":"#C62828",background:pos?"#E8F5E9":"#FFEBEE",padding:"2px 7px",borderRadius:"20px",flexShrink:0}}>{pos?"▲":"▼"}{Math.abs(v)}%</span>;
}
function MiniBar({ pct, color }) {
  return <div style={{flex:1,height:"6px",background:G[200],borderRadius:"3px",overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:"3px"}}/></div>;
}

function OverviewTab({ d, period }) {
  const avgOrder   = Math.round(d.revenue / d.orders);
  const revGrowth  = Math.round(((d.revenue - d.prev.revenue) / d.prev.revenue) * 100);
  const orderGrowth= Math.round(((d.orders  - d.prev.orders)  / d.prev.orders)  * 100);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{padding:"13px 14px",background:`linear-gradient(120deg,${PRIMARY},#FF8A65)`,borderRadius:"12px",color:"#fff"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><div style={{fontSize:"11px",opacity:0.85}}>{period==="오늘"?"🔴 실시간":period} 총 매출</div><div style={{fontSize:"26px",fontWeight:900,marginTop:"3px"}}>{(d.revenue/10000).toFixed(1)}만원</div></div>
          <GrowthTag v={revGrowth}/>
        </div>
        <div style={{display:"flex",gap:"16px",marginTop:"10px",fontSize:"11px",opacity:0.9}}><span>주문 {d.orders}건</span><span>객단가 {avgOrder.toLocaleString()}원</span><span>취소율 {d.cancelRate}%</span></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
        {[{l:"총 매출",v:`${(d.revenue/10000).toFixed(1)}만`,growth:revGrowth,icon:"💰"},{l:"결제 건수",v:`${d.orders}건`,growth:orderGrowth,icon:"📦"},{l:"평균 객단가",v:`${(avgOrder/1000).toFixed(1)}K`,growth:3,icon:"🧾"},{l:"취소율",v:`${d.cancelRate}%`,growth:null,warn:d.cancelRate>5,icon:"↩"}].map((k,i) => (
          <div key={i} style={{padding:"12px",background:"#fff",border:`1.5px solid ${k.warn?"#FFCDD2":G[200]}`,borderRadius:"11px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:"18px"}}>{k.icon}</span>{k.growth!=null&&<GrowthTag v={k.growth}/>}{k.warn&&<Badge bg="#FFEBEE" color="#C62828">주의</Badge>}</div>
            <div style={{fontSize:"18px",fontWeight:900,color:k.warn?"#C62828":G[900],marginTop:"5px"}}>{k.v}</div>
            <div style={{fontSize:"10px",color:G[500],marginTop:"2px"}}>{k.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimeTab({ d }) {
  const [chartView,  setChartView]  = useState("시간대별");
  const [selectedBar,setSelectedBar]= useState(null);
  const chartData = chartView==="시간대별" ? d.hourly : d.weekday;
  const suffix    = chartView==="시간대별" ? "시" : "";
  const maxVal    = Math.max(...chartData.map(x=>x.revenue));
  const avg       = Math.round(chartData.reduce((a,b)=>a+b.revenue,0)/chartData.length);
  const sel       = selectedBar != null ? chartData[selectedBar] : null;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{display:"flex",gap:"5px"}}>
        {["시간대별","요일별"].map(v => (
          <button key={v} onClick={()=>{setChartView(v);setSelectedBar(null);}} style={{padding:"5px 12px",borderRadius:"20px",border:`1.5px solid ${chartView===v?PRIMARY:G[300]}`,background:chartView===v?PRIMARY:"#fff",color:chartView===v?"#fff":G[600],fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{v}</button>
        ))}
      </div>
      <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"12px",padding:"13px"}}>
        <div style={{position:"relative",height:"110px",marginBottom:"4px"}}>
          <div style={{position:"absolute",left:0,right:0,top:`${(1-(avg/maxVal))*100}%`,borderTop:`1.5px dashed ${PRIMARY}66`,zIndex:1}}><span style={{position:"absolute",right:0,fontSize:"8px",color:PRIMARY,background:"#fff",paddingLeft:"2px",transform:"translateY(-100%)",fontWeight:700}}>평균</span></div>
          <div style={{display:"flex",alignItems:"flex-end",height:"100%",gap:"3px",position:"relative",zIndex:2}}>
            {chartData.map((cd,i) => {
              const pct   = (cd.revenue/maxVal)*100;
              const isSel = selectedBar===i;
              const isPeak= cd.revenue===Math.max(...chartData.map(x=>x.revenue));
              const isAvg = cd.revenue>=avg;
              return <div key={i} onClick={()=>setSelectedBar(isSel?null:i)} style={{flex:1,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",cursor:"pointer"}}>
                <div style={{width:"100%",height:`${pct}%`,borderRadius:"3px 3px 0 0",background:isSel?PRIMARY:isPeak?`${PRIMARY}EE`:isAvg?`${PRIMARY}99`:`${PRIMARY}44`,outline:isSel?`2px solid ${PRIMARY}`:"none",outlineOffset:"1px"}}/>
              </div>;
            })}
          </div>
        </div>
        <div style={{display:"flex",gap:"3px"}}>{chartData.map((cd,i) => <div key={i} style={{flex:1,textAlign:"center",fontSize:"8px",color:selectedBar===i?PRIMARY:G[400],fontWeight:selectedBar===i?800:400}}>{cd.t}{suffix}</div>)}</div>
      </div>
      {sel && (
        <div style={{padding:"11px 13px",background:PRIMARY_LIGHT,borderRadius:"10px",border:`1.5px solid ${PRIMARY}33`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{fontSize:"13px",fontWeight:800,color:PRIMARY}}>{sel.t}{suffix} 상세</div>
            <div style={{textAlign:"right"}}><div style={{fontSize:"15px",fontWeight:900,color:PRIMARY}}>{sel.revenue.toLocaleString()}원</div><div style={{fontSize:"10px",color:G[500]}}>주문 {sel.orders}건</div></div>
          </div>
        </div>
      )}
      <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px",display:"flex",flexDirection:"column",gap:"7px"}}>
        <div style={{fontSize:"12px",fontWeight:800,color:G[900]}}>피크 타임 TOP 3</div>
        {[...chartData].sort((a,b)=>b.revenue-a.revenue).slice(0,3).map((s,i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:"9px"}}>
            <span style={{fontSize:"13px",fontWeight:900,color:i===0?PRIMARY:i===1?G[600]:G[400],width:"16px"}}>{i+1}</span>
            <span style={{fontSize:"12px",fontWeight:700,color:G[800],width:"36px"}}>{s.t}{suffix}</span>
            <MiniBar pct={Math.round(s.revenue/chartData[0]?.revenue*100)||0} color={i===0?PRIMARY:`${PRIMARY}66`}/>
            <span style={{fontSize:"11px",fontWeight:700,color:i===0?PRIMARY:G[600],whiteSpace:"nowrap"}}>{(s.revenue/1000).toFixed(0)}K</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PayTab({ d }) {
  const total = d.payMethods.reduce((a,m)=>a+m.revenue,0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
        <div style={{fontSize:"12px",fontWeight:800,color:G[900],marginBottom:"10px"}}>수단별 매출 비율</div>
        <div style={{display:"flex",height:"22px",borderRadius:"8px",overflow:"hidden",gap:"2px",marginBottom:"9px"}}>
          {d.payMethods.map((m,i) => <div key={i} style={{flex:Math.round(m.revenue/total*100),background:m.color,minWidth:"4px"}}/>)}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
          {d.payMethods.map((m,i) => <div key={i} style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"10px",color:G[600]}}><div style={{width:"8px",height:"8px",borderRadius:"50%",background:m.color}}/>{m.name} {Math.round(m.revenue/total*100)}%</div>)}
        </div>
      </div>
      {d.payMethods.map((m,i) => {
        const sr = Math.round(m.success/m.orders*100);
        return (
          <div key={i} style={{border:`1.5px solid ${G[200]}`,borderLeft:`4px solid ${m.color}`,borderRadius:"11px",padding:"12px",background:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"9px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"7px"}}><span style={{fontSize:"20px"}}>{m.icon}</span><div><div style={{fontSize:"13px",fontWeight:800}}>{m.name}</div><div style={{fontSize:"10px",color:G[400]}}>{m.orders}건 · {(m.revenue/10000).toFixed(1)}만원</div></div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:"15px",fontWeight:900,color:m.color}}>{Math.round(m.revenue/total*100)}%</div><div style={{fontSize:"9px",color:G[400]}}>점유율</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"5px",marginBottom:"9px"}}>
              {[{label:"성공",v:m.success,c:"#2E7D32",bg:"#E8F5E9"},{label:"취소",v:m.cancel,c:"#C62828",bg:"#FFEBEE"},{label:"성공률",v:`${sr}%`,c:sr>=95?"#2E7D32":sr>=85?"#E65100":"#C62828",bg:sr>=95?"#E8F5E9":sr>=85?"#FFF3E0":"#FFEBEE"}].map((s,j) => (
                <div key={j} style={{padding:"7px",background:s.bg,borderRadius:"7px",textAlign:"center"}}><div style={{fontSize:"13px",fontWeight:900,color:s.c}}>{s.v}</div><div style={{fontSize:"9px",color:s.c,opacity:.75,marginTop:"1px"}}>{s.label}</div></div>
              ))}
            </div>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:G[400],marginBottom:"3px"}}><span style={{color:"#2E7D32"}}>성공 {sr}%</span><span style={{color:"#C62828"}}>취소 {100-sr}%</span></div>
              <div style={{display:"flex",height:"7px",borderRadius:"4px",overflow:"hidden"}}><div style={{width:`${sr}%`,background:"#2E7D32",borderRadius:"4px 0 0 4px"}}/><div style={{flex:1,background:"#FFCDD2",borderRadius:"0 4px 4px 0"}}/></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CancelTab({ d }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
        {[{l:"취소 건수",v:`${d.cancelCount}건`,c:"#C62828",bg:"#FFEBEE"},{l:"취소율",v:`${d.cancelRate}%`,c:d.cancelRate>5?"#C62828":"#E65100",bg:d.cancelRate>5?"#FFEBEE":"#FFF3E0"},{l:"승인후 취소",v:`${Math.round(d.cancelCount*0.3)}건`,c:"#7B1FA2",bg:"#F3E5F5"},{l:"환불 처리중",v:`${Math.round(d.cancelCount*0.2)}건`,c:G[600],bg:G[100]}].map((s,i)=><StatCard key={i} label={s.l} value={s.v} color={s.c} bg={s.bg}/>)}
      </div>
      <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
        <div style={{fontSize:"12px",fontWeight:800,color:G[900],marginBottom:"10px"}}>취소 사유 분석</div>
        {d.cancelReasons.map((r,i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"9px"}}>
            <div style={{width:"8px",height:"8px",borderRadius:"50%",background:i===0?"#C62828":i===1?"#E65100":"#FFC107",flexShrink:0}}/>
            <span style={{fontSize:"12px",color:G[700],flex:1}}>{r.reason}</span>
            <MiniBar pct={r.pct} color={i===0?"#C62828":i===1?"#E65100":"#FFC107"}/>
            <span style={{fontSize:"11px",fontWeight:700,color:G[700],width:"30px",textAlign:"right"}}>{r.pct}%</span>
            <span style={{fontSize:"10px",color:G[400],width:"22px",textAlign:"right"}}>{r.count}건</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegularTab({ d }) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReport,  setAiReport]  = useState(null);
  const handleAiReport = async () => {
    setAiLoading(true); setAiReport(null);
    try {
      const prompt = `배달 음식점 단골 데이터를 분석해 JSON으로만 응답하세요 (마크다운 없이):\n재방문율:${d.regulars.rate}%, 평균 재구매 간격:${d.regulars.avgInterval}일, 신규:${d.regulars.newCustomers}명, 재방문:${d.regulars.returning}명\n\n{"summary":"2~3문장 요약","insights":[{"icon":"이모지","title":"제목","desc":"내용"}],"actions":[{"icon":"이모지","action":"추천 액션"}]}`;
      const res  = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data = await res.json();
      const text = data.content.map(i=>i.text||"").join("");
      setAiReport(JSON.parse(text.replace(/```json|```/g,"").trim()));
    } catch(e) {
      setAiReport({summary:"분석 중 오류가 발생했습니다.",insights:[],actions:[]});
    }
    setAiLoading(false);
  };
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
        {[{l:"재방문율",v:`${d.regulars.rate}%`,icon:"🔄",c:"#2E7D32",bg:"#E8F5E9"},{l:"재구매 간격",v:`${d.regulars.avgInterval}일`,icon:"📅",c:"#1565C0",bg:"#E3F2FD"},{l:"신규 고객",v:`${d.regulars.newCustomers}명`,icon:"👤",c:G[700],bg:G[100]},{l:"재방문 고객",v:`${d.regulars.returning}명`,icon:"💎",c:"#7B1FA2",bg:"#F3E5F5"}].map((s,i) => (
          <div key={i} style={{padding:"10px",background:s.bg,borderRadius:"9px",display:"flex",alignItems:"center",gap:"8px"}}><span style={{fontSize:"20px"}}>{s.icon}</span><div><div style={{fontSize:"15px",fontWeight:900,color:s.c}}>{s.v}</div><div style={{fontSize:"9px",color:s.c,opacity:0.75,marginTop:"1px"}}>{s.l}</div></div></div>
        ))}
      </div>
      {/* AI 리포트 */}
      <div style={{border:`1.5px solid ${AI_COLOR}44`,borderRadius:"12px",overflow:"hidden"}}>
        <div style={{padding:"12px 13px",background:`linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><div style={{fontSize:"12px",fontWeight:800,color:"#fff"}}>✨ AI 단골 분석 리포트</div><div style={{fontSize:"10px",color:"rgba(255,255,255,0.75)",marginTop:"2px"}}>데이터 기반 맞춤 인사이트</div></div>
          {!aiReport && <button onClick={handleAiReport} disabled={aiLoading} style={{padding:"7px 13px",borderRadius:"8px",border:"none",background:"rgba(255,255,255,0.22)",color:"#fff",fontSize:"11px",fontWeight:800,cursor:aiLoading?"not-allowed":"pointer",fontFamily:"inherit",opacity:aiLoading?0.7:1}}>{aiLoading?"생성 중...":"리포트 생성"}</button>}
          {aiReport  && <button onClick={()=>setAiReport(null)} style={{padding:"5px 10px",borderRadius:"7px",border:"none",background:"rgba(255,255,255,0.18)",color:"#fff",fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>초기화</button>}
        </div>
        {aiLoading && <div style={{padding:"24px",textAlign:"center",background:AI_LIGHT}}><div style={{fontSize:"24px",marginBottom:"8px"}}>🤖</div><div style={{fontSize:"12px",color:AI_COLOR,fontWeight:700}}>분석 중...</div></div>}
        {!aiLoading && !aiReport && <div style={{padding:"16px 14px",background:AI_LIGHT,textAlign:"center"}}><div style={{fontSize:"11px",color:AI_COLOR,lineHeight:"1.7"}}>버튼을 누르면 AI가 단골 고객 데이터를<br/>분석해 맞춤 인사이트를 제공합니다.</div></div>}
        {!aiLoading && aiReport && (
          <div style={{padding:"12px 13px",background:AI_LIGHT,display:"flex",flexDirection:"column",gap:"10px"}}>
            <div style={{padding:"10px 12px",background:"#fff",borderRadius:"9px",border:`1px solid ${AI_COLOR}33`,fontSize:"12px",color:G[800],lineHeight:"1.75"}}>{aiReport.summary}</div>
            {aiReport.insights?.length>0 && (
              <div>
                <div style={{fontSize:"11px",fontWeight:800,color:AI_COLOR,marginBottom:"7px"}}>📊 주요 인사이트</div>
                {aiReport.insights.map((ins,i) => (
                  <div key={i} style={{padding:"10px 11px",background:"#fff",borderRadius:"9px",border:`1px solid ${AI_COLOR}22`,display:"flex",gap:"8px",alignItems:"flex-start",marginBottom:"6px"}}>
                    <span style={{fontSize:"18px",flexShrink:0}}>{ins.icon}</span>
                    <div><div style={{fontSize:"12px",fontWeight:800,color:G[900]}}>{ins.title}</div><div style={{fontSize:"11px",color:G[600],marginTop:"3px",lineHeight:"1.6"}}>{ins.desc}</div></div>
                  </div>
                ))}
              </div>
            )}
            {aiReport.actions?.length>0 && (
              <div>
                <div style={{fontSize:"11px",fontWeight:800,color:AI_COLOR,marginBottom:"7px"}}>🎯 추천 액션</div>
                {aiReport.actions.map((a,i) => (
                  <div key={i} style={{padding:"9px 11px",background:`${AI_COLOR}15`,borderRadius:"8px",display:"flex",gap:"8px",alignItems:"center",marginBottom:"5px"}}>
                    <span style={{fontSize:"16px",flexShrink:0}}>{a.icon}</span>
                    <span style={{fontSize:"11px",color:AI_COLOR,fontWeight:600,lineHeight:"1.5"}}>{a.action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OwnerSalesDetail({ go }) {
  const [tab,    setTab]    = useState("개요");
  const [period, setPeriod] = useState("오늘");
  const tabs    = ["개요","시간대","결제수단","취소분석","단골"];
  const periods = ["오늘","어제","이번주"];
  const d = SALES_DATA[period] || SALES_DATA["오늘"];
  return (
    <Phone noNav>
      <TopBar title="매출 분석" go={go} backTo="owner-dash"/>
      <div style={{background:"#fff",borderBottom:`1px solid ${G[100]}`,padding:"10px 12px",display:"flex",gap:"5px",flexShrink:0,overflowX:"auto"}}>
        {periods.map(p => <button key={p} onClick={()=>setPeriod(p)} style={{padding:"6px 13px",borderRadius:"20px",border:`1.5px solid ${period===p?PRIMARY:G[300]}`,background:period===p?PRIMARY:"#fff",color:period===p?"#fff":G[600],fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>{p}</button>)}
      </div>
      <div style={{display:"flex",borderBottom:`1px solid ${G[200]}`,background:"#fff",flexShrink:0,overflowX:"auto"}}>
        {tabs.map(t => <div key={t} onClick={()=>setTab(t)} style={{padding:"10px 12px",textAlign:"center",fontSize:"11px",fontWeight:700,cursor:"pointer",color:tab===t?PRIMARY:G[500],borderBottom:`2px solid ${tab===t?PRIMARY:"transparent"}`,whiteSpace:"nowrap",flexShrink:0}}>{t}</div>)}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        {tab==="개요"    && <OverviewTab d={d} period={period}/>}
        {tab==="시간대"  && <TimeTab d={d}/>}
        {tab==="결제수단"&& <PayTab d={d}/>}
        {tab==="취소분석"&& <CancelTab d={d}/>}
        {tab==="단골"    && <RegularTab d={d}/>}
        <div style={{paddingBottom:"6px"}}/>
      </div>
    </Phone>
  );
}