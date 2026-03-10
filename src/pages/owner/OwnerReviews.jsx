// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/owner/OwnerReviews.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from 'react';
import { Phone, TopBar, Btn, Badge } from '../../shared/components';
import { FlatIcons } from '../../shared/icons';
import { G, PRIMARY, AI_COLOR, AI_LIGHT } from '../../shared/constants';

export default function OwnerReviews() {
  const [replyTarget, setReplyTarget] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [aiGenerated, setAiGenerated] = useState(false);
  const reviews = [
    {
      user: 'user123',
      rating: 5,
      date: '2025-03-01',
      menu: '김치찌개',
      content: '국물이 진짜 얼큰하고 맛있어요!',
      replied: true,
      reply: '소중한 리뷰 감사합니다 😊'
    },
    {
      user: 'user456',
      rating: 4,
      date: '2025-02-28',
      menu: '불고기 정식',
      content: '양념이 잘 배어있고 반찬도 신선했어요.',
      replied: false,
      reply: ''
    },
    {
      user: 'user999',
      rating: 2,
      date: '2025-02-27',
      menu: '된장찌개',
      content: '국물이 좀 짜서 아쉬웠어요.',
      replied: false,
      reply: ''
    }
  ];
  const handleAiGenerate = (r) => {
    setAiLoading(true);
    setAiGenerated(false);
    setTimeout(() => {
      setReplyText(`안녕하세요, ${r.user}님! ${r.menu} 주문 감사합니다 😊`);
      setAiLoading(false);
      setAiGenerated(true);
    }, 1500);
  };
  function Stars({ v }) {
    return (
      <span style={{ color: '#FFC107', fontSize: '11px' }}>
        {'★'.repeat(v)}
        {'☆'.repeat(5 - v)}
      </span>
    );
  }
  return (
    <Phone noNav>
      <TopBar title="⭐ 리뷰 관리" backTo="/owner/dash" />
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
