import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../shared/api/apiClient'; // apiFetch 함수 임포트
import { Phone, TopBar, Badge, Img, Btn, TopContent } from '../../shared/components';
import { G, AI_COLOR, AI_LIGHT } from '../../shared/constants';

function AIRecommend() {
  const navigate = useNavigate();
  const goTo = (path) => navigate(`/${path}`);
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ mood: null, people: null, budget: null });
  const [results, setResults] = useState([]);

  const moods = ['🌶️ 매운 게 땡겨요', '🥣 따뜻한 국물', '🥗 가볍게', '🍖 고기가 땡겨요', '🍜 면 요리', '🎲 아무거나'];
  const people = ['혼자', '2~3명', '4명 이상'];
  const budget = ['1만원 이하', '1~2만원', '2만원 이상'];
  const handleAIRequest = async () => {
    if (!sel.mood || !sel.people || !sel.budget) {
      alert('모든 질문에 답해주세요!');
      return;
    }
    setStep(1); // 로딩 화면으로 전환

    try {
      // 1. 서버에 POST 요청 (데이터를 body에 담아 보냄)
      const response = await apiFetch('/api/ai/recommend', {
        method: 'POST',
        body: JSON.stringify({
          mood: sel.mood,
          people: sel.people,
          budget: sel.budget
        })
      });

      console.log('전체 서버 응답 구조:', response);

      // 2. BaseResponse 구조 분석 (성공 시 response.data에 리스트가 담김)
      if (response && response.ok) {
        let data = '';
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          data += decoder.decode(value, { stream: true });
        }
        const res = JSON.parse(data); // 최종적으로 AI 추천 리스트가 담긴 객체
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setResults(res.data);
          // AI가 고심하는 느낌을 주기 위한 지연 시간
          setTimeout(() => setStep(2), 1500);
        } else {
          throw new Error('추천할 수 있는 메뉴가 DB에 없습니다.');
        }
      } else {
        throw new Error(response?.message || 'AI 추천 서비스를 일시적으로 사용할 수 없습니다.');
      }
    } catch (error) {
      console.error('연동 에러 상세:', error);

      // 에러 발생 시 사용자 경험을 위해 가짜 데이터라도 보여주거나 에러 메시지 표시
      setResults([
        {
          name: '오류 발생',
          storeName: '시스템 점검 중',
          price: 0,
          description: `추천을 가져오지 못했습니다: ${error.message}`,
          matchRate: 0
        }
      ]);
      setTimeout(() => setStep(2), 1500);
    }
  };

  return (
    <Phone noStatus navActive="ai-recommend" go={goTo}>
      <TopContent>
        <TopBar title="✨ AI 메뉴 추천" go={goTo} backTo="home" />
      </TopContent>

      <div style={{ flex: 1, overflowY: 'auto', background: '#F8F9FA' }}>
        {/* 단계 0: 질문지 (현재 하얀 화면인 이유 - 이 코드가 들어가야 합니다) */}
        {step === 0 && (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                padding: '24px 16px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${AI_COLOR}, #9C6FFF)`,
                textAlign: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(110, 64, 255, 0.2)'
              }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🤖</div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>무엇을 먹을지 결정해 드릴까요?</div>
              <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>
                3가지 질문에 답하면 AI가 맛집을 찾아드려요.
              </div>
            </div>

            {/* Q1. 기분/메뉴 */}
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: G[800],
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                <span style={{ color: AI_COLOR }}>Q1.</span> 오늘 어떤 음식이 땡기나요?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {moods.map((m) => (
                  <div
                    key={m}
                    onClick={() => setSel((s) => ({ ...s, mood: m }))}
                    style={{
                      padding: '14px 10px',
                      border: `1.5px solid ${sel.mood === m ? AI_COLOR : '#fff'}`,
                      borderRadius: '12px',
                      background: sel.mood === m ? AI_LIGHT : '#fff',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: sel.mood === m ? AI_COLOR : G[700],
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}>
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Q2. 인원 */}
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: G[800],
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                <span style={{ color: AI_COLOR }}>Q2.</span> 몇 명이서 드시나요?
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {people.map((p) => (
                  <div
                    key={p}
                    onClick={() => setSel((s) => ({ ...s, people: p }))}
                    style={{
                      flex: 1,
                      padding: '14px 0',
                      border: `1.5px solid ${sel.people === p ? AI_COLOR : '#fff'}`,
                      borderRadius: '12px',
                      background: sel.people === p ? AI_LIGHT : '#fff',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: sel.people === p ? AI_COLOR : G[700],
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Q3. 예산 */}
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: G[800],
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                <span style={{ color: AI_COLOR }}>Q3.</span> 예산은 얼마인가요?
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {budget.map((b) => (
                  <div
                    key={b}
                    onClick={() => setSel((s) => ({ ...s, budget: b }))}
                    style={{
                      flex: 1,
                      padding: '14px 0',
                      border: `1.5px solid ${sel.budget === b ? AI_COLOR : '#fff'}`,
                      borderRadius: '12px',
                      background: sel.budget === b ? AI_LIGHT : '#fff',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: sel.budget === b ? AI_COLOR : G[700],
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <Btn variant="ai" full onClick={handleAIRequest} style={{ padding: '16px', marginTop: '10px' }}>
              ✨ AI 추천 받기
            </Btn>
          </div>
        )}

        {/* 단계 1: 로딩 중 */}
        {step === 1 && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px'
            }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🤖</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: AI_COLOR }}>AI가 메뉴를 고르고 있어요</div>
            <div style={{ fontSize: '13px', color: G[400], marginTop: '8px' }}>잠시만 기다려 주세요...</div>
          </div>
        )}

        {/* 단계 2: 결과 (생략된 경우 하얀 화면이 될 수 있음) */}
        {step === 2 && (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 결과 카드들... (이전 코드와 동일하게 구현) */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '13px',
                background: `linear-gradient(120deg,${AI_COLOR},#9C6FFF)`,
                color: '#fff',
                fontWeight: 800
              }}>
              ✨ AI의 강력 추천 메뉴
            </div>
            {results.map((r, i) => (
              <div
                key={i}
                style={{
                  border: `1.5px solid ${i === 0 ? AI_COLOR : G[200]}`,
                  borderRadius: '16px',
                  padding: '16px',
                  background: '#fff',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Img w="80px" h="80px" radius="12px" label={r.name} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 800 }}>{r.name}</div>
                    <div style={{ fontSize: '12px', color: G[500], marginTop: '2px' }}>🏪 {r.storeName}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                      <span style={{ fontWeight: 800 }}>{r.price?.toLocaleString()}원</span>
                      <Badge bg={AI_COLOR} color="#fff">
                        {r.matchRate}% 일치
                      </Badge>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: '12px',
                    padding: '10px',
                    background: G[50],
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: G[600],
                    lineHeight: 1.5
                  }}>
                  💬 {r.description}
                </div>
              </div>
            ))}
            <Btn full onClick={() => setStep(0)} style={{ marginTop: '12px' }}>
              ↩ 다른 메뉴 추천받기
            </Btn>
          </div>
        )}
      </div>
    </Phone>
  );
}

export default AIRecommend;
