// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/Cart.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Divider } from "../../shared/components";
import { G, PRIMARY, PRIMARY_LIGHT } from "../../shared/constants";

export default function Cart({ go }) {
  const stores = [
    { name:"맛있는 한식당", items:[{name:"김치찌개",opt:"공기밥 포함",price:8000,qty:1},{name:"불고기 정식",opt:"밥+국+반찬3종",price:12000,qty:2}], fee:2000 },
    { name:"엄마손 분식",   items:[{name:"떡볶이",opt:"매운맛",price:5000,qty:1}], fee:1000 },
  ];
  const [checked,     setChecked]     = useState(stores.map(()=>true));
  const [itemChecked, setItemChecked] = useState(stores.map(s=>s.items.map(()=>true)));

  const toggleStore = si => {
    const nc = [...checked]; nc[si]=!nc[si]; setChecked(nc);
    setItemChecked(itemChecked.map((sg,i)=>i===si?sg.map(()=>nc[si]):sg));
  };
  const toggleItem = (si,ii) => setItemChecked(itemChecked.map((sg,i)=>i===si?sg.map((v,j)=>j===ii?!v:v):sg));

  const totalGoods = stores.reduce((acc,s,si)=>acc+s.items.reduce((a,it,ii)=>a+(itemChecked[si][ii]?it.price*it.qty:0),0),0);
  const totalFee   = stores.reduce((acc,s,si)=>acc+(checked[si]?s.fee:0),0);

  return (
    <Phone navActive="cart" go={go}>
      <TopBar title="🛒 장바구니" go={go} backTo="home"/>
      <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"12px"}}>
        {stores.map((s,si) => (
          <div key={si} style={{border:`1.5px solid ${checked[si]?PRIMARY:G[200]}`,borderRadius:"13px",overflow:"hidden"}}>
            <div style={{padding:"10px 12px",background:checked[si]?PRIMARY_LIGHT:G[50],borderBottom:`1px solid ${G[200]}`,display:"flex",alignItems:"center",gap:"9px"}}>
              <input type="checkbox" checked={checked[si]} onChange={()=>toggleStore(si)} style={{accentColor:PRIMARY,width:"16px",height:"16px"}}/>
              <span style={{fontSize:"14px",fontWeight:800,flex:1,color:checked[si]?PRIMARY:G[700]}}>{s.name}</span>
            </div>
            <div style={{padding:"11px 12px",display:"flex",flexDirection:"column",gap:"10px",background:"#fff"}}>
              {s.items.map((it,ii) => (
                <div key={ii} style={{display:"flex",alignItems:"center",gap:"9px",opacity:!checked[si]||!itemChecked[si][ii]?0.4:1}}>
                  <input type="checkbox" checked={itemChecked[si][ii]} onChange={()=>toggleItem(si,ii)} style={{accentColor:PRIMARY,width:"15px",height:"15px",flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"13px",fontWeight:700}}>{it.name}</div>
                    <div style={{fontSize:"11px",color:G[500]}}>{it.opt}</div>
                    <div style={{fontSize:"13px",fontWeight:800,marginTop:"2px"}}>{(it.price*it.qty).toLocaleString()}원</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:"5px",border:`1.5px solid ${G[300]}`,borderRadius:"7px",padding:"3px 7px"}}>
                    <span style={{fontSize:"15px",cursor:"pointer",color:G[500],fontWeight:700,userSelect:"none"}}>−</span>
                    <span style={{fontSize:"13px",fontWeight:700,minWidth:"14px",textAlign:"center"}}>{it.qty}</span>
                    <span style={{fontSize:"15px",cursor:"pointer",color:PRIMARY,fontWeight:700,userSelect:"none"}}>+</span>
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
    </Phone>
  );
}