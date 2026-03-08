import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { G, Container, TopBar, THead, TRow, Btn } from "../../components/UI";

function OwnerReviews() {
  const navigate = useNavigate();
  const go = (path) => navigate(`/${path}`);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const SAMPLE_OWNER = [
    { id: 1, user: "user1", rating: 5, content: "최고!", date: "2026-03-01" },
    { id: 2, user: "user2", rating: 3, content: "그냥 그랬어요", date: "2026-02-28" },
  ];

  useEffect(() => {
    fetch("/api/owner/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(data && data.length ? data : SAMPLE_OWNER);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setReviews(SAMPLE_OWNER);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <TopBar title="리뷰 관리 (사장님)" go={go} backTo="owner" />
      <div style={{ marginTop: "20px" }}>
        <THead
          cols={[
            { v: "#", flex: 0.5 },
            { v: "회원", flex: 1 },
            { v: "평점", flex: 0.5 },
            { v: "내용", flex: 2 },
            { v: "날짜", flex: 1 },
          ]}
        />
        {loading && <div>로딩 중...</div>}
        {!loading && reviews.length === 0 && <div>등록된 리뷰가 없습니다.</div>}
        {reviews.map((r, i) => (
          <TRow
            key={i}
            cols={[
              { v: i + 1, flex: 0.5 },
              { v: r.user, flex: 1 },
              { v: r.rating, flex: 0.5 },
              { v: r.content, flex: 2 },
              { v: r.date, flex: 1 },
            ]}
            actions={[
              <Btn
                key="reply"
                size="sm"
                onClick={() => {
                  // TODO: 답글 작성 모달 등 추후 구현
                  alert("답글 기능 준비 중");
                }}
              >
                답글
              </Btn>,
              <Btn
                key="delete"
                size="sm"
                variant="danger"
                onClick={() => {
                  // 예시 삭제
                  fetch(`/api/owner/reviews/${r.id}`, { method: "DELETE" })
                    .then((res) => {
                      if (res.ok) {
                        setReviews((prev) => prev.filter((_, idx) => idx !== i));
                      }
                    })
                    .catch(console.error);
                }}
              >
                삭제
              </Btn>,
            ]}
          />
        ))}
      </div>
    </Container>
  );
}

export default OwnerReviews;
