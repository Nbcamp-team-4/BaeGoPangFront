// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/Order.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from 'react';
import { Phone, TopBar, Btn, Input, Section, Radio, Divider } from '../../shared/components';
import { G, PRIMARY, PRIMARY_LIGHT } from '../../shared/constants';
import { FlatIcons } from '../../shared/icons'; // FlatIcons가 공유 컴포넌트에 있다면
export default function Order({ go }) {
  const [pay, setPay] = useState('card');
  const [cardType, setCardType] = useState('');
  const [cardNum, setCardNum] = useState(['', '', '', '']);
  const [cardPw, setCardPw] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const cardTypes = ['KB국민', '신한', '하나', '우리', '삼성', '현대', '롯데', 'NH농협', 'IBK기업', '씨티'];

  const fmtCardNum = (val, idx) => {
    const d = val.replace(/\D/g, '').slice(0, 4);
    const n = [...cardNum];
    n[idx] = d;
    setCardNum(n);
  };
  const fmtExpiry = (val) => {
    const d = val.replace(/\D/g, '').slice(0, 4);
    setExpiry(d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d);
  };

  const [addrSheet, setAddrSheet] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState({
    label: '집',
    road: '서울 종로구 세종대로 172',
    detail: '101호'
  });
  return (
    <Phone navActive="cart" go={go}>
      <TopBar title="주문하기" go={go} backTo="cart" />
      <div
        style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* 주문 요약 */}
        <div
          style={{
            padding: '11px',
            background: G[50],
            borderRadius: '11px',
            border: `1px solid ${G[200]}`,
            fontSize: '12px',
            color: G[600],
            lineHeight: '1.9'
          }}>
          <div style={{ fontWeight: 700, color: G[800], marginBottom: '2px' }}>맛있는 한식당</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>김치찌개 × 1</span>
            <span>8,000원</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>불고기 정식 × 2</span>
            <span>24,000원</span>
          </div>
        </div>
        {/* 배달 주소 */}
        <Section title="배달 주소">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <div
              style={{
                padding: '10px 12px',
                border: `1.5px solid ${PRIMARY}`,
                borderRadius: '9px',
                background: PRIMARY_LIGHT,
                fontSize: '12px',
                fontWeight: 600,
                color: PRIMARY
              }}>
              📌 서울 종로구 세종대로 172
            </div>
            <Input placeholder="상세 주소 (동·호수·층)" />
          </div>
        </Section>
        {/* 결제 수단 */}
        <Section title="결제 수단">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {[
              { v: 'card', icon: '💳', label: '신용 / 체크카드' },
              { v: 'toss', icon: '🔵', label: '토스' }
            ].map((m) => (
              <div key={m.v}>
                <Radio checked={pay === m.v} onClick={() => setPay(m.v)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <span style={{ fontSize: '18px' }}>{m.icon}</span>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: pay === m.v ? 700 : 500,
                        color: pay === m.v ? PRIMARY : G[800]
                      }}>
                      {m.label}
                    </span>
                  </div>
                </Radio>
                {m.v === 'card' && pay === 'card' && (
                  <div
                    style={{
                      marginTop: '7px',
                      padding: '13px',
                      border: `1.5px solid ${G[300]}`,
                      borderRadius: '11px',
                      background: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '5px' }}>
                        카드 종류
                      </div>
                      <select
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          border: `1.5px solid ${G[300]}`,
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: cardType ? G[900] : G[400],
                          background: '#fff',
                          outline: 'none',
                          fontFamily: 'inherit',
                          appearance: 'none'
                        }}>
                        <option value="">카드사 선택</option>
                        {cardTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '5px' }}>
                        카드 번호 16자리
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {cardNum.map((v, i) => (
                          <input
                            key={i}
                            value={v}
                            onChange={(e) => fmtCardNum(e.target.value, i)}
                            maxLength={4}
                            placeholder="0000"
                            style={{
                              flex: 1,
                              minWidth: 0,
                              padding: '6px 0',
                              textAlign: 'center',
                              border: 'none',
                              borderBottom: `1.5px solid ${G[300]}`,
                              fontSize: '13px',
                              fontWeight: 700,
                              fontFamily: 'monospace',
                              background: 'transparent',
                              outline: 'none',
                              color: G[900],
                              letterSpacing: '2px'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '9px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '5px' }}>
                          비밀번호 앞 2자리
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            value={cardPw}
                            onChange={(e) => setCardPw(e.target.value.replace(/\D/g, '').slice(0, 2))}
                            maxLength={2}
                            type="password"
                            placeholder="__"
                            style={{
                              width: '44px',
                              padding: '6px 0',
                              textAlign: 'center',
                              border: 'none',
                              borderBottom: `1.5px solid ${G[300]}`,
                              fontSize: '15px',
                              fontFamily: 'monospace',
                              background: 'transparent',
                              outline: 'none',
                              fontWeight: 700
                            }}
                          />
                          <span
                            style={{
                              fontSize: '13px',
                              color: G[400],
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              letterSpacing: '4px'
                            }}>
                            **
                          </span>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '5px' }}>CVC</div>
                        <input
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          maxLength={3}
                          type="password"
                          placeholder="000"
                          style={{
                            width: '100%',
                            padding: '6px 0',
                            textAlign: 'center',
                            border: 'none',
                            borderBottom: `1.5px solid ${G[300]}`,
                            fontSize: '14px',
                            fontFamily: 'monospace',
                            background: 'transparent',
                            outline: 'none',
                            boxSizing: 'border-box',
                            fontWeight: 700
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '5px' }}>
                        유효기간 (YY/MM)
                      </div>
                      <input
                        value={expiry}
                        onChange={(e) => fmtExpiry(e.target.value)}
                        maxLength={5}
                        placeholder="YY/MM"
                        style={{
                          width: '100px',
                          padding: '6px 0',
                          border: 'none',
                          borderBottom: `1.5px solid ${G[300]}`,
                          fontSize: '14px',
                          fontFamily: 'monospace',
                          background: 'transparent',
                          outline: 'none',
                          fontWeight: 700,
                          color: G[900]
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
        {/* 금액 요약 */}
        <div style={{ padding: '12px', background: G[50], borderRadius: '11px', border: `1px solid ${G[200]}` }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: G[600],
              lineHeight: '2'
            }}>
            <span>상품금액</span>
            <span>37,000원</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: G[600] }}>
            <span>배달비</span>
            <span>3,000원</span>
          </div>
          <Divider />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '16px',
              fontWeight: 900,
              marginTop: '5px'
            }}>
            <span>최종 결제금액</span>
            <span style={{ color: PRIMARY }}>40,000원</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Btn variant="primary" full size="lg" onClick={() => go('order-complete')}>
            40,000원 결제하기
          </Btn>
          <button
            onClick={() => go('order-fail')}
            style={{
              padding: '10px',
              borderRadius: '10px',
              border: `1.5px solid ${G[300]}`,
              background: '#fff',
              color: G[400],
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
            결제 실패 테스트 →
          </button>
        </div>
      </div>
    </Phone>
  );
}
