import { useState } from "react";
import { G, PRIMARY, AI_COLOR, AI_LIGHT, Icon, Badge, StatCard, TopBar, Phone } from "../components/UI";

const SALES_DATA = {
  "오늘": {
    revenue: 142000,
    orders: 98,
    cancelRate: 4.2,
    prev: { revenue: 138000, orders: 95 },
    hourly: [
      { t: "11", revenue: 8500, orders: 6 },
      { t: "12", revenue: 18500, orders: 13 },
      { t: "13", revenue: 22000, orders: 15 },
      { t: "14", revenue: 19500, orders: 14 },
      { t: "15", revenue: 16800, orders: 12 },
      { t: "16", revenue: 15200, orders: 11 },
      { t: "17", revenue: 25800, orders: 18 },
      { t: "18", revenue: 31200, orders: 22 },
      { t: "19", revenue: 28900, orders: 20 },
      { t: "20", revenue: 23400, orders: 16 },
      { t: "21", revenue: 18200, orders: 13 },
      { t: "22", revenue: 12000, orders: 8 }
    ],
    weekday: [
      { t: "월", revenue: 142000, orders: 98 },
      { t: "화", revenue: 135000, orders: 92 },
      { t: "수", revenue: 148000, orders: 101 },
      { t: "목", revenue: 152000, orders: 104 },
      { t: "금", revenue: 168000, orders: 115 },
      { t: "토", revenue: 189000, orders: 129 },
      { t: "일", revenue: 175000, orders: 120 }
    ],
    payMethods: [
      { name: "카드", revenue: 85000, orders: 60, success: 59, cancel: 1, color: "#2196F3", icon: "💳" },
      { name: "현금", revenue: 28000, orders: 20, success: 19, cancel: 1, color: "#4CAF50", icon: "💵" },
      { name: "카카오페이", revenue: 21000, orders: 15, success: 15, cancel: 0, color: "#FFEB3B", icon: "💛" },
      { name: "네이버페이", revenue: 8000, orders: 6, success: 6, cancel: 0, color: "#00C73C", icon: "🟢" }
    ],
    cancelCount: 4,
    cancelReasons: [
      { reason: "주문 실수", pct: 45, count: 2 },
      { reason: "배달 지연", pct: 30, count: 1 },
      { reason: "메뉴 품절", pct: 15, count: 1 },
      { reason: "기타", pct: 10, count: 0 }
    ],
    regulars: {
      rate: 68,
      avgInterval: 3.2,
      newCustomers: 12,
      returning: 56
    }
  },
  "어제": {
    revenue: 138000,
    orders: 95,
    cancelRate: 3.8,
    prev: { revenue: 132000, orders: 91 },
    hourly: [
      { t: "11", revenue: 7800, orders: 5 },
      { t: "12", revenue: 17200, orders: 12 },
      { t: "13", revenue: 21000, orders: 14 },
      { t: "14", revenue: 18800, orders: 13 },
      { t: "15", revenue: 16200, orders: 11 },
      { t: "16", revenue: 14800, orders: 10 },
      { t: "17", revenue: 24500, orders: 17 },
      { t: "18", revenue: 29800, orders: 21 },
      { t: "19", revenue: 27500, orders: 19 },
      { t: "20", revenue: 22800, orders: 15 },
      { t: "21", revenue: 17800, orders: 12 },
      { t: "22", revenue: 11500, orders: 7 }
    ],
    weekday: [
      { t: "월", revenue: 138000, orders: 95 },
      { t: "화", revenue: 131000, orders: 89 },
      { t: "수", revenue: 144000, orders: 98 },
      { t: "목", revenue: 148000, orders: 101 },
      { t: "금", revenue: 164000, orders: 112 },
      { t: "토", revenue: 185000, orders: 126 },
      { t: "일", revenue: 172000, orders: 118 }
    ],
    payMethods: [
      { name: "카드", revenue: 82000, orders: 58, success: 57, cancel: 1, color: "#2196F3", icon: "💳" },
      { name: "현금", revenue: 27000, orders: 19, success: 18, cancel: 1, color: "#4CAF50", icon: "💵" },
      { name: "카카오페이", revenue: 20000, orders: 14, success: 14, cancel: 0, color: "#FFEB3B", icon: "💛" },
      { name: "네이버페이", revenue: 9000, orders: 7, success: 7, cancel: 0, color: "#00C73C", icon: "🟢" }
    ],
    cancelCount: 4,
    cancelReasons: [
      { reason: "주문 실수", pct: 40, count: 2 },
      { reason: "배달 지연", pct: 35, count: 1 },
      { reason: "메뉴 품절", pct: 20, count: 1 },
      { reason: "기타", pct: 5, count: 0 }
    ],
    regulars: {
      rate: 65,
      avgInterval: 3.5,
      newCustomers: 10,
      returning: 52
    }
  },
  "이번주": {
    revenue: 980000,
    orders: 672,
    cancelRate: 4.1,
    prev: { revenue: 945000, orders: 648 },
    hourly: [
      { t: "11", revenue: 58000, orders: 40 },
      { t: "12", revenue: 125000, orders: 86 },
      { t: "13", revenue: 150000, orders: 103 },
      { t: "14", revenue: 135000, orders: 93 },
      { t: "15", revenue: 116000, orders: 80 },
      { t: "16", revenue: 105000, orders: 72 },
      { t: "17", revenue: 178000, orders: 122 },
      { t: "18", revenue: 216000, orders: 148 },
      { t: "19", revenue: 200000, orders: 137 },
      { t: "20", revenue: 162000, orders: 111 },
      { t: "21", revenue: 126000, orders: 87 },
      { t: "22", revenue: 84000, orders: 58 }
    ],
    weekday: [
      { t: "월", revenue: 138000, orders: 95 },
      { t: "화", revenue: 131000, orders: 89 },
      { t: "수", revenue: 144000, orders: 98 },
      { t: "목", revenue: 148000, orders: 101 },
      { t: "금", revenue: 164000, orders: 112 },
      { t: "토", revenue: 185000, orders: 126 },
      { t: "일", revenue: 172000, orders: 118 }
    ],
    payMethods: [
      { name: "카드", revenue: 580000, orders: 403, success: 395, cancel: 8, color: "#2196F3", icon: "💳" },
      { name: "현금", revenue: 196000, orders: 136, success: 132, cancel: 4, color: "#4CAF50", icon: "💵" },
      { name: "카카오페이", revenue: 147000, orders: 102, success: 102, cancel: 0, color: "#FFEB3B", icon: "💛" },
      { name: "네이버페이", revenue: 57000, orders: 40, success: 40, cancel: 0, color: "#00C73C", icon: "🟢" }
    ],
    cancelCount: 28,
    cancelReasons: [
      { reason: "주문 실수", pct: 42, count: 12 },
      { reason: "배달 지연", pct: 32, count: 9 },
      { reason: "메뉴 품절", pct: 18, count: 5 },
      { reason: "기타", pct: 8, count: 2 }
    ],
    regulars: {
      rate: 66,
      avgInterval: 3.3,
      newCustomers: 84,
      returning: 372
    }
  }
};

