// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/Review.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, TopBar, Btn } from '../../shared/components';
import { FlatIcons } from '../../shared/icons';
import { G } from '../../shared/constants';
import { createReview, getStoreReviews } from '../../shared/api/reviewApi';
import { getOrder } from '../../shared/api/orderApi';
import { getUserId } from '../../shared/utils/user';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function Review() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const go = (path) => navigate(`/${path}`);

  const orderId = searchParams.get('orderId')?.trim() || '';

  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [storeId, setStoreId] = useState('');
  const [storeName, setStoreName] = useState('리뷰 작성');
  const [orderLoading, setOrderLoading] = useState(false);

  const labels = ['', '별로예요', '그냥그래요', '괜찮아요', '좋아요', '최고예요!'];
  const starColors = ['', '#E53935', '#FF7043', '#FFA726', '#FFC107', '#FFD600'];

  const userId = getUserId();

  const handleFileChange = (e) => {
    const chosen = Array.from(e.target.files || []);
    setFiles(chosen);
  };

  const previewUrls = useMemo(() => {
    return files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [previewUrls]);

  const fetchReviews = async (targetStoreId) => {
    if (!targetStoreId) return;

    try {
      setLoading(true);

      const res = await getStoreReviews(targetStoreId, 0, 10);
      const result = await res.json();

      console.log('리뷰 목록 전체 응답:', result);

      const pageData = result?.data ?? result;
      const content = pageData?.content ?? [];

      setReviews(content);
      setReviewPage(pageData);
    } catch (err) {
      console.error('리뷰 목록 조회 실패:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderInfo = async () => {
    if (!orderId) {
      alert('주문 정보가 없습니다.');
      navigate('/customer/order-history');
      return;
    }

    try {
      setOrderLoading(true);

      const res = await getOrder(orderId);
      const result = await res.json();

      console.log('주문 상세 전체 응답:', result);

      const orderData = result?.data ?? result;

      const resolvedStoreId = orderData?.storeId || orderData?.store?.id || '';

      const resolvedStoreName = orderData?.storeName || orderData?.store?.name || '리뷰 작성';

      setStoreId(resolvedStoreId);
      setStoreName(resolvedStoreName);

      if (resolvedStoreId) {
        await fetchReviews(resolvedStoreId);
      }
    } catch (err) {
      console.error('주문 상세 조회 실패:', err);
      alert('주문 정보를 불러오지 못했습니다.');
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderInfo();
  }, [orderId]);

  const handleSubmit = async () => {
    if (!orderId) {
      alert('유효한 주문 ID가 없습니다.');
      return;
    }

    if (!userId) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    if (!text.trim()) {
      alert('리뷰 내용을 입력해주세요!');
      return;
    }

    try {
      setSubmitting(true);

      const res = await createReview({
        orderId,
        userId,
        rating: stars,
        content: text.trim(),
        files
      });

      const result = await res.json();
      console.log('리뷰 등록 응답:', result);

      if (res.ok && result?.success) {
        alert('리뷰가 등록되었습니다! 🍊');
        setText('');
        setStars(5);
        setFiles([]);

        if (storeId) {
          await fetchReviews(storeId);
        }

        go('customer/order-history');
      } else {
        alert(`등록 실패: ${result?.errorCode || result?.message || '서버 오류'}`);
      }
    } catch (err) {
      console.error('리뷰 등록 상세 에러:', err);
      alert('전송 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Phone noStatus go={go}>
      <TopBar title="리뷰 작성" go={go} backTo="customer/order-history" />

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            textAlign: 'center',
            padding: '15px',
            background: G[50],
            borderRadius: '10px',
            border: `1px solid ${G[200]}`
          }}>
          <div style={{ fontSize: '14px', fontWeight: 700 }}>
            {orderLoading ? '주문 정보 불러오는 중...' : storeName}
          </div>
          <div style={{ fontSize: '11px', color: G[500], marginTop: '4px' }}>리뷰를 정성껏 작성해 주세요!</div>
          <div style={{ fontSize: '11px', color: G[400], marginTop: '6px' }}>주문번호: {orderId || '-'}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                onClick={() => setStars(s)}
                style={{
                  cursor: 'pointer',
                  transition: '0.2s',
                  transform: s === stars ? 'scale(1.2)' : 'scale(1)'
                }}>
                {s <= stars ? FlatIcons.starFilled(starColors[stars]) : FlatIcons.starEmpty(G[300])}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 800, color: starColors[stars] }}>
            {labels[stars]}
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="음식의 맛과 서비스는 어떠셨나요?"
          style={{
            width: '100%',
            height: '150px',
            padding: '12px',
            borderRadius: '10px',
            border: `1px solid ${G[200]}`,
            fontSize: '14px',
            resize: 'none',
            outline: 'none'
          }}
        />

        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: G[600], marginBottom: '8px' }}>사진 첨부 (선택)</div>

          <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ fontSize: '12px' }} />

          {previewUrls.length > 0 && (
            <div style={{ display: 'flex', gap: '5px', marginTop: '10px', overflowX: 'auto' }}>
              {previewUrls.map((file, i) => (
                <img
                  key={`${file.name}-${i}`}
                  src={file.url}
                  alt={`preview-${i}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    border: `1px solid ${G[200]}`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <Btn
          variant="primary"
          full
          size="lg"
          onClick={handleSubmit}
          disabled={submitting || orderLoading || !orderId}
          style={{ marginTop: '10px' }}>
          {submitting ? '등록 중...' : '리뷰 등록하기'}
        </Btn>

        <div
          style={{
            marginTop: '10px',
            paddingTop: '20px',
            borderTop: `1px solid ${G[200]}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 800 }}>가게 리뷰</div>
            <div style={{ fontSize: '12px', color: G[500] }}>총 {reviewPage?.totalElements ?? reviews.length}개</div>
          </div>

          {loading ? (
            <div
              style={{
                padding: '16px',
                borderRadius: '10px',
                background: G[50],
                fontSize: '13px',
                color: G[600],
                textAlign: 'center'
              }}>
              리뷰를 불러오는 중입니다...
            </div>
          ) : reviews.length === 0 ? (
            <div
              style={{
                padding: '16px',
                borderRadius: '10px',
                background: G[50],
                fontSize: '13px',
                color: G[600],
                textAlign: 'center'
              }}>
              아직 등록된 리뷰가 없습니다.
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  border: `1px solid ${G[200]}`,
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  background: '#fff'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} style={{ display: 'flex', alignItems: 'center' }}>
                        {s <= Number(review.rating ?? 0)
                          ? FlatIcons.starFilled('#FFD600')
                          : FlatIcons.starEmpty(G[300])}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontSize: '11px', color: G[500] }}>{formatDate(review.createdAt)}</div>
                </div>

                <div style={{ fontSize: '13px', color: G[800], lineHeight: 1.5 }}>{review.content || '내용 없음'}</div>

                {Array.isArray(review.imageUrls) && review.imageUrls.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
                    {review.imageUrls.map((url, idx) => (
                      <img
                        key={`${url}-${idx}`}
                        src={url}
                        alt={`review-${idx}`}
                        style={{
                          width: '72px',
                          height: '72px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: `1px solid ${G[200]}`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Phone>
  );
}

export default Review;
