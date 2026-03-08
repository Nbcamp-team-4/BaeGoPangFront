import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import StoreReviews from "./src/pages/review/StoreReviews";
import Review from "./src/pages/review/Review";

const G = {
  50:"#FAFAFA",100:"#F5F5F5",200:"#EEEEEE",300:"#E0E0E0",
  400:"#BDBDBD",500:"#9E9E9E",600:"#757575",700:"#616161",
  800:"#424242",900:"#212121"
};
const PRIMARY="#FF5722", PRIMARY_LIGHT="#FFF3F0";
const KAKAO="#FEE500", AI_COLOR="#6C3EE8", AI_LIGHT="#F3EFFF";
const PW=402, PH=874, STATUS_H=44, NAV_H=58, TOPBAR_H=52;

const screens=[
  {id:"onboarding",label:"온보딩"},{id:"login",label:"로그인"},{id:"signup",label:"회원가입"},
  {id:"home",label:"고객 홈"},{id:"store",label:"가게 상세"},{id:"store-reviews",label:"가게 리뷰"},
  {id:"menu-detail",label:"메뉴 상세"},{id:"ai-recommend",label:"AI 메뉴추천"},
  {id:"cart",label:"장바구니"},{id:"order",label:"주문하기"},
  {id:"order-complete",label:"주문완료"},{id:"order-fail",label:"결제실패"},
  {id:"order-history",label:"주문내역"},{id:"order-detail",label:"주문상세"},{id:"review",label:"리뷰작성"},
  {id:"owner-dash",label:"사장님 홈"},{id:"owner-sales",label:"매출 상세"},{id:"owner-orders",label:"주문관리"},{id:"owner-menu",label:"메뉴관리"},{id:"owner-reviews",label:"리뷰관리"},{id:"owner-info",label:"가게정보"},
  {id:"my",label:"마이페이지"},
  {id:"owner-my",label:"마이페이지"},
  {id:"admin",label:"관리자"},
  {id:"admin-users",label:"└ 사용자관리"},{id:"admin-stores",label:"└ 가게관리"},
  {id:"admin-orders",label:"└ 주문관리"},{id:"admin-categories",label:"└ 카테고리"},
  {id:"admin-regions",label:"└ 지역관리"},{id:"admin-ai",label:"└ AI관리"},
  {id:"admin-payments",label:"└ 결제관리"},{id:"admin-reviews",label:"└ 리뷰관리"},
];