// ── 매출 상세 서브 컴포넌트들 ─────────────────────────────

function MiniBarChart({data,valueKey="revenue",labelKey="t",suffix="",selectedIdx,onSelect,avgLine=true,compareData=null}){
  const vals=data.map(d=>d[valueKey]);
  const maxVal=Math.max(...vals,...(compareData?compareData.map(d=>d[valueKey]):[0]));
  const avg=Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
  return <div>
    <div style={{position:"relative",height:"110px",marginBottom:"4px"}}>
      {avgLine&&<div style={{position:"absolute",left:0,right:0,top:`${(1-(avg/maxVal))*100}%`,borderTop:`1.5px dashed ${PRIMARY}66`,zIndex:1,pointerEvents:"none"}}><span style={{position:"absolute",right:0,fontSize:"8px",color:PRIMARY,background:"#fff",paddingLeft:"2px",transform:"translateY(-100%)",fontWeight:700}}>평균</span></div>}
      <div style={{display:"flex",alignItems:"flex-end",height:"100%",gap:"3px",position:"relative",zIndex:2}}>
        {data.map((d,i)=>{
          const pct=(d[valueKey]/maxVal)*100;
          const cmpPct=compareData?(compareData[i]?.[valueKey]||0)/maxVal*100:null;
          const isSel=selectedIdx===i;
          const isPeak=d[valueKey]===Math.max(...vals);
          const isAboveAvg=d[valueKey]>=avg;
          return <div key={i} onClick={()=>onSelect&&onSelect(isSel?null:i)} style={{flex:1,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:"1px",cursor:onSelect?"pointer":"default",position:"relative"}}>
            {cmpPct!==null&&<div style={{width:"100%",height:`${cmpPct}%`,background:`${G[400]}55`,borderRadius:"2px 2px 0 0",position:"absolute",bottom:0,left:0}}/>}
            <div style={{width:"100%",height:`${pct}%`,borderRadius:"3px 3px 0 0",transition:"all .15s",background:isSel?PRIMARY:isPeak?`${PRIMARY}EE`:isAboveAvg?`${PRIMARY}99`:`${PRIMARY}44`,outline:isSel?`2px solid ${PRIMARY}`:"none",outlineOffset:"1px",position:"relative",zIndex:1}}/>
          </div>;
        })}
      </div>
    </div>
    <div style={{display:"flex",gap:"3px"}}>
      {data.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:"8px",color:selectedIdx===i?PRIMARY:G[400],fontWeight:selectedIdx===i?800:400}}>{d[labelKey]}{suffix}</div>)}
    </div>
  </div>;
}

