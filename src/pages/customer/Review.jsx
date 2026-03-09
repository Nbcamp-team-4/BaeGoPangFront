// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/Review.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Phone, TopBar, Btn, Badge} from "../../shared/components";
import { FlatIcons } from "../../shared/icons";
import { G, PRIMARY } from "../../shared/constants";

function Review() {
  const navigate = useNavigate();
  const go = (path) => navigate(`/${path}`);

  const [stars, setStars] = useState(4);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]); // 업로드된 이미지 파일들
  const labels = ["", "별로예요", "그냥그래요", "괜찮아요", "좋아요", "최고예요!"];
  const starColors = ["", "#E53935", "#FF7043", "#FFA726", "#FFC107", "#FFD600"];

  const handleFileChange = (e) => {
    const chosen = Array.from(e.target.files);
    setFiles(chosen);
  };

  const handleSubmit = async () => {
    // 실제 서버가 있다면 FormData로 전송
    const form = new FormData();
    form.append("stars", stars);
    form.append("text", text);
    files.forEach((f, i) => form.append("images", f));

    try {
      // 예시: POST /api/reviews
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("전송 실패");
      console.log("DB에 저장 완료", await res.json());
    } catch (err) {
      console.error(err);
    }

    go("order-history");
  };

  return (
    <Phone>
      <TopBar title="리뷰 작성" go={go} backTo="order-detail" />
      <div style={{ marginTop:"20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ padding: "11px", background: G[50], borderRadius: "9px", textAlign: "center", border: `1px solid ${G[200]}` }}><div style={{ fontSize: "13px", fontWeight: 700 }}>맛있는 한식당</div><div style={{ fontSize: "11px", color: G[500], marginTop: "2px" }}>ORD-001 · 김치찌개 외 1건</div></div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: G[600], marginBottom: "12px" }}>이 가게는 어떠셨나요?</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
            {[1,2,3,4,5].map(s => (
              <div key={s} onClick={() => setStars(s)} style={{ cursor: "pointer", transform: s === stars ? "scale(1.2)" : "scale(1)" }}>
                {s <= stars ? FlatIcons.starFilled(starColors[stars] || "#FFC107") : FlatIcons.starEmpty(G[300])}
              </div>
            ))}
          </div>
          {stars > 0 && <div style={{ marginTop: "9px", display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 14px", borderRadius: "20px", background: starColors[stars] + "22" }}><span style={{ fontSize: "13px", fontWeight: 800, color: starColors[stars] }}>{labels[stars]}</span></div>}
        </div>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: G[600], marginBottom: "5px" }}>리뷰 내용</div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="음식 맛, 배달 속도, 포장 상태 등을 알려주세요 :)"
            style={{ width: "100%", padding: "13px", border: `1.5px dashed ${G[300]}`, borderRadius: "9px", minHeight: "90px", color: G[400], fontSize: "12px", background: G[50], resize: "vertical" }}
          />
        </div>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: G[600], marginBottom: "5px" }}>사진 첨부</div>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} />
          {files.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
              {files.map((f, i) => (
                <img key={i} src={URL.createObjectURL(f)} alt="preview" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
              ))}
            </div>
          )}
        </div>
        <Btn variant="primary" full onClick={handleSubmit}>리뷰 등록</Btn>
      </div>
    </Phone>
  );
}

export default Review;