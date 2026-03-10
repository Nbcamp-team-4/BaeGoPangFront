// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  src/pages/owner/OwnerReviews.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from 'react';
import { Phone, TopBar, Btn, Badge } from '../../shared/components';
import { FlatIcons } from '../../shared/icons';
import { G, PRIMARY, AI_COLOR, AI_LIGHT } from '../../shared/constants';
import { generateAiReviewReply } from '../../shared/api/aiApi';

function Stars({ v }) {
  return (
    <span style={{ color: '#FFC107', fontSize: '11px' }}>
      {'★'.repeat(v)}
      {'☆'.repeat(5 - v)}
    </span>
  );
}

export default function OwnerReviews({ go }) {
  const [reviews, setReviews] = useState([]); // 상태로 관리
  const [storeInfo, setStoreInfo] = useState(null); // 실제 DB의 가게 정보 저장
  const [loading, setLoading] = useState(true);

  const currentUserId = '11111111-1111-1111-1111-111111111111';

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);

        // 1. [실제 연동] 내 가게 목록 조회 (백엔드: GET /api/stores/my)
        const storeRes = await api.get(`stores/my`, {
          params: { userId: currentUserId } // 백엔드 @RequestParam UUID userId 대응
        });

        // 결과 목록 중 첫 번째 가게를 사용 (사장님은 보통 가게가 하나이므로)
        const myStore = storeRes.data.content[0];

        if (myStore) {
          setStoreName(myStore.name);

          // 2. [실제 연동] 가져온 실제 storeId로 리뷰 조회 (백엔드: GET /api/reviews/stores/{storeId})
          const reviewRes = await api.get(`/api/reviews/stores/${myStore.id}`);
          setReviews(reviewRes.data);
        }
      } catch (error) {
        console.error('데이터 연동 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [currentUserId]);

  // 🟢 2. AI 생성 핸들러 (백엔드 연동)
  const handleAiGenerate = async (r) => {
    if (!r.id) return alert('리뷰 ID가 없습니다.');

    setAiLoading(true);
    setAiGenerated(false);

    try {
      // 백엔드의 generateReviewReply 호출
      const data = await generateAiReviewReply(r.id, '친절하고 정중하게');

      // 백엔드 필드명 aiGeneratedReply를 프론트 상태에 저장
      setReplyText(data.aiGeneratedReply);
      setAiGenerated(true);
    } catch (error) {
      console.error('AI 생성 에러:', error);
      alert('AI 서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Phone noNav>
      <TopBar title="⭐ 리뷰 관리" go={go} backTo="owner-dash" />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{ border: `1.5px solid ${G[200]}`, borderRadius: '13px', overflow: 'hidden', background: '#fff' }}>
            <div style={{ padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  {FlatIcons.userAvatar(30)}
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>{r.user}</div>
                    <div style={{ fontSize: '10px', color: G[400] }}>
                      {r.date} · {r.menu}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Stars v={r.rating} />
                  {!r.replied ? (
                    <Badge bg="#FFEBEE" color="#C62828">
                      미답글
                    </Badge>
                  ) : (
                    <Badge bg="#E8F5E9" color="#2E7D32">
                      완료
                    </Badge>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: G[700], lineHeight: '1.6' }}>{r.content}</div>
              {r.replied && (
                <div
                  style={{
                    padding: '9px 10px',
                    background: '#FFF8E1',
                    borderRadius: '7px',
                    borderLeft: '3px solid #FFC107',
                    marginTop: '8px'
                  }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#F57F17', marginBottom: '2px' }}>
                    🏪 답글
                  </div>
                  <div style={{ fontSize: '11px', color: G[700] }}>{r.reply}</div>
                </div>
              )}
              <div style={{ marginTop: '9px' }}>
                {!r.replied && replyTarget !== i && (
                  <Btn
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      setReplyTarget(i);
                      setReplyText('');
                      setAiGenerated(false);
                    }}>
                    💬 답글 달기
                  </Btn>
                )}
                {r.replied && replyTarget !== i && (
                  <Btn
                    size="sm"
                    onClick={() => {
                      setReplyTarget(i);
                      setReplyText(r.reply);
                      setAiGenerated(false);
                    }}>
                    ✏️ 수정
                  </Btn>
                )}
              </div>
            </div>
            {replyTarget === i && (
              <div
                style={{
                  borderTop: `1px solid ${G[200]}`,
                  padding: '12px',
                  background: G[50],
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '9px'
                }}>
                <div
                  style={{
                    padding: '9px 11px',
                    background: AI_LIGHT,
                    borderRadius: '9px',
                    border: `1px solid ${AI_COLOR}44`
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: AI_COLOR }}>✨ AI 답글 자동 생성</div>
                    <Btn size="sm" variant="ai" onClick={() => handleAiGenerate(r)}>
                      {aiLoading ? '생성중...' : 'AI 생성'}
                    </Btn>
                  </div>
                  {aiGenerated && !aiLoading && (
                    <div style={{ marginTop: '5px', fontSize: '10px', color: AI_COLOR, fontWeight: 600 }}>
                      ✅ 초안 완성. 수정 후 등록하세요.
                    </div>
                  )}
                </div>
                <div
                  style={{
                    padding: '10px',
                    border: `1.5px solid ${aiGenerated ? AI_COLOR : G[300]}`,
                    borderRadius: '9px',
                    minHeight: '70px',
                    background: '#fff',
                    fontSize: '12px',
                    color: replyText ? G[800] : G[400]
                  }}>
                  {replyText || '답글을 입력하세요...'}
                </div>
                <div style={{ display: 'flex', gap: '7px' }}>
                  <Btn style={{ flex: 1 }} onClick={() => setReplyTarget(null)}>
                    취소
                  </Btn>
                  <Btn variant="primary" style={{ flex: 1 }} onClick={() => setReplyTarget(null)}>
                    등록
                  </Btn>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Phone>
  );
}