function GrowthTag({v}){
  const pos=v>=0;
  return <span style={{fontSize:"10px",fontWeight:700,color:pos?"#2E7D32":"#C62828",background:pos?"#E8F5E9":"#FFEBEE",padding:"2px 7px",borderRadius:"20px",flexShrink:0}}>{pos?"▲":"▼"}{Math.abs(v)}%</span>;
}

function MiniBar2({pct,color}){
  return <div style={{flex:1,height:"6px",background:G[200],borderRadius:"3px",overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:"3px"}}/></div>;
}

// 개요 탭
function SalesOverviewTab({d,period,go}){
  const avgOrder=Math.round(d.revenue/d.orders);
  const revGrowth=Math.round(((d.revenue-d.prev.revenue)/d.prev.revenue)*100);
  const orderGrowth=Math.round(((d.orders-d.prev.orders)/d.prev.orders)*100);
  return <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
    <div style={{padding:"13px 14px",background:`linear-gradient(120deg,${PRIMARY},#FF8A65)`,borderRadius:"12px",color:"#fff"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:"11px",opacity:0.85}}>{period==="오늘"?"🔴 실시간":period} 총 매출</div>
          <div style={{fontSize:"26px",fontWeight:900,marginTop:"3px"}}>{(d.revenue/10000).toFixed(1)}만원</div>
        </div>
        <GrowthTag v={revGrowth}/>
      </div>
      <div style={{display:"flex",gap:"16px",marginTop:"10px",fontSize:"11px",opacity:0.9}}>
        <span>주문 {d.orders}건</span><span>객단가 {avgOrder.toLocaleString()}원</span><span>취소율 {d.cancelRate}%</span>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
      {[
        {l:"총 매출",v:`${(d.revenue/10000).toFixed(1)}만`,growth:revGrowth,icon:"💰"},
        {l:"결제 건수",v:`${d.orders}건`,growth:orderGrowth,icon:"📦"},
        {l:"평균 객단가",v:`${(avgOrder/1000).toFixed(1)}K`,growth:3,icon:"🧾"},
        {l:"취소율",v:`${d.cancelRate}%`,growth:null,warn:d.cancelRate>5,icon:"↩"},
      ].map((k,i)=>(
        <div key={i} style={{padding:"12px",background:"#fff",border:`1.5px solid ${k.warn?"#FFCDD2":G[200]}`,borderRadius:"11px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:"18px"}}>{k.icon}</span>
            {k.growth!=null&&<GrowthTag v={k.growth}/>}
            {k.warn&&<Badge bg="#FFEBEE" color="#C62828">주의</Badge>}
          </div>
          <div style={{fontSize:"18px",fontWeight:900,color:k.warn?"#C62828":G[900],marginTop:"5px"}}>{k.v}</div>
          <div style={{fontSize:"10px",color:G[500],marginTop:"2px"}}>{k.l}</div>
        </div>
      ))}
    </div>
    <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
      <div style={{fontSize:"12px",fontWeight:800,color:G[900],marginBottom:"9px"}}>전기 대비 비교</div>
      {[
        {l:"매출",cur:d.revenue,prev:d.prev.revenue,unit:"만원",div:10000},
        {l:"주문수",cur:d.orders,prev:d.prev.orders,unit:"건",div:1},
        {l:"객단가",cur:avgOrder,prev:Math.round(d.prev.revenue/d.prev.orders),unit:"원",div:1},
      ].map((row,i)=>{
        const growth=Math.round(((row.cur-row.prev)/row.prev)*100);
        return <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"7px 0",borderBottom:i<2?`1px solid ${G[100]}`:"none"}}>
          <span style={{fontSize:"11px",color:G[600],width:"50px"}}>{row.l}</span>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}>
              <span style={{fontSize:"11px",fontWeight:700}}>{row.div>1?(row.cur/row.div).toFixed(1):row.cur.toLocaleString()}{row.unit}</span>
              <span style={{fontSize:"10px",color:G[400]}}>(전: {row.div>1?(row.prev/row.div).toFixed(1):row.prev.toLocaleString()}{row.unit})</span>
            </div>
            <div style={{display:"flex",gap:"2px",height:"5px"}}>
              <div style={{flex:row.prev,background:G[300],borderRadius:"2px"}}/>
              {growth>0&&<div style={{flex:Math.abs(row.cur-row.prev),background:"#2E7D32",borderRadius:"2px"}}/>}
            </div>
          </div>
          <GrowthTag v={growth}/>
        </div>;
      })}
    </div>
    {period==="오늘"&&<div style={{border:`1.5px solid #FFD54F`,borderRadius:"10px",overflow:"hidden"}}>
      <div style={{padding:"8px 12px",background:"#FFF8E1",fontSize:"11px",fontWeight:800,color:"#E65100",display:"flex",alignItems:"center",gap:"5px"}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        실시간 알림
      </div>
      {[{msg:"🎉 오늘 매출 140만원 돌파!",time:"14:23"},{msg:"⚡ 주문 100건 달성",time:"13:47"},{msg:"📈 어제 동시간 대비 +3.4%",time:"12:00"}].map((n,i)=>(
        <div key={i} style={{padding:"9px 12px",borderTop:`1px solid #FFF3CD`,display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fff"}}>
          <span style={{fontSize:"11px",color:G[700]}}>{n.msg}</span>
          <span style={{fontSize:"10px",color:G[400]}}>{n.time}</span>
        </div>
      ))}
    </div>}
  </div>;
}

// 시간대 탭
function SalesTimeTab({d,period}){
  const [chartView,setChartView]=useState("시간대별");
  const [compareMode,setCompareMode]=useState(false);
  const [selectedBar,setSelectedBar]=useState(null);
  const chartData=chartView==="시간대별"?d.hourly:d.weekday;
  const suffix=chartView==="시간대별"?"시":"";
  const sel=selectedBar!=null?chartData[selectedBar]:null;
  return <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",gap:"5px"}}>
        {["시간대별","요일별"].map(v=>(
          <button key={v} onClick={()=>{setChartView(v);setSelectedBar(null);}} style={{padding:"5px 12px",borderRadius:"20px",border:`1.5px solid ${chartView===v?PRIMARY:G[300]}`,background:chartView===v?PRIMARY:"#fff",color:chartView===v?"#fff":G[600],fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{v}</button>
        ))}
      </div>
      <div onClick={()=>setCompareMode(v=>!v)} style={{display:"flex",alignItems:"center",gap:"5px",padding:"5px 10px",borderRadius:"20px",border:`1.5px solid ${compareMode?PRIMARY:G[300]}`,background:compareMode?PRIMARY_LIGHT:"#fff",cursor:"pointer",fontSize:"10px",fontWeight:700,color:compareMode?PRIMARY:G[600]}}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        비교
      </div>
    </div>
    <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"12px",padding:"13px"}}>
      <MiniBarChart data={chartData} valueKey="revenue" labelKey="t" suffix={suffix} selectedIdx={selectedBar} onSelect={setSelectedBar}/>
    </div>
    {sel&&<div style={{padding:"11px 13px",background:PRIMARY_LIGHT,borderRadius:"10px",border:`1.5px solid ${PRIMARY}33`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"4px"}}>
        <div style={{fontSize:"13px",fontWeight:800,color:PRIMARY}}>{sel.t}{suffix} 상세</div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:"15px",fontWeight:900,color:PRIMARY}}>{sel.revenue.toLocaleString()}원</div>
          <div style={{fontSize:"10px",color:G[500]}}>주문 {sel.orders}건</div>
        </div>
      </div>
    </div>}
    <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px",display:"flex",flexDirection:"column",gap:"7px"}}>
      <div style={{fontSize:"12px",fontWeight:800,color:G[900]}}>피크 타임 분석</div>
      {[...chartData].sort((a,b)=>b.revenue-a.revenue).slice(0,3).map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:"9px"}}>
          <span style={{fontSize:"13px",fontWeight:900,color:i===0?PRIMARY:i===1?G[600]:G[400],width:"16px"}}>{i+1}</span>
          <span style={{fontSize:"12px",fontWeight:700,color:G[800],width:"36px"}}>{s.t}{suffix}</span>
          <MiniBar2 pct={Math.round(s.revenue/chartData[0]?.revenue*100)||0} color={i===0?PRIMARY:`${PRIMARY}66`}/>
          <span style={{fontSize:"11px",fontWeight:700,color:i===0?PRIMARY:G[600],whiteSpace:"nowrap"}}>{(s.revenue/1000).toFixed(0)}K</span>
        </div>
      ))}
    </div>
  </div>;
}

