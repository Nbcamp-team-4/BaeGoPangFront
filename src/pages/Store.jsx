import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { G, PRIMARY, Icon, Chip, Img, Stars, Badge, Section, Phone, TopBar, Btn } from "../components/UI";

function Store({go}){
  const navigate = useNavigate();
  const goTo = (path) => navigate(`/${path}`);
  const [activeMenu,setActiveMenu]=useState("인기메뉴");
  const [liked,setLiked]=useState(false);
  const menuTabs=["인기메뉴","세트메뉴","단품","특가"];
  const items=[
    {rank:1,name:"김치찌개",option:"공기밥 포함",price:"8,000",reviews:89,ai:true},
    {rank:2,name:"된장찌개",option:"공기밥 포함",price:"7,500",reviews:62,ai:false},
    {rank:3,name:"불고기 정식",option:"밥+국+반찬3종",price:"12,000",reviews:45,ai:true},
  ];
  return <Phone noStatus navActive="home" go={goTo}>
    <TopBar title="맛있는 한식당" go={goTo} backTo="home" right={
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
          <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"5px"}}><Stars v={4.7}/><span style={{fontSize:"13px",fontWeight:700}}>4.7</span><span onClick={()=>goTo("store-reviews")} style={{fontSize:"11px",color:PRIMARY,cursor:"pointer",textDecoration:"underline"}}>리뷰 234개 보기 →</span></div>
        </div>
        {/* 사진 리뷰 미리보기 */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
            <span style={{fontSize:"13px",fontWeight:800,color:G[900]}}>📸 사진 리뷰</span>
            <span onClick={()=>goTo("store-reviews")} style={{fontSize:"11px",color:PRIMARY,fontWeight:600,cursor:"pointer"}}>전체보기 →</span>
          </div>
          <div style={{display:"flex",gap:"6px",overflowX:"auto",marginLeft:"-14px",paddingLeft:"14px",paddingRight:"14px",paddingBottom:"4px"}}>
            {[1,2,3,4,5].map(n=>(
              <div key={n} style={{position:"relative",flexShrink:0}}>
                <Img w="80px" h="80px" label={`리뷰${n}`} radius="9px"/>
                {n===5&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.45)",borderRadius:"9px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>goTo("store-reviews")}><span style={{color:"#fff",fontSize:"12px",fontWeight:800}}>+더보기</span></div>}
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
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {items.map((it,i)=>(
            <div key={i} onClick={()=>goTo("menu-detail")} style={{border:`1.5px solid ${G[200]}`,borderRadius:"13px",overflow:"hidden",cursor:"pointer",background:"#fff"}}>
              <div style={{display:"flex",gap:"12px",padding:"12px"}}>
                <div style={{position:"relative",flexShrink:0}}>
                  <Img w="70px" h="70px" label={it.name} radius="9px"/>
                  {it.rank&&<div style={{position:"absolute",top:"4px",left:"4px",width:"20px",height:"20px",borderRadius:"50%",background:PRIMARY,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:900}}>{it.rank}</div>}
                  {it.ai&&<div style={{position:"absolute",bottom:"4px",right:"4px",padding:"2px 5px",borderRadius:"6px",background:AI_COLOR,color:"#fff",fontSize:"9px",fontWeight:800}}>AI추천</div>}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:"14px",fontWeight:800,color:G[900]}}>{it.name}</div>
                  <div style={{fontSize:"11px",color:G[500],marginTop:"2px"}}>{it.option}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"6px"}}>
                    <span style={{fontSize:"13px",fontWeight:800}}>{it.price}원</span>
                    <div style={{display:"flex",alignItems:"center",gap:"2px"}}><Stars v={4.5} size={10}/><span style={{fontSize:"10px",color:G[500]}}>{it.reviews}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Phone>;
}

export default Store;