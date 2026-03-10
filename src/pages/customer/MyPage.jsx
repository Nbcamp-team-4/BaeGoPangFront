// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/MyPage.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from 'react';
import { Phone, TopBar, Badge } from '../../shared/components';
import { FlatIcons, Icon } from '../../shared/icons';
import { G, PRIMARY } from '../../shared/constants';

export default function MyPage({ go }) {
  const [noti, setNoti] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState({ name: '홍길동', nick: 'user123', phone: '010-1234-5678' });
  const [draft, setDraft] = useState({ ...profile });
  const menuGroups = [
    {
      title: '주문 관리',
      items: [
        { icon: FlatIcons.orders(G[600]), label: '주문 내역', go: 'order-history' },
        { icon: FlatIcons.heart(G[600]), label: '찜한 가게', badge: '3' },
        { icon: FlatIcons.review(G[600]), label: '내 리뷰', badge: '12' }
      ]
    },
    {
      title: '혜택',
      items: [
        { icon: FlatIcons.coupon(G[600]), label: '쿠폰', badge: '1', badgeColor: PRIMARY },
        { icon: FlatIcons.point(G[600]), label: '포인트', sub: '1,200P' }
      ]
    },
    {
      title: '설정',
      items: [
        { icon: FlatIcons.bell(G[600]), label: '알림 설정', toggle: true, val: noti, set: setNoti },
        { icon: FlatIcons.lock(G[600]), label: '개인정보 보호' },
        { icon: FlatIcons.notice(G[600]), label: '공지사항 / 고객센터' }
      ]
    }
  ];
  return (
    <Phone navActive="mypage">
      <TopBar title="마이페이지" go={go} backTo="home" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* 프로필 */}
        <div
          style={{
            padding: '20px 16px 16px',
            background: `linear-gradient(160deg,#FFF3F0,#fff)`,
            borderBottom: `1px solid ${G[100]}`
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: G[200],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
              <svg width="58" height="58" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill={G[500]} opacity=".7" />
                <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill={G[400]} opacity=".5" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '17px', fontWeight: 900 }}>{profile.name}</div>
              <div style={{ fontSize: '12px', color: G[500], marginTop: '1px' }}>@{profile.nick}</div>
              <div style={{ marginTop: '5px' }}>
                <Badge bg={PRIMARY} color="#fff">
                  일반 회원
                </Badge>
              </div>
            </div>
            <button
              onClick={() => {
                setDraft({ ...profile });
                setEditProfile(true);
              }}
              style={{
                padding: '7px 13px',
                borderRadius: '8px',
                border: `1.5px solid ${G[300]}`,
                background: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                color: G[700],
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}>
              프로필 수정
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '16px',
              background: '#fff',
              borderRadius: '12px',
              border: `1px solid ${G[200]}`,
              overflow: 'hidden'
            }}>
            {[
              { l: '주문', v: '28' },
              { l: '리뷰', v: '12' },
              { l: '찜한가게', v: '3' },
              { l: '포인트', v: '1.2K' }
            ].map((s, i, arr) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: '11px 0',
                  textAlign: 'center',
                  borderRight: i < arr.length - 1 ? `1px solid ${G[200]}` : 'none'
                }}>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>{s.v}</div>
                <div style={{ fontSize: '10px', color: G[500], marginTop: '2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* 프로필 수정 모달 */}
        {editProfile && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.45)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div
              style={{
                width: '340px',
                background: '#fff',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '13px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: 900 }}>프로필 수정</span>
                <span
                  onClick={() => setEditProfile(false)}
                  style={{ fontSize: '20px', cursor: 'pointer', color: G[400] }}>
                  ×
                </span>
              </div>
              {[
                { label: '이름', key: 'name', ph: '실명 입력' },
                { label: '닉네임', key: 'nick', ph: '닉네임' },
                { label: '핸드폰번호', key: 'phone', ph: '010-0000-0000' }
              ].map(({ label, key, ph }) => (
                <div key={key}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '5px' }}>{label}</div>
                  <input
                    value={draft[key]}
                    onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                    placeholder={ph}
                    style={{
                      width: '100%',
                      padding: '10px 13px',
                      border: `1.5px solid ${G[300]}`,
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      outline: 'none',
                      color: G[900]
                    }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setEditProfile(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1.5px solid ${G[300]}`,
                    background: '#fff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    color: G[700]
                  }}>
                  취소
                </button>
                <button
                  onClick={() => {
                    setProfile({ ...draft });
                    setEditProfile(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: PRIMARY,
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}>
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
        {/* 메뉴 그룹 */}
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {menuGroups.map((grp, gi) => (
            <div key={gi}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: G[400],
                  marginBottom: '6px',
                  letterSpacing: '0.5px'
                }}>
                {grp.title.toUpperCase()}
              </div>
              <div
                style={{
                  background: '#fff',
                  border: `1.5px solid ${G[200]}`,
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                {grp.items.map((item, ii) => (
                  <div
                    key={ii}
                    onClick={() => item.go && go(item.go)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '13px 14px',
                      borderBottom: ii < grp.items.length - 1 ? `1px solid ${G[100]}` : 'none',
                      cursor: item.go || item.toggle ? 'pointer' : 'default'
                    }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '9px',
                        background: G[50],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.label}</div>
                      {item.sub && (
                        <div style={{ fontSize: '11px', color: PRIMARY, fontWeight: 700, marginTop: '1px' }}>
                          {item.sub}
                        </div>
                      )}
                    </div>
                    {item.badge && (
                      <Badge bg={item.badgeColor || G[200]} color={item.badgeColor ? '#fff' : G[700]}>
                        {item.badge}
                      </Badge>
                    )}
                    {item.toggle ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          item.set((v) => !v);
                        }}
                        style={{
                          width: '40px',
                          height: '22px',
                          borderRadius: '11px',
                          background: item.val ? PRIMARY : G[300],
                          position: 'relative',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: '#fff',
                            position: 'absolute',
                            top: '2px',
                            left: item.val ? '20px' : '2px',
                            transition: 'left .2s',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                          }}
                        />
                      </div>
                    ) : (
                      !item.sub && !item.badge && Icon.chevron()
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              border: '1.5px solid #FFCDD2',
              background: '#FFF5F5',
              color: '#E53935',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px'
            }}>
            {FlatIcons.logout()}로그아웃
          </button>
        </div>
      </div>
    </Phone>
  );
}
