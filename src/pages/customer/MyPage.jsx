import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Phone, TopBar, Badge } from '../../shared/components';
import { FlatIcons, Icon } from '../../shared/icons';
import { G, PRIMARY } from '../../shared/constants';

import { apiFetch } from '../../shared/api/apiClient';
import { logout } from '../../shared/api/authApi';
import { getUserId } from '../../shared/utils/user';

export default function MyPage() {
  const navigate = useNavigate();

  const [noti, setNoti] = useState(true);
  const [editProfile, setEditProfile] = useState(false);

  const [profile, setProfile] = useState({
    name: getUserName() || '홍길동',
    nick: getLoginId() || 'user123',
    phone: ''
  });
  const [draft, setDraft] = useState({
    name: getUserName() || '홍길동',
    nick: getLoginId() || 'user123',
    phone: ''
  });

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const loginId = getLoginId();
      const id = getUserId();
      if (!loginId) return;

      try {
        const res = await apiFetch(`/api/users/${id}`);

        // 인증 실패 → 로그인
        if (res.status === 401) {
          navigate('/auth/login');
          return;
        }

        if (!res.ok) {
          alert('프로필 정보를 불러오는 데 실패했습니다.');
          navigate('/auth/login');
          return;
        }

        const data = await res.json();
        const user = data?.data ?? data;
        console.log(JSON.stringify(user));

        const nextProfile = {
          name: user?.name ?? getUserName() ?? '홍길동',
          nick: user?.loginId ?? loginId ?? 'user123',
          phone: user?.phone ?? ''
        };

        setProfile(nextProfile);
        setDraft(nextProfile);
      } catch (e) {
        console.error('프로필 조회 실패', e);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    const loginId = getLoginId();
    if (!loginId) {
      setSaveError('로그인 정보가 없습니다.');
      return;
    }

    setSaveLoading(true);
    setSaveError(null);

    try {
      const res = await apiFetch(`/api/users/${loginId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: draft.name,
          phone: draft.phone
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || errData?.error?.message || '저장 실패');
      }

      const responseData = await res.json().catch(() => null);
      const updatedUser = responseData?.data ?? responseData;

      const nextProfile = {
        name: updatedUser?.name ?? draft.name,
        nick: updatedUser?.loginId ?? profile.nick,
        phone: updatedUser?.phone ?? draft.phone
      };

      setProfile(nextProfile);
      setDraft(nextProfile);
      setEditProfile(false);
    } catch (e) {
      setSaveError(e.message || '저장 중 오류가 발생했습니다.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleMove = (path) => {
    navigate(path);
  };

  const menuGroups = [
    {
      title: '주문 관리',
      items: [
        { icon: FlatIcons.orders(G[600]), label: '주문 내역', path: '/customer/order-history' },
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
      <TopBar title="마이페이지" backTo="/customer/home" />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            padding: '20px 16px 16px',
            background: 'linear-gradient(160deg,#FFF3F0,#fff)',
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
                setSaveError(null);
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
                  onClick={() => !saveLoading && setEditProfile(false)}
                  style={{ fontSize: '20px', cursor: 'pointer', color: G[400] }}>
                  ×
                </span>
              </div>

              {[
                { label: '이름', key: 'name', ph: '실명 입력', editable: true },
                { label: '닉네임', key: 'nick', ph: '닉네임', editable: false },
                { label: '핸드폰번호', key: 'phone', ph: '010-0000-0000', editable: true }
              ].map(({ label, key, ph, editable }) => (
                <div key={key}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: G[600], marginBottom: '5px' }}>
                    {label}
                    {!editable && (
                      <span style={{ fontSize: '10px', color: G[400], fontWeight: 400, marginLeft: '4px' }}>
                        (변경 불가)
                      </span>
                    )}
                  </div>

                  <input
                    value={draft[key]}
                    onChange={(e) => editable && setDraft((prev) => ({ ...prev, [key]: e.target.value }))}
                    placeholder={ph}
                    readOnly={!editable}
                    style={{
                      width: '100%',
                      padding: '10px 13px',
                      border: `1.5px solid ${editable ? G[300] : G[200]}`,
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      outline: 'none',
                      color: editable ? G[900] : G[400],
                      background: editable ? '#fff' : G[50]
                    }}
                  />
                </div>
              ))}

              {saveError && (
                <div
                  style={{
                    padding: '9px 12px',
                    background: '#FFEBEE',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#C62828',
                    fontWeight: 600
                  }}>
                  ⚠️ {saveError}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => !saveLoading && setEditProfile(false)}
                  disabled={saveLoading}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1.5px solid ${G[300]}`,
                    background: '#fff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: saveLoading ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    color: G[700],
                    opacity: saveLoading ? 0.5 : 1
                  }}>
                  취소
                </button>

                <button
                  onClick={handleSaveProfile}
                  disabled={saveLoading}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: saveLoading ? G[300] : PRIMARY,
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: saveLoading ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background .15s'
                  }}>
                  {saveLoading ? '저장 중…' : '저장'}
                </button>
              </div>
            </div>
          </div>
        )}

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
                    onClick={() => item.path && handleMove(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '13px 14px',
                      borderBottom: ii < grp.items.length - 1 ? `1px solid ${G[100]}` : 'none',
                      cursor: item.path || item.toggle ? 'pointer' : 'default'
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
                          item.set((prev) => !prev);
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
            onClick={handleLogout}
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
            {FlatIcons.logout()}
            로그아웃
          </button>
        </div>
      </div>
    </Phone>
  );
}