// 결제수단 탭 (독립 컴포넌트 — IIFE 완전 제거)
function PayMethodsTab({d}){
  const totalPayRev=d.payMethods.reduce((a,m)=>a+m.revenue,0);
  return <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
    <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
      <div style={{fontSize:"12px",fontWeight:800,color:G[900],marginBottom:"10px"}}>수단별 매출 비율</div>
      <div style={{display:"flex",height:"22px",borderRadius:"8px",overflow:"hidden",gap:"2px",marginBottom:"9px"}}>
        {d.payMethods.map((m,i)=>{
          const pct=Math.round(m.revenue/totalPayRev*100);
          return <div key={i} style={{flex:pct,background:m.color,minWidth:"4px"}}/>;
        })}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
        {d.payMethods.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"10px",color:G[600]}}>
            <div style={{width:"8px",height:"8px",borderRadius:"50%",background:m.color}}/>
            {m.name} {Math.round(m.revenue/totalPayRev*100)}%
          </div>
        ))}
      </div>
    </div>
    {d.payMethods.map((m,i)=>{
      const successRate=Math.round(m.success/m.orders*100);
      const cancelRate=Math.round(m.cancel/m.orders*100);
      return <div key={i} style={{border:`1.5px solid ${G[200]}`,borderLeft:`4px solid ${m.color}`,borderRadius:"11px",padding:"12px",background:"#fff"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"9px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
            <span style={{fontSize:"20px"}}>{m.icon}</span>
            <div>
              <div style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{m.name}</div>
              <div style={{fontSize:"10px",color:G[400]}}>{m.orders}건 · {(m.revenue/10000).toFixed(1)}만원</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:"15px",fontWeight:900,color:m.color}}>{Math.round(m.revenue/totalPayRev*100)}%</div>
            <div style={{fontSize:"9px",color:G[400]}}>점유율</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"5px",marginBottom:"9px"}}>
          {[
            {label:"성공",v:m.success,c:"#2E7D32",bg:"#E8F5E9"},
            {label:"취소",v:m.cancel,c:"#C62828",bg:"#FFEBEE"},
            {label:"성공률",v:`${successRate}%`,c:successRate>=95?"#2E7D32":successRate>=85?"#E65100":"#C62828",bg:successRate>=95?"#E8F5E9":successRate>=85?"#FFF3E0":"#FFEBEE"},
          ].map((s,j)=>(
            <div key={j} style={{padding:"7px",background:s.bg,borderRadius:"7px",textAlign:"center"}}>
              <div style={{fontSize:"13px",fontWeight:900,color:s.c}}>{s.v}</div>
              <div style={{fontSize:"9px",color:s.c,opacity:.75,marginTop:"1px"}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:G[400],marginBottom:"3px"}}>
            <span style={{color:"#2E7D32"}}>성공 {successRate}%</span>
            <span style={{color:"#C62828"}}>취소 {cancelRate}%</span>
          </div>
          <div style={{display:"flex",height:"7px",borderRadius:"4px",overflow:"hidden"}}>
            <div style={{width:`${successRate}%`,background:"#2E7D32",borderRadius:"4px 0 0 4px"}}/>
            <div style={{flex:1,background:"#FFCDD2",borderRadius:"0 4px 4px 0"}}/>
          </div>
        </div>
      </div>;
    })}
  </div>;
}

