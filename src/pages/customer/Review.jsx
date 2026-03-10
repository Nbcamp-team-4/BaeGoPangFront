// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/customer/Review.jsx (헤더 오류 수정본)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, TopBar, Btn } from "../../shared/components";
import { FlatIcons } from "../../shared/icons";
import { G } from "../../shared/constants";

function Review() {
  const navigate = useNavigate();
  const go = (path) => navigate(`/${path}`);

  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  
  const labels = ["", "별로예요", "그냥그래요", "괜찮아요", "좋아요", "최고예요!"];
  const starColors = ["", "#E53935", "#FF7043", "#FFA726", "#FFC107", "#FFD600"];

  // ⚠️ [중요] 여기에 한글이나 공백이 절대 들어가면 안 됩니다. 
  // 실제 DB에 있는 유효한 UUID여야 백엔드에서 500 에러가 안 납니다.
  const REAL_ORDER_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; 
  const REAL_USER_ID = "89736f33-6593-4a12-8877-333333333333"; 

  const handleFileChange = (e) => {
    const chosen = Array.from(e.target.files);
    setFiles(chosen);
  };

  const handleSubmit = async () => {
    if (!text) return alert("리뷰 내용을 입력해주세요!");

    const formData = new FormData();

    // 1. JSON 데이터 준비 (백엔드 DTO 필드명 확인: rating, content)
    const requestData = {
      rating: stars,
      content: text
    };

    // 2. RequestPart 명칭 "request" 일치 확인
    formData.append("request", new Blob([JSON.stringify(requestData)], {
      type: "application/json"
    }));

    // 3. 이미지 추가 (이미지 업로드 안 할 수도 있으므로 체크)
    if (files.length > 0) {
      files.forEach((f) => {
        formData.append("images", f); // 컨트롤러의 images와 일치
      });
    }

    try {
      // 4. fetch 실행
      const res = await fetch(`/api/reviews/orders/${REAL_ORDER_ID}`, {
        method: "POST",
        headers: {
          // ⚠️ 여기서 REAL_USER_ID에 한글 주석 같은게 섞이지 않도록 주의!
          "X-User-Id": REAL_USER_ID.trim() 
        },
        body: formData,
      });

      // 응답 데이터 확인
      const result = await res.json();

      if (res.ok && result.success) {
        alert("리뷰가 등록되었습니다! 🍊");
        go("customer/order-history");
      } else {
        alert(`등록 실패: ${result.errorCode || "서버 오류"}`);
      }
    } catch (err) {
      // 💡 여기서 "ISO-8859-1" 에러가 난다면 헤더 값이 오염된 것입니다.
      console.error("상세 에러 내역:", err);
      alert("전송 중 오류가 발생했습니다. 헤더 형식을 확인하세요.");
    }
  };

  return (
    <Phone noStatus go={go}>
      <TopBar title="리뷰 작성" go={go} backTo="customer/order-history" />
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ textAlign: "center", padding: "15px", background: G[50], borderRadius: "10px", border: `1px solid ${G[200]}` }}>
          <div style={{ fontSize: "14px", fontWeight: 700 }}>맛있는 한식당</div>
          <div style={{ fontSize: "11px", color: G[500], marginTop: "4px" }}>리뷰를 정성껏 작성해 주세요!</div>
        </div>

        {/* 별점 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} onClick={() => setStars(s)} style={{ cursor: "pointer", transition: "0.2s", transform: s === stars ? "scale(1.2)" : "scale(1)" }}>
                {s <= stars ? FlatIcons.starFilled(starColors[stars]) : FlatIcons.starEmpty(G[300])}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "12px", fontSize: "14px", fontWeight: 800, color: starColors[stars] }}>{labels[stars]}</div>
        </div>

        {/* 리뷰 텍스트 */}
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="음식의 맛과 서비스는 어떠셨나요?"
          style={{ width: "100%", height: "150px", padding: "12px", borderRadius: "10px", border: `1px solid ${G[200]}`, fontSize: "14px", resize: "none", outline: "none" }}
        />

        {/* 이미지 업로드 */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: G[600], marginBottom: "8px" }}>사진 첨부 (선택)</div>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ fontSize: "12px" }} />
          {files.length > 0 && (
             <div style={{ display: "flex", gap: "5px", marginTop: "10px", overflowX: "auto" }}>
                {files.map((f, i) => (
                   <img key={i} src={URL.createObjectURL(f)} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                ))}
             </div>
          )}
        </div>

        <Btn variant="primary" full size="lg" onClick={handleSubmit} style={{ marginTop: "10px" }}>리뷰 등록하기</Btn>
      </div>
    </Phone>
  );
}

export default Review;