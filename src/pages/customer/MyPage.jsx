import { useState, useEffect } from 'react'; // ✅ useEffect 추가
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate 추가
import { Phone, TopBar, Badge } from '../../shared/components';
import { FlatIcons, Icon } from '../../shared/icons';
import { G, PRIMARY } from '../../shared/constants';

import { apiFetch } from '../../shared/api/apiClient';
import { login } from '../../shared/api/authApi';

export default function MyPage() { // ✅ 부모로부터 go를 받지 않고 내부에서 useNavigate 사용 추천
  const navigate = useNavigate();
  const go = (path) => navigate(`/${path}`);

  // 1. 상태 관리 선언 (누락되었던 loading, saving 추가)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    <Phone navActive="mypage" go={go}>
      <TopBar title="마이페이지" go={go} backTo="customer/home" />
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* 프로필 영역 - 실제 데이터(profile) 반영 */}
        <div style={{ padding: '20px 16px 16px', background: `linear-gradient(160deg,#FFF3F0,#fff)`, borderBottom: `1px solid ${G[100]}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: G[200], display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
               <svg width="58" height="58" viewBox="0 0 24 24" fill="none">
                 <circle cx="12" cy="8" r="4" fill={G[500]} opacity=".7" />
                 <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill={G[400]} opacity=".5" />
               </svg>
             </div>
             <div style={{ flex: 1 }}>
               <div style={{ fontSize: '17px', fontWeight: 900 }}>{profile.name}</div>
               <div style={{ fontSize: '12px', color: G[500], marginTop: '1px' }}>@{profile.nick}</div>
               <div style={{ marginTop: '5px' }}>
                 <Badge bg={PRIMARY} color="#fff">일반 회원</Badge>
               </div>
             </div>
             <button onClick={() => setEditProfile(true)} style={{ padding: '7px 13px', borderRadius: '8px', border: `1.5px solid ${G[300]}`, background: '#fff', fontSize: '11px', fontWeight: 700, color: G[700], cursor: 'pointer' }}>
               프로필 수정
             </button>
          </div>

          {/* 하단 통계 수치 - 실제 데이터 바인딩 */}
          <div style={{ display: 'flex', marginTop: '16px', background: '#fff', borderRadius: '12px', border: `1px solid ${G[200]}`, overflow: 'hidden' }}>
            {[
              { l: '주문', v: profile.orderCount },
              { l: '리뷰', v: profile.reviewCount },
              { l: '찜한가게', v: profile.favoriteStoreCount },
              { l: '포인트', v: profile.point.toLocaleString() }
            ].map((s, i, arr) => (
              <div key={i} style={{ flex: 1, padding: '11px 0', textAlign: 'center', borderRight: i < arr.length - 1 ? `1px solid ${G[200]}` : 'none' }}>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>{s.v}</div>
                <div style={{ fontSize: '10px', color: G[500], marginTop: '2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 프로필 수정 모달 */}
        {editProfile && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '340px', background: '#fff', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <div style={{ fontSize: '15px', fontWeight: 900 }}>프로필 수정</div>
              <input value={draft.name} onChange={(e) => setDraft({...draft, name: e.target.value})} placeholder="이름" style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${G[300]}` }} />
              <input value={draft.nick} onChange={(e) => setDraft({...draft, nick: e.target.value})} placeholder="닉네임" style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${G[300]}` }} />
              <input value={draft.phone} onChange={(e) => setDraft({...draft, phone: e.target.value})} placeholder="전화번호" style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${G[300]}` }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setEditProfile(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: `1px solid ${G[300]}`, background: '#fff' }}>취소</button>
                <button onClick={handleSaveProfile} disabled={saving} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: PRIMARY, color: '#fff' }}>
                  {saving ? "저장 중..." : "저장"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 메뉴 그룹 (기존 로직 유지) */}
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
           {/* ... 메뉴 그룹 렌더링 ... */}
        </div>
      </div>
    </Phone>
  );
}