// 취소분석 탭
function SalesCancelTab({d}){
  return <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
      {[{l:"취소 건수",v:`${d.cancelCount}건`,c:"#C62828",bg:"#FFEBEE"},{l:"취소율",v:`${d.cancelRate}%`,c:d.cancelRate>5?"#C62828":"#E65100",bg:d.cancelRate>5?"#FFEBEE":"#FFF3E0"},{l:"승인후 취소",v:`${Math.round(d.cancelCount*0.3)}건`,c:"#7B1FA2",bg:"#F3E5F5"},{l:"환불 처리중",v:`${Math.round(d.cancelCount*0.2)}건`,c:G[600],bg:G[100]}].map((s,i)=>(
        <StatCard key={i} label={s.l} value={s.v} color={s.c} bg={s.bg}/>
      ))}
    </div>
    <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
      <div style={{fontSize:"12px",fontWeight:800,color:G[900],marginBottom:"10px"}}>취소 사유 분석</div>
      {d.cancelReasons.map((r,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"9px"}}>
          <div style={{width:"8px",height:"8px",borderRadius:"50%",background:i===0?"#C62828":i===1?"#E65100":"#FFC107",flexShrink:0}}/>
          <span style={{fontSize:"12px",color:G[700],flex:1}}>{r.reason}</span>
          <MiniBar2 pct={r.pct} color={i===0?"#C62828":i===1?"#E65100":"#FFC107"}/>
          <span style={{fontSize:"11px",fontWeight:700,color:G[700],width:"30px",textAlign:"right"}}>{r.pct}%</span>
          <span style={{fontSize:"10px",color:G[400],width:"22px",textAlign:"right"}}>{r.count}건</span>
        </div>
      ))}
    </div>
    <div style={{padding:"11px",background:"#FFF3E0",borderRadius:"10px",border:`1px solid #FFD54F`,fontSize:"11px",color:"#E65100",lineHeight:"1.7"}}>
      {Icon.alert("#E65100")}
      <div style={{marginTop:"5px"}}><b>이상 징후:</b> 18~20시 취소가 집중되어 있습니다. 피크 시간대 배달 지연이 원인일 수 있습니다.</div>
    </div>
  </div>;
}

