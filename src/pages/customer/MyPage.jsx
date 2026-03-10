import { useState, useEffect } from 'react'; // ✅ useEffect 추가
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate 추가
import { Phone, TopBar, Badge } from '../../shared/components';
import { FlatIcons, Icon } from '../../shared/icons';
import { G, PRIMARY } from '../../shared/constants';

import {
  getMyPage,
  updateMyProfile,
  updateNotification,
  logout,
} from "../../shared/api/mypage";

export default function MyPage() { // ✅ 부모로부터 go를 받지 않고 내부에서 useNavigate 사용 추천
  const navigate = useNavigate();
  const go = (path) => navigate(`/${path}`);

  // 1. 상태 관리 선언 (누락되었던 loading, saving 추가)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noti, setNoti] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  
  const [profile, setProfile] = useState({ 
    name: '불러오는 중...', 
    nick: '...', 
    phone: '', 
    orderCount: 0, 
    reviewCount: 0, 
    favoriteStoreCount: 0, 
    point: 0 
  });
  const [draft, setDraft] = useState({ name: '', nick: '', phone: '' });

  // 2. 초기 데이터 로드
  useEffect(() => {
    fetchMyPage();
  }, []);

  async function fetchMyPage() {
    try {
      setLoading(true);
      const res = await getMyPage(); // 서버 응답 구조가 { success: true, data: { ... } } 라면 res.data 사용
      const data = res.data || res;

      const newProfile = {
        name: data.name ?? "이름 없음",
        nick: data.nick ?? "user",
        phone: data.phone ?? "",
        role: data.role ?? "CUSTOMER",
        orderCount: data.orderCount ?? 0,
        reviewCount: data.reviewCount ?? 0,
        favoriteStoreCount: data.favoriteStoreCount ?? 0,
        point: data.point ?? 0,
      };

      setProfile(newProfile);
      setDraft({
        name: newProfile.name,
        nick: newProfile.nick,
        phone: newProfile.phone,
      });
      setNoti(Boolean(data.notificationEnabled));
    } catch (e) {
      console.error("마이페이지 조회 실패", e);
    } finally {
      setLoading(false);
    }
  }

  // 3. 프로필 저장 로직
  async function handleSaveProfile() {
    try {
      setSaving(true);
      const res = await updateMyProfile(draft);
      const updated = res.data || res;

      setProfile((prev) => ({
        ...prev,
        ...updated
      }));

      setEditProfile(false);
      alert("프로필이 수정되었습니다. 🍊");
    } catch (e) {
      alert("수정에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Phone go={go}><div style={{padding:"100px 0", textAlign:"center"}}>정보를 가져오는 중...</div></Phone>;

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