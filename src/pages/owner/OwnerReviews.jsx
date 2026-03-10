// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  src/pages/owner/OwnerReviews.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from "react";
import { Phone, TopBar, Btn, Badge } from "../../shared/components"; 
import { FlatIcons } from "../../shared/icons";
import { G, PRIMARY, AI_COLOR, AI_LIGHT } from "../../shared/constants";
import { generateAiReviewReply } from "../../shared/api/aiApi";
import { apiFetch } from "../../shared/api/apiClient";

function Stars({ v }) {
  return (
    <span style={{ color: "#FFC107", fontSize: "11px" }}>
      {"★".repeat(v)}{"☆".repeat(5 - v)}
    </span>
  );
}

export default function OwnerReviews({ go }) {
  const [reviews, setReviews] = useState([]);
  const [storeName, setStoreName] = useState(""); // 가게 이름 상태 추가
  const [loading, setLoading] = useState(true);
  
  // 답글 관련 상태 추가
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);

  // 테스트용 UUID (실제 환경에선 로그인 정보에서 가져와야 함)
  const currentUserId = "11111111-1111-1111-1111-111111111111";

useEffect(() => {
  const initData = async () => {
    try {
      setLoading(true);

      // ✅ 1. 경로를 /api/stores/my 로 변경
      // ✅ 2. userId는 쿼리 파라미터로 전달 (현재 컨트롤러가 @RequestParam으로 받기 때문)
      const storeRes = await apiFetch(`/api/stores/my?userId=${currentUserId}`, {    
        method: 'GET'
      });
         console.log("storeRes:", storeRes); // 응답 구조 확인용 로그

      // 서버 응답 구조가 GetStoresResponse이므로 데이터 꺼내기
      if (storeRes && storeRes.content) {
        const myStore = storeRes.content; 
        setStoreName(myStore.name);

        // ✅ 3. 리뷰 조회 경로 확인 (백엔드에 따라 /api/reviews... 일 수 있음)
        const reviewRes = await apiFetch(`/api/reviews/stores/${myStore.id}`);
        
        if (reviewRes && reviewRes.data) {
          setReviews(reviewRes.data);
        }
      }
    } catch (error) {
      console.error("데이터 연동 실패:", error);
    } finally {
      setLoading(false);
    }
  };
  initData();
}, [currentUserId]);



  // AI 생성 핸들러
  const handleAiGenerate = async (r) => {
    if (!r.id) return alert("리뷰 ID가 없습니다.");
    
    setAiLoading(true);
    setAiGenerated(false);

    try {
      const data = await generateAiReviewReply(r.id, "친절하고 정중하게");
      if (data && data.aiGeneratedReply) {
        setReplyText(data.aiGeneratedReply); 
        setAiGenerated(true);
      }
    } catch (error) {
      console.error("AI 생성 에러:", error);
      alert("AI 서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Phone noNav>
      <TopBar title={`⭐ ${storeName || '리뷰 관리'}`} go={go} backTo="owner-dash"/>

      <div style={{flex:1, overflowY:"auto", padding:"12px 14px", display:"flex", flexDirection:"column", gap:"10px"}}>
        {loading ? (
          <div style={{textAlign: "center", color: G[400], marginTop: "20px"}}>데이터 로딩 중...</div>
        ) : reviews.length === 0 ? (
          <div style={{textAlign: "center", color: G[400], marginTop: "20px"}}>작성된 리뷰가 없습니다.</div>
        ) : (
          reviews.map((r, i) => (
            <div key={i} style={{border:`1.5px solid ${G[200]}`, borderRadius:"13px", overflow:"hidden", background:"#fff"}}>
              <div style={{padding:"12px"}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:"7px"}}>
                  <div style={{display:"flex", alignItems:"center", gap:"7px"}}>
                    {FlatIcons.userAvatar(30)}
                    <div>
                      <div style={{fontSize:"12px", fontWeight:700}}>{r.user || "익명 손님"}</div>
                      <div style={{fontSize:"10px", color:G[400]}}>{r.date} · {r.menu}</div>
                    </div>
                  </div>
                  <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
                    <Stars v={r.rating}/>
                    {!r.replied ? (
                      <Badge bg="#FFEBEE" color="#C62828">미답글</Badge>
                    ) : (
                      <Badge bg="#E8F5E9" color="#2E7D32">완료</Badge>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: G[700], lineHeight: '1.6' }}>{r.content}</div>
                
                {r.replied && (
                  <div style={{ padding: '9px 10px', background: '#FFF8E1', borderRadius: '7px', borderLeft: '3px solid #FFC107', marginTop: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#F57F17', marginBottom: '2px' }}>🏪 답글</div>
                    <div style={{ fontSize: '11px', color: G[700] }}>{r.reply}</div>
                  </div>
                )}

                <div style={{ marginTop: '9px' }}>
                  {!r.replied && replyTarget !== i && (
                    <Btn size="sm" variant="primary" onClick={() => { setReplyTarget(i); setReplyText(''); setAiGenerated(false); }}>
                      💬 답글 달기
                    </Btn>
                  )}
                  {r.replied && replyTarget !== i && (
                    <Btn size="sm" onClick={() => { setReplyTarget(i); setReplyText(r.reply); setAiGenerated(false); }}>
                      ✏️ 수정
                    </Btn>
                  )}
                </div>
              </div>

              {replyTarget === i && (
                <div style={{ borderTop: `1px solid ${G[200]}`, padding: '12px', background: G[50], display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  <div style={{ padding: '9px 11px', background: AI_LIGHT, borderRadius: '9px', border: `1px solid ${AI_COLOR}44` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: AI_COLOR }}>✨ AI 답글 자동 생성</div>
                      <Btn size="sm" variant="ai" onClick={() => handleAiGenerate(r)}>
                        {aiLoading ? '생성중...' : 'AI 생성'}
                      </Btn>
                    </div>
                    {aiGenerated && !aiLoading && (
                      <div style={{ marginTop: '5px', fontSize: '10px', color: AI_COLOR, fontWeight: 600 }}>✅ 초안 완성. 수정 후 등록하세요.</div>
                    )}
                  </div>
                  <textarea
                    style={{
                      padding: '10px',
                      border: `1.5px solid ${aiGenerated ? AI_COLOR : G[300]}`,
                      borderRadius: '9px',
                      minHeight: '80px',
                      background: '#fff',
                      fontSize: '12px',
                      color: G[800],
                      outline: 'none',
                      resize: 'none'
                    }}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="답글을 입력하세요..."
                  />
                  <div style={{ display: 'flex', gap: '7px' }}>
                    <Btn style={{ flex: 1 }} onClick={() => setReplyTarget(null)}>취소</Btn>
                    <Btn variant="primary" style={{ flex: 1 }} onClick={() => { alert("등록되었습니다."); setReplyTarget(null); }}>등록</Btn>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Phone>
  );
}