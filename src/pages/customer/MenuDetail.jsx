// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/MenuDetail.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Badge, Divider, Img } from "../../shared/components";
import { G, PRIMARY, PRIMARY_LIGHT } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

export default function MenuDetail() {
  const navigate = useNavigate();
  const goTo = (path) => navigate(`/customer/${path}`);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("보통");
  const price = 8000;
  const sizeCost = selectedSize === "대(+2,000원)" ? 2000 : 0;
  const total = (price + sizeCost) * qty;
  return (
    <Phone navActive="home">
      <TopBar title="메뉴 상세" backTo="/customer/store"/>
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
              {[["돼지고기","국내산(제주)"],["김치","국내산"],["두부","국내산"],["대파","국내산"],["고춧가루","국내산"]].map(([item,origin]) => (
                <div key={item} style={{display:"flex",alignItems:"center",borderRadius:"20px",overflow:"hidden",border:`1px solid ${G[300]}`,fontSize:"11px",flexShrink:0}}>
                  <span style={{padding:"4px 8px",background:G[200],color:G[700],fontWeight:700}}>{item}</span>
                  <span style={{padding:"4px 9px",background:"#fff",color:G[500]}}>{origin}</span>
                </div>
              ))}
            </div>
          </div>
          <Divider/>
          {/* 사이즈 */}
          <div>
            <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"8px"}}>사이즈 <Badge bg={PRIMARY} color="#fff">필수</Badge></div>
            <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
              {[{label:"보통",price:0},{label:"대(+2,000원)",price:2000}].map((opt,i) => (
                <div key={i} onClick={()=>setSelectedSize(opt.label)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 13px",border:`1.5px solid ${selectedSize===opt.label?PRIMARY:G[200]}`,borderRadius:"9px",background:selectedSize===opt.label?PRIMARY_LIGHT:"#fff",cursor:"pointer"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
                    <div style={{width:"18px",height:"18px",borderRadius:"50%",border:`2px solid ${selectedSize===opt.label?PRIMARY:G[300]}`,background:selectedSize===opt.label?PRIMARY:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {selectedSize===opt.label && <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#fff"}}/>}
                    </div>
                    <span style={{fontSize:"13px",fontWeight:selectedSize===opt.label?700:400,color:selectedSize===opt.label?PRIMARY:G[800]}}>{opt.label}</span>
                  </div>
                  {opt.price>0 && <span style={{fontSize:"12px",fontWeight:700,color:G[600]}}>+{opt.price.toLocaleString()}원</span>}
                </div>
              ))}
            </div>
          </div>
          {/* 수량 */}
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
        <Btn variant="primary" full style={{flex:1}} onClick={()=>goTo("cart")}>🛒 장바구니 담기</Btn>
      </div>
    </Phone>
  );
}