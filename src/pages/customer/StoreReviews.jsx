// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/StoreReviews.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Chip, Img } from "../../shared/components";
import { FlatIcons } from "../../shared/icons";
import { G, PRIMARY } from "../../shared/constants";

function Stars({ v=4.5, size=12 }) {
  return <span style={{color:"#FFC107",fontSize:`${size}px`}}>{"★".repeat(Math.floor(v))}{"☆".repeat(5-Math.floor(v))}</span>;
}

export default function StoreReviews({ go }) {
  const [filter, setFilter] = useState("전체");
  const filters = ["전체","5점","4점","3점 이하","사진 리뷰"];
  const reviews = [
    { user:"user123", rating:5, date:"2025-03-01", menu:"김치찌개", content:"국물이 진짜 얼큰하고 맛있어요!", img:true,  ownerReply:"소중한 리뷰 감사합니다 😊" },
    { user:"user456", rating:4, date:"2025-02-28", menu:"불고기 정식", content:"양념이 잘 배어있고 반찬도 신선했어요.", img:false, ownerReply:null },
    { user:"user999", rating:3, date:"2025-02-25", menu:"김치찌개", content:"맛은 평범했어요.", img:false, ownerReply:null },
  ];
  return (
    <Phone navActive="home" go={go}>
      <TopBar title="가게 리뷰" go={go} backTo="store"/>
      <div style={{flex:1,overflowY:"auto"}}>
        {/* 평점 요약 */}
        <div style={{padding:"14px",borderBottom:`1px solid ${G[100]}`,background:"#fff",display:"flex",flexDirection:"column",gap:"12px"}}>
          <div style={{display:"flex",gap:"14px",alignItems:"center"}}>
            <div style={{textAlign:"center",flexShrink:0}}>
              <div style={{fontSize:"38px",fontWeight:900,color:G[900],lineHeight:1}}>4.7</div>
              <Stars v={4.7} size={14}/>
              <div style={{fontSize:"10px",color:G[400],marginTop:"3px"}}>234개 리뷰</div>
            </div>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:"4px"}}>
              {[{star:5,count:168},{star:4,count:42},{star:3,count:14},{star:2,count:6},{star:1,count:4}].map(({star,count}) => {
                const pct = Math.round(count/234*100);
                return (
                  <div key={star} style={{display:"flex",alignItems:"center",gap:"5px"}}>
                    <span style={{fontSize:"10px",color:G[500],width:"14px",textAlign:"right",flexShrink:0}}>{star}</span>
                    <svg width="9" height="9" viewBox="0 0 24 24" style={{flexShrink:0}}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#FFC107"/></svg>
                    <div style={{flex:1,height:"6px",background:G[100],borderRadius:"3px",overflow:"hidden"}}>
                      <div style={{width:`${pct}%`,height:"100%",background:star>=4?"#FFC107":star===3?"#FFB74D":"#FFCDD2",borderRadius:"3px"}}/>
                    </div>
                    <span style={{fontSize:"10px",color:G[400],width:"22px",textAlign:"right",flexShrink:0}}>{count}</span>
                  </div>
                );
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
            <div style={{fontSize:"12px",color:G[700],lineHeight:"1.7"}}>안녕하세요! 맛있는 한식당입니다 😊<br/>매주 월요일은 재료 수급으로 일부 메뉴가 품절될 수 있습니다.</div>
          </div>
        </div>
        <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:"12px"}}>
          <div style={{display:"flex",gap:"5px",overflowX:"auto"}}>
            {filters.map(f => <Chip key={f} label={f} active={filter===f} onClick={()=>setFilter(f)}/>)}
          </div>
          {reviews.map((r,i) => (
            <div key={i} style={{border:`1.5px solid ${G[200]}`,borderRadius:"13px",padding:"12px",background:"#fff",display:"flex",flexDirection:"column",gap:"8px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{display:"flex",alignItems:"center",gap:"7px"}}>{FlatIcons.userAvatar(33)}<div><div style={{fontSize:"12px",fontWeight:700}}>{r.user}</div><div style={{fontSize:"10px",color:G[400]}}>{r.date}</div></div></div>
                <div style={{textAlign:"right"}}><Stars v={r.rating} size={12}/><div style={{fontSize:"10px",color:G[500],marginTop:"2px"}}>#{r.menu}</div></div>
              </div>
              <div style={{fontSize:"12px",color:G[700],lineHeight:"1.7"}}>{r.content}</div>
              {r.img && <div style={{display:"flex",gap:"5px"}}><Img w="72px" h="72px" label="사진" radius="7px"/><Img w="72px" h="72px" label="사진2" radius="7px"/></div>}
              {r.ownerReply && <div style={{padding:"9px 11px",background:"#FFF8E1",borderRadius:"7px",borderLeft:"3px solid #FFC107"}}><div style={{fontSize:"10px",fontWeight:700,color:"#F57F17",marginBottom:"3px"}}>🏪 사장님 답글</div><div style={{fontSize:"11px",color:G[700]}}>{r.ownerReply}</div></div>}
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}
