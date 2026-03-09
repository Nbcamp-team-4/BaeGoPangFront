// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/AiRecommend.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { Phone, TopBar, Btn, Badge, Img } from "../../shared/components";
import { G, PRIMARY, AI_COLOR, AI_LIGHT } from "../../shared/constants";

export default function AiRecommend({ go }) {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ mood:null, people:null, budget:null });
  const moods  = ["🌶️ 매운 게 땡겨요","🥣 따뜻한 국물","🥗 가볍게","🍖 고기가 땡겨요","🍜 면 요리","🎲 아무거나"];
  const people = ["혼자","2~3명","4명 이상"];
  const budget = ["1만원 이하","1~2만원","2만원 이상"];
  const results = [
    { name:"김치찌개",   store:"맛있는 한식당", price:"8,000",  reason:"오늘 날씨에 딱 맞는 얼큰한 국물이에요!", match:98 },
    { name:"불고기 정식", store:"맛있는 한식당", price:"12,000", reason:"든든한 한 끼, 반찬이 다양해 만족도가 높아요.", match:91 },
    { name:"순두부찌개", store:"두부마을",       price:"9,000",  reason:"부드럽고 깊은 맛, 소화도 잘 돼요.", match:85 },
  ];
  return (
    <Phone navActive="ai-recommend" go={go}>
      <TopBar title="✨ AI 메뉴 추천" go={go} backTo="home"/>
      <div style={{flex:1,overflowY:"auto"}}>
        {step===0 && (
          <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:"18px"}}>
            <div style={{padding:"16px",borderRadius:"14px",background:`linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,textAlign:"center",color:"#fff"}}>
              <div style={{fontSize:"30px",marginBottom:"5px"}}>🤖</div>
              <div style={{fontSize:"15px",fontWeight:800}}>오늘 뭐 먹을까요?</div>
            </div>
            <div>
              <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"9px"}}>Q1. 오늘 어떤 음식이 땡기나요?</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
                {moods.map(m => <div key={m} onClick={()=>setSel(s=>({...s,mood:m}))} style={{padding:"11px 9px",border:`2px solid ${sel.mood===m?AI_COLOR:G[300]}`,borderRadius:"9px",background:sel.mood===m?AI_LIGHT:"#fff",cursor:"pointer",fontSize:"12px",fontWeight:600,color:sel.mood===m?AI_COLOR:G[700],textAlign:"center"}}>{m}</div>)}
              </div>
            </div>
            <div>
              <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"9px"}}>Q2. 몇 명이서 드세요?</div>
              <div style={{display:"flex",gap:"7px"}}>
                {people.map(p => <div key={p} onClick={()=>setSel(s=>({...s,people:p}))} style={{flex:1,padding:"11px 0",border:`2px solid ${sel.people===p?AI_COLOR:G[300]}`,borderRadius:"9px",background:sel.people===p?AI_LIGHT:"#fff",cursor:"pointer",fontSize:"12px",fontWeight:600,color:sel.people===p?AI_COLOR:G[700],textAlign:"center"}}>{p}</div>)}
              </div>
            </div>
            <div>
              <div style={{fontSize:"13px",fontWeight:800,color:G[900],marginBottom:"9px"}}>Q3. 예산은요?</div>
              <div style={{display:"flex",gap:"7px"}}>
                {budget.map(b => <div key={b} onClick={()=>setSel(s=>({...s,budget:b}))} style={{flex:1,padding:"11px 0",border:`2px solid ${sel.budget===b?AI_COLOR:G[300]}`,borderRadius:"9px",background:sel.budget===b?AI_LIGHT:"#fff",cursor:"pointer",fontSize:"11px",fontWeight:600,color:sel.budget===b?AI_COLOR:G[700],textAlign:"center"}}>{b}</div>)}
              </div>
            </div>
            <Btn variant="ai" full onClick={()=>{setStep(1);setTimeout(()=>setStep(2),1800);}}>✨ AI 추천 받기</Btn>
          </div>
        )}
        {step===1 && (
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"18px",padding:"40px 24px"}}>
            <div style={{fontSize:"52px"}}>🤖</div>
            <div style={{fontSize:"15px",fontWeight:800,color:AI_COLOR}}>AI가 분석 중이에요...</div>
          </div>
        )}
        {step===2 && (
          <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:"12px"}}>
            <div style={{padding:"12px 14px",borderRadius:"13px",background:`linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,color:"#fff"}}>
              <div style={{fontSize:"15px",fontWeight:800}}>✨ {sel.mood||"얼큰한 국물"}에 딱!</div>
            </div>
            {results.map((r,i) => (
              <div key={i} onClick={()=>go("menu-detail")} style={{border:`1.5px solid ${i===0?AI_COLOR:G[200]}`,borderRadius:"13px",padding:"12px",background:i===0?AI_LIGHT:"#fff",cursor:"pointer"}}>
                {i===0 && <div style={{textAlign:"right",marginBottom:"5px"}}><Badge bg={AI_COLOR} color="#fff">🥇 1순위 추천</Badge></div>}
                <div style={{display:"flex",gap:"10px"}}>
                  <Img w="70px" h="70px" label={r.name} radius="9px"/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"14px",fontWeight:800,color:i===0?AI_COLOR:G[900]}}>{r.name}</div>
                    <div style={{fontSize:"10px",color:G[500],marginTop:"2px"}}>🏪 {r.store}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"5px"}}><span style={{fontSize:"13px",fontWeight:800}}>{r.price}원</span><Badge bg={AI_COLOR} color="#fff">{r.match}%</Badge></div>
                  </div>
                </div>
                <div style={{marginTop:"8px",padding:"7px 9px",background:i===0?"#EDE7FF":G[50],borderRadius:"7px",fontSize:"11px",color:i===0?AI_COLOR:G[600]}}>💬 {r.reason}</div>
              </div>
            ))}
            <Btn full onClick={()=>setStep(0)}>↩ 다시 추천받기</Btn>
          </div>
        )}
      </div>
    </Phone>
  );
}