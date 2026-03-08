import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const G = {
  50:"#FAFAFA",100:"#F5F5F5",200:"#EEEEEE",300:"#E0E0E0",
  400:"#BDBDBD",500:"#9E9E9E",600:"#757575",700:"#616161",
  800:"#424242",900:"#212121"
};
const PRIMARY="#FF5722", PRIMARY_LIGHT="#FFF3F0";
const KAKAO="#FEE500", AI_COLOR="#6C3EE8", AI_LIGHT="#F3EFFF";
const PW=402, PH=874, STATUS_H=44, NAV_H=58, TOPBAR_H=52;
const PAGE_TOP=28; // shared top padding for pages (배달 주소 등과 TopBar alignment)

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
  return <div onClick={onClick} style={{padding:"8px 14px",borderRadius:"20px",fontSize:"12px",fontWeight:600,background:active?ac:G[100],color:active?"#fff":G[600],whiteSpace:"nowrap",cursor:"pointer",transition:"all .15s",flexShrink:0}}>{label}</div>;
}
function Divider({label}){return <div style={{display:"flex",alignItems:"center",gap:"10px",margin:"4px 0"}}><div style={{flex:1,height:"1px",background:G[200]}}/>{label&&<span style={{fontSize:"11px",color:G[400],fontWeight:500}}>{label}</span>}<div style={{flex:1,height:"1px",background:G[200]}}/></div>;}
function Img({w,h,label,radius,style}){return <div style={{width:w||"100%",height:h||"80px",flexShrink:0,background:`repeating-linear-gradient(45deg,${G[100]},${G[100]} 8px,${G[200]} 8px,${G[200]} 16px)`,borderRadius:radius||"8px",display:"flex",alignItems:"center",justifyContent:"center",color:G[400],fontSize:"10px",fontWeight:600,border:`1px solid ${G[200]}`,...style}}>{label||"이미지"}</div>;}
function Stars({v=4.5,size=12}){return <span style={{color:"#FFC107",fontSize:`${size}px`}}>{"★".repeat(Math.floor(v))}{"☆".repeat(5-Math.floor(v))}</span>;}
function Badge({children,color,bg}){return <span style={{display:"inline-flex",alignItems:"center",padding:"2px 6px",borderRadius:"4px",fontSize:"10px",fontWeight:700,background:bg||G[200],color:color||G[700]}}>{children}</span>;}
function Section({title,children,action,actionFn}){return <div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}><span style={{fontSize:"14px",fontWeight:800,color:G[900]}}>{title}</span>{action&&<span onClick={actionFn} style={{fontSize:"12px",color:PRIMARY,fontWeight:600,cursor:"pointer"}}>{action}</span>}</div>{children}</div>;}
function SearchBar({placeholder}){return <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"17px 13px",border:`1.5px solid ${G[300]}`,borderRadius:"10px",background:G[50]}}>{Icon.search()}<span style={{fontSize:"13px",color:G[400]}}>{placeholder||"검색"}</span></div>;}
function StatCard({label,value,color,bg}){return <div style={{flex:1,padding:"11px",background:bg||"#fff",border:`1.5px solid ${color||G[200]}22`,borderRadius:"11px",minWidth:0}}><div style={{fontSize:"11px",color:G[500],fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{label}</div><div style={{fontSize:"18px",fontWeight:900,color:color||G[900],marginTop:"2px"}}>{value}</div></div>;}
function THead({cols}){return <div style={{display:"flex",padding:"8px 12px",background:G[50],borderBottom:`1.5px solid ${G[200]}`,gap:"6px"}}>{cols.map((c,i)=><div key={i} style={{flex:c.flex||1,fontSize:"10px",color:G[500],fontWeight:700,whiteSpace:"nowrap"}}>{c.v}</div>)}<div style={{width:"56px",flexShrink:0}}/></div>;}
function TRow({cols,actions,highlight}){return <div style={{display:"flex",alignItems:"center",padding:"10px 12px",borderBottom:`1px solid ${G[100]}`,background:highlight?"#FFFDE7":"#fff",gap:"6px"}}>{cols.map((c,i)=><div key={i} style={{flex:c.flex||1,fontSize:"11px",color:c.color||G[700],fontWeight:c.bold?700:400,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.v}</div>)}{actions&&<div style={{display:"flex",gap:"4px",flexShrink:0}}>{actions}</div>}</div>;}

function HomeTopBar({address="광화문 1가",onClick}){
  return <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
    <div style={{fontSize:"11px",color:G[500]}}>배달 주소</div>
    <div onClick={onClick} style={{fontSize:"15px",fontWeight:800,color:G[900],display:"flex",alignItems:"center",gap:"4px",cursor:"pointer"}}>📍 {address} <span style={{fontSize:"11px",color:PRIMARY}}>▾</span></div>
  </div>;
}

function TopContent({children}){
  return <div style={{padding:`${PAGE_TOP}px 14px 8px`,background:"#fff",borderBottom:`1px solid ${G[100]}`,flexShrink:0, display:"flex",flexDirection:"column",gap:"12px"}}>{children}</div>;
}

function Radio({checked,onClick,children,style}){
  return <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 13px",border:`1.5px solid ${checked?PRIMARY:G[300]}`,borderRadius:"10px",background:checked?PRIMARY_LIGHT:"#fff",cursor:"pointer",transition:"all .15s",...style}}>
    <div style={{width:"18px",height:"18px",borderRadius:"50%",border:`2px solid ${checked?PRIMARY:G[400]}`,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      {checked&&<div style={{width:"9px",height:"9px",borderRadius:"50%",background:PRIMARY}}/>}
    </div>
    <div style={{flex:1}}>{children}</div>
  </div>;
}

function TopBar({title,go,backTo,right,style}){
  return <div style={{background:"#fff",display:"flex",alignItems:"center",gap:"8px",flexShrink:0,...style}}>
    {backTo&&<button onClick={()=>go(backTo)} style={{width:"34px",height:"34px",borderRadius:"50%",border:`1.5px solid ${G[300]}`,background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G[700]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>}
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
  return <div style={{width:`${PW}px`,height:"100vh",maxHeight:`${PH}px`,border:`3px solid ${G[800]}`,borderRadius:"44px",overflow:"hidden",background:"#fff",boxShadow:"0 12px 48px rgba(0,0,0,0.18)",flexShrink:0,display:"flex",flexDirection:"column"}}>
    <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",flexShrink:0}}>{children}</div>
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

export { G, PRIMARY, PRIMARY_LIGHT, KAKAO, AI_COLOR, AI_LIGHT, PW, PH, STATUS_H, NAV_H, TOPBAR_H, PAGE_TOP, screens, FlatIcons, Icon, Btn, Input, Chip, Divider, Img, Stars, Badge, Section, SearchBar, StatCard, THead, TRow, Radio, TopBar, BottomNav, Phone, AdminShell, HomeTopBar, TopContent };