// ── 아이콘 ────────────────────────────────────────────────
const FlatIcons = {
  orders:(c="#555")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill={c} opacity=".15"/><path d="M7 8h10M7 12h10M7 16h6" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  heart:(c="#555")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14.5 3 8.5A4.5 4.5 0 0 1 12 6.1 4.5 4.5 0 0 1 21 8.5C21 14.5 12 21 12 21Z" fill={c} opacity=".2" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  review:(c="#555")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 5 5.6.8-4 3.9.9 5.5L12 14.5l-4.9 2.7.9-5.5L4 7.8l5.6-.8L12 2Z" fill={c} opacity=".2" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  coupon:(c="#555")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" fill={c} opacity=".15"/><path d="M15 6v12M9 10h.01M9 14h.01" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  point:(c="#555")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill={c} opacity=".15"/><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c}>P</text></svg>,
  bell:(c="#555")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill={c} opacity=".15" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  lock:(c="#555")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" fill={c} opacity=".15" stroke={c} strokeWidth="1.8"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  notice:(c="#555")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill={c} opacity=".15" stroke={c} strokeWidth="1.8"/><path d="M12 8v4M12 16h.01" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  location:(c=PRIMARY)=><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" fill={c} opacity=".2" stroke={c} strokeWidth="1.8"/><circle cx="12" cy="9" r="2.5" fill={c}/></svg>,
  logout:(c="#E53935")=><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={c} strokeWidth="2" strokeLinecap="round"/><polyline points="16 17 21 12 16 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  starFilled:(c="#FFC107")=><svg width="28" height="28" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={c}/></svg>,
  starEmpty:(c=G[300])=><svg width="28" height="28" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={c}/></svg>,
  userAvatar:(size=33)=>(
    <div style={{width:`${size}px`,height:`${size}px`,borderRadius:"50%",background:G[200],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"}}>
      <svg width={size*0.9} height={size*0.9} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={G[500]} opacity=".7"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill={G[400]} opacity=".5"/></svg>
    </div>
  ),
  store:(c=G[600])=><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="2" y="10" width="20" height="11" rx="1.5" fill={c} opacity=".15" stroke={c} strokeWidth="1.6"/><path d="M2 10l2-7h16l2 7" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/><rect x="9" y="14" width="6" height="7" rx="1" fill={c} opacity=".3"/></svg>,
  moto:(c=G[600])=><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="5.5" cy="17.5" r="2.5" stroke={c} strokeWidth="1.6"/><circle cx="18.5" cy="17.5" r="2.5" stroke={c} strokeWidth="1.6"/><path d="M8 17.5h7M14 6l4 6H8l2-6h4z" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12h3" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  creditcard:(c=G[600])=><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" fill={c} opacity=".12" stroke={c} strokeWidth="1.6"/><rect x="2" y="9" width="20" height="3" fill={c} opacity=".3"/><rect x="5" y="15" width="4" height="1.5" rx=".75" fill={c}/></svg>,
  cancel:(c="#C62828")=><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/><path d="M15 9l-6 6M9 9l6 6" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
};

const Icon={
  bell:(c=G[700])=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  cart:(c=G[700])=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  home:(c=G[500])=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  doc:(c=G[500])=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  user:(c=G[500])=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  chevron:(c=G[400])=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  search:(c=G[400])=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  filter:(c=G[600])=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>,
  edit:(c=G[600])=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:(c="#E53935")=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  block:(c="#E53935")=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  check:(c="#2E7D32")=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  eye:(c=G[600])=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  alert:(c="#E65100")=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
};

// ── 공통 컴포넌트 ─────────────────────────────────────────
function Btn({children,variant="outline",size="md",onClick,style,disabled,full}){
  const pad=size==="sm"?"5px 11px":size==="lg"?"15px 0":"10px 0";
  const fs=size==="sm"?"11px":"13px";
  const bg=variant==="primary"?PRIMARY:variant==="kakao"?KAKAO:variant==="ai"?AI_COLOR:variant==="ghost"?"transparent":variant==="danger"?"#FFEBEE":"#fff";
  const color=variant==="primary"||variant==="ai"?"#fff":variant==="kakao"?"#191919":variant==="ghost"?G[600]:variant==="danger"?"#C62828":G[800];
  const border=["primary","kakao","ghost","ai"].includes(variant)?"none":variant==="danger"?`1.5px solid #FFCDD2`:`1.5px solid ${G[300]}`;
  return(
    <button onClick={onClick} disabled={disabled} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",padding:pad,width:full?"100%":undefined,background:bg,color,border,borderRadius:"10px",fontSize:fs,fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.45:1,transition:"all .15s",fontFamily:"inherit",...style}}>{children}</button>
  );
}
function Input({placeholder,style}){return <div style={{padding:"10px 13px",border:`1.5px solid ${G[300]}`,borderRadius:"10px",color:G[400],fontSize:"13px",background:G[50],...style}}>{placeholder}</div>;}
function Chip({label,active,onClick,color}){
  const ac=color||PRIMARY;
  return <div onClick={onClick} style={{padding:"6px 14px",borderRadius:"20px",fontSize:"12px",fontWeight:600,background:active?ac:G[100],color:active?"#fff":G[600],whiteSpace:"nowrap",cursor:"pointer",transition:"all .15s",flexShrink:0}}>{label}</div>;
}
function Divider({label}){return <div style={{display:"flex",alignItems:"center",gap:"10px",margin:"4px 0"}}><div style={{flex:1,height:"1px",background:G[200]}}/>{label&&<span style={{fontSize:"11px",color:G[400],fontWeight:500}}>{label}</span>}<div style={{flex:1,height:"1px",background:G[200]}}/></div>;}
function Img({w,h,label,radius,style}){return <div style={{width:w||"100%",height:h||"80px",flexShrink:0,background:`repeating-linear-gradient(45deg,${G[100]},${G[100]} 8px,${G[200]} 8px,${G[200]} 16px)`,borderRadius:radius||"8px",display:"flex",alignItems:"center",justifyContent:"center",color:G[400],fontSize:"10px",fontWeight:600,border:`1px solid ${G[200]}`,...style}}>{label||"이미지"}</div>;}
function Stars({v=4.5,size=12}){return <span style={{color:"#FFC107",fontSize:`${size}px`}}>{"★".repeat(Math.floor(v))}{"☆".repeat(5-Math.floor(v))}</span>;}
function Badge({children,color,bg}){return <span style={{display:"inline-flex",alignItems:"center",padding:"2px 6px",borderRadius:"4px",fontSize:"10px",fontWeight:700,background:bg||G[200],color:color||G[700]}}>{children}</span>;}
function Section({title,children,action,actionFn}){return <div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}><span style={{fontSize:"14px",fontWeight:800,color:G[900]}}>{title}</span>{action&&<span onClick={actionFn} style={{fontSize:"12px",color:PRIMARY,fontWeight:600,cursor:"pointer"}}>{action}</span>}</div>{children}</div>;}
function SearchBar({placeholder}){return <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 13px",border:`1.5px solid ${G[300]}`,borderRadius:"10px",background:G[50]}}>{Icon.search()}<span style={{fontSize:"13px",color:G[400]}}>{placeholder||"검색"}</span></div>;}
function StatCard({label,value,color,bg}){return <div style={{flex:1,padding:"11px",background:bg||"#fff",border:`1.5px solid ${color||G[200]}22`,borderRadius:"11px",minWidth:0}}><div style={{fontSize:"11px",color:G[500],fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{label}</div><div style={{fontSize:"18px",fontWeight:900,color:color||G[900],marginTop:"2px"}}>{value}</div></div>;}
function THead({cols}){return <div style={{display:"flex",padding:"8px 12px",background:G[50],borderBottom:`1.5px solid ${G[200]}`,gap:"6px"}}>{cols.map((c,i)=><div key={i} style={{flex:c.flex||1,fontSize:"10px",color:G[500],fontWeight:700,whiteSpace:"nowrap"}}>{c.v}</div>)}<div style={{width:"56px",flexShrink:0}}/></div>;}
function TRow({cols,actions,highlight}){return <div style={{display:"flex",alignItems:"center",padding:"10px 12px",borderBottom:`1px solid ${G[100]}`,background:highlight?"#FFFDE7":"#fff",gap:"6px"}}>{cols.map((c,i)=><div key={i} style={{flex:c.flex||1,fontSize:"11px",color:c.color||G[700],fontWeight:c.bold?700:400,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.v}</div>)}{actions&&<div style={{display:"flex",gap:"4px",flexShrink:0}}>{actions}</div>}</div>;}

function Radio({checked,onClick,children,style}){
  return <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 13px",border:`1.5px solid ${checked?PRIMARY:G[300]}`,borderRadius:"10px",background:checked?PRIMARY_LIGHT:"#fff",cursor:"pointer",transition:"all .15s",...style}}>
    <div style={{width:"18px",height:"18px",borderRadius:"50%",border:`2px solid ${checked?PRIMARY:G[400]}`,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      {checked&&<div style={{width:"9px",height:"9px",borderRadius:"50%",background:PRIMARY}}/>}
    </div>
    <div style={{flex:1}}>{children}</div>
  </div>;
}

function TopBar({title,go,backTo,right}){
  return <div style={{height:`${TOPBAR_H}px`,background:"#fff",borderBottom:`1px solid ${G[100]}`,display:"flex",alignItems:"center",padding:"0 12px",gap:"8px",flexShrink:0}}>
    {backTo&&<button onClick={()=>go(backTo)} style={{width:"34px",height:"34px",borderRadius:"50%",border:"none",background:G[100],cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G[700]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>}
    <span style={{fontSize:"15px",fontWeight:800,color:G[900],flex:1}}>{title}</span>
    {right&&right}
  </div>;
}

function BottomNav({active,go}){
  const C=(id)=>active===id?(id==="ai-recommend"?AI_COLOR:PRIMARY):G[500];
  const items=[
    {id:"home",icon:Icon.home,label:"홈"},
    {id:"ai-recommend",icon:(c)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,label:"AI추천"},
    {id:"cart",icon:Icon.cart,label:"장바구니"},
    {id:"order-history",icon:Icon.doc,label:"주문내역"},
    {id:"my",icon:Icon.user,label:"마이"},
  ];
  return <div style={{height:`${NAV_H}px`,display:"flex",justifyContent:"space-around",alignItems:"center",padding:"0 0 8px",borderTop:`1px solid ${G[200]}`,background:"#fff",flexShrink:0}}>
    {items.map(n=>(
      <div key={n.id} onClick={()=>go&&go(n.id)} style={{textAlign:"center",fontSize:"10px",color:C(n.id),fontWeight:active===n.id?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",flex:1}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{n.icon(C(n.id))}</div>
        <span>{n.label}</span>
        {active===n.id&&<div style={{width:"4px",height:"4px",borderRadius:"50%",background:n.id==="ai-recommend"?AI_COLOR:PRIMARY}}/>}
      </div>
    ))}
  </div>;
}

function Phone({children,navActive,go,noNav,noStatus}){
  const innerH=PH-(noStatus?0:STATUS_H)-(noNav?0:NAV_H);
  return <div style={{width:`${PW}px`,height:`${PH}px`,border:`3px solid ${G[800]}`,borderRadius:"44px",overflow:"hidden",background:"#fff",boxShadow:"0 12px 48px rgba(0,0,0,0.18)",flexShrink:0,display:"flex",flexDirection:"column"}}>
    {!noStatus&&<div style={{height:`${STATUS_H}px`,background:G[900],display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",fontSize:"12px",color:"#fff",fontWeight:600,flexShrink:0}}><span>9:41</span><span>●●●● 🔋</span></div>}
    <div style={{height:`${innerH}px`,overflowY:"auto",display:"flex",flexDirection:"column",flexShrink:0}}>{children}</div>
    {!noNav&&<BottomNav active={navActive} go={go}/>}
  </div>;
}

function AdminShell({title,go,back="admin",children,right}){
  return <Phone noNav>
    <div style={{height:`${STATUS_H}px`,background:"#1A237E",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",fontSize:"12px",color:"#fff",fontWeight:600,flexShrink:0}}><span>9:41</span><span>●●●● 🔋</span></div>
    <div style={{height:`${PH-STATUS_H}px`,overflowY:"auto",display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{height:`${TOPBAR_H}px`,background:"#1A237E",display:"flex",alignItems:"center",padding:"0 12px",gap:"8px",flexShrink:0}}>
        <button onClick={()=>go(back)} style={{width:"34px",height:"34px",borderRadius:"50%",border:"none",background:"rgba(255,255,255,0.15)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span style={{fontSize:"15px",fontWeight:800,color:"#fff",flex:1}}>{title}</span>
        {right&&right}
      </div>
      {children}
    </div>
  </Phone>;
}

// ── 매출 데이터 ───────────────────────────────────────────
const SALES_DATA={
  오늘:{
    revenue:1449000,orders:128,cancelCount:6,cancelRate:4.7,
    prev:{revenue:1401000,orders:121},
    hourly:[
      {t:"10",orders:2,revenue:18000},{t:"11",orders:5,revenue:42000},
      {t:"12",orders:18,revenue:156000},{t:"13",orders:24,revenue:198000},
      {t:"14",orders:11,revenue:89000},{t:"15",orders:4,revenue:31000},
      {t:"16",orders:3,revenue:24000},{t:"17",orders:6,revenue:51000},
      {t:"18",orders:19,revenue:163000},{t:"19",orders:31,revenue:267000},
      {t:"20",orders:27,revenue:231000},{t:"21",orders:15,revenue:129000},{t:"22",orders:6,revenue:48000},
    ],
    weekday:[
      {t:"월",orders:134,revenue:1142000},{t:"화",orders:148,revenue:1260000},
      {t:"수",orders:121,revenue:1028000},{t:"목",orders:156,revenue:1330000},
      {t:"금",orders:189,revenue:1612000},{t:"토",orders:231,revenue:1968000},{t:"일",orders:128,revenue:1449000},
    ],
    payMethods:[
      {name:"카드",icon:"💳",revenue:821000,orders:72,cancel:3,success:69,color:"#1565C0"},
      {name:"카카오페이",icon:"💛",revenue:376000,orders:33,cancel:2,success:31,color:"#F9A825"},
      {name:"토스",icon:"🔵",revenue:193000,orders:17,cancel:1,success:16,color:"#0064FF"},
      {name:"무통장",icon:"🏦",revenue:59000,orders:6,cancel:0,success:6,color:"#455A64"},
    ],
    cancelReasons:[{reason:"고객 변심",count:3,pct:50},{reason:"배달 지연",count:2,pct:33},{reason:"품절",count:1,pct:17}],
    regulars:{rate:38,avgInterval:6,newCustomers:34,returning:94},
    prediction:{tomorrow:1520000,weekend:2310000,confidence:82},
  },
  어제:{
    revenue:1401000,orders:121,cancelCount:4,cancelRate:3.3,
    prev:{revenue:1285000,orders:112},
    hourly:[
      {t:"10",orders:1,revenue:8000},{t:"11",orders:4,revenue:33000},
      {t:"12",orders:21,revenue:179000},{t:"13",orders:26,revenue:221000},
      {t:"14",orders:9,revenue:72000},{t:"15",orders:5,revenue:40000},
      {t:"16",orders:3,revenue:24000},{t:"17",orders:7,revenue:59000},
      {t:"18",orders:22,revenue:187000},{t:"19",orders:28,revenue:240000},
      {t:"20",orders:24,revenue:204000},{t:"21",orders:13,revenue:111000},{t:"22",orders:4,revenue:32000},
    ],
    weekday:[
      {t:"월",orders:119,revenue:1013000},{t:"화",orders:135,revenue:1148000},
      {t:"수",orders:112,revenue:952000},{t:"목",orders:145,revenue:1234000},
      {t:"금",orders:178,revenue:1515000},{t:"토",orders:208,revenue:1770000},{t:"일",orders:121,revenue:1401000},
    ],
    payMethods:[
      {name:"카드",icon:"💳",revenue:795000,orders:68,cancel:2,success:66,color:"#1565C0"},
      {name:"카카오페이",icon:"💛",revenue:361000,orders:31,cancel:1,success:30,color:"#F9A825"},
      {name:"토스",icon:"🔵",revenue:181000,orders:16,cancel:1,success:15,color:"#0064FF"},
      {name:"무통장",icon:"🏦",revenue:64000,orders:6,cancel:0,success:6,color:"#455A64"},
    ],
    cancelReasons:[{reason:"고객 변심",count:2,pct:50},{reason:"배달 지연",count:1,pct:25},{reason:"품절",count:1,pct:25}],
    regulars:{rate:35,avgInterval:6,newCustomers:29,returning:92},
    prediction:{tomorrow:1449000,weekend:2180000,confidence:79},
  },
  이번주:{
    revenue:9831000,orders:1082,cancelCount:41,cancelRate:3.8,
    prev:{revenue:9120000,orders:998},
    hourly:[
      {t:"10",orders:71,revenue:604000},{t:"11",orders:89,revenue:757000},
      {t:"12",orders:187,revenue:1592000},{t:"13",orders:201,revenue:1709000},
      {t:"14",orders:98,revenue:834000},{t:"15",orders:52,revenue:443000},
      {t:"16",orders:41,revenue:349000},{t:"17",orders:67,revenue:570000},
      {t:"18",orders:192,revenue:1634000},{t:"19",orders:228,revenue:1941000},
      {t:"20",orders:199,revenue:1694000},{t:"21",orders:134,revenue:1141000},{t:"22",orders:56,revenue:477000},
    ],
    weekday:[
      {t:"월",orders:134,revenue:1142000},{t:"화",orders:148,revenue:1260000},
      {t:"수",orders:121,revenue:1028000},{t:"목",orders:156,revenue:1330000},
      {t:"금",orders:189,revenue:1612000},{t:"토",orders:231,revenue:1968000},{t:"일",orders:128,revenue:1449000},
    ],
    payMethods:[
      {name:"카드",icon:"💳",revenue:5567000,orders:612,cancel:22,success:590,color:"#1565C0"},
      {name:"카카오페이",icon:"💛",revenue:2556000,orders:281,cancel:11,success:270,color:"#F9A825"},
      {name:"토스",icon:"🔵",revenue:1312000,orders:144,cancel:5,success:139,color:"#0064FF"},
      {name:"무통장",icon:"🏦",revenue:396000,orders:45,cancel:3,success:42,color:"#455A64"},
    ],
    cancelReasons:[{reason:"고객 변심",count:19,pct:46},{reason:"배달 지연",count:13,pct:32},{reason:"품절",count:9,pct:22}],
    regulars:{rate:41,avgInterval:5,newCustomers:198,returning:884},
    prediction:{tomorrow:1520000,weekend:4280000,confidence:85},
  },
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

// ── 화면 컴포넌트들 ───────────────────────────────────────

function Onboarding({go}){
  const [page,setPage]=useState(0);
  const slides=[
    {icon:"🍽️",color:PRIMARY,bg:PRIMARY_LIGHT,title:"배고팡에 오신걸\n환영해요!",sub:"배고프면 팡! 원하는 음식을\n빠르게 주문해보세요"},
    {icon:"✨",color:AI_COLOR,bg:AI_LIGHT,title:"AI가 오늘 메뉴를\n골라드려요",sub:"기분·인원·예산만 알려주면\nAI가 딱 맞는 메뉴를 추천해요"},
    {icon:"🛵",color:"#2E7D32",bg:"#E8F5E9",title:"빠르고 안전한\n배달 서비스",sub:"실시간 배달 현황을 확인하고\n정확한 도착 시간을 받아보세요"},
    {icon:"⭐",color:"#F57F17",bg:"#FFF8E1",title:"솔직한 리뷰로\n현명하게 선택",sub:"실제 주문자의 생생한 리뷰와\n사진으로 믿을 수 있는 정보를"},
  ];
  const s=slides[page];
  return <Phone noNav noStatus>
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:s.bg,transition:"background .4s"}}>
      <div style={{padding:"16px 20px 0",display:"flex",justifyContent:"flex-end"}}>
        {page<3&&<span onClick={()=>go("login")} style={{fontSize:"13px",color:G[500],fontWeight:600,cursor:"pointer"}}>건너뛰기</span>}
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 32px",gap:"24px",textAlign:"center"}}>
        <div style={{width:"130px",height:"130px",borderRadius:"36px",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"64px",boxShadow:`0 12px 40px ${s.color}33`}}>{s.icon}</div>
        <div><div style={{fontSize:"22px",fontWeight:900,color:G[900],lineHeight:"1.35",whiteSpace:"pre-line"}}>{s.title}</div><div style={{fontSize:"13px",color:G[600],marginTop:"10px",lineHeight:"1.7",whiteSpace:"pre-line"}}>{s.sub}</div></div>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:"8px",padding:"16px 0 6px"}}>
        {slides.map((_,i)=><div key={i} onClick={()=>setPage(i)} style={{height:"7px",borderRadius:"4px",cursor:"pointer",transition:"all .3s",width:i===page?"26px":"7px",background:i===page?s.color:G[300]}}/>)}
      </div>
      <div style={{padding:"14px 24px 32px",display:"flex",flexDirection:"column",gap:"10px"}}>
        {page<3
          ?<button onClick={()=>setPage(p=>p+1)} style={{padding:"15px",borderRadius:"14px",border:"none",background:s.color,color:"#fff",fontSize:"15px",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>다음 →</button>
          :<>
            <button onClick={()=>go("login")} style={{padding:"15px",borderRadius:"14px",border:"none",background:PRIMARY,color:"#fff",fontSize:"15px",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>로그인하기</button>
            <button onClick={()=>go("signup")} style={{padding:"13px",borderRadius:"14px",border:`2px solid ${G[300]}`,background:"#fff",color:G[700],fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>회원가입</button>
          </>
        }
      </div>
    </div>
  </Phone>;
}

function Login({go}){
  return <Phone noNav>
    <div style={{flex:1,padding:"28px 24px",display:"flex",flexDirection:"column",gap:"18px",justifyContent:"center"}}>
      <div style={{textAlign:"center",marginBottom:"4px"}}><div style={{fontSize:"52px"}}>🍽️</div><div style={{fontSize:"22px",fontWeight:900,color:G[900]}}>배고팡</div></div>
      <Btn variant="kakao" full><span style={{fontSize:"17px"}}>💬</span>카카오로 시작하기</Btn>
      <Divider label="또는 아이디로 로그인"/>
      <div style={{display:"flex",flexDirection:"column",gap:"9px"}}><Input placeholder="아이디"/><Input placeholder="비밀번호"/></div>
      <Btn variant="primary" full onClick={()=>go("home")}>로그인</Btn>
      <div style={{display:"flex",justifyContent:"center",gap:"16px",fontSize:"12px",color:G[500]}}>
        <span style={{cursor:"pointer"}}>아이디 찾기</span><span style={{color:G[300]}}>|</span>
        <span style={{cursor:"pointer"}}>비밀번호 찾기</span><span style={{color:G[300]}}>|</span>
        <span onClick={()=>go("signup")} style={{color:PRIMARY,fontWeight:700,cursor:"pointer"}}>회원가입</span>
      </div>
    </div>
  </Phone>;
}

function Signup({go}){
  const [role,setRole]=useState("customer");
  const [idStatus,setIdStatus]=useState(null);
  const handleIdCheck=()=>{setIdStatus("checking");setTimeout(()=>setIdStatus(Math.random()>0.4?"available":"taken"),900);};
  return <Phone noNav>
    <TopBar title="회원가입" go={go} backTo="login"/>
    <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:"14px"}}>
      <div>
        <div style={{fontSize:"12px",fontWeight:700,color:G[600],marginBottom:"7px"}}>회원 유형</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"9px"}}>
          {[{v:"customer",icon:"🛒",label:"고객",desc:"음식 주문"},{v:"owner",icon:"🏪",label:"사장님",desc:"가게 운영"}].map(r=>(
            <button key={r.v} onClick={()=>setRole(r.v)} style={{padding:"14px 10px",border:`2px solid ${role===r.v?PRIMARY:G[300]}`,borderRadius:"12px",background:role===r.v?PRIMARY_LIGHT:"#fff",cursor:"pointer",textAlign:"center",fontFamily:"inherit"}}>
              <div style={{fontSize:"26px",marginBottom:"4px"}}>{r.icon}</div>
              <div style={{fontSize:"13px",fontWeight:800,color:role===r.v?PRIMARY:G[800]}}>{r.label}</div>
              <div style={{fontSize:"11px",color:G[500],marginTop:"2px"}}>{r.desc}</div>
            </button>
          ))}
        </div>
      </div>
      <Divider/>
      <div style={{display:"flex",flexDirection:"column",gap:"9px"}}>
        <div>
          <div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"4px"}}>아이디</div>
          <div style={{display:"flex",gap:"7px",alignItems:"stretch"}}>
            <div style={{flex:1,padding:"10px 13px",border:`1.5px solid ${idStatus==="available"?"#2E7D32":idStatus==="taken"?"#C62828":G[300]}`,borderRadius:"10px",color:G[400],fontSize:"13px",background:G[50]}}>영소문자+숫자 4~10자</div>
            <button onClick={handleIdCheck} style={{padding:"0 13px",borderRadius:"10px",border:`1.5px solid ${PRIMARY}`,background:idStatus==="checking"?G[100]:PRIMARY_LIGHT,color:PRIMARY,fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>{idStatus==="checking"?"확인중…":"중복확인"}</button>
          </div>
          {idStatus==="available"&&<div style={{fontSize:"11px",color:"#2E7D32",fontWeight:600,marginTop:"5px"}}>✓ 사용 가능한 아이디입니다.</div>}
          {idStatus==="taken"&&<div style={{fontSize:"11px",color:"#C62828",fontWeight:600,marginTop:"5px"}}>✗ 이미 사용 중인 아이디입니다.</div>}
        </div>
        {[["닉네임","닉네임 입력"],["이름","실명 입력"],["이메일","example@email.com"],["전화번호","010-0000-0000"],["비밀번호","8~15자"],["비밀번호 확인","재입력"]].map(([l,p])=>(
          <div key={l}><div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"4px"}}>{l}</div><Input placeholder={p}/></div>
        ))}
        {role==="owner"&&<div><div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"4px"}}>사업자번호</div><Input placeholder="000-00-00000"/></div>}
      </div>
      <Btn variant="primary" full onClick={()=>go("home")}>가입하기</Btn>
    </div>
  </Phone>;
}

function Home({go}){
  const [cat,setCat]=useState("전체");
  const cats=["전체","🍚 한식","🥢 중식","🌮 분식","🍗 치킨","🍕 피자","🍣 일식"];
  const stores=[
    {name:"맛있는 한식당",cat:"한식",rating:4.7,reviews:234,dist:"0.8km",minOrder:"12,000",fee:"2,000",speed:"25~35분"},
    {name:"황금 중식당",cat:"중식",rating:4.4,reviews:98,dist:"1.2km",minOrder:"15,000",fee:"3,000",speed:"30~40분"},
    {name:"엄마손 분식",cat:"분식",rating:4.9,reviews:412,dist:"0.4km",minOrder:"8,000",fee:"1,000",speed:"15~25분"},
  ];
  return <Phone navActive="home" go={go}>
    <div style={{padding:"14px 14px 8px",background:"#fff",borderBottom:`1px solid ${G[100]}`,flexShrink:0}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"9px"}}>
        <div><div style={{fontSize:"11px",color:G[500]}}>배달 주소</div><div style={{fontSize:"15px",fontWeight:800,color:G[900],display:"flex",alignItems:"center",gap:"4px"}}>📍 광화문 1가 <span style={{fontSize:"11px",color:PRIMARY}}>▾</span></div></div>
      </div>
      <div style={{padding:"9px 13px",border:`1.5px solid ${G[200]}`,borderRadius:"11px",background:G[50],color:G[400],fontSize:"13px",display:"flex",gap:"8px"}}>{Icon.search()}<span>가게 이름, 메뉴를 검색해보세요</span></div>
    </div>
    <div onClick={()=>go("ai-recommend")} style={{margin:"10px 14px 0",padding:"12px 14px",borderRadius:"13px",background:`linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,cursor:"pointer",display:"flex",alignItems:"center",gap:"10px"}}>
      <span style={{fontSize:"26px"}}>✨</span>
      <div style={{color:"#fff"}}><div style={{fontSize:"13px",fontWeight:800}}>AI 메뉴 추천 받기</div><div style={{fontSize:"11px",opacity:0.85,marginTop:"2px"}}>오늘 뭐 먹을지 모르겠다면?</div></div>
      <span style={{marginLeft:"auto",color:"#fff",fontSize:"18px",opacity:0.8}}>›</span>
    </div>
    <Img h="95px" label="프로모션 배너" style={{borderRadius:0,border:"none",margin:"10px 0 0",flexShrink:0}}/>
    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"12px"}}>
      <div style={{display:"flex",gap:"7px",overflowX:"auto",paddingBottom:"4px",marginLeft:"-14px",paddingLeft:"14px"}}>
        {cats.map(c=><Chip key={c} label={c} active={cat===c} onClick={()=>setCat(c)}/>)}
      </div>
      <Section title="🔥 인기 가게">
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {stores.map((s,i)=>(
            <div key={i} onClick={()=>go("store")} style={{border:`1.5px solid ${G[200]}`,borderRadius:"13px",overflow:"hidden",cursor:"pointer",background:"#fff"}}>
              <Img h="115px" label={s.name} style={{borderRadius:0,border:"none"}}/>
              <div style={{padding:"10px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><span style={{fontSize:"14px",fontWeight:800,color:G[900]}}>{s.name}</span><Badge color="#fff" bg={PRIMARY}>{s.cat}</Badge></div>
                <div style={{display:"flex",alignItems:"center",gap:"4px",margin:"3px 0"}}><Stars v={s.rating}/><span style={{fontSize:"12px",fontWeight:700}}>{s.rating}</span><span style={{fontSize:"11px",color:G[400]}}>{s.reviews}개</span></div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"5px",fontSize:"11px",color:G[500]}}><span>📍{s.dist}</span><span>·</span><span>최소 {s.minOrder}원</span><span>·</span><span>배달비 {s.fee}원</span><span>·</span><span>⏱{s.speed}</span></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  </Phone>;
}

function Store({go}){
  const [activeMenu,setActiveMenu]=useState("인기메뉴");
  const [liked,setLiked]=useState(false);
  const menuTabs=["인기메뉴","세트메뉴","단품","특가"];
  const items=[
    {rank:1,name:"김치찌개",option:"공기밥 포함",price:"8,000",reviews:89,ai:true},
    {rank:2,name:"된장찌개",option:"공기밥 포함",price:"7,500",reviews:62,ai:false},
    {rank:3,name:"불고기 정식",option:"밥+국+반찬3종",price:"12,000",reviews:45,ai:true},
  ];
  return <Phone navActive="home" go={go}>
    <TopBar title="맛있는 한식당" go={go} backTo="home" right={
      <div style={{display:"flex",gap:"4px"}}>
        <button onClick={()=>setLiked(v=>!v)} style={{width:"36px",height:"36px",borderRadius:"50%",border:"none",background:liked?`${PRIMARY}18`:"#f0f0f0",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill={liked?PRIMARY:"none"} stroke={liked?PRIMARY:G[500]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
    }/>
    <div style={{flex:1,overflowY:"auto"}}>
      <Img h="180px" label="가게 대표 이미지" style={{borderRadius:0,border:"none"}}/>
      <div style={{padding:"14px",display:"flex",flexDirection:"column",gap:"12px"}}>
        <div>
          <div style={{fontSize:"18px",fontWeight:900,color:G[900]}}>맛있는 한식당</div>
          <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"5px"}}><Stars v={4.7}/><span style={{fontSize:"13px",fontWeight:700}}>4.7</span><span onClick={()=>go("store-reviews")} style={{fontSize:"11px",color:PRIMARY,cursor:"pointer",textDecoration:"underline"}}>리뷰 234개 보기 →</span></div>
        </div>
        {/* 사진 리뷰 미리보기 */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
            <span style={{fontSize:"13px",fontWeight:800,color:G[900]}}>📸 사진 리뷰</span>
            <span onClick={()=>go("store-reviews")} style={{fontSize:"11px",color:PRIMARY,fontWeight:600,cursor:"pointer"}}>전체보기 →</span>
          </div>
          <div style={{display:"flex",gap:"6px",overflowX:"auto",marginLeft:"-14px",paddingLeft:"14px",paddingRight:"14px",paddingBottom:"4px"}}>
            {[1,2,3,4,5].map(n=>(
              <div key={n} style={{position:"relative",flexShrink:0}}>
                <Img w="80px" h="80px" label={`리뷰${n}`} radius="9px"/>
                {n===5&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.45)",borderRadius:"9px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>go("store-reviews")}><span style={{color:"#fff",fontSize:"12px",fontWeight:800}}>+더보기</span></div>}
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"7px",marginTop:"6px",fontSize:"12px",color:G[600]}}><span>📍 0.8km</span><span>·</span><span>최소 12,000원</span><span>·</span><span>배달비 2,000원</span><span>·</span><span>⏱ 25~35분</span></div>
        </div>
        <div style={{display:"flex",gap:"7px",overflowX:"auto",paddingBottom:"3px",marginLeft:"-14px",paddingLeft:"14px"}}>
          {menuTabs.map(t=>(
            <button key={t} onClick={()=>setActiveMenu(t)} style={{padding:"6px 13px",borderRadius:"20px",fontSize:"12px",fontWeight:600,border:"none",background:activeMenu===t?PRIMARY:G[100],color:activeMenu===t?"#fff":G[600],cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:"inherit"}}>{t}</button>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"9px"}}>
          {items.map((m,i)=>(
            <div key={i} onClick={()=>go("menu-detail")} style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"11px",display:"flex",gap:"10px",background:"#fff",cursor:"pointer"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"5px",flexWrap:"wrap"}}>
                  <Badge bg={m.rank===1?PRIMARY:G[200]} color={m.rank===1?"#fff":G[500]}>인기 {m.rank}위</Badge>
                  {m.ai&&<Badge color="#7B1FA2" bg="#F3E5F5">✨AI</Badge>}
                </div>
                <div style={{fontSize:"14px",fontWeight:800,color:G[900]}}>{m.name}</div>
                <div style={{fontSize:"11px",color:G[500],marginTop:"2px"}}>{m.option}</div>
                <div style={{fontSize:"14px",fontWeight:800,marginTop:"7px"}}>{m.price}원</div>
              </div>
              <Img w="74px" h="74px" label={m.name} radius="9px"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Phone>;
}

function StoreReviews({go}){
  const [filter,setFilter]=useState("전체");
  const filters=["전체","5점","4점","3점 이하","사진 리뷰"];
  const reviews=[
    {user:"user123",rating:5,date:"2025-03-01",menu:"김치찌개",content:"국물이 진짜 얼큰하고 맛있어요! 공기밥도 포함이라 배부르게 먹었습니다.",img:true,ownerReply:"소중한 리뷰 감사합니다 😊"},
    {user:"user456",rating:4,date:"2025-02-28",menu:"불고기 정식",content:"양념이 잘 배어있고 반찬도 신선했어요.",img:false,ownerReply:null},
    {user:"user999",rating:3,date:"2025-02-25",menu:"김치찌개",content:"맛은 평범했어요.",img:false,ownerReply:null},
  ];
  return <Phone navActive="home" go={go}>
    <TopBar title="가게 리뷰" go={go} backTo="store"/>
    <div style={{flex:1,overflowY:"auto"}}>
      <div style={{padding:"14px",borderBottom:`1px solid ${G[100]}`,background:"#fff",display:"flex",flexDirection:"column",gap:"12px"}}>
        {/* 평점 요약 */}
        <div style={{display:"flex",gap:"14px",alignItems:"center"}}>
          <div style={{textAlign:"center",flexShrink:0}}>
            <div style={{fontSize:"38px",fontWeight:900,color:G[900],lineHeight:1}}>4.7</div>
            <Stars v={4.7} size={14}/>
            <div style={{fontSize:"10px",color:G[400],marginTop:"3px"}}>234개 리뷰</div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:"4px"}}>
            {[{star:5,count:168},{star:4,count:42},{star:3,count:14},{star:2,count:6},{star:1,count:4}].map(({star,count})=>{
              const pct=Math.round(count/234*100);
              return <div key={star} style={{display:"flex",alignItems:"center",gap:"5px"}}>
                <span style={{fontSize:"10px",color:G[500],width:"14px",textAlign:"right",flexShrink:0}}>{star}</span>
                <svg width="9" height="9" viewBox="0 0 24 24" style={{flexShrink:0}}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#FFC107"/></svg>
                <div style={{flex:1,height:"6px",background:G[100],borderRadius:"3px",overflow:"hidden"}}>
                  <div style={{width:`${pct}%`,height:"100%",background:star>=4?"#FFC107":star===3?"#FFB74D":"#FFCDD2",borderRadius:"3px",transition:"width .3s"}}/>
                </div>
                <span style={{fontSize:"10px",color:G[400],width:"22px",textAlign:"right",flexShrink:0}}>{count}</span>
              </div>;
            })}
          </div>
        </div>
        {/* 사장님 공지 */}
        <div style={{padding:"11px 12px",background:"#FFF8E1",borderRadius:"10px",border:`1px solid #FFD54F`}}>
          <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px"}}>
            <span style={{fontSize:"13px"}}>📢</span>
            <span style={{fontSize:"12px",fontWeight:800,color:"#E65100"}}>사장님 공지</span>
            <span style={{fontSize:"10px",color:G[400],marginLeft:"auto"}}>2025-03-01</span>
          </div>
          <div style={{fontSize:"12px",color:G[700],lineHeight:"1.7"}}>
            안녕하세요! 맛있는 한식당입니다 😊<br/>
            매주 월요일은 재료 수급으로 일부 메뉴가 품절될 수 있습니다. 항상 맛있는 음식으로 보답하겠습니다. 감사합니다 🙏
          </div>
        </div>
      </div>
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"12px"}}>
        <div style={{display:"flex",gap:"5px",overflowX:"auto"}}>
          {filters.map(f=><Chip key={f} label={f} active={filter===f} onClick={()=>setFilter(f)}/>)}
        </div>
        {reviews.map((r,i)=>(
          <div key={i} style={{border:`1.5px solid ${G[200]}`,borderRadius:"13px",padding:"12px",background:"#fff",display:"flex",flexDirection:"column",gap:"8px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{display:"flex",alignItems:"center",gap:"7px"}}>{FlatIcons.userAvatar(33)}<div><div style={{fontSize:"12px",fontWeight:700}}>{r.user}</div><div style={{fontSize:"10px",color:G[400]}}>{r.date}</div></div></div>
              <div style={{textAlign:"right"}}><Stars v={r.rating} size={12}/><div style={{fontSize:"10px",color:G[500],marginTop:"2px"}}>#{r.menu}</div></div>
            </div>
            <div style={{fontSize:"12px",color:G[700],lineHeight:"1.7"}}>{r.content}</div>
            {r.img&&<div style={{display:"flex",gap:"5px"}}><Img w="72px" h="72px" label="사진" radius="7px"/><Img w="72px" h="72px" label="사진2" radius="7px"/></div>}
            {r.ownerReply&&<div style={{padding:"9px 11px",background:"#FFF8E1",borderRadius:"7px",borderLeft:`3px solid #FFC107`}}><div style={{fontSize:"10px",fontWeight:700,color:"#F57F17",marginBottom:"3px"}}>🏪 사장님 답글</div><div style={{fontSize:"11px",color:G[700]}}>{r.ownerReply}</div></div>}
          </div>
        ))}
      </div>
    </div>
  </Phone>;
}

function MenuDetail({go}){
  const [qty,setQty]=useState(1);
  const [selectedSize,setSelectedSize]=useState("보통");
  const [selectedSpicy,setSelectedSpicy]=useState("보통맛");
  const [selectedAdd,setSelectedAdd]=useState([]);
  const price=8000;
  const addCost=selectedAdd.includes("공기밥 추가")?1000:0+selectedAdd.includes("계란 추가")?500:0+selectedAdd.includes("치즈 추가")?1500:0;
  const sizeCost=selectedSize==="대(+2,000원)"?2000:0;
  const total=(price+addCost+sizeCost)*qty;
  const toggleAdd=(val)=>setSelectedAdd(a=>a.includes(val)?a.filter(v=>v!==val):[...a,val]);
  return <Phone navActive="home" go={go}>
    <TopBar title="메뉴 상세" go={go} backTo="store"/>
    <div style={{flex:1,overflowY:"auto"}}>
      <Img h="210px" label="김치찌개 이미지" style={{borderRadius:0,border:"none",flexShrink:0}}/>
      <div style={{padding:"16px 16px 0",display:"flex",flexDirection:"column",gap:"14px"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:"7px",flexWrap:"wrap",marginBottom:"5px"}}>
            <span style={{fontSize:"20px",fontWeight:900,color:G[900]}}>김치찌개</span>
            <Badge color="#7B1FA2" bg="#F3E5F5">✨ AI 추천</Badge>
            <Badge color="#fff" bg={PRIMARY}>인기 1위</Badge>
          </div>
          <div style={{fontSize:"13px",color:G[500],lineHeight:"1.7"}}>30년 전통의 손맛으로 끓인 얼큰한 김치찌개입니다.</div>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <div style={{flex:1,padding:"12px",background:PRIMARY_LIGHT,borderRadius:"11px",textAlign:"center"}}>
            <div style={{fontSize:"10px",color:G[500],fontWeight:600}}>기본 가격</div>
            <div style={{fontSize:"20px",fontWeight:900,color:PRIMARY,marginTop:"2px"}}>8,000원</div>
          </div>
          <div style={{flex:1,padding:"12px",background:G[50],borderRadius:"11px",textAlign:"center"}}>
            <div style={{fontSize:"10px",color:G[500],fontWeight:600}}>평점</div>
            <div style={{fontSize:"16px",fontWeight:900,color:G[900],marginTop:"2px"}}>4.8 ★</div>
          </div>
        </div>
        <Divider/>
        {/* 원산지 */}
        <div style={{padding:"11px 13px",background:G[50],borderRadius:"10px",border:`1px solid ${G[200]}`}}>
          <div style={{fontSize:"12px",fontWeight:800,color:G[900],marginBottom:"8px"}}>📋 원산지 정보</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
            {[["돼지고기","국내산(제주)"],["김치","국내산"],["두부","국내산"],["대파","국내산"],["고춧가루","국내산"]].map(([item,origin])=>(
              <div key={item} style={{display:"flex",alignItems:"center",borderRadius:"20px",overflow:"hidden",border:`1px solid ${G[300]}`,fontSize:"11px",flexShrink:0}}>
                <span style={{padding:"4px 8px",background:G[200],color:G[700],fontWeight:700}}>{item}</span>
                <span style={{padding:"4px 9px",background:"#fff",color:G[500],fontWeight:500}}>{origin}</span>
              </div>
            ))}
          </div>
        </div>
        <Divider/>
        {/* 사이즈 */}
        <div>
          <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"8px"}}>사이즈 <Badge bg={PRIMARY} color="#fff">필수</Badge></div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            {[{label:"보통",price:0},{label:"대(+2,000원)",price:2000}].map((opt,i)=>(
              <div key={i} onClick={()=>setSelectedSize(opt.label)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 13px",border:`1.5px solid ${selectedSize===opt.label?PRIMARY:G[200]}`,borderRadius:"9px",background:selectedSize===opt.label?PRIMARY_LIGHT:"#fff",cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
                  <div style={{width:"18px",height:"18px",borderRadius:"50%",border:`2px solid ${selectedSize===opt.label?PRIMARY:G[300]}`,background:selectedSize===opt.label?PRIMARY:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {selectedSize===opt.label&&<div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#fff"}}/>}
                  </div>
                  <span style={{fontSize:"13px",fontWeight:selectedSize===opt.label?700:400,color:selectedSize===opt.label?PRIMARY:G[800]}}>{opt.label}</span>
                </div>
                {opt.price>0&&<span style={{fontSize:"12px",fontWeight:700,color:G[600]}}>+{opt.price.toLocaleString()}원</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"8px"}}>
          <span style={{fontSize:"13px",fontWeight:800,color:G[900]}}>수량</span>
          <div style={{display:"flex",alignItems:"center",gap:"14px",border:`1.5px solid ${G[300]}`,borderRadius:"10px",padding:"6px 14px"}}>
            <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{width:"26px",height:"26px",borderRadius:"50%",border:`1.5px solid ${G[300]}`,background:"#fff",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
            <span style={{fontSize:"16px",fontWeight:900,minWidth:"20px",textAlign:"center"}}>{qty}</span>
            <button onClick={()=>setQty(q=>q+1)} style={{width:"26px",height:"26px",borderRadius:"50%",border:"none",background:PRIMARY,cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff"}}>+</button>
          </div>
        </div>
      </div>
    </div>
    <div style={{padding:"12px 16px",borderTop:`1px solid ${G[200]}`,background:"#fff",display:"flex",gap:"10px",alignItems:"center",flexShrink:0}}>
      <div><div style={{fontSize:"10px",color:G[500]}}>총 금액</div><div style={{fontSize:"18px",fontWeight:900,color:PRIMARY}}>{total.toLocaleString()}원</div></div>
      <Btn variant="primary" full style={{flex:1}} onClick={()=>go("cart")}>🛒 장바구니 담기</Btn>
    </div>
  </Phone>;
}

function AiRecommend({go}){
  const [step,setStep]=useState(0);
  const [sel,setSel]=useState({mood:null,people:null,budget:null});
  const moods=["🌶️ 매운 게 땡겨요","🥣 따뜻한 국물","🥗 가볍게","🍖 고기가 땡겨요","🍜 면 요리","🎲 아무거나"];
  const people=["혼자","2~3명","4명 이상"];
  const budget=["1만원 이하","1~2만원","2만원 이상"];
  const results=[
    {name:"김치찌개",store:"맛있는 한식당",price:"8,000",reason:"오늘 날씨에 딱 맞는 얼큰한 국물이에요!",match:98},
    {name:"불고기 정식",store:"맛있는 한식당",price:"12,000",reason:"든든한 한 끼, 반찬이 다양해 만족도가 높아요.",match:91},
    {name:"순두부찌개",store:"두부마을",price:"9,000",reason:"부드럽고 깊은 맛, 소화도 잘 돼요.",match:85},
  ];
  return <Phone navActive="ai-recommend" go={go}>
    <TopBar title="✨ AI 메뉴 추천" go={go} backTo="home"/>
    <div style={{flex:1,overflowY:"auto"}}>
      {step===0&&(
        <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:"18px"}}>
          <div style={{padding:"16px",borderRadius:"14px",background:`linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,textAlign:"center",color:"#fff"}}><div style={{fontSize:"30px",marginBottom:"5px"}}>🤖</div><div style={{fontSize:"15px",fontWeight:800}}>오늘 뭐 먹을까요?</div></div>
          <div><div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"9px"}}>Q1. 오늘 어떤 음식이 땡기나요?</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>{moods.map(m=><div key={m} onClick={()=>setSel(s=>({...s,mood:m}))} style={{padding:"11px 9px",border:`2px solid ${sel.mood===m?AI_COLOR:G[300]}`,borderRadius:"9px",background:sel.mood===m?AI_LIGHT:"#fff",cursor:"pointer",fontSize:"12px",fontWeight:600,color:sel.mood===m?AI_COLOR:G[700],textAlign:"center"}}>{m}</div>)}</div></div>
          <div><div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"9px"}}>Q2. 몇 명이서 드세요?</div><div style={{display:"flex",gap:"7px"}}>{people.map(p=><div key={p} onClick={()=>setSel(s=>({...s,people:p}))} style={{flex:1,padding:"11px 0",border:`2px solid ${sel.people===p?AI_COLOR:G[300]}`,borderRadius:"9px",background:sel.people===p?AI_LIGHT:"#fff",cursor:"pointer",fontSize:"12px",fontWeight:600,color:sel.people===p?AI_COLOR:G[700],textAlign:"center"}}>{p}</div>)}</div></div>
          <div><div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"9px"}}>Q3. 예산은요?</div><div style={{display:"flex",gap:"7px"}}>{budget.map(b=><div key={b} onClick={()=>setSel(s=>({...s,budget:b}))} style={{flex:1,padding:"11px 0",border:`2px solid ${sel.budget===b?AI_COLOR:G[300]}`,borderRadius:"9px",background:sel.budget===b?AI_LIGHT:"#fff",cursor:"pointer",fontSize:"11px",fontWeight:600,color:sel.budget===b?AI_COLOR:G[700],textAlign:"center"}}>{b}</div>)}</div></div>
          <Btn variant="ai" full onClick={()=>{setStep(1);setTimeout(()=>setStep(2),1800);}}>✨ AI 추천 받기</Btn>
        </div>
      )}
      {step===1&&<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"18px",padding:"40px 24px"}}><div style={{fontSize:"52px"}}>🤖</div><div style={{fontSize:"15px",fontWeight:800,color:AI_COLOR}}>AI가 분석 중이에요...</div></div>}
      {step===2&&(
        <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:"12px"}}>
          <div style={{padding:"12px 14px",borderRadius:"13px",background:`linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,color:"#fff"}}><div style={{fontSize:"15px",fontWeight:800}}>✨ {sel.mood||"얼큰한 국물"}에 딱!</div></div>
          {results.map((r,i)=>(
            <div key={i} onClick={()=>go("menu-detail")} style={{border:`1.5px solid ${i===0?AI_COLOR:G[200]}`,borderRadius:"13px",padding:"12px",background:i===0?AI_LIGHT:"#fff",cursor:"pointer"}}>
              {i===0&&<div style={{textAlign:"right",marginBottom:"5px"}}><Badge bg={AI_COLOR} color="#fff">🥇 1순위 추천</Badge></div>}
              <div style={{display:"flex",gap:"10px"}}><Img w="70px" h="70px" label={r.name} radius="9px"/><div style={{flex:1}}><div style={{fontSize:"14px",fontWeight:800,color:i===0?AI_COLOR:G[900]}}>{r.name}</div><div style={{fontSize:"10px",color:G[500],marginTop:"2px"}}>🏪 {r.store}</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"5px"}}><span style={{fontSize:"13px",fontWeight:800}}>{r.price}원</span><Badge bg={AI_COLOR} color="#fff">{r.match}%</Badge></div></div></div>
              <div style={{marginTop:"8px",padding:"7px 9px",background:i===0?"#EDE7FF":G[50],borderRadius:"7px",fontSize:"11px",color:i===0?AI_COLOR:G[600]}}>💬 {r.reason}</div>
            </div>
          ))}
          <Btn full onClick={()=>setStep(0)}>↩ 다시 추천받기</Btn>
        </div>
      )}
    </div>
  </Phone>;
}

function Cart({go}){
  const stores=[
    {name:"맛있는 한식당",items:[{name:"김치찌개",opt:"공기밥 포함",price:8000,qty:1},{name:"불고기 정식",opt:"밥+국+반찬3종",price:12000,qty:2}],fee:2000},
    {name:"엄마손 분식",items:[{name:"떡볶이",opt:"매운맛",price:5000,qty:1}],fee:1000},
  ];
  const [checked,setChecked]=useState(stores.map(()=>true));
  const [itemChecked,setItemChecked]=useState(stores.map(s=>s.items.map(()=>true)));
  const toggleStore=(si)=>{const nc=[...checked];nc[si]=!nc[si];setChecked(nc);setItemChecked(itemChecked.map((sg,i)=>i===si?sg.map(()=>nc[si]):sg));};
  const toggleItem=(si,ii)=>setItemChecked(itemChecked.map((sg,i)=>i===si?sg.map((v,j)=>j===ii?!v:v):sg));
  const totalGoods=stores.reduce((acc,s,si)=>acc+s.items.reduce((a,it,ii)=>a+(itemChecked[si][ii]?it.price*it.qty:0),0),0);
  const totalFee=stores.reduce((acc,s,si)=>acc+(checked[si]?s.fee:0),0);
  return <Phone navActive="cart" go={go}>
    <TopBar title="🛒 장바구니" go={go} backTo="home"/>
    <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"12px"}}>
      {stores.map((s,si)=>(
        <div key={si} style={{border:`1.5px solid ${checked[si]?PRIMARY:G[200]}`,borderRadius:"13px",overflow:"hidden"}}>
          <div style={{padding:"10px 12px",background:checked[si]?PRIMARY_LIGHT:G[50],borderBottom:`1px solid ${G[200]}`,display:"flex",alignItems:"center",gap:"9px"}}>
            <input type="checkbox" checked={checked[si]} onChange={()=>toggleStore(si)} style={{accentColor:PRIMARY,width:"16px",height:"16px"}}/>
            <span style={{fontSize:"14px",fontWeight:800,flex:1,color:checked[si]?PRIMARY:G[700]}}>{s.name}</span>
          </div>
          <div style={{padding:"11px 12px",display:"flex",flexDirection:"column",gap:"10px",background:"#fff"}}>
            {s.items.map((it,ii)=>(
              <div key={ii} style={{display:"flex",alignItems:"center",gap:"9px",opacity:!checked[si]||!itemChecked[si][ii]?0.4:1}}>
                <input type="checkbox" checked={itemChecked[si][ii]} onChange={()=>toggleItem(si,ii)} style={{accentColor:PRIMARY,width:"15px",height:"15px",flexShrink:0}}/>
                <div style={{flex:1}}><div style={{fontSize:"13px",fontWeight:700}}>{it.name}</div><div style={{fontSize:"11px",color:G[500]}}>{it.opt}</div><div style={{fontSize:"13px",fontWeight:800,marginTop:"2px"}}>{(it.price*it.qty).toLocaleString()}원</div></div>
                <div style={{display:"flex",alignItems:"center",gap:"5px",border:`1.5px solid ${G[300]}`,borderRadius:"7px",padding:"3px 7px"}}>
                  <span style={{fontSize:"15px",cursor:"pointer",color:G[500],fontWeight:700,userSelect:"none"}}>−</span><span style={{fontSize:"13px",fontWeight:700,minWidth:"14px",textAlign:"center"}}>{it.qty}</span><span style={{fontSize:"15px",cursor:"pointer",color:PRIMARY,fontWeight:700,userSelect:"none"}}>+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{padding:"12px",background:PRIMARY_LIGHT,borderRadius:"11px"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",color:G[600],marginBottom:"4px"}}><span>상품금액</span><span>{totalGoods.toLocaleString()}원</span></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",color:G[600],marginBottom:"8px"}}><span>배달비</span><span>{totalFee.toLocaleString()}원</span></div>
        <Divider/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"16px",fontWeight:900,marginTop:"7px"}}><span>결제예정</span><span style={{color:PRIMARY}}>{(totalGoods+totalFee).toLocaleString()}원</span></div>
      </div>
      <Btn variant="primary" full size="lg" onClick={()=>go("order")}>전체 주문하기</Btn>
    </div>
  </Phone>;
}

function Order({go}){
  const [pay,setPay]=useState("card");
  const [cardType,setCardType]=useState("");
  const [cardNum,setCardNum]=useState(["","","",""]);
  const [cardPw,setCardPw]=useState("");
  const [cvc,setCvc]=useState("");
  const [expiry,setExpiry]=useState("");
  const cardTypes=["KB국민","신한","하나","우리","삼성","현대","롯데","NH농협","IBK기업","씨티"];
  const fmtCardNum=(val,idx)=>{const d=val.replace(/\D/g,"").slice(0,4);const next=[...cardNum];next[idx]=d;setCardNum(next);};
  const fmtExpiry=(val)=>{const d=val.replace(/\D/g,"").slice(0,4);if(d.length>=3) setExpiry(d.slice(0,2)+"/"+d.slice(2));else setExpiry(d);};
  return <Phone navActive="cart" go={go}>
    <TopBar title="주문하기" go={go} backTo="cart"/>
    <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"12px"}}>
      <div style={{padding:"11px",background:G[50],borderRadius:"11px",border:`1px solid ${G[200]}`,fontSize:"12px",color:G[600],lineHeight:"1.9"}}>
        <div style={{fontWeight:700,color:G[800],marginBottom:"2px"}}>맛있는 한식당</div>
        <div style={{display:"flex",justifyContent:"space-between"}}><span>김치찌개 × 1</span><span>8,000원</span></div>
        <div style={{display:"flex",justifyContent:"space-between"}}><span>불고기 정식 × 2</span><span>24,000원</span></div>
      </div>
      <Section title="배달 주소">
        <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
          <div style={{padding:"10px 12px",border:`1.5px solid ${PRIMARY}`,borderRadius:"9px",background:PRIMARY_LIGHT,fontSize:"12px",fontWeight:600,color:PRIMARY}}>📌 서울 종로구 세종대로 172</div>
          <Input placeholder="상세 주소 (동·호수·층)"/>
        </div>
      </Section>
      <Section title="결제 수단">
        <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
          {[
            {v:"card",icon:"💳",label:"신용 / 체크카드"},
            {v:"kakao",icon:"💛",label:"카카오페이"},
            {v:"toss",icon:"🔵",label:"토스"},
            {v:"bank",icon:"🏦",label:"무통장 입금"},
          ].map(m=>(
            <div key={m.v}>
              <Radio checked={pay===m.v} onClick={()=>setPay(m.v)}>
                <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
                  <span style={{fontSize:"18px"}}>{m.icon}</span>
                  <span style={{fontSize:"13px",fontWeight:pay===m.v?700:500,color:pay===m.v?PRIMARY:G[800]}}>{m.label}</span>
                </div>
              </Radio>
              {m.v==="card"&&pay==="card"&&(
                <div style={{marginTop:"7px",padding:"13px",border:`1.5px solid ${G[300]}`,borderRadius:"11px",background:"#fff",display:"flex",flexDirection:"column",gap:"10px"}}>
                  {/* 카드 종류 */}
                  <div>
                    <div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"5px"}}>카드 종류</div>
                    <select value={cardType} onChange={e=>setCardType(e.target.value)} style={{width:"100%",padding:"9px 12px",border:`1.5px solid ${G[300]}`,borderRadius:"8px",fontSize:"13px",color:cardType?G[900]:G[400],background:"#fff",outline:"none",fontFamily:"inherit",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239E9E9E' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center"}}>
                      <option value="">카드사 선택</option>
                      {cardTypes.map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  {/* 카드 번호 */}
                  <div>
                    <div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"5px"}}>카드 번호 16자리</div>
                    <div style={{display:"flex",alignItems:"center",gap:"4px",background:"#fff",padding:"4px 0"}}>
                      {cardNum.map((v,i)=>(
                        <input key={i} value={v} onChange={e=>fmtCardNum(e.target.value,i)} maxLength={4} placeholder="0000" style={{flex:1,minWidth:0,padding:"6px 0",textAlign:"center",border:"none",borderBottom:`1.5px solid ${G[300]}`,fontSize:"13px",fontWeight:700,fontFamily:"monospace",background:"transparent",outline:"none",color:G[900],letterSpacing:"2px"}}/>
                      ))}
                    </div>
                  </div>
                  {/* 카드 비번 앞 두자리 + CVC */}
                  <div style={{display:"flex",gap:"9px"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"5px"}}>카드 비밀번호 앞 2자리</div>
                      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                        <input value={cardPw} onChange={e=>setCardPw(e.target.value.replace(/\D/g,"").slice(0,2))} maxLength={2} placeholder="__" type="password" style={{width:"44px",padding:"6px 0",textAlign:"center",border:"none",borderBottom:`1.5px solid ${G[300]}`,fontSize:"15px",fontFamily:"monospace",background:"transparent",outline:"none",fontWeight:700}}/>
                        <span style={{fontSize:"13px",color:G[400],fontFamily:"monospace",fontWeight:700,letterSpacing:"4px"}}>**</span>
                      </div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"5px"}}>CVC</div>
                      <input value={cvc} onChange={e=>setCvc(e.target.value.replace(/\D/g,"").slice(0,3))} maxLength={3} placeholder="000" type="password" style={{width:"100%",padding:"6px 0",textAlign:"center",border:"none",borderBottom:`1.5px solid ${G[300]}`,fontSize:"14px",fontFamily:"monospace",background:"transparent",outline:"none",boxSizing:"border-box",fontWeight:700}}/>
                    </div>
                  </div>
                  {/* 유효기간 */}
                  <div>
                    <div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"5px"}}>유효기간 (YY/MM)</div>
                    <input value={expiry} onChange={e=>fmtExpiry(e.target.value)} maxLength={5} placeholder="YY/MM" style={{width:"100px",padding:"6px 0",border:"none",borderBottom:`1.5px solid ${G[300]}`,fontSize:"14px",fontFamily:"monospace",background:"transparent",outline:"none",fontWeight:700,letterSpacing:"1px",color:G[900]}}/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
      <div style={{padding:"12px",background:G[50],borderRadius:"11px",border:`1px solid ${G[200]}`}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",color:G[600],lineHeight:"2"}}><span>상품금액</span><span>37,000원</span></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",color:G[600]}}><span>배달비</span><span>3,000원</span></div>
        <Divider/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"16px",fontWeight:900,marginTop:"5px"}}><span>최종 결제금액</span><span style={{color:PRIMARY}}>40,000원</span></div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
        <Btn variant="primary" full size="lg" onClick={()=>go("order-complete")}>40,000원 결제하기</Btn>
        <button onClick={()=>go("order-fail")} style={{padding:"10px",borderRadius:"10px",border:`1.5px solid ${G[300]}`,background:"#fff",color:G[400],fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>결제 실패 테스트 →</button>
      </div>
    </div>
  </Phone>;
}

function OrderFail({go}){
  const [retrying,setRetrying]=useState(false);
  const [retried,setRetried]=useState(false);
  const [reasonIdx,setReasonIdx]=useState(0);
  const failReasons=[
    {code:"INSUFFICIENT_BALANCE",title:"잔액 부족",desc:"카드 잔액이 부족합니다. 다른 결제 수단을 이용하거나 충전 후 다시 시도해 주세요.",icon:"💳",tip:"다른 카드나 간편결제를 사용해 보세요."},
    {code:"NETWORK_ERROR",title:"네트워크 오류",desc:"결제 처리 중 네트워크 연결이 끊겼습니다. 잠시 후 다시 시도해 주세요.",icon:"📶",tip:"Wi-Fi 또는 데이터 연결을 확인하세요."},
    {code:"CARD_LIMIT",title:"카드 한도 초과",desc:"이번 달 카드 한도를 초과했습니다. 다른 결제 수단을 이용해 주세요.",icon:"🚫",tip:"다른 카드 혹은 계좌이체를 이용하세요."},
  ];
  const reason=failReasons[reasonIdx];
  const handleRetry=()=>{setRetrying(true);setTimeout(()=>{setRetrying(false);setRetried(true);},2000);};
  if(retried){
    return <Phone noNav>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 22px",gap:"20px",textAlign:"center"}}>
        <div style={{width:"90px",height:"90px",borderRadius:"50%",background:"#E8F5E9",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2E7D32" opacity=".15"/><circle cx="12" cy="12" r="10" stroke="#2E7D32" strokeWidth="1.5"/><polyline points="8 12 11 15 16 9" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div><div style={{fontSize:"20px",fontWeight:900,color:"#2E7D32"}}>재결제 성공!</div><div style={{fontSize:"13px",color:G[500],marginTop:"5px"}}>주문이 완료되었습니다</div></div>
        <Btn variant="primary" full onClick={()=>go("order-complete")}>주문 완료 보기</Btn>
      </div>
    </Phone>;
  }
  return <Phone noNav>
    <TopBar title="결제 실패" go={go} backTo="order"/>
    <div style={{flex:1,overflowY:"auto",padding:"20px 18px",display:"flex",flexDirection:"column",gap:"16px"}}>
      <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"}}>
        <div style={{width:"88px",height:"88px",borderRadius:"50%",background:"#FFEBEE",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(198,40,40,0.18)"}}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#C62828" opacity=".12"/><circle cx="12" cy="12" r="10" stroke="#C62828" strokeWidth="1.8"/><path d="M15 9l-6 6M9 9l6 6" stroke="#C62828" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <div>
          <div style={{fontSize:"20px",fontWeight:900,color:"#C62828"}}>결제에 실패했어요</div>
          <div style={{fontSize:"12px",color:G[500],marginTop:"4px"}}>주문은 취소되지 않았습니다</div>
        </div>
      </div>
      {/* 실패 유형 선택 (테스트) */}
      <div style={{padding:"9px 11px",background:G[50],borderRadius:"9px",border:`1px solid ${G[200]}`}}>
        <div style={{fontSize:"10px",fontWeight:700,color:G[400],marginBottom:"6px"}}>실패 유형 미리보기 (테스트)</div>
        <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
          {failReasons.map((r,i)=>(
            <button key={i} onClick={()=>setReasonIdx(i)} style={{padding:"4px 9px",borderRadius:"6px",border:`1.5px solid ${reasonIdx===i?"#C62828":G[300]}`,background:reasonIdx===i?"#FFEBEE":"#fff",color:reasonIdx===i?"#C62828":G[600],fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{r.title}</button>
          ))}
        </div>
      </div>
      {/* 실패 사유 카드 */}
      <div style={{padding:"16px",background:"#FFF5F5",border:`1.5px solid #FFCDD2`,borderRadius:"13px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{width:"42px",height:"42px",borderRadius:"12px",background:"#FFEBEE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",flexShrink:0}}>{reason.icon}</div>
          <div>
            <div style={{fontSize:"14px",fontWeight:900,color:"#C62828"}}>실패 원인: {reason.title}</div>
            <div style={{fontSize:"10px",color:G[400],marginTop:"2px",fontWeight:600}}>오류 코드: {reason.code}</div>
          </div>
        </div>
        <div style={{fontSize:"12px",color:G[700],lineHeight:"1.7",padding:"10px 12px",background:"#fff",borderRadius:"9px",border:`1px solid #FFCDD2`}}>{reason.desc}</div>
        <div style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",color:"#E65100",fontWeight:600}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
          💡 {reason.tip}
        </div>
      </div>
      {/* 주문 요약 */}
      <div style={{padding:"12px 13px",background:G[50],borderRadius:"11px",border:`1px solid ${G[200]}`,fontSize:"12px",color:G[600],lineHeight:"1.9"}}>
        <div style={{fontWeight:700,color:G[800],marginBottom:"3px"}}>맛있는 한식당</div>
        <div style={{display:"flex",justifyContent:"space-between"}}><span>김치찌개 × 1</span><span>8,000원</span></div>
        <div style={{display:"flex",justifyContent:"space-between"}}><span>불고기 정식 × 2</span><span>24,000원</span></div>
        <Divider/>
        <div style={{display:"flex",justifyContent:"space-between",fontWeight:800,color:G[900]}}><span>결제 시도 금액</span><span style={{color:"#C62828"}}>40,000원</span></div>
      </div>
      {/* 재결제 버튼 */}
      <button onClick={handleRetry} disabled={retrying} style={{width:"100%",padding:"15px",borderRadius:"12px",border:"none",background:retrying?G[300]:PRIMARY,color:"#fff",fontSize:"15px",fontWeight:800,cursor:retrying?"not-allowed":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        {retrying?"결제 처리 중...":"40,000원 재결제하기"}
      </button>
      <div style={{display:"flex",gap:"8px"}}>
        <Btn style={{flex:1}} onClick={()=>go("order")}>← 결제 수단 변경</Btn>
        <Btn style={{flex:1}} onClick={()=>go("cart")}>장바구니로</Btn>
      </div>
      <div style={{textAlign:"center",fontSize:"11px",color:G[400],lineHeight:"1.6"}}>
        결제 실패 시 금액이 청구되지 않습니다.<br/>문제가 지속되면 <span style={{color:PRIMARY,fontWeight:700,cursor:"pointer"}}>고객센터</span>로 문의해 주세요.
      </div>
    </div>
  </Phone>;
}

function OrderComplete({go}){
  const [cancelConfirm,setCancelConfirm]=useState(false);
  const [cancelled,setCancelled]=useState(false);
  if(cancelled){
    return <Phone noNav>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 22px",gap:"20px",textAlign:"center"}}>
        <div style={{width:"90px",height:"90px",borderRadius:"50%",background:"#FFEBEE",display:"flex",alignItems:"center",justifyContent:"center"}}>{FlatIcons.cancel("#C62828")}</div>
        <div><div style={{fontSize:"20px",fontWeight:900,color:"#C62828"}}>주문이 취소됐어요</div><div style={{fontSize:"13px",color:G[500],marginTop:"5px"}}>주문번호 ORD-2025-001</div></div>
        <div style={{fontSize:"12px",color:G[400],background:G[50],borderRadius:"10px",padding:"12px 16px",border:`1px solid ${G[200]}`}}>결제금액은 3~5 영업일 내에 환불됩니다.</div>
        <Btn variant="primary" full onClick={()=>go("home")}>홈으로</Btn>
      </div>
    </Phone>;
  }
  return <Phone noNav>
    {cancelConfirm&&(
      <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:"320px",background:"#fff",borderRadius:"16px",padding:"22px 20px",display:"flex",flexDirection:"column",gap:"14px",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}}>
          <div style={{textAlign:"center"}}><div style={{fontSize:"20px",fontWeight:900,color:G[900]}}>주문을 취소할까요?</div><div style={{fontSize:"12px",color:G[500],marginTop:"5px",lineHeight:"1.7"}}>가게가 주문을 수락하기 전까지만 취소 가능합니다.</div></div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>setCancelConfirm(false)} style={{flex:1,padding:"12px",borderRadius:"10px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:G[700]}}>아니요</button>
            <button onClick={()=>{setCancelConfirm(false);setCancelled(true);}} style={{flex:1,padding:"12px",borderRadius:"10px",border:"none",background:"#C62828",color:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>취소할게요</button>
          </div>
        </div>
      </div>
    )}
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 22px",gap:"20px",textAlign:"center"}}>
      <div style={{width:"90px",height:"90px",borderRadius:"50%",background:"#E8F5E9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"44px"}}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2E7D32" opacity=".15"/><circle cx="12" cy="12" r="10" stroke="#2E7D32" strokeWidth="1.5"/><polyline points="8 12 11 15 16 9" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div><div style={{fontSize:"20px",fontWeight:900,color:G[900]}}>주문이 완료됐어요!</div><div style={{fontSize:"13px",color:G[500],marginTop:"5px"}}>주문번호 ORD-2025-001</div></div>
      <div style={{width:"100%",padding:"14px",background:G[50],borderRadius:"13px",border:`1px solid ${G[200]}`,textAlign:"left"}}>
        {[{icon:FlatIcons.store(),label:"가게",value:"맛있는 한식당"},{icon:FlatIcons.moto(),label:"예상 배달",value:"25~35분"},{icon:FlatIcons.creditcard(),label:"결제 금액",value:"40,000원",bold:true}].map((row,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:i<2?`1px solid ${G[200]}`:"none"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",borderRadius:"7px",background:"#fff",border:`1px solid ${G[200]}`,flexShrink:0}}>{row.icon}</div>
            <span style={{fontSize:"12px",color:G[500],flex:1}}>{row.label}</span>
            <span style={{fontSize:row.bold?"15px":"13px",fontWeight:row.bold?900:600,color:row.bold?PRIMARY:G[800]}}>{row.value}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"9px",width:"100%"}}>
        <Btn variant="primary" full onClick={()=>go("order-detail")}>주문 상세 보기</Btn>
        <button onClick={()=>setCancelConfirm(true)} style={{width:"100%",padding:"12px",borderRadius:"10px",border:`1.5px solid #FFCDD2`,background:"#FFF5F5",color:"#C62828",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}}>
          {FlatIcons.cancel()} 주문 취소하기
        </button>
        <div style={{fontSize:"10px",color:G[400],textAlign:"center"}}>가게 수락 전까지만 취소할 수 있어요</div>
        <Btn full onClick={()=>go("home")}>홈으로</Btn>
      </div>
    </div>
  </Phone>;
}

function RefundModal({orderId,orderStore,orderAmount,onClose,onDone}){
  const reasons=["단순 변심","음식 품질 불량","배달 지연","오배송","기타"];
  const [sel,setSel]=useState("");
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
    <div style={{width:"100%",maxWidth:`${PW-6}px`,background:"#fff",borderRadius:"20px 20px 0 0",padding:"20px 18px 32px",display:"flex",flexDirection:"column",gap:"13px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:"15px",fontWeight:900}}>환불 신청</span>
        <span onClick={onClose} style={{fontSize:"22px",cursor:"pointer",color:G[400],lineHeight:1}}>×</span>
      </div>
      <div style={{padding:"10px 12px",background:G[50],borderRadius:"9px",fontSize:"12px",color:G[600],border:`1px solid ${G[200]}`}}>
        <div style={{fontWeight:700,color:G[800],marginBottom:"2px"}}>{orderStore}</div>
        <div style={{display:"flex",justifyContent:"space-between"}}><span>환불 예정 금액</span><span style={{fontWeight:800,color:"#1565C0"}}>{orderAmount}</span></div>
      </div>
      <div>
        <div style={{fontSize:"12px",fontWeight:700,color:G[700],marginBottom:"7px"}}>환불 사유를 선택해 주세요</div>
        <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
          {reasons.map((r,i)=>(
            <div key={i} onClick={()=>setSel(r)} style={{display:"flex",alignItems:"center",gap:"9px",padding:"10px 12px",border:`1.5px solid ${sel===r?"#1565C0":G[300]}`,borderRadius:"9px",background:sel===r?"#E3F2FD":"#fff",cursor:"pointer"}}>
              <div style={{width:"16px",height:"16px",borderRadius:"50%",border:`2px solid ${sel===r?"#1565C0":G[400]}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {sel===r&&<div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#1565C0"}}/>}
              </div>
              <span style={{fontSize:"13px",fontWeight:sel===r?700:400,color:sel===r?"#1565C0":G[800]}}>{r}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{fontSize:"11px",color:G[500],background:"#EDE7FF",padding:"9px 12px",borderRadius:"9px",lineHeight:"1.7"}}>
        💡 환불은 영업일 <b>3~5일</b> 내 처리되며, 결제 수단으로 반환됩니다.
      </div>
      <div style={{display:"flex",gap:"8px"}}>
        <button onClick={onClose} style={{flex:1,padding:"13px",borderRadius:"10px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:G[700]}}>취소</button>
        <button onClick={()=>{if(sel){onDone(sel);}}} disabled={!sel} style={{flex:1,padding:"13px",borderRadius:"10px",border:"none",background:sel?"#1565C0":G[300],color:"#fff",fontSize:"13px",fontWeight:700,cursor:sel?"pointer":"not-allowed",fontFamily:"inherit"}}>환불 신청</button>
      </div>
    </div>
  </div>;
}

function OrderHistory({go}){
  const orders=[
    {id:"ORD-016",store:"엄마손 분식",items:"떡볶이 ×1",amount:"13,000원",date:"2025-03-02",status:"주문대기",color:PRIMARY,bg:PRIMARY_LIGHT,canCancel:true,canRefund:false,payFailed:false},
    {id:"ORD-001",store:"맛있는 한식당",items:"김치찌개 ×1, 불고기 정식 ×2",amount:"37,000원",date:"2025-03-01",status:"배달완료",color:"#2E7D32",bg:"#E8F5E9",canCancel:false,canRefund:true,payFailed:false},
    {id:"ORD-002",store:"황금 중식당",items:"짜장면 ×1",amount:"22,000원",date:"2025-02-28",status:"조리중",color:"#E65100",bg:"#FFF3E0",canCancel:false,canRefund:false,payFailed:false},
    {id:"ORD-005",store:"두부마을",amount:"9,000원",date:"2025-02-27",status:"환불요청",color:"#7B1FA2",bg:"#F3E5F5",canCancel:false,canRefund:false,payFailed:false,isRefundPending:true},
    {id:"ORD-006",store:"엄마손 분식",amount:"11,000원",date:"2025-02-26",status:"환불완료",color:"#4A148C",bg:"#EDE7FF",canCancel:false,canRefund:false,payFailed:false,isRefundDoneServer:true},
    {id:"ORD-003",store:"엄마손 분식",amount:"15,000원",date:"2025-02-25",status:"결제실패",color:"#C62828",bg:"#FFEBEE",canCancel:false,canRefund:false,payFailed:true},
    {id:"ORD-004",store:"두부마을",amount:"9,000원",date:"2025-02-24",status:"주문취소",color:G[500],bg:G[100],canCancel:false,canRefund:false,payFailed:false},
  ];
  const [cancelled,setCancelled]=useState([]);
  const [refundDone,setRefundDone]=useState([]);
  const [refundModal,setRefundModal]=useState(null);

  const [myReviews,setMyReviews]=useState([]);
  const [sidebarTab,setSidebarTab]=useState("reviews");
  useEffect(()=>{
    fetch("/api/my/reviews")
      .then(r=>r.json())
      .then(setMyReviews)
      .catch(console.error);
  },[]);

  return <Phone navActive="order-history" go={go}>
          {refundModal&&(
      <RefundModal
        orderId={refundModal.id}
        orderStore={refundModal.store}
        orderAmount={refundModal.amount}
        onClose={()=>setRefundModal(null)}
        onDone={()=>{setRefundDone(v=>[...v,refundModal.id]);setRefundModal(null);}}
      />
    )}
    <TopBar title="주문 내역" go={go} backTo="home"/>
    <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",gap:"12px"}}>
      {/* 왼쪽: 주문 리스트 */}
      <div style={{flex:2,display:"flex",flexDirection:"column",gap:"9px"}}>
      {orders.map((o,i)=>{
        const isCancelled=cancelled.includes(o.id);
        const isRefunded=refundDone.includes(o.id);
        const displayStatus=isCancelled?"주문취소":isRefunded?"환불요청":o.isRefundPending?"환불요청":o.isRefundDoneServer?"환불완료":o.status;
        const displayColor=isCancelled?"#C62828":isRefunded||o.isRefundPending?"#7B1FA2":o.isRefundDoneServer?"#4A148C":o.color;
        const displayBg=isCancelled?"#FFEBEE":isRefunded||o.isRefundPending?"#F3E5F5":o.isRefundDoneServer?"#EDE7FF":o.bg;
        return <div key={i} onClick={()=>go("order-detail")} style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"13px",cursor:"pointer",borderLeftWidth:"4px",borderLeftColor:displayColor,background:"#fff"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:"14px",fontWeight:800}}>{o.store}</span>
            <span style={{fontSize:"11px",fontWeight:700,color:displayColor,padding:"3px 7px",borderRadius:"5px",background:displayBg}}>{displayStatus}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:G[500],marginTop:"5px"}}>
            <span>{o.id} · {o.date}</span>
            <span style={{fontWeight:700,color:G[800]}}>{o.amount}</span>
          </div>
          <div style={{marginTop:"9px",display:"flex",gap:"6px",flexWrap:"wrap"}} onClick={e=>e.stopPropagation()}>
            {o.status==="배달완료"&&!isCancelled&&!isRefunded&&(
              <Btn size="sm" variant="primary" onClick={e=>{e.stopPropagation();go("review");}}>리뷰 작성</Btn>
            )}
            {o.canCancel&&!isCancelled&&(
              <button onClick={e=>{e.stopPropagation();setCancelled(v=>[...v,o.id]);}} style={{padding:"5px 11px",borderRadius:"7px",border:`1.5px solid #FFCDD2`,background:"#FFF5F5",color:"#C62828",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:"5px"}}>
                {FlatIcons.cancel()} 주문 취소
              </button>
            )}
            {o.canRefund&&!isRefunded&&!isCancelled&&(
              <button onClick={e=>{e.stopPropagation();setRefundModal({id:o.id,store:o.store,amount:o.amount});}} style={{padding:"5px 11px",borderRadius:"7px",border:`1.5px solid #CE93D8`,background:"#F3E5F5",color:"#7B1FA2",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                ↩ 환불 신청
              </button>
            )}
            {o.payFailed&&(
              <button onClick={e=>{e.stopPropagation();go("order-fail");}} style={{padding:"5px 11px",borderRadius:"7px",border:`1.5px solid ${PRIMARY}44`,background:PRIMARY_LIGHT,color:PRIMARY,fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                💳 재결제
              </button>
            )}
            {isCancelled&&<span style={{fontSize:"11px",color:"#C62828",fontWeight:600}}>✗ 취소 완료</span>}
            {(isRefunded||o.isRefundPending)&&!o.isRefundDoneServer&&<span style={{fontSize:"11px",color:"#7B1FA2",fontWeight:600}}>↩ 환불 요청중 (3~5 영업일)</span>}
            {o.isRefundDoneServer&&<span style={{fontSize:"11px",color:"#4A148C",fontWeight:600}}>✅ 환불 완료</span>}
          </div>
        </div>;
      })}
    </div>
    {/* 오른쪽: 사이드바(리뷰/메뉴) */}
    <div style={{flex:1,background:"#f9f9f9",borderLeft:`1px solid ${G[200]}`,display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex"}}>
        <button onClick={()=>setSidebarTab("reviews")} style={{flex:1,padding:"8px",border:"none",background:sidebarTab==="reviews"?"#fff":"#eee",fontWeight:800,cursor:"pointer"}}>내 리뷰</button>
        <button onClick={()=>setSidebarTab("menu")} style={{flex:1,padding:"8px",border:"none",background:sidebarTab==="menu"?"#fff":"#eee",fontWeight:800,cursor:"pointer"}}>주문 메뉴</button>
      </div>
      <div style={{padding:"10px",overflowY:"auto",flex:1}}>
        {sidebarTab==="reviews" && (
          myReviews.length===0 ? <div style={{fontSize:"11px",color:G[400]}}>작성된 리뷰가 없습니다.</div> :
          myReviews.map((r,i)=>(
            <div key={i} style={{marginBottom:"10px"}}>
              <div style={{fontSize:"12px",fontWeight:700}}>{r.store}</div>
              <Stars v={r.rating} size={11}/>
              <div style={{fontSize:"11px",color:G[600],marginTop:"3px"}}>{r.content.slice(0,30)}...</div>
            </div>
          ))
        )}
        {sidebarTab==="menu" && (
          orders.map((o,i)=>(
            <div key={i} style={{marginBottom:"10px"}}>
              <div style={{fontSize:"12px",fontWeight:700}}>{o.store}</div>
              <div style={{fontSize:"11px",color:G[600]}}>{o.items||"메뉴정보 없음"}</div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  </Phone>;
  </Phone>;
}

function OrderDetail({go}){
  const [refundModal,setRefundModal]=useState(false);
  const [refundDone,setRefundDone]=useState(false);
  const [refundReason,setRefundReason]=useState("");
  return <Phone navActive="order-history" go={go}>
    {refundModal&&(
      <RefundModal
        orderId="ORD-001"
        orderStore="맛있는 한식당"
        orderAmount="37,000원"
        onClose={()=>setRefundModal(false)}
        onDone={(reason)=>{setRefundReason(reason);setRefundDone(true);setRefundModal(false);}}
      />
    )}
    <TopBar title="주문 상세" go={go} backTo="order-history"/>
    <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"12px",fontSize:"12px"}}>
      {refundDone
        ?<div style={{padding:"14px",background:"#EDE7FF",borderRadius:"11px",textAlign:"center",border:"1px solid #CE93D8"}}>
          <div style={{fontSize:"24px",marginBottom:"5px"}}>↩</div>
          <div style={{fontSize:"15px",fontWeight:800,color:"#7B1FA2"}}>환불 신청 완료</div>
          <div style={{fontSize:"11px",color:"#9C27B0",marginTop:"4px"}}>사유: {refundReason}<br/>3~5 영업일 내 처리됩니다</div>
        </div>
        :<div style={{padding:"14px",background:"#E8F5E9",borderRadius:"11px",textAlign:"center",border:"1px solid #A5D6A7"}}>
          <div style={{fontSize:"24px",marginBottom:"5px"}}>✅</div>
          <div style={{fontSize:"15px",fontWeight:800,color:"#2E7D32"}}>배달 완료</div>
        </div>
      }
      <div style={{padding:"11px",background:G[50],borderRadius:"9px",border:`1px solid ${G[200]}`,lineHeight:"2",color:G[600]}}>
        {[["주문번호","ORD-001"],["가게","맛있는 한식당"],["배달주소","세종대로 172"],["결제수단","카드 결제"],["결제금액","37,000원"]].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between"}}><span>{k}</span><span style={{color:G[900],fontWeight:700}}>{v}</span></div>
        ))}
      </div>
      <div style={{padding:"11px",border:`1px solid ${G[200]}`,borderRadius:"9px",background:"#fff",display:"flex",flexDirection:"column",gap:"5px"}}>
        <div style={{fontWeight:700,color:G[800],marginBottom:"3px"}}>주문 메뉴</div>
        {[["김치찌개","8,000원"],["불고기 정식 × 2","24,000원"],["배달비","3,000원"]].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",color:G[600]}}><span>{k}</span><span style={{fontWeight:600}}>{v}</span></div>
        ))}
      </div>
      <div style={{display:"flex",gap:"7px"}}>
        {!refundDone&&<>
          <Btn style={{flex:1}} disabled>취소 불가</Btn>
          <button onClick={()=>setRefundModal(true)} style={{flex:1,padding:"10px 0",borderRadius:"10px",border:`1.5px solid #CE93D8`,background:"#F3E5F5",color:"#7B1FA2",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>↩ 환불 신청</button>
          <Btn variant="primary" style={{flex:1}} onClick={()=>go("review")}>리뷰 작성</Btn>
        </>}
        {refundDone&&<div style={{flex:1,padding:"10px",background:"#F3E5F5",borderRadius:"10px",textAlign:"center",fontSize:"12px",color:"#7B1FA2",fontWeight:700}}>✅ 환불 신청 완료 · 처리 중</div>}
      </div>
    </div>
  </Phone>;
}

function Review({go}){
  const [stars,setStars]=useState(4);
  const labels=["","별로예요","그냥그래요","괜찮아요","좋아요","최고예요!"];
  const starColors=["","#E53935","#FF7043","#FFA726","#FFC107","#FFD600"];
  return <Phone navActive="order-history" go={go}>
    <TopBar title="리뷰 작성" go={go} backTo="order-detail"/>
    <div style={{flex:1,overflowY:"auto",padding:"18px 20px",display:"flex",flexDirection:"column",gap:"16px"}}>
      <div style={{padding:"11px",background:G[50],borderRadius:"9px",textAlign:"center",border:`1px solid ${G[200]}`}}><div style={{fontSize:"13px",fontWeight:700}}>맛있는 한식당</div><div style={{fontSize:"11px",color:G[500],marginTop:"2px"}}>ORD-001 · 김치찌개 외 1건</div></div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:"12px",fontWeight:700,color:G[600],marginBottom:"12px"}}>이 가게는 어떠셨나요?</div>
        <div style={{display:"flex",justifyContent:"center",gap:"6px"}}>
          {[1,2,3,4,5].map(s=>(
            <div key={s} onClick={()=>setStars(s)} style={{cursor:"pointer",transform:s===stars?"scale(1.2)":"scale(1)"}}>
              {s<=stars?FlatIcons.starFilled(starColors[stars]||"#FFC107"):FlatIcons.starEmpty(G[300])}
            </div>
          ))}
        </div>
        {stars>0&&<div style={{marginTop:"9px",display:"inline-flex",alignItems:"center",gap:"5px",padding:"5px 14px",borderRadius:"20px",background:starColors[stars]+"22"}}><span style={{fontSize:"13px",fontWeight:800,color:starColors[stars]}}>{labels[stars]}</span></div>}
      </div>
      <div><div style={{fontSize:"12px",fontWeight:700,color:G[600],marginBottom:"5px"}}>리뷰 내용</div><div style={{padding:"13px",border:`1.5px dashed ${G[300]}`,borderRadius:"9px",minHeight:"90px",color:G[400],fontSize:"12px",background:G[50]}}>음식 맛, 배달 속도, 포장 상태 등을 알려주세요 :)</div></div>
      <Btn variant="primary" full onClick={()=>go("order-history")}>리뷰 등록</Btn>
    </div>
  </Phone>;
}

// ── 사장님 화면들 ─────────────────────────────────────────
const hourlyData=[
  {t:"10시",v:0},{t:"11시",v:12},{t:"12시",v:89},{t:"13시",v:134},
  {t:"14시",v:67},{t:"15시",v:23},{t:"16시",v:18},{t:"17시",v:31},
  {t:"18시",v:112},{t:"19시",v:178},{t:"20시",v:156},{t:"21시",v:98},{t:"22시",v:34},
];

function OwnerDash({go}){
  return <Phone noNav>
    <TopBar title="🏪 사장님 홈" go={go} backTo="home"/>
    <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"14px"}}>
      <div style={{padding:"13px",background:PRIMARY_LIGHT,borderRadius:"11px",border:`1.5px solid ${PRIMARY}33`}}>
        <div style={{fontSize:"15px",fontWeight:800}}>맛있는 한식당</div>
        <div style={{display:"flex",alignItems:"center",gap:"4px",marginTop:"3px"}}><Stars/><span style={{fontSize:"12px",fontWeight:700}}>4.7</span></div>
        <div style={{display:"flex",gap:"10px",marginTop:"7px",fontSize:"11px",color:G[500]}}><span>📍 광화문</span><span>🕐 10:00-22:00</span><span style={{color:"#2E7D32",fontWeight:700}}>● 영업중</span></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>
        {[{l:"오늘주문",v:"28건"},{l:"신규대기",v:"3건",alert:true},{l:"오늘매출",v:"742K"}].map((s,i)=>(
          <div key={i} style={{padding:"11px",border:`1.5px solid ${s.alert?PRIMARY:G[200]}`,borderRadius:"9px",textAlign:"center",background:s.alert?PRIMARY_LIGHT:"#fff"}}>
            <div style={{fontSize:"10px",color:s.alert?PRIMARY:G[500],fontWeight:600}}>{s.l}</div>
            <div style={{fontSize:"17px",fontWeight:900,color:s.alert?PRIMARY:G[900],marginTop:"2px"}}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"13px",border:`2px solid #FFA000`,borderRadius:"11px",background:"#FFF8E1"}}>
        <div style={{fontSize:"12px",fontWeight:800,color:"#E65100",marginBottom:"7px"}}>🔔 신규 주문 접수</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:"12px",fontWeight:700}}>ORD-015 · 김치찌개 외 1건</div><div style={{fontSize:"11px",color:G[500],marginTop:"2px"}}>user456 · 방금 전 · 32,000원</div></div><div style={{display:"flex",gap:"5px"}}><Btn size="sm" variant="primary">수락</Btn><Btn size="sm">거절</Btn></div></div>
      </div>
      <div onClick={()=>go("owner-sales")} style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"13px",padding:"14px",cursor:"pointer"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
          <div style={{fontSize:"14px",fontWeight:800,color:G[900]}}>시간대별 매출</div>
          <div style={{display:"flex",alignItems:"center",gap:"5px"}}><span style={{fontSize:"11px",color:PRIMARY,fontWeight:700}}>상세 보기</span>{Icon.chevron(PRIMARY)}</div>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={hourlyData} margin={{top:4,right:4,left:-24,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={G[100]} vertical={false}/>
            <XAxis dataKey="t" tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false} interval={1}/>
            <YAxis tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{fontSize:"11px",borderRadius:"8px",border:`1px solid ${G[200]}`}}/>
            <Bar dataKey="v" fill={PRIMARY} radius={[4,4,0,0]} maxBarSize={18}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
        {[{icon:"📋",l:"주문관리",g:"owner-orders"},{icon:"🍽️",l:"메뉴관리",g:"owner-menu"},{icon:"⭐",l:"리뷰관리",g:"owner-reviews"},{icon:"🏪",l:"가게정보",g:"owner-info"},{icon:"👤",l:"마이페이지",g:"owner-my"}].map((m,i)=>(
          <div key={i} onClick={()=>go(m.g)} style={{padding:"14px",border:`1.5px solid ${G[200]}`,borderRadius:"11px",textAlign:"center",cursor:"pointer",background:"#fff"}}>
            <div style={{fontSize:"26px",marginBottom:"3px"}}>{m.icon}</div>
            <div style={{fontSize:"12px",fontWeight:700,color:G[800]}}>{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  </Phone>;
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

function OwnerOrders({go}){
  const [tab,setTab]=useState("전체");
  const [refundStates,setRefundStates]=useState({});// id -> "수락"|"거절"

  const orders=[
    {id:"ORD-015",user:"user456",items:"김치찌개 × 2",amount:"24,000원",label:"신규주문",color:"#E65100",bg:"#FFF3E0",type:"order",addr:"서울 종로구 세종대로 172, 101호"},
    {id:"ORD-014",user:"user789",items:"불고기 정식 × 1",amount:"12,000원",label:"조리중",color:"#1565C0",bg:"#E3F2FD",type:"order",addr:"서울 종로구 청진동 33, 5층"},
    {id:"ORD-013",user:"user123",items:"된장찌개 × 2",amount:"15,000원",label:"배달중",color:"#2E7D32",bg:"#E8F5E9",type:"order",addr:"서울 종로구 율곡로 10, B동 302호"},
    {id:"ORD-005",user:"user111",items:"불고기 정식 × 1",amount:"12,000원",label:"환불요청",color:"#7B1FA2",bg:"#F3E5F5",type:"refund",addr:"서울 종로구 새문안로 5, 303호",refundReason:"음식 품질 불량",refundTime:"14:22"},
    {id:"ORD-003",user:"user222",items:"김치찌개 × 1",amount:"8,000원",label:"환불요청",color:"#7B1FA2",bg:"#F3E5F5",type:"refund",addr:"서울 종로구 율곡로 55, 101호",refundReason:"배달 지연",refundTime:"13:47"},
  ];

  const pendingRefunds=orders.filter(o=>o.type==="refund"&&!refundStates[o.id]);
  const tabs=["전체","신규주문","진행중","환불요청"+(pendingRefunds.length>0?`(${pendingRefunds.length})`:""),"완료"];

  const filtered=tab.startsWith("환불요청")?orders.filter(o=>o.type==="refund"):
    tab==="신규주문"?orders.filter(o=>o.label==="신규주문"):
    tab==="진행중"?orders.filter(o=>["조리중","배달중"].includes(o.label)):
    tab==="완료"?orders.filter(o=>["배달완료","주문취소"].includes(o.label)):
    orders;

  const handleRefund=(id,action)=>setRefundStates(s=>({...s,[id]:action}));

  return <Phone noNav>
    <TopBar title="주문 관리" go={go} backTo="owner-dash"/>
    <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
      {/* 환불 요청 공지 배너 */}
      {pendingRefunds.length>0&&(
        <div onClick={()=>setTab("환불요청"+(pendingRefunds.length>0?`(${pendingRefunds.length})`:"")+"")} style={{margin:"12px 14px 0",padding:"10px 13px",background:"#F3E5F5",border:`1.5px solid #CE93D8`,borderRadius:"11px",display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}}>
          <div style={{width:"34px",height:"34px",borderRadius:"50%",background:"#7B1FA2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:"16px"}}>↩</span>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:"13px",fontWeight:800,color:"#7B1FA2"}}>환불 요청 {pendingRefunds.length}건 대기 중</div>
            <div style={{fontSize:"11px",color:"#9C27B0",marginTop:"1px"}}>수락 또는 거절 처리가 필요합니다</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B1FA2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      )}

      {/* 탭 */}
      <div style={{display:"flex",gap:"5px",overflowX:"auto",padding:"10px 14px 0",flexShrink:0}}>
        {tabs.map(t=>{
          const isRefundTab=t.startsWith("환불요청");
          const isActive=tab===t||(isRefundTab&&tab.startsWith("환불요청"));
          return <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 13px",borderRadius:"20px",fontSize:"11px",fontWeight:700,border:`1.5px solid ${isActive?(isRefundTab?"#7B1FA2":PRIMARY):(isRefundTab&&pendingRefunds.length>0?"#CE93D8":G[300])}`,background:isActive?(isRefundTab?"#7B1FA2":PRIMARY):(isRefundTab&&pendingRefunds.length>0?"#F3E5F5":"#fff"),color:isActive?"#fff":(isRefundTab&&pendingRefunds.length>0?"#7B1FA2":G[600]),cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:"inherit"}}>{t}</button>;
        })}
      </div>

      <div style={{padding:"10px 14px 14px",display:"flex",flexDirection:"column",gap:"9px"}}>
        {filtered.length===0&&<div style={{padding:"32px",textAlign:"center",color:G[400],fontSize:"13px"}}>해당 주문이 없습니다</div>}
        {filtered.map((o,i)=>{
          const rs=refundStates[o.id];
          if(o.type==="refund"){
            return <div key={i} style={{border:`1.5px solid ${rs?"#E0E0E0":"#CE93D8"}`,borderLeft:`4px solid ${rs==="수락"?"#2E7D32":rs==="거절"?"#C62828":"#7B1FA2"}`,borderRadius:"11px",padding:"13px",background:rs?"#FAFAFA":"#FDF6FF"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{display:"flex",gap:"7px",alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{o.id}</span>
                  {!rs&&<span style={{fontSize:"10px",fontWeight:700,color:"#7B1FA2",padding:"2px 7px",borderRadius:"4px",background:"#F3E5F5"}}>환불요청</span>}
                  {rs==="수락"&&<span style={{fontSize:"10px",fontWeight:700,color:"#2E7D32",padding:"2px 7px",borderRadius:"4px",background:"#E8F5E9"}}>환불수락</span>}
                  {rs==="거절"&&<span style={{fontSize:"10px",fontWeight:700,color:"#C62828",padding:"2px 7px",borderRadius:"4px",background:"#FFEBEE"}}>환불거절</span>}
                </div>
                <span style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{o.amount}</span>
              </div>
              <div style={{fontSize:"11px",color:G[600],marginTop:"5px"}}>{o.user} · {o.items}</div>
              <div style={{display:"flex",alignItems:"center",gap:"4px",marginTop:"5px",padding:"5px 8px",background:G[50],borderRadius:"6px",border:`1px solid ${G[200]}`}}>
                {FlatIcons.location()}
                <span style={{fontSize:"11px",color:G[600],fontWeight:500}}>{o.addr}</span>
              </div>
              <div style={{marginTop:"8px",padding:"8px 10px",background:"#F3E5F5",borderRadius:"8px",border:`1px solid #CE93D8`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:"10px",fontWeight:700,color:"#7B1FA2",marginBottom:"2px"}}>환불 사유</div>
                  <div style={{fontSize:"12px",color:"#6A1B9A",fontWeight:600}}>{o.refundReason}</div>
                </div>
                <div style={{fontSize:"10px",color:"#9C27B0"}}>{o.refundTime}</div>
              </div>
              {!rs&&<div style={{display:"flex",gap:"7px",marginTop:"10px"}}>
                <button onClick={()=>handleRefund(o.id,"수락")} style={{flex:1,padding:"9px 0",borderRadius:"9px",border:"none",background:"#2E7D32",color:"#fff",fontSize:"12px",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>✓ 환불 수락</button>
                <button onClick={()=>handleRefund(o.id,"거절")} style={{flex:1,padding:"9px 0",borderRadius:"9px",border:`1.5px solid #FFCDD2`,background:"#fff",color:"#C62828",fontSize:"12px",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>✗ 환불 거절</button>
              </div>}
              {rs&&<div style={{marginTop:"9px",padding:"8px 11px",background:rs==="수락"?"#E8F5E9":"#FFEBEE",borderRadius:"8px",fontSize:"11px",fontWeight:700,color:rs==="수락"?"#2E7D32":"#C62828",textAlign:"center"}}>
                {rs==="수락"?"✓ 환불 수락 완료 — 고객에게 알림이 발송됩니다":"✗ 환불 거절 완료 — 고객에게 알림이 발송됩니다"}
              </div>}
            </div>;
          }
          // 일반 주문
          const actionMap={"신규주문":["수락","거절"],"조리중":["조리완료"],"배달중":["배달완료"]};
          const actions=actionMap[o.label]||[];
          return <div key={i} style={{border:`1.5px solid ${G[200]}`,borderLeft:`4px solid ${o.color}`,borderRadius:"11px",padding:"13px",background:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",gap:"7px",alignItems:"center"}}><span style={{fontSize:"13px",fontWeight:800}}>{o.id}</span><span style={{fontSize:"10px",fontWeight:700,color:o.color,padding:"2px 7px",borderRadius:"4px",background:o.bg}}>{o.label}</span></div><span style={{fontSize:"13px",fontWeight:800}}>{o.amount}</span></div>
            <div style={{fontSize:"11px",color:G[600],marginTop:"5px"}}>{o.user} · {o.items}</div>
            <div style={{display:"flex",alignItems:"center",gap:"4px",marginTop:"5px",padding:"5px 8px",background:G[50],borderRadius:"6px",border:`1px solid ${G[200]}`}}>
              {FlatIcons.location()}
              <span style={{fontSize:"11px",color:G[600],fontWeight:500}}>{o.addr}</span>
            </div>
            {actions.length>0&&<div style={{display:"flex",gap:"5px",marginTop:"9px"}}>{actions.map((a,j)=><Btn key={j} size="sm" variant={j===0?"primary":"outline"}>{a}</Btn>)}</div>}
          </div>;
        })}
      </div>
    </div>
  </Phone>;
}

function OwnerMenu({go}){
  return <Phone noNav>
    <TopBar title="메뉴 관리" go={go} backTo="owner-dash"/>
    <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      <Btn variant="primary" full>+ 새 메뉴 등록</Btn>
      {[{name:"김치찌개",price:"8,000원",ai:true,hidden:false},{name:"된장찌개",price:"7,500원",ai:false,hidden:false},{name:"냉면",price:"9,000원",ai:false,hidden:true}].map((m,i)=>(
        <div key={i} style={{border:`1.5px solid ${G[200]}`,borderRadius:"9px",padding:"11px",opacity:m.hidden?0.5:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{display:"flex",gap:"5px",alignItems:"center"}}><span style={{fontSize:"13px",fontWeight:700}}>{m.name}</span>{m.ai&&<Badge color="#7B1FA2" bg="#F3E5F5">AI</Badge>}{m.hidden&&<Badge color="#C62828" bg="#FFEBEE">숨김</Badge>}</div><span style={{fontSize:"11px",color:G[500]}}>{m.price}</span></div>
            <div style={{display:"flex",gap:"3px"}}><Btn size="sm">수정</Btn><Btn size="sm">{m.hidden?"노출":"숨김"}</Btn><Btn size="sm" style={{color:"#C62828"}}>삭제</Btn></div>
          </div>
        </div>
      ))}
    </div>
  </Phone>;
}

function OwnerReviews({go}){
  const [replyTarget,setReplyTarget]=useState(null);
  const [aiLoading,setAiLoading]=useState(false);
  const [replyText,setReplyText]=useState("");
  const [aiGenerated,setAiGenerated]=useState(false);
  const reviews=[
    {user:"user123",rating:5,date:"2025-03-01",menu:"김치찌개",content:"국물이 진짜 얼큰하고 맛있어요!",replied:true,reply:"소중한 리뷰 감사합니다 😊"},
    {user:"user456",rating:4,date:"2025-02-28",menu:"불고기 정식",content:"양념이 잘 배어있고 반찬도 신선했어요.",replied:false,reply:""},
    {user:"user999",rating:2,date:"2025-02-27",menu:"된장찌개",content:"국물이 좀 짜서 아쉬웠어요.",replied:false,reply:""},
  ];
  const handleAiGenerate=(r)=>{setAiLoading(true);setAiGenerated(false);setTimeout(()=>{setReplyText(`안녕하세요, ${r.user}님! ${r.menu} 주문 감사합니다 😊`);setAiLoading(false);setAiGenerated(true);},1500);};
  return <Phone noNav>
    <TopBar title="⭐ 리뷰 관리" go={go} backTo="owner-dash"/>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      {reviews.map((r,i)=>(
        <div key={i} style={{border:`1.5px solid ${G[200]}`,borderRadius:"13px",overflow:"hidden",background:"#fff"}}>
          <div style={{padding:"12px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"7px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"7px"}}>{FlatIcons.userAvatar(30)}<div><div style={{fontSize:"12px",fontWeight:700}}>{r.user}</div><div style={{fontSize:"10px",color:G[400]}}>{r.date} · {r.menu}</div></div></div>
              <div style={{display:"flex",alignItems:"center",gap:"5px"}}><Stars v={r.rating} size={11}/>{!r.replied?<Badge bg="#FFEBEE" color="#C62828">미답글</Badge>:<Badge bg="#E8F5E9" color="#2E7D32">완료</Badge>}</div>
            </div>
            <div style={{fontSize:"12px",color:G[700],lineHeight:"1.6"}}>{r.content}</div>
            {r.replied&&<div style={{padding:"9px 10px",background:"#FFF8E1",borderRadius:"7px",borderLeft:`3px solid #FFC107`,marginTop:"8px"}}><div style={{fontSize:"10px",fontWeight:700,color:"#F57F17",marginBottom:"2px"}}>🏪 답글</div><div style={{fontSize:"11px",color:G[700]}}>{r.reply}</div></div>}
            <div style={{marginTop:"9px"}}>
              {!r.replied&&replyTarget!==i&&<Btn size="sm" variant="primary" onClick={()=>{setReplyTarget(i);setReplyText("");setAiGenerated(false);}}>💬 답글 달기</Btn>}
              {r.replied&&replyTarget!==i&&<Btn size="sm" onClick={()=>{setReplyTarget(i);setReplyText(r.reply);setAiGenerated(false);}}>✏️ 수정</Btn>}
            </div>
          </div>
          {replyTarget===i&&(
            <div style={{borderTop:`1px solid ${G[200]}`,padding:"12px",background:G[50],display:"flex",flexDirection:"column",gap:"9px"}}>
              <div style={{padding:"9px 11px",background:AI_LIGHT,borderRadius:"9px",border:`1px solid ${AI_COLOR}44`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:"11px",fontWeight:700,color:AI_COLOR}}>✨ AI 답글 자동 생성</div><Btn size="sm" variant="ai" onClick={()=>handleAiGenerate(r)}>{aiLoading?"생성중...":"AI 생성"}</Btn></div>
                {aiGenerated&&!aiLoading&&<div style={{marginTop:"5px",fontSize:"10px",color:AI_COLOR,fontWeight:600}}>✅ 초안 완성. 수정 후 등록하세요.</div>}
              </div>
              <div style={{padding:"10px",border:`1.5px solid ${aiGenerated?AI_COLOR:G[300]}`,borderRadius:"9px",minHeight:"70px",background:"#fff",fontSize:"12px",color:replyText?G[800]:G[400],lineHeight:"1.7"}}>{replyText||"답글을 입력하세요..."}</div>
              <div style={{display:"flex",gap:"7px"}}><Btn style={{flex:1}} onClick={()=>setReplyTarget(null)}>취소</Btn><Btn variant="primary" style={{flex:1}} onClick={()=>setReplyTarget(null)}>등록</Btn></div>
            </div>
          )}
        </div>
      ))}
    </div>
  </Phone>;
}

function OwnerInfo({go}){
  const [open,setOpen]=useState(true);
  const [editing,setEditing]=useState(null);
  const days=["월","화","수","목","금","토","일"];
  const [hours,setHours]=useState({월:"10:00~22:00",화:"10:00~22:00",수:"10:00~22:00",목:"10:00~22:00",금:"10:00~22:00",토:"11:00~23:00",일:"휴무"});
  return <Phone noNav>
    <TopBar title="가게 정보" go={go} backTo="owner-dash"
      right={<div style={{display:"flex",alignItems:"center",gap:"8px"}}><span style={{fontSize:"11px",color:open?"#2E7D32":"#C62828",fontWeight:700}}>{open?"영업중":"영업종료"}</span><div onClick={()=>setOpen(v=>!v)} style={{width:"42px",height:"24px",borderRadius:"12px",background:open?"#2E7D32":G[300],position:"relative",cursor:"pointer"}}><div style={{width:"20px",height:"20px",borderRadius:"50%",background:"#fff",position:"absolute",top:"2px",left:open?"20px":"2px",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.25)"}}/></div></div>}
    />
    <div style={{flex:1,overflowY:"auto"}}>
      <div style={{position:"relative"}}><Img h="170px" label="가게 대표 이미지" style={{borderRadius:0,border:"none"}}/><button style={{position:"absolute",bottom:"10px",right:"10px",padding:"6px 12px",borderRadius:"8px",background:"rgba(0,0,0,0.55)",color:"#fff",border:"none",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:"5px"}}>{Icon.edit("#fff")} 사진 변경</button></div>
      <div style={{padding:"14px",display:"flex",flexDirection:"column",gap:"14px"}}>
        {[{title:"기본 정보",key:"basic",rows:[["가게명","맛있는 한식당"],["카테고리","한식"],["최소주문금액","12,000원"],["기본배달비","2,000원"]]},{title:"연락처",key:"contact",rows:[["대표번호","02-1234-5678"],["이메일","store@example.com"]]}].map(sec=>(
          <div key={sec.key} style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"13px",padding:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}><span style={{fontSize:"14px",fontWeight:800}}>{sec.title}</span><button onClick={()=>setEditing(editing===sec.key?null:sec.key)} style={{padding:"4px 10px",borderRadius:"7px",border:`1.5px solid ${editing===sec.key?PRIMARY:G[300]}`,background:editing===sec.key?PRIMARY_LIGHT:"#fff",color:editing===sec.key?PRIMARY:G[600],fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{editing===sec.key?"완료":"수정"}</button></div>
            {sec.rows.map(([k,v])=>(
              <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${G[100]}`}}>
                <span style={{fontSize:"12px",color:G[500],fontWeight:600,minWidth:"80px"}}>{k}</span>
                {editing===sec.key?<div style={{padding:"6px 10px",border:`1.5px solid ${PRIMARY}`,borderRadius:"7px",background:PRIMARY_LIGHT,fontSize:"12px",color:G[800],display:"inline-block",minWidth:"120px",textAlign:"left"}}>{v}</div>:<span style={{fontSize:"13px",color:G[800],fontWeight:500}}>{v}</span>}
              </div>
            ))}
          </div>
        ))}
        <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"13px",padding:"14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}><span style={{fontSize:"14px",fontWeight:800}}>영업 시간</span><button onClick={()=>setEditing(editing==="hours"?null:"hours")} style={{padding:"4px 10px",borderRadius:"7px",border:`1.5px solid ${editing==="hours"?PRIMARY:G[300]}`,background:editing==="hours"?PRIMARY_LIGHT:"#fff",color:editing==="hours"?PRIMARY:G[600],fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{editing==="hours"?"완료":"수정"}</button></div>
          {days.map(d=>(
            <div key={d} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
              <span style={{fontSize:"12px",fontWeight:700,color:G[700],width:"20px",textAlign:"center"}}>{d}</span>
              {editing==="hours"
                ?<div style={{flex:1,display:"flex",gap:"6px",alignItems:"center"}}><div style={{flex:1,padding:"6px 10px",border:`1.5px solid ${G[300]}`,borderRadius:"7px",background:"#fff",fontSize:"12px",color:hours[d]==="휴무"?G[400]:G[800]}}>{hours[d]}</div><div onClick={()=>setHours(h=>({...h,[d]:h[d]==="휴무"?"10:00~22:00":"휴무"}))} style={{padding:"5px 10px",borderRadius:"7px",border:`1px solid ${G[300]}`,background:hours[d]==="휴무"?G[100]:PRIMARY_LIGHT,color:hours[d]==="휴무"?G[500]:PRIMARY,fontSize:"10px",fontWeight:700,cursor:"pointer"}}>{hours[d]==="휴무"?"영업":"휴무"}</div></div>
                :<div style={{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:"12px",color:hours[d]==="휴무"?G[400]:G[700]}}>{hours[d]}</span>{hours[d]==="휴무"&&<Badge bg={G[200]} color={G[500]}>휴무</Badge>}</div>
              }
            </div>
          ))}
        </div>
        <Btn variant="primary" full size="lg">변경사항 저장</Btn>
      </div>
    </div>
  </Phone>;
}

function MyPage({go}){
  const [noti,setNoti]=useState(true);
  const [editProfile,setEditProfile]=useState(false);
  const [profile,setProfile]=useState({name:"홍길동",nick:"user123",phone:"010-1234-5678"});
  const [draft,setDraft]=useState({...profile});
  const menuGroups=[
    {title:"주문 관리",items:[{icon:FlatIcons.orders(G[600]),label:"주문 내역",go:"order-history"},{icon:FlatIcons.heart(G[600]),label:"찜한 가게",badge:"3"},{icon:FlatIcons.review(G[600]),label:"내 리뷰",badge:"12"}]},
    {title:"혜택",items:[{icon:FlatIcons.coupon(G[600]),label:"쿠폰",badge:"1",badgeColor:PRIMARY},{icon:FlatIcons.point(G[600]),label:"포인트",sub:"1,200P"}]},
    {title:"설정",items:[{icon:FlatIcons.bell(G[600]),label:"알림 설정",toggle:true,val:noti,set:setNoti},{icon:FlatIcons.lock(G[600]),label:"개인정보 보호"},{icon:FlatIcons.notice(G[600]),label:"공지사항 / 고객센터"}]},
  ];
  return <Phone noNav>
    <TopBar title="마이페이지" go={go} backTo="home"/>
    <div style={{flex:1,overflowY:"auto"}}>
      <div style={{padding:"20px 16px 16px",background:`linear-gradient(160deg,${PRIMARY_LIGHT},#fff)`,borderBottom:`1px solid ${G[100]}`}}>
        <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
          <div style={{position:"relative"}}>
            <div style={{width:"64px",height:"64px",borderRadius:"50%",background:G[200],display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid #fff`,boxShadow:"0 2px 8px rgba(0,0,0,0.1)",overflow:"hidden"}}>
              <svg width="58" height="58" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={G[500]} opacity=".7"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill={G[400]} opacity=".5"/></svg>
            </div>
          </div>
          <div style={{flex:1}}><div style={{fontSize:"17px",fontWeight:900}}>{profile.name}</div><div style={{fontSize:"12px",color:G[500],marginTop:"1px"}}>@{profile.nick}</div><div style={{marginTop:"5px"}}><Badge bg={PRIMARY} color="#fff">일반 회원</Badge></div></div>
          <button onClick={()=>{setDraft({...profile});setEditProfile(true);}} style={{padding:"7px 13px",borderRadius:"8px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"11px",fontWeight:700,color:G[700],cursor:"pointer",fontFamily:"inherit"}}>프로필 수정</button>
        </div>
        <div style={{display:"flex",marginTop:"16px",background:"#fff",borderRadius:"12px",border:`1px solid ${G[200]}`,overflow:"hidden"}}>
          {[{l:"주문",v:"28"},{l:"리뷰",v:"12"},{l:"찜한가게",v:"3"},{l:"포인트",v:"1.2K"}].map((s,i,arr)=>(
            <div key={i} style={{flex:1,padding:"11px 0",textAlign:"center",borderRight:i<arr.length-1?`1px solid ${G[200]}`:"none"}}><div style={{fontSize:"16px",fontWeight:900}}>{s.v}</div><div style={{fontSize:"10px",color:G[500],marginTop:"2px"}}>{s.l}</div></div>
          ))}
        </div>
      </div>
      {editProfile&&(
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.45)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:"340px",background:"#fff",borderRadius:"16px",padding:"20px",display:"flex",flexDirection:"column",gap:"13px",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:"15px",fontWeight:900}}>프로필 수정</span><span onClick={()=>setEditProfile(false)} style={{fontSize:"20px",cursor:"pointer",color:G[400]}}>×</span></div>
            {[{label:"이름",key:"name",ph:"실명 입력"},{label:"닉네임",key:"nick",ph:"닉네임"},{label:"핸드폰번호",key:"phone",ph:"010-0000-0000"}].map(({label,key,ph})=>(
              <div key={key}><div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"5px"}}>{label}</div><input value={draft[key]} onChange={e=>setDraft(d=>({...d,[key]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"10px 13px",border:`1.5px solid ${G[300]}`,borderRadius:"10px",fontSize:"13px",fontFamily:"inherit",boxSizing:"border-box",outline:"none",color:G[900]}}/></div>
            ))}
            <div style={{display:"flex",gap:"8px"}}><button onClick={()=>setEditProfile(false)} style={{flex:1,padding:"12px",borderRadius:"10px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:G[700]}}>취소</button><button onClick={()=>{setProfile({...draft});setEditProfile(false);}} style={{flex:1,padding:"12px",borderRadius:"10px",border:"none",background:PRIMARY,color:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>저장</button></div>
          </div>
        </div>
      )}
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"14px"}}>
        {menuGroups.map((grp,gi)=>(
          <div key={gi}>
            <div style={{fontSize:"11px",fontWeight:700,color:G[400],marginBottom:"6px",letterSpacing:"0.5px"}}>{grp.title.toUpperCase()}</div>
            <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"12px",overflow:"hidden"}}>
              {grp.items.map((item,ii)=>(
                <div key={ii} onClick={()=>item.go&&go(item.go)} style={{display:"flex",alignItems:"center",gap:"12px",padding:"13px 14px",borderBottom:ii<grp.items.length-1?`1px solid ${G[100]}`:"none",cursor:item.go||item.toggle?"pointer":"default"}}>
                  <div style={{width:"32px",height:"32px",borderRadius:"9px",background:G[50],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{item.icon}</div>
                  <div style={{flex:1}}><div style={{fontSize:"13px",fontWeight:600}}>{item.label}</div>{item.sub&&<div style={{fontSize:"11px",color:PRIMARY,fontWeight:700,marginTop:"1px"}}>{item.sub}</div>}</div>
                  {item.badge&&<Badge bg={item.badgeColor||G[200]} color={item.badgeColor?"#fff":G[700]}>{item.badge}</Badge>}
                  {item.toggle?<div onClick={e=>{e.stopPropagation();item.set(v=>!v);}} style={{width:"40px",height:"22px",borderRadius:"11px",background:item.val?PRIMARY:G[300],position:"relative",cursor:"pointer",flexShrink:0}}><div style={{width:"18px",height:"18px",borderRadius:"50%",background:"#fff",position:"absolute",top:"2px",left:item.val?"20px":"2px",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/></div>:item.action==="id-pw"?<button onClick={e=>{e.stopPropagation();setIdPwModal(true);}} style={{padding:"5px 11px",borderRadius:"7px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"11px",fontWeight:700,color:G[700],cursor:"pointer",fontFamily:"inherit"}}>변경</button>:(!item.sub&&!item.badge&&Icon.chevron())}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button style={{width:"100%",padding:"13px",borderRadius:"12px",border:`1.5px solid #FFCDD2`,background:"#FFF5F5",color:"#E53935",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}}>{FlatIcons.logout()}로그아웃</button>
      </div>
    </div>
  </Phone>;
}

function OwnerMyPage({go}){
  const [noti,setNoti]=useState(true);
  const [editProfile,setEditProfile]=useState(false);
  const [profile,setProfile]=useState({name:"김사장",nick:"owner01",phone:"010-9876-5432",biz:"123-45-67890"});
  const [draft,setDraft]=useState({...profile});
  const menuGroups=[
    {title:"가게 관리",items:[{icon:FlatIcons.store(),label:"가게 정보",go:"owner-info"},{icon:FlatIcons.orders(G[600]),label:"주문 내역",go:"owner-orders"},{icon:FlatIcons.review(G[600]),label:"리뷰 관리",go:"owner-reviews"}]},
    {title:"매출",items:[{icon:FlatIcons.creditcard(),label:"매출 분석",go:"owner-sales"},{icon:FlatIcons.point(G[600]),label:"정산 내역",sub:"이번달 3,420,000원"}]},
    {title:"설정",items:[{icon:FlatIcons.bell(G[600]),label:"알림 설정",toggle:true,val:noti,set:setNoti},{icon:FlatIcons.lock(G[600]),label:"개인정보 보호"},{icon:FlatIcons.notice(G[600]),label:"공지사항 / 고객센터"}]},
  ];
  return <Phone noNav>
    <TopBar title="마이페이지" go={go} backTo="owner-dash"/>
    <div style={{flex:1,overflowY:"auto"}}>
      <div style={{padding:"20px 16px 16px",background:`linear-gradient(160deg,#FFF3E0,#fff)`,borderBottom:`1px solid ${G[100]}`}}>
        <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
          <div style={{position:"relative"}}>
            <div style={{width:"64px",height:"64px",borderRadius:"50%",background:G[200],display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid #fff`,boxShadow:"0 2px 8px rgba(0,0,0,0.1)",overflow:"hidden"}}>
              <svg width="58" height="58" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={G[500]} opacity=".7"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill={G[400]} opacity=".5"/></svg>
            </div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:"17px",fontWeight:900}}>{profile.name}</div>
            <div style={{fontSize:"12px",color:G[500],marginTop:"1px"}}>@{profile.nick}</div>
            <div style={{marginTop:"5px"}}><Badge bg="#E65100" color="#fff">사장님</Badge></div>
          </div>
          <button onClick={()=>{setDraft({...profile});setEditProfile(true);}} style={{padding:"7px 13px",borderRadius:"8px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"11px",fontWeight:700,color:G[700],cursor:"pointer",fontFamily:"inherit"}}>프로필 수정</button>
        </div>
        <div style={{display:"flex",marginTop:"16px",background:"#fff",borderRadius:"12px",border:`1px solid ${G[200]}`,overflow:"hidden"}}>
          {[{l:"이번달 주문",v:"843"},{l:"평균 평점",v:"4.7"},{l:"리뷰",v:"234"},{l:"정산예정",v:"3.4M"}].map((s,i,arr)=>(
            <div key={i} style={{flex:1,padding:"11px 0",textAlign:"center",borderRight:i<arr.length-1?`1px solid ${G[200]}`:"none"}}>
              <div style={{fontSize:"16px",fontWeight:900}}>{s.v}</div>
              <div style={{fontSize:"10px",color:G[500],marginTop:"2px"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      {editProfile&&(
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.45)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:"340px",background:"#fff",borderRadius:"16px",padding:"20px",display:"flex",flexDirection:"column",gap:"13px",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:"15px",fontWeight:900}}>프로필 수정</span><span onClick={()=>setEditProfile(false)} style={{fontSize:"20px",cursor:"pointer",color:G[400]}}>×</span></div>
            {[{label:"이름",key:"name",ph:"실명 입력"},{label:"닉네임",key:"nick",ph:"닉네임"},{label:"핸드폰번호",key:"phone",ph:"010-0000-0000"},{label:"사업자번호",key:"biz",ph:"000-00-00000"}].map(({label,key,ph})=>(
              <div key={key}><div style={{fontSize:"11px",fontWeight:700,color:G[600],marginBottom:"5px"}}>{label}</div><input value={draft[key]} onChange={e=>setDraft(d=>({...d,[key]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"10px 13px",border:`1.5px solid ${G[300]}`,borderRadius:"10px",fontSize:"13px",fontFamily:"inherit",boxSizing:"border-box",outline:"none",color:G[900]}}/></div>
            ))}
            <div style={{display:"flex",gap:"8px"}}><button onClick={()=>setEditProfile(false)} style={{flex:1,padding:"12px",borderRadius:"10px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:G[700]}}>취소</button><button onClick={()=>{setProfile({...draft});setEditProfile(false);}} style={{flex:1,padding:"12px",borderRadius:"10px",border:"none",background:"#E65100",color:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>저장</button></div>
          </div>
        </div>
      )}
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"14px"}}>
        {menuGroups.map((grp,gi)=>(
          <div key={gi}>
            <div style={{fontSize:"11px",fontWeight:700,color:G[400],marginBottom:"6px",letterSpacing:"0.5px"}}>{grp.title.toUpperCase()}</div>
            <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"12px",overflow:"hidden"}}>
              {grp.items.map((item,ii)=>(
                <div key={ii} onClick={()=>item.go&&go(item.go)} style={{display:"flex",alignItems:"center",gap:"12px",padding:"13px 14px",borderBottom:ii<grp.items.length-1?`1px solid ${G[100]}`:"none",cursor:item.go||item.toggle?"pointer":"default"}}>
                  <div style={{width:"32px",height:"32px",borderRadius:"9px",background:G[50],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{item.icon}</div>
                  <div style={{flex:1}}><div style={{fontSize:"13px",fontWeight:600}}>{item.label}</div>{item.sub&&<div style={{fontSize:"11px",color:"#E65100",fontWeight:700,marginTop:"1px"}}>{item.sub}</div>}</div>
                  {item.toggle?<div onClick={e=>{e.stopPropagation();item.set(v=>!v);}} style={{width:"40px",height:"22px",borderRadius:"11px",background:item.val?"#E65100":G[300],position:"relative",cursor:"pointer",flexShrink:0}}><div style={{width:"18px",height:"18px",borderRadius:"50%",background:"#fff",position:"absolute",top:"2px",left:item.val?"20px":"2px",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/></div>:item.action==="id-pw"?<button onClick={e=>{e.stopPropagation();setIdPwModal(true);}} style={{padding:"5px 11px",borderRadius:"7px",border:`1.5px solid ${G[300]}`,background:"#fff",fontSize:"11px",fontWeight:700,color:G[700],cursor:"pointer",fontFamily:"inherit"}}>변경</button>:(!item.sub&&Icon.chevron())}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button style={{width:"100%",padding:"13px",borderRadius:"12px",border:`1.5px solid #FFCDD2`,background:"#FFF5F5",color:"#E53935",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px"}}>{FlatIcons.logout()}로그아웃</button>
      </div>
    </div>
  </Phone>;
}


function Admin({go}){
  const stats=[{l:"총 사용자",v:"12,847"},{l:"활성 가게",v:"843"},{l:"오늘 주문",v:"2,391"},{l:"오늘 매출",v:"58.2M"}];
  const menus=[{icon:"👥",l:"사용자 관리",g:"admin-users",badge:null},{icon:"🏪",l:"가게 관리",g:"admin-stores",badge:"5"},{icon:"📦",l:"주문 관리",g:"admin-orders",badge:null},{icon:"📂",l:"카테고리",g:"admin-categories",badge:null},{icon:"📍",l:"지역 관리",g:"admin-regions",badge:null},{icon:"🤖",l:"AI 관리",g:"admin-ai",badge:null},{icon:"💳",l:"결제 관리",g:"admin-payments",badge:"2"},{icon:"⭐",l:"리뷰 관리",g:"admin-reviews",badge:"8"}];
  return <Phone noNav>
    <div style={{height:`${STATUS_H}px`,background:"#1A237E",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",fontSize:"12px",color:"#fff",fontWeight:600,flexShrink:0}}><span>9:41</span><span>●●●● 🔋</span></div>
    <div style={{height:`${PH-STATUS_H}px`,overflowY:"auto",flexDirection:"column",display:"flex",flexShrink:0}}>
      <div style={{padding:"14px 16px 12px",background:"#1A237E"}}><div style={{fontSize:"18px",fontWeight:900,color:"#fff"}}>⚙️ 관리자 패널</div><div style={{fontSize:"12px",color:"rgba(255,255,255,0.6)",marginTop:"2px"}}>admin01 · MASTER</div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"14px 14px 0"}}>
        {stats.map((s,i)=><div key={i} style={{padding:"11px 13px",background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px"}}><div style={{fontSize:"10px",color:G[500],fontWeight:600}}>{s.l}</div><div style={{fontSize:"18px",fontWeight:900,color:G[900],marginTop:"2px"}}>{s.v}</div></div>)}
      </div>
      <div style={{padding:"14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{padding:"10px 12px",background:"#FFF8E1",border:"1px solid #FFD54F",borderRadius:"9px",display:"flex",alignItems:"center",gap:"8px"}}>{Icon.alert()}<span style={{fontSize:"12px",color:"#E65100",fontWeight:600}}>미승인 가게 5건 · 환불 요청 2건</span></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
          {menus.map((m,i)=>(
            <div key={i} onClick={()=>go(m.g)} style={{padding:"14px 13px",border:`1.5px solid ${G[200]}`,borderRadius:"12px",background:"#fff",cursor:"pointer",position:"relative"}}>
              {m.badge&&<div style={{position:"absolute",top:"10px",right:"10px",background:"#E53935",color:"#fff",borderRadius:"10px",fontSize:"10px",fontWeight:700,padding:"1px 6px"}}>{m.badge}</div>}
              <div style={{fontSize:"24px",marginBottom:"5px"}}>{m.icon}</div>
              <div style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Phone>;
}

function AdminUsers({go}){
  const users=[{name:"user123",role:"고객",date:"2025-01-12",status:"정상"},{name:"owner01",role:"사장님",date:"2025-01-08",status:"정상"},{name:"user456",role:"고객",date:"2025-02-01",status:"정지"},{name:"user789",role:"고객",date:"2025-02-14",status:"정상"}];
  return <AdminShell title="사용자 관리" go={go}>
    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      <SearchBar placeholder="이름, 이메일, ID 검색"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>{[{l:"전체 회원",v:"12,847"},{l:"오늘 가입",v:"43"},{l:"정지 계정",v:"12",alert:true}].map((s,i)=><StatCard key={i} label={s.l} value={s.v} color={s.alert?"#C62828":undefined} bg={s.alert?"#FFEBEE":undefined}/>)}</div>
      <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}>
        <THead cols={[{v:"사용자",flex:2},{v:"역할",flex:1},{v:"상태",flex:1}]}/>
        {users.map((u,i)=><TRow key={i} cols={[{v:<div><div style={{fontSize:"12px",fontWeight:700}}>{u.name}</div><div style={{fontSize:"10px",color:G[400]}}>{u.date}</div></div>,flex:2},{v:<Badge bg={u.role==="사장님"?PRIMARY_LIGHT:G[100]} color={u.role==="사장님"?PRIMARY:G[700]}>{u.role}</Badge>,flex:1},{v:<Badge bg={u.status==="정지"?"#FFEBEE":"#E8F5E9"} color={u.status==="정지"?"#C62828":"#2E7D32"}>{u.status}</Badge>,flex:1}]} actions={[<button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>,<button key="b" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.block()}</button>,<button key="d" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.trash()}</button>]}/>)}
      </div>
    </div>
  </AdminShell>;
}

function AdminStores({go}){
  const stores=[{name:"맛있는 한식당",owner:"owner01",cat:"한식",status:"승인"},{name:"신규 피자집",owner:"owner05",cat:"피자",status:"심사중"},{name:"황금 중식당",owner:"owner02",cat:"중식",status:"승인"},{name:"이상한 분식",owner:"owner09",cat:"분식",status:"정지"}];
  return <AdminShell title="가게 관리" go={go}>
    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      <SearchBar placeholder="가게명 검색"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>{[{l:"전체",v:"843"},{l:"심사중",v:"5",alert:true},{l:"정지",v:"7"}].map((s,i)=><StatCard key={i} label={s.l} value={s.v} color={s.alert?"#E65100":undefined} bg={s.alert?"#FFF3E0":undefined}/>)}</div>
      <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}>
        <THead cols={[{v:"가게",flex:2},{v:"카테고리",flex:1},{v:"상태",flex:1}]}/>
        {stores.map((s,i)=><TRow key={i} cols={[{v:<div><div style={{fontSize:"12px",fontWeight:700}}>{s.name}</div><div style={{fontSize:"10px",color:G[400]}}>{s.owner}</div></div>,flex:2},{v:<Badge>{s.cat}</Badge>,flex:1},{v:<Badge bg={s.status==="승인"?"#E8F5E9":s.status==="심사중"?"#FFF3E0":"#FFEBEE"} color={s.status==="승인"?"#2E7D32":s.status==="심사중"?"#E65100":"#C62828"}>{s.status}</Badge>,flex:1}]} actions={[<button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>,<button key="b" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.block()}</button>]}/>)}
      </div>
    </div>
  </AdminShell>;
}

function AdminOrders({go}){
  const weekData=[{d:"월",v:320},{d:"화",v:410},{d:"수",v:380},{d:"목",v:510},{d:"금",v:620},{d:"토",v:780},{d:"일",v:540}];
  const orders=[{id:"ORD-2391",store:"맛있는 한식당",amount:"32,000",status:"배달중",statusColor:"#1565C0",statusBg:"#E3F2FD"},{id:"ORD-2390",store:"엄마손 분식",amount:"15,000",status:"완료",statusColor:"#2E7D32",statusBg:"#E8F5E9"},{id:"ORD-2389",store:"황금 중식당",amount:"28,000",status:"취소",statusColor:"#C62828",statusBg:"#FFEBEE"}];
  return <AdminShell title="주문 관리" go={go}>
    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>{[{l:"오늘 주문",v:"2,391"},{l:"진행 중",v:"847"},{l:"취소율",v:"2.3%"}].map((s,i)=><StatCard key={i} label={s.l} value={s.v}/>)}</div>
      <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}><div style={{fontSize:"13px",fontWeight:800,marginBottom:"10px"}}>이번 주 주문 추이</div><ResponsiveContainer width="100%" height={110}><BarChart data={weekData} margin={{top:4,right:4,left:-28,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke={G[100]} vertical={false}/><XAxis dataKey="d" tick={{fontSize:10,fill:G[400]}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{fontSize:"11px",borderRadius:"8px"}}/><Bar dataKey="v" fill="#1A237E" radius={[4,4,0,0]} maxBarSize={22}/></BarChart></ResponsiveContainer></div>
      <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}><THead cols={[{v:"주문번호/가게",flex:2},{v:"금액",flex:1},{v:"상태",flex:1}]}/>{orders.map((o,i)=><TRow key={i} cols={[{v:<div><div style={{fontSize:"11px",fontWeight:700}}>{o.id}</div><div style={{fontSize:"10px",color:G[400]}}>{o.store}</div></div>,flex:2},{v:<span style={{fontSize:"11px",fontWeight:700}}>{o.amount}원</span>,flex:1},{v:<Badge bg={o.statusBg} color={o.statusColor}>{o.status}</Badge>,flex:1}]} actions={[<button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>]}/>)}</div>
    </div>
  </AdminShell>;
}

function AdminCategories({go}){
  const cats=[{name:"한식",icon:"🍚",stores:234,active:true},{name:"중식",icon:"🥢",stores:87,active:true},{name:"분식",icon:"🌮",stores:156,active:true},{name:"치킨",icon:"🍗",stores:312,active:true},{name:"피자",icon:"🍕",stores:98,active:true},{name:"일식",icon:"🍣",stores:67,active:false}];
  return <AdminShell title="카테고리 관리" go={go}>
    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"8px"}}>
      {cats.map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"12px",padding:"11px 13px",border:`1.5px solid ${G[200]}`,borderRadius:"10px",background:"#fff"}}><span style={{fontSize:"22px",width:"32px",textAlign:"center"}}>{c.icon}</span><div style={{flex:1}}><div style={{fontSize:"13px",fontWeight:700}}>{c.name}</div><div style={{fontSize:"10px",color:G[500]}}>가게 {c.stores}개</div></div><div style={{width:"36px",height:"20px",borderRadius:"10px",background:c.active?"#2E7D32":G[300],position:"relative",cursor:"pointer"}}><div style={{width:"16px",height:"16px",borderRadius:"50%",background:"#fff",position:"absolute",top:"2px",left:c.active?"18px":"2px",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/></div></div>)}
      <div style={{padding:"12px",border:`2px dashed ${G[300]}`,borderRadius:"10px",textAlign:"center",color:G[400],fontSize:"13px",cursor:"pointer"}}>+ 새 카테고리 추가</div>
    </div>
  </AdminShell>;
}

function AdminRegions({go}){
  const regions=[{name:"서울 종로구",zones:["광화문","경복궁","종로"],stores:127},{name:"서울 강남구",zones:["강남","역삼","선릉"],stores:342},{name:"서울 마포구",zones:["홍대","합정","상수"],stores:198}];
  return <AdminShell title="지역 관리" go={go}>
    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"9px"}}>
      <SearchBar placeholder="지역명, 구역 검색"/>
      {regions.map((r,i)=><div key={i} style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px 13px",background:"#fff"}}><div style={{fontSize:"13px",fontWeight:800,marginBottom:"7px"}}>{r.name} <span style={{fontSize:"10px",color:G[500],fontWeight:400}}>가게 {r.stores}개</span></div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{r.zones.map(z=><span key={z} style={{padding:"3px 8px",background:G[100],borderRadius:"4px",fontSize:"10px",color:G[600],fontWeight:600}}>{z}</span>)}</div></div>)}
    </div>
  </AdminShell>;
}

function AdminAI({go}){
  const aiData=[{t:"00시",v:12},{t:"08시",v:45},{t:"12시",v:234},{t:"16시",v:187},{t:"20시",v:312},{t:"24시",v:98}];
  const logs=[{id:"AI-001",type:"메뉴추천",user:"user123",time:"12:34",tokens:842,status:"성공"},{id:"AI-002",type:"리뷰답글",user:"owner01",time:"12:31",tokens:412,status:"성공"},{id:"AI-003",type:"메뉴추천",user:"user456",time:"12:28",tokens:0,status:"실패"}];
  return <AdminShell title="AI 관리" go={go}>
    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>{[{l:"오늘 요청",v:"1,247",c:AI_COLOR,bg:AI_LIGHT},{l:"성공률",v:"98.2%"},{l:"평균 응답",v:"310ms"}].map((s,i)=><StatCard key={i} label={s.l} value={s.v} color={s.c} bg={s.bg}/>)}</div>
      <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"12px"}}><div style={{fontSize:"13px",fontWeight:800,marginBottom:"10px"}}>시간대별 AI 요청</div><ResponsiveContainer width="100%" height={110}><BarChart data={aiData} margin={{top:4,right:4,left:-28,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke={G[100]} vertical={false}/><XAxis dataKey="t" tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:G[400]}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{fontSize:"11px",borderRadius:"8px"}}/><Bar dataKey="v" fill={AI_COLOR} radius={[4,4,0,0]} maxBarSize={22}/></BarChart></ResponsiveContainer></div>
      <div style={{padding:"12px",background:AI_LIGHT,border:`1.5px solid ${AI_COLOR}44`,borderRadius:"11px"}}><div style={{fontSize:"13px",fontWeight:800,color:AI_COLOR,marginBottom:"8px"}}>모델 설정</div>{[["사용 모델","claude-sonnet-4-6"],["Max Tokens","1,000"],["Temperature","0.7"]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${AI_COLOR}22`}}><span style={{fontSize:"11px",color:G[600],fontWeight:600}}>{k}</span><span style={{fontSize:"11px",fontWeight:700,color:AI_COLOR}}>{v}</span></div>)}</div>
      <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}><THead cols={[{v:"유형/사용자",flex:2},{v:"토큰",flex:1},{v:"상태",flex:1}]}/>{logs.map((l,i)=><TRow key={i} cols={[{v:<div><div style={{fontSize:"11px",fontWeight:700,color:AI_COLOR}}>{l.type}</div><div style={{fontSize:"10px",color:G[400]}}>{l.user} · {l.time}</div></div>,flex:2},{v:<span style={{fontSize:"11px"}}>{l.tokens>0?l.tokens:"-"}</span>,flex:1},{v:<Badge bg={l.status==="성공"?"#E8F5E9":"#FFEBEE"} color={l.status==="성공"?"#2E7D32":"#C62828"}>{l.status}</Badge>,flex:1}]} actions={[<button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>]}/>)}</div>
    </div>
  </AdminShell>;
}

function AdminPayments({go}){
  const [tab,setTab]=useState("개요");
  const tabs=["개요","결제 로그","수단별 분석"];
  const [logFilter,setLogFilter]=useState("전체");
  const methodStats=[
    {method:"신용/체크카드",icon:"💳",total:1842,success:1798,fail:44,refund:12,revenue:"52.1M",successRate:97.6,failRate:2.4,color:"#1565C0",bg:"#E3F2FD"},
    {method:"카카오페이",icon:"💛",total:634,success:621,fail:13,refund:5,revenue:"18.3M",successRate:98.0,failRate:2.0,color:"#F9A825",bg:"#FFF8E1"},
    {method:"토스",icon:"🔵",total:412,success:408,fail:4,refund:2,revenue:"12.7M",successRate:99.0,failRate:1.0,color:"#0064FF",bg:"#E8EAF6"},
    {method:"무통장입금",icon:"🏦",total:89,success:71,fail:18,refund:0,revenue:"2.1M",successRate:79.8,failRate:20.2,color:"#455A64",bg:"#ECEFF1"},
  ];
  const logs=[
    {id:"PAY-8825",user:"user123",store:"맛있는 한식당",amount:"32,000",method:"카드",status:"성공",time:"14:32:11",failReason:null},
    {id:"PAY-8824",user:"user789",store:"황금 중식당",amount:"22,000",method:"카카오",status:"실패",time:"14:28:44",failReason:"잔액 부족"},
    {id:"PAY-8823",user:"user456",store:"엄마손 분식",amount:"15,000",method:"토스",status:"성공",time:"14:21:05",failReason:null},
    {id:"PAY-8822",user:"user111",store:"맛있는 한식당",amount:"41,000",method:"무통장",status:"실패",time:"14:15:33",failReason:"입금 미확인"},
    {id:"PAY-8821",user:"user222",store:"두부마을",amount:"9,000",method:"카드",status:"환불",time:"13:58:22",failReason:"고객 요청"},
  ];
  const failReasons=[{reason:"잔액 부족",count:31,pct:39,color:"#E53935"},{reason:"네트워크 오류",count:22,pct:28,color:"#E65100"},{reason:"입금 미확인",count:18,pct:23,color:"#F9A825"},{reason:"카드 한도 초과",count:7,pct:9,color:"#9C27B0"},{reason:"기타",count:1,pct:1,color:G[400]}];
  const statusColor={성공:"#2E7D32",실패:"#C62828",환불:"#E65100"};
  const statusBg={성공:"#E8F5E9",실패:"#FFEBEE",환불:"#FFF3E0"};
  const filteredLogs=logFilter==="전체"?logs:logs.filter(l=>l.status===logFilter);
  const MiniBar3=({pct,color})=><div style={{flex:1,height:"6px",background:G[200],borderRadius:"3px",overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:"3px"}}/></div>;
  return <AdminShell title="결제 관리" go={go}>
    <div style={{display:"flex",borderBottom:`1px solid ${G[200]}`,background:"#fff",flexShrink:0}}>
      {tabs.map(t=><div key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"11px 0",textAlign:"center",fontSize:"11px",fontWeight:700,cursor:"pointer",color:tab===t?"#1A237E":G[500],borderBottom:`2px solid ${tab===t?"#1A237E":"transparent"}`}}>{t}</div>)}
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      {tab==="개요"&&<>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
          {[{l:"오늘 결제액",v:"58.2M"},{l:"환불 요청",v:"2건",alert:true},{l:"전체 성공률",v:"96.8%",good:true},{l:"평균 실패율",v:"3.2%",warn:true}].map((s,i)=>(
            <StatCard key={i} label={s.l} value={s.v} color={s.alert?"#C62828":s.warn?"#E65100":s.good?"#2E7D32":undefined} bg={s.alert?"#FFEBEE":s.warn?"#FFF3E0":s.good?"#E8F5E9":undefined}/>
          ))}
        </div>
        <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"13px"}}>
          <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"11px"}}>결제 수단별 성공률</div>
          <div style={{display:"flex",flexDirection:"column",gap:"9px"}}>
            {methodStats.map((m,i)=>(
              <div key={i}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{fontSize:"12px",fontWeight:700,color:G[800]}}>{m.method}</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{fontSize:"11px",fontWeight:700,color:m.successRate>=95?"#2E7D32":m.successRate>=85?"#E65100":"#C62828"}}>{m.successRate}%</span><span style={{fontSize:"10px",color:G[400]}}>{m.total.toLocaleString()}건</span></div>
                </div>
                <div style={{display:"flex",gap:"3px",height:"8px"}}>
                  <div style={{width:`${m.successRate}%`,height:"100%",background:m.successRate>=95?"#2E7D32":m.successRate>=85?"#FFC107":"#E53935",borderRadius:"4px 0 0 4px"}}/>
                  <div style={{flex:1,height:"100%",background:"#FFCDD2",borderRadius:"0 4px 4px 0"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:"#fff",border:`1.5px solid ${G[200]}`,borderRadius:"11px",padding:"13px"}}>
          <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"11px"}}>결제 실패 원인 분포</div>
          {failReasons.map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"8px"}}>
              <div style={{width:"8px",height:"8px",borderRadius:"50%",background:f.color,flexShrink:0}}/>
              <span style={{fontSize:"12px",color:G[700],flex:1}}>{f.reason}</span>
              <MiniBar3 pct={f.pct} color={f.color}/>
              <span style={{fontSize:"11px",fontWeight:700,color:f.color,width:"30px",textAlign:"right"}}>{f.pct}%</span>
              <span style={{fontSize:"10px",color:G[400],width:"26px",textAlign:"right"}}>{f.count}건</span>
            </div>
          ))}
        </div>
      </>}
      {tab==="결제 로그"&&<>
        <div style={{display:"flex",gap:"5px",overflowX:"auto"}}>
          {["전체","성공","실패","환불"].map(f=><Chip key={f} label={f} active={logFilter===f} onClick={()=>setLogFilter(f)} color={f==="성공"?"#2E7D32":f==="실패"?"#C62828":f==="환불"?"#E65100":"#1A237E"}/>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {filteredLogs.map((p,i)=>(
            <div key={i} style={{border:`1.5px solid ${G[200]}`,borderLeft:`4px solid ${statusColor[p.status]||G[400]}`,borderRadius:"10px",padding:"11px 12px",background:"#fff"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div><div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{fontSize:"12px",fontWeight:800,color:G[900]}}>{p.id}</span><Badge bg={statusBg[p.status]||G[100]} color={statusColor[p.status]||G[600]}>{p.status}</Badge></div><div style={{fontSize:"10px",color:G[400],marginTop:"2px"}}>{p.user} · {p.store}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{parseInt(p.amount.replace(",","")).toLocaleString()}원</div><div style={{fontSize:"10px",color:G[400],marginTop:"2px"}}>{p.time}</div></div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"7px"}}>
                <span style={{fontSize:"10px",color:G[500],padding:"2px 7px",background:G[100],borderRadius:"4px",fontWeight:600}}>{p.method}</span>
                {p.failReason&&<div style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"10px",color:"#C62828",fontWeight:600}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{p.failReason}</div>}
              </div>
            </div>
          ))}
        </div>
      </>}
      {tab==="수단별 분석"&&<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {methodStats.map((m,i)=>(
          <div key={i} style={{border:`1.5px solid ${G[200]}`,borderLeft:`4px solid ${m.color}`,borderRadius:"11px",padding:"13px",background:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"7px"}}><span style={{fontSize:"20px"}}>{m.icon}</span><div><div style={{fontSize:"13px",fontWeight:800,color:G[900]}}>{m.method}</div><div style={{fontSize:"10px",color:G[400]}}>총 {m.total.toLocaleString()}건 · {m.revenue}원</div></div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:"16px",fontWeight:900,color:m.successRate>=95?"#2E7D32":m.successRate>=85?"#E65100":"#C62828"}}>{m.successRate}%</div><div style={{fontSize:"9px",color:G[400]}}>성공률</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginBottom:"10px"}}>
              {[{l:"성공",v:m.success,c:"#2E7D32",bg:"#E8F5E9"},{l:"실패",v:m.fail,c:"#C62828",bg:"#FFEBEE"},{l:"환불",v:m.refund,c:"#E65100",bg:"#FFF3E0"}].map((s,j)=>(
                <div key={j} style={{padding:"7px",background:s.bg,borderRadius:"7px",textAlign:"center"}}><div style={{fontSize:"14px",fontWeight:900,color:s.c}}>{s.v}</div><div style={{fontSize:"9px",color:s.c,opacity:0.75,marginTop:"1px"}}>{s.l}</div></div>
              ))}
            </div>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:G[500],marginBottom:"3px"}}><span style={{color:"#2E7D32"}}>성공 {m.successRate}%</span><span style={{color:"#C62828"}}>실패 {m.failRate}%</span></div>
              <div style={{display:"flex",height:"8px",borderRadius:"4px",overflow:"hidden"}}>
                <div style={{width:`${m.successRate}%`,background:"#2E7D32",borderRadius:"4px 0 0 4px"}}/>
                <div style={{flex:1,background:"#FFCDD2",borderRadius:"0 4px 4px 0"}}/>
              </div>
            </div>
            {m.successRate<85&&<div style={{marginTop:"8px",padding:"7px 9px",background:"#FFEBEE",borderRadius:"7px",fontSize:"10px",color:"#C62828",fontWeight:600}}>⚠️ 실패율이 높습니다. 입금 안내 프로세스 점검 권고</div>}
          </div>
        ))}
      </div>}
    </div>
  </AdminShell>;
}

function AdminReviews({go}){
  const reviews=[{id:"REV-501",user:"user123",store:"맛있는 한식당",rating:5,content:"국물이 진짜 맛있어요!",reported:false},{id:"REV-500",user:"user_bad",store:"황금 중식당",rating:1,content:"욕설 포함 리뷰 내용...",reported:true},{id:"REV-499",user:"user456",store:"엄마손 분식",rating:4,content:"맛있고 빠르게 배달됐어요",reported:false}];
  return <AdminShell title="리뷰 관리" go={go}>
    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"10px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"7px"}}>{[{l:"전체 리뷰",v:"48,291"},{l:"신고 접수",v:"8건",alert:true},{l:"평균 평점",v:"4.3"}].map((s,i)=><StatCard key={i} label={s.l} value={s.v} color={s.alert?"#C62828":undefined} bg={s.alert?"#FFEBEE":undefined}/>)}</div>
      <div style={{border:`1.5px solid ${G[200]}`,borderRadius:"11px",overflow:"hidden"}}><THead cols={[{v:"리뷰/가게",flex:2},{v:"평점",flex:1},{v:"상태",flex:1}]}/>{reviews.map((r,i)=><TRow key={i} highlight={r.reported} cols={[{v:<div><div style={{fontSize:"11px",fontWeight:700}}>{r.content.slice(0,16)}...</div><div style={{fontSize:"10px",color:G[400]}}>{r.user} · {r.store}</div></div>,flex:2},{v:<Stars v={r.rating} size={11}/>,flex:1},{v:r.reported?<Badge bg="#FFEBEE" color="#C62828">신고</Badge>:<Badge bg="#E8F5E9" color="#2E7D32">정상</Badge>,flex:1}]} actions={[<button key="v" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.eye()}</button>,<button key="d" style={{padding:"4px",background:"none",border:"none",cursor:"pointer"}}>{Icon.trash()}</button>]}/>)}</div>
    </div>
  </AdminShell>;
}

// ── 앱 진입점 ─────────────────────────────────────────────
const screenMap={
  onboarding:Onboarding,login:Login,signup:Signup,
  home:Home,store:Store,"store-reviews":StoreReviews,
  "menu-detail":MenuDetail,"ai-recommend":AiRecommend,
  cart:Cart,order:Order,
  "order-complete":OrderComplete,"order-fail":OrderFail,
  "order-history":OrderHistory,"order-detail":OrderDetail,review:Review,
  "owner-dash":OwnerDash,"owner-sales":OwnerSalesDetail,"owner-orders":OwnerOrders,
  "owner-menu":OwnerMenu,"owner-reviews":OwnerReviews,"owner-info":OwnerInfo,
  my:MyPage,
  "owner-my":OwnerMyPage,
  admin:Admin,
  "admin-users":AdminUsers,"admin-stores":AdminStores,"admin-orders":AdminOrders,
  "admin-categories":AdminCategories,"admin-regions":AdminRegions,
  "admin-ai":AdminAI,"admin-payments":AdminPayments,"admin-reviews":AdminReviews,
};

const SCREEN_GROUPS=[
  {label:"고객",color:PRIMARY,ids:["onboarding","login","signup","home","store","menu-detail","store-reviews","ai-recommend","cart","order","order-complete","order-fail","order-history","order-detail","review","my"]},
  {label:"사장님",color:"#E65100",ids:["owner-dash","owner-sales","owner-orders","owner-menu","owner-reviews","owner-info","owner-my"]},
  {label:"관리자",color:"#1A237E",ids:["admin","admin-users","admin-stores","admin-orders","admin-categories","admin-regions","admin-ai","admin-payments","admin-reviews"]},
];

export default function App(){
  const [cur,setCur]=useState("onboarding");
  const Comp=screenMap[cur]||Home;
  return <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${G[100]},${G[200]})`,fontFamily:"'Noto Sans KR','Helvetica Neue',sans-serif"}}>
    <div style={{background:G[900],color:"#fff",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>
      <div><div style={{fontSize:"15px",fontWeight:900}}>🍽️ 배고팡 — UI/UX 와이어프레임</div><div style={{fontSize:"10px",color:G[400],marginTop:"1px"}}>402×874px</div></div>
    </div>
    <div style={{background:"#fff",borderBottom:`1px solid ${G[200]}`,position:"sticky",top:"46px",zIndex:99,padding:"0 12px"}}>
      {SCREEN_GROUPS.map(grp=>(
        <div key={grp.label} style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 0",borderBottom:`1px solid ${G[100]}`}}>
          <span style={{fontSize:"10px",fontWeight:800,color:grp.color,minWidth:"42px"}}>{grp.label}</span>
          <div style={{display:"flex",gap:"4px",overflowX:"auto",flex:1,paddingBottom:"2px"}}>
            {grp.ids.map(id=>{
              const s=screens.find(s=>s.id===id);
              if(!s) return null;
              return <button key={id} onClick={()=>setCur(id)} style={{padding:"4px 10px",borderRadius:"6px",border:`1.5px solid ${cur===id?grp.color:G[200]}`,background:cur===id?grp.color:"#fff",color:cur===id?"#fff":G[600],fontSize:"10px",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s",fontFamily:"inherit",flexShrink:0}}>{s.label}</button>;
            })}
          </div>
        </div>
      ))}
    </div>
    <div style={{display:"flex",justifyContent:"center",padding:"24px 20px"}}>
      <Comp go={setCur}/>
    </div>
  </div>;
}
