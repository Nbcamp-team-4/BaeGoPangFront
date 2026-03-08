import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopBar, Img, Stars, G, PRIMARY } from "../components/UI";
import PageLayout from "../components/PageLayout";
import "../App.css";

const MENU_ITEMS = [
  {
    id: 1,
    category: "인기메뉴",
    rank: 1,
    name: "김치찌개",
    option: "공기밥 포함",
    price: 8000,
    reviews: 89,
    ai: true,
    desc: "진한 국물과 돼지고기가 들어간 인기 메뉴",
    image: null,
  },
  {
    id: 2,
    category: "인기메뉴",
    rank: 2,
    name: "된장찌개",
    option: "공기밥 포함",
    price: 7500,
    reviews: 62,
    ai: false,
    desc: "구수한 된장 베이스의 기본 찌개",
    image: null,
  },
  {
    id: 3,
    category: "세트메뉴",
    rank: 3,
    name: "불고기 정식",
    option: "밥 + 국 + 반찬 3종",
    price: 12000,
    reviews: 45,
    ai: true,
    desc: "불고기와 반찬이 함께 나오는 든든한 한 상",
    image: null,
  },
  {
    id: 4,
    category: "단품",
    rank: null,
    name: "제육볶음",
    option: "단품 메뉴",
    price: 9500,
    reviews: 38,
    ai: false,
    desc: "매콤달콤한 제육볶음",
    image: null,
  },
  {
    id: 5,
    category: "특가",
    rank: null,
    name: "오늘의 특가 백반",
    option: "한정 수량",
    price: 6900,
    reviews: 21,
    ai: false,
    desc: "가성비 좋은 오늘의 특가 메뉴",
    image: null,
  },
];

function formatPrice(v) {
  return Number(v || 0).toLocaleString("ko-KR");
}

export default function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const menuId = useMemo(() => (id ? parseInt(id, 10) : null), [id]);

  const item = useMemo(() => {
    if (!menuId) return MENU_ITEMS[0];
    return MENU_ITEMS.find((m) => m.id === menuId) || MENU_ITEMS[0];
  }, [menuId]);

  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    setQuantity(1);
    setNote("");
  }, [item.id]);

  const total = item.price * quantity;

  const addToCart = () => {
    try {
      const raw = localStorage.getItem("cart") || "[]";
      const cart = JSON.parse(raw);
      const found = cart.find((c) => c.id === item.id);

      if (found) {
        found.quantity += quantity;
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          option: item.option,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      navigate("/cart");
    } catch (e) {
      console.error(e);
      alert("장바구니에 담는 중 오류가 발생했습니다.");
    }
  };

  const orderNow = () => {
    const orderItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      option: item.option,
      note,
    };
    navigate("/order", { state: { items: [orderItem] } });
  };

  return (
    <PageLayout contentStyle={{ padding: 0 }}>
      <TopBar
        title="메뉴 상세"
        go={(p) => navigate(`/${p}`)}
        backTo="store"
      />

      <div style={{ padding: 24 }}>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            background: "#fff",
            border: `1px solid ${G[100]}`,
          }}
        >
          <Img
            h="360px"
            label={item.name}
            src={item.image}
            style={{ width: "100%", objectFit: "cover" }}
          />

          <div style={{ padding: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: 240 }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: G[900],
                  }}
                >
                  {item.name}
                </div>

                <div style={{ marginTop: 8, color: G[600], fontSize: 16 }}>
                  {item.option}
                </div>

                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <Stars v={4.5} size={14} />
                  <span style={{ fontSize: 14, color: G[500] }}>
                    {item.reviews}개 리뷰
                  </span>

                  {item.ai && (
                    <span
                      style={{
                        background: PRIMARY,
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: 8,
                        fontWeight: 800,
                        fontSize: 12,
                      }}
                    >
                      AI추천
                    </span>
                  )}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 26, fontWeight: 900 }}>
                  {formatPrice(item.price)}원
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 18,
                color: G[600],
                lineHeight: 1.7,
                fontSize: 16,
              }}
            >
              {item.desc}
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={qtyBtnStyle}
                >
                  -
                </button>
                <div
                  style={{
                    minWidth: 40,
                    textAlign: "center",
                    fontWeight: 800,
                    fontSize: 16,
                  }}
                >
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={qtyBtnStyle}
                >
                  +
                </button>
              </div>

              <input
                placeholder="요청사항 (예: 매운맛 조절, 포장 등)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 260,
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: `1px solid ${G[200]}`,
                  fontSize: 14,
                }}
              />
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <button onClick={addToCart} style={primaryBtnStyle}>
                담기 · {formatPrice(total)}원
              </button>
              <button onClick={orderNow} style={outlineBtnStyle}>
                바로주문
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

const qtyBtnStyle = {
  width: 40,
  height: 40,
  borderRadius: 8,
  border: `1px solid ${G[200]}`,
  background: "#fff",
  fontSize: 18,
  fontWeight: 800,
  cursor: "pointer",
};

const primaryBtnStyle = {
  flex: 1,
  minWidth: 180,
  border: "none",
  background: PRIMARY,
  color: "#fff",
  padding: "14px 18px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
  fontSize: 15,
};

const outlineBtnStyle = {
  flex: 1,
  minWidth: 180,
  border: `1px solid ${G[200]}`,
  background: "#fff",
  color: G[700],
  padding: "14px 18px",
  borderRadius: 12,
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 15,
};