// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/StoreReviews.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useEffect, useMemo, useState } from 'react';
import { Phone, TopBar, Chip, Img } from '../../shared/components';
import { FlatIcons } from '../../shared/icons';
import { G, PRIMARY } from '../../shared/constants';
import { useSearchParams } from 'react-router-dom';
import { getStoreReviews } from '../../shared/api/reviewApi';

function Stars({ v = 4.5, size = 12 }) {
  return (
    <span style={{ color: '#FFC107', fontSize: `${size}px` }}>
      {'★'.repeat(Math.floor(v))}
      {'☆'.repeat(5 - Math.floor(v))}
    </span>
  );
}

function numberOrDefault(value, defaultValue = 0) {
  if (value === null || value === undefined || value === '') return defaultValue;
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

function normalizeReviewsResponse(raw) {
  const payload = raw?.data ?? raw;
  const content = payload?.content ?? payload?.reviews ?? payload ?? [];

  return Array.isArray(content)
    ? content.map((item) => ({
        id: item.id ?? item.reviewId,
        user: item.userName ?? item.nickname ?? item.user ?? '익명',
        rating: numberOrDefault(item.rating, 0),
        date: item.createdAt ? String(item.createdAt).split('T')[0] : '',
        menu: item.menuName ?? item.productName ?? item.menu ?? '',
        content: item.content ?? item.reviewContent ?? '',
        img: Array.isArray(item.images) && item.images.length > 0 ? item.images : item.imageUrl ? [item.imageUrl] : [],
        ownerReply: item.ownerReply ?? item.reply ?? null
      }))
    : [];
}

export default function StoreReviews() {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('storeId');

  const [filter, setFilter] = useState('전체');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filters = ['전체', '5점', '4점', '3점 이하', '사진 리뷰'];

  useEffect(() => {
    async function fetchStoreReviews() {
      if (!storeId) {
        setError('가게 정보가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const res = await getStoreReviews(storeId);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `리뷰 조회 실패: ${res.status}`);
        }

        const json = await res.json();
        const normalized = normalizeReviewsResponse(json);

        setReviews(normalized);
      } catch (err) {
        console.error('가게 리뷰 조회 실패', err);
        setError('리뷰를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchStoreReviews();
  }, [storeId]);

  const filteredReviews = useMemo(() => {
    switch (filter) {
      case '5점':
        return reviews.filter((r) => r.rating === 5);
      case '4점':
        return reviews.filter((r) => r.rating === 4);
      case '3점 이하':
        return reviews.filter((r) => r.rating <= 3);
      case '사진 리뷰':
        return reviews.filter((r) => Array.isArray(r.img) && r.img.length > 0);
      default:
        return reviews;
    }
  }, [filter, reviews]);

  const totalCount = reviews.length;
  const averageRating =
    totalCount === 0 ? 0 : (reviews.reduce((sum, r) => sum + numberOrDefault(r.rating, 0), 0) / totalCount).toFixed(1);

  const starCounts = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => r.rating === star).length
    }));
  }, [reviews]);

  return (
    <Phone navActive="home">
      <TopBar title="가게 리뷰" backTo="/customer/store" />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            padding: '14px',
            borderBottom: `1px solid ${G[100]}`,
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: '38px', fontWeight: 900, color: G[900], lineHeight: 1 }}>{averageRating}</div>
              <Stars v={Number(averageRating)} size={14} />
              <div style={{ fontSize: '10px', color: G[400], marginTop: '3px' }}>{totalCount}개 리뷰</div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {starCounts.map(({ star, count }) => {
                const pct = totalCount === 0 ? 0 : Math.round((count / totalCount) * 100);

                return (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '10px', color: G[500], width: '14px', textAlign: 'right', flexShrink: 0 }}>
                      {star}
                    </span>

                    <svg width="9" height="9" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                      <polygon
                        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                        fill="#FFC107"
                      />
                    </svg>

                    <div
                      style={{ flex: 1, height: '6px', background: G[100], borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: star >= 4 ? '#FFC107' : star === 3 ? '#FFB74D' : '#FFCDD2',
                          borderRadius: '3px'
                        }}
                      />
                    </div>

                    <span style={{ fontSize: '10px', color: G[400], width: '22px', textAlign: 'right', flexShrink: 0 }}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '5px', overflowX: 'auto' }}>
            {filters.map((f) => (
              <Chip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
            ))}
          </div>

          {loading && (
            <div style={{ textAlign: 'center', color: G[500], padding: '24px 0' }}>리뷰를 불러오는 중입니다...</div>
          )}

          {error && !loading && <div style={{ textAlign: 'center', color: '#d32f2f', padding: '24px 0' }}>{error}</div>}

          {!loading && !error && filteredReviews.length === 0 && (
            <div style={{ textAlign: 'center', color: G[400], padding: '24px 0' }}>등록된 리뷰가 없습니다.</div>
          )}

          {!loading &&
            !error &&
            filteredReviews.map((r, i) => (
              <div
                key={r.id ?? i}
                style={{
                  border: `1.5px solid ${G[200]}`,
                  borderRadius: '13px',
                  padding: '12px',
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    {FlatIcons.userAvatar(33)}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700 }}>{r.user}</div>
                      <div style={{ fontSize: '10px', color: G[400] }}>{r.date}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <Stars v={r.rating} size={12} />
                    <div style={{ fontSize: '10px', color: G[500], marginTop: '2px' }}>#{r.menu}</div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: G[700], lineHeight: '1.7' }}>{r.content}</div>

                {Array.isArray(r.img) && r.img.length > 0 && (
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {r.img.map((imgUrl, idx) => (
                      <Img key={idx} w="72px" h="72px" src={imgUrl} label={`리뷰사진${idx + 1}`} radius="7px" />
                    ))}
                  </div>
                )}

                {r.ownerReply && (
                  <div
                    style={{
                      padding: '9px 11px',
                      background: '#FFF8E1',
                      borderRadius: '7px',
                      borderLeft: '3px solid #FFC107'
                    }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#F57F17', marginBottom: '3px' }}>
                      🏪 사장님 답글
                    </div>
                    <div style={{ fontSize: '11px', color: G[700] }}>{r.ownerReply}</div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Phone>
  );
}