// 단골 탭
function SalesRegularTab({d}){
  const [aiLoading,setAiLoading]=useState(false);
  const [aiReport,setAiReport]=useState(null);

  const ageData=[
    {age:"10대",pct:4,count:5,color:"#FFB74D"},
    {age:"20대",pct:31,count:39,color:PRIMARY},
    {age:"30대",pct:38,count:48,color:"#7B1FA2"},
    {age:"40대",pct:18,count:23,color:"#1565C0"},
    {age:"50대",pct:7,count:9,color:"#2E7D32"},
    {age:"60대+",pct:2,count:2,color:G[400]},
  ];
  const menuData=[
    {name:"김치찌개",orders:312,pct:28,color:PRIMARY,repeat:true},
    {name:"불고기 정식",orders:248,pct:22,color:"#7B1FA2",repeat:true},
    {name:"된장찌개",orders:187,pct:17,color:"#1565C0",repeat:false},
    {name:"냉면",orders:134,pct:12,color:"#2E7D32",repeat:false},
    {name:"기타",orders:239,pct:21,color:G[300],repeat:false},
  ];
  const maxAge=Math.max(...ageData.map(a=>a.pct));

  const handleAiReport=async()=>{
    setAiLoading(true);
    setAiReport(null);
    try{
      const prompt=`당신은 배달 음식점 데이터 분석 전문가입니다. 아래 단골 고객 데이터를 분석하여 사장님을 위한 인사이트 리포트를 작성해 주세요.

[단골 데이터]
- 재방문율: ${d.regulars.rate}%
- 평균 재구매 간격: ${d.regulars.avgInterval}일
- 신규 고객: ${d.regulars.newCustomers}명
- 재방문 고객: ${d.regulars.returning}명
- 연령대: 30대(38%), 20대(31%), 40대(18%), 50대(7%), 10대(4%), 60대+(2%)
- 인기 메뉴: 김치찌개(28%), 불고기 정식(22%), 된장찌개(17%), 냉면(12%)
- 단골 재주문 TOP: 김치찌개, 불고기 정식

아래 형식의 JSON으로만 응답해 주세요. 다른 텍스트나 마크다운 없이 JSON만:
{
  "summary": "2~3문장 핵심 요약",
  "insights": [
    {"icon": "이모지", "title": "인사이트 제목", "desc": "구체적 내용 1~2문장"},
    {"icon": "이모지", "title": "인사이트 제목", "desc": "구체적 내용 1~2문장"},
    {"icon": "이모지", "title": "인사이트 제목", "desc": "구체적 내용 1~2문장"}
  ],
  "actions": [
    {"icon": "이모지", "action": "추천 액션 1문장"},
    {"icon": "이모지", "action": "추천 액션 1문장"},
    {"icon": "이모지", "action": "추천 액션 1문장"}
  ]
}`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data2=await res.json();
      const text=data2.content.map(i=>i.text||"").join("");
      const clean=text.replace(/```json|```/g,"").trim();
      setAiReport(JSON.parse(clean));
    }catch(e){
      setAiReport({summary:"분석 중 오류가 발생했습니다. 다시 시도해 주세요.",insights:[],actions:[]});
    }
    setAiLoading(false);
  };

  return <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
    {/* 핵심 수치 */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
      {[
        {l:"재방문율",v:`${d.regulars.rate}%`,icon:"🔄",c:"#2E7D32",bg:"#E8F5E9"},
        {l:"평균 재구매 간격",v:`${d.regulars.avgInterval}일`,icon:"📅",c:"#1565C0",bg:"#E3F2FD"},
        {l:"신규 고객",v:`${d.regulars.newCustomers}명`,icon:"👤",c:G[700],bg:G[100]},
        {l:"재방문 고객",v:`${d.regulars.returning}명`,icon:"💎",c:"#7B1FA2",bg:"#F3E5F5"},
      ].map((s,i)=>(
        <div key={i} style={{padding:"10px",background:s.bg,borderRadius:"9px",display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"20px"}}>{s.icon}</span>
          <div><div style={{fontSize:"15px",fontWeight:900,color:s.c}}>{s.v}</div><div style={{fontSize:"9px",color:s.c,opacity:0.75,marginTop:"1px"}}>{s.l}</div></div>
        </div>
      ))}
    </div>

    {/* 연령대 분포 */}
    <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
      <div style={{fontSize:"12px",fontWeight:800,color:G[900],marginBottom:"10px"}}>👥 단골 연령대 분포</div>
      <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
        {ageData.map((a,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"11px",fontWeight:700,color:G[700],width:"36px",flexShrink:0}}>{a.age}</span>
            <div style={{flex:1,height:"22px",background:G[100],borderRadius:"5px",overflow:"hidden",position:"relative"}}>
              <div style={{width:`${(a.pct/maxAge)*100}%`,height:"100%",background:a.color,borderRadius:"5px",transition:"width .4s",display:"flex",alignItems:"center",paddingLeft:"7px"}}>
                {a.pct>=10&&<span style={{fontSize:"10px",fontWeight:800,color:"#fff",whiteSpace:"nowrap"}}>{a.pct}%</span>}
              </div>
              {a.pct<10&&<span style={{position:"absolute",left:`${(a.pct/maxAge)*100+2}%`,top:"50%",transform:"translateY(-50%)",fontSize:"10px",fontWeight:800,color:a.color}}>{a.pct}%</span>}
            </div>
            <span style={{fontSize:"10px",color:G[400],width:"28px",textAlign:"right",flexShrink:0}}>{a.count}명</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:"10px",padding:"8px 10px",background:"#F3E5F5",borderRadius:"8px",border:`1px solid #CE93D8`,fontSize:"11px",color:"#7B1FA2",fontWeight:600}}>
        💡 30~40대가 전체의 56% — 직장인 점심·저녁 수요가 핵심층입니다.
      </div>
    </div>

    {/* 단골 선호 메뉴 */}
    <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}>
      <div style={{fontSize:"12px",fontWeight:800,color:G[900],marginBottom:"10px"}}>🍽️ 단골 선호 메뉴 TOP 5</div>
      {/* 도넛 느낌 가로 누적바 */}
      <div style={{display:"flex",height:"18px",borderRadius:"9px",overflow:"hidden",gap:"2px",marginBottom:"10px"}}>
        {menuData.map((m,i)=><div key={i} style={{flex:m.pct,background:m.color,minWidth:"4px"}}/>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
        {menuData.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <div style={{width:"8px",height:"8px",borderRadius:"50%",background:m.color,flexShrink:0}}/>
            <span style={{fontSize:"12px",fontWeight:700,color:G[800],flex:1}}>{m.name}</span>
            {m.repeat&&<Badge bg={PRIMARY_LIGHT} color={PRIMARY}>재주문↑</Badge>}
            <span style={{fontSize:"11px",fontWeight:700,color:m.color,width:"30px",textAlign:"right"}}>{m.pct}%</span>
            <span style={{fontSize:"10px",color:G[400],width:"36px",textAlign:"right"}}>{m.orders}건</span>
          </div>
        ))}
      </div>
    </div>

    {/* AI 리포트 */}
    <div style={{border:`1.5px solid ${AI_COLOR}44`,borderRadius:"12px",overflow:"hidden"}}>
      <div style={{padding:"12px 13px",background:`linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div><div style={{fontSize:"12px",fontWeight:800,color:"#fff"}}>✨ AI 단골 분석 리포트</div><div style={{fontSize:"10px",color:"rgba(255,255,255,0.75)",marginTop:"2px"}}>데이터 기반 맞춤 인사이트</div></div>
        {!aiReport&&<button onClick={handleAiReport} disabled={aiLoading} style={{padding:"7px 13px",borderRadius:"8px",border:"none",background:"rgba(255,255,255,0.22)",color:"#fff",fontSize:"11px",fontWeight:800,cursor:aiLoading?"not-allowed":"pointer",fontFamily:"inherit",opacity:aiLoading?0.7:1}}>
          {aiLoading?"생성 중...":"리포트 생성"}
        </button>}
        {aiReport&&<button onClick={()=>setAiReport(null)} style={{padding:"5px 10px",borderRadius:"7px",border:"none",background:"rgba(255,255,255,0.18)",color:"#fff",fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>초기화</button>}
      </div>
      {aiLoading&&(
        <div style={{padding:"24px",textAlign:"center",background:AI_LIGHT}}>
          <div style={{fontSize:"24px",marginBottom:"8px"}}>🤖</div>
          <div style={{fontSize:"12px",color:AI_COLOR,fontWeight:700}}>단골 데이터를 분석하고 있어요...</div>
          <div style={{fontSize:"10px",color:G[400],marginTop:"4px"}}>잠시만 기다려 주세요</div>
        </div>
      )}
      {!aiLoading&&!aiReport&&(
        <div style={{padding:"16px 14px",background:AI_LIGHT,textAlign:"center"}}>
          <div style={{fontSize:"11px",color:AI_COLOR,lineHeight:"1.7"}}>버튼을 누르면 AI가 단골 고객 데이터를<br/>분석해 맞춤 인사이트를 제공합니다.</div>
        </div>
      )}
      {!aiLoading&&aiReport&&(
        <div style={{padding:"12px 13px",background:AI_LIGHT,display:"flex",flexDirection:"column",gap:"10px"}}>
          {/* 요약 */}
          <div style={{padding:"10px 12px",background:"#fff",borderRadius:"9px",border:`1px solid ${AI_COLOR}33`,fontSize:"12px",color:G[800],lineHeight:"1.75"}}>
            {aiReport.summary}
          </div>
          {/* 인사이트 */}
          {aiReport.insights?.length>0&&(
            <div>
              <div style={{fontSize:"11px",fontWeight:800,color:AI_COLOR,marginBottom:"7px"}}>📊 주요 인사이트</div>
              <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                {aiReport.insights.map((ins,i)=>(
                  <div key={i} style={{padding:"10px 11px",background:"#fff",borderRadius:"9px",border:`1px solid ${AI_COLOR}22`,display:"flex",gap:"8px",alignItems:"flex-start"}}>
                    <span style={{fontSize:"18px",flexShrink:0}}>{ins.icon}</span>
                    <div><div style={{fontSize:"12px",fontWeight:800,color:G[900]}}>{ins.title}</div><div style={{fontSize:"11px",color:G[600],marginTop:"3px",lineHeight:"1.6"}}>{ins.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 추천 액션 */}
          {aiReport.actions?.length>0&&(
            <div>
              <div style={{fontSize:"11px",fontWeight:800,color:AI_COLOR,marginBottom:"7px"}}>🎯 추천 액션</div>
              <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                {aiReport.actions.map((a,i)=>(
                  <div key={i} style={{padding:"9px 11px",background:`${AI_COLOR}15`,borderRadius:"8px",display:"flex",gap:"8px",alignItems:"center"}}>
                    <span style={{fontSize:"16px",flexShrink:0}}>{a.icon}</span>
                    <span style={{fontSize:"11px",color:AI_COLOR,fontWeight:600,lineHeight:"1.5"}}>{a.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>;
}

function OwnerSalesDetail({go}){
  const [tab,setTab]=useState("개요");
  const [period,setPeriod]=useState("오늘");
  const tabs=["개요","시간대","결제수단","취소분석","단골"];
  const periods=["오늘","어제","이번주"];
  const d=SALES_DATA[period]||SALES_DATA["오늘"];
  return <Phone noNav>
    <TopBar title="매출 분석" go={go} backTo="owner-dash"/>
    {/* 기간 필터 */}
    <div style={{background:"#fff",borderBottom:`1px solid ${G[100]}`,padding:"10px 12px",display:"flex",gap:"5px",flexShrink:0,overflowX:"auto"}}>
      {periods.map(p=>(
        <button key={p} onClick={()=>setPeriod(p)} style={{padding:"6px 13px",borderRadius:"20px",border:`1.5px solid ${period===p?PRIMARY:G[300]}`,background:period===p?PRIMARY:"#fff",color:period===p?"#fff":G[600],fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>{p}</button>
      ))}
    </div>
    {/* 분석 탭 */}
    <div style={{display:"flex",borderBottom:`1px solid ${G[200]}`,background:"#fff",flexShrink:0,overflowX:"auto"}}>
      {tabs.map(t=>(
        <div key={t} onClick={()=>setTab(t)} style={{padding:"10px 12px",textAlign:"center",fontSize:"11px",fontWeight:700,cursor:"pointer",color:tab===t?PRIMARY:G[500],borderBottom:`2px solid ${tab===t?PRIMARY:"transparent"}`,whiteSpace:"nowrap",flexShrink:0}}>{t}</div>
      ))}
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      {tab==="개요"&&<SalesOverviewTab d={d} period={period} go={go}/>}
      {tab==="시간대"&&<SalesTimeTab d={d} period={period}/>}
      {tab==="결제수단"&&<PayMethodsTab d={d}/>}
      {tab==="취소분석"&&<SalesCancelTab d={d}/>}
      {tab==="단골"&&<SalesRegularTab d={d}/>}
      <div style={{paddingBottom:"6px"}}/>
    </div>
  </Phone>;
}

export default OwnerSalesDetail;