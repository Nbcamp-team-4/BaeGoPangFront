import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { G, Container, TopBar, THead, TRow, Btn } from "../../components/UI";

function AdminReviews() {
  const navigate = useNavigate();
  const go = (path) => navigate(`/${path}`);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const SAMPLE_ADMIN = [
    { id: 1, store: "맛있는 한식당", user: "user1", rating: 5, content: "맛있어요", date: "2026-03-01" },
    { id: 2, store: "황금 중식당", user: "user2", rating: 2, content: "별로예요", date: "2026-02-27" },
  ];

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(data && data.length ? data : SAMPLE_ADMIN);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setReviews(SAMPLE_ADMIN);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <TopBar title="리뷰 관리 (관리자)" go={go} backTo="admin" />
      <div style={{ marginTop: "20px" }}>
        <THead
          cols={[
            { v: "#", flex: 0.5 },
            { v: "가게", flex: 1 },
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
              { v: r.store, flex: 1 },
              { v: r.user, flex: 1 },
              { v: r.rating, flex: 0.5 },
              { v: r.content, flex: 2 },
              { v: r.date, flex: 1 },
            ]}
            actions={[
              <Btn
                key="view"
                size="sm"
                onClick={() => {
                  alert("자세히 보기");
                }}
              >
                보기
              </Btn>,
              <Btn
                key="delete"
                size="sm"
                variant="danger"
                onClick={() => {
                  fetch(`/api/admin/reviews/${r.id}`, { method: "DELETE" })
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

export default AdminReviews;
