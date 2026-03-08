import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { G, PRIMARY, Img, Stars, TopBar } from "../components/UI";

const AI_COLOR = "#8b5cf6";

const MENU_TABS = ["인기메뉴", "세트메뉴", "단품", "특가"];

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
  },
];

function Store() {
  const navigate = useNavigate();
  const goTo = (path) => navigate(`/${path}`);

  const [activeMenu, setActiveMenu] = useState("인기메뉴");
  const [liked, setLiked] = useState(false);
  const [cart, setCart] = useState([]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.category === activeMenu);
  }, [activeMenu]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((cartItem) => cartItem.id === item.id);

      if (found) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const formatPrice = (price) => price.toLocaleString("ko-KR");

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px 20px 120px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <TopBar
            title="맛있는 한식당"
            go={goTo}
            backTo="home"
            right={
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  onClick={() => setLiked((prev) => !prev)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    background: liked ? `${PRIMARY}18` : "#f0f0f0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={liked ? PRIMARY : "none"}
                    stroke={liked ? PRIMARY : G[500]}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            }
          />

          <div>
            <Img
              h="320px"
              label="가게 대표 이미지"
              style={{ borderRadius: 0, border: "none", width: "100%" }}
            />

            <div style={{ padding: "28px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "24px",
                  alignItems: "start",
                }}
              >
                <div>
                  <div style={{ fontSize: "32px", fontWeight: 900, color: G[900] }}>
                    맛있는 한식당
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "10px",
                    }}
                  >
                    <Stars v={4.7} />
                    <span style={{ fontSize: "15px", fontWeight: 700 }}>4.7</span>
                    <span style={{ fontSize: "14px", color: G[500] }}>리뷰 234</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "14px",
                      fontSize: "14px",
                      color: G[600],
                    }}
                  >
                    <span>📍 0.8km</span>
                    <span>·</span>
                    <span>최소주문 12,000원</span>
                    <span>·</span>
                    <span>배달비 2,000원</span>
                    <span>·</span>
                    <span>⏱ 25~35분</span>
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      padding: "16px",
                      borderRadius: "14px",
                      background: G[100],
                    }}
                  >
                    <div style={{ fontSize: "15px", fontWeight: 800, color: G[900] }}>
                      가게 소개
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: G[600],
                        lineHeight: 1.6,
                        marginTop: "8px",
                      }}
                    >
                      집밥 느낌의 한식 메뉴를 빠르게 배달해드려요. 찌개, 정식,
                      특가 메뉴까지 준비되어 있습니다.
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: "18px",
                    borderRadius: "16px",
                    border: `1px solid ${G[200]}`,
                    background: "#fff",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 800, color: G[900] }}>
                    주문 요약
                  </div>

                  <div style={{ marginTop: "14px", fontSize: "14px", color: G[600] }}>
                    담은 메뉴
                  </div>
                  <div style={{ marginTop: "4px", fontSize: "24px", fontWeight: 900, color: G[900] }}>
                    {totalCount}개
                  </div>

                  <div style={{ marginTop: "14px", fontSize: "14px", color: G[600] }}>
                    총 주문 금액
                  </div>
                  <div style={{ marginTop: "4px", fontSize: "24px", fontWeight: 900, color: PRIMARY }}>
                    {formatPrice(totalPrice)}원
                  </div>

                  <button
                    onClick={() => goTo("cart")}
                    disabled={totalCount === 0}
                    style={{
                      width: "100%",
                      marginTop: "18px",
                      border: "none",
                      background: totalCount > 0 ? PRIMARY : G[300],
                      color: "#fff",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      fontSize: "14px",
                      fontWeight: 800,
                      cursor: totalCount > 0 ? "pointer" : "not-allowed",
                      fontFamily: "inherit",
                    }}
                  >
                    장바구니 보기
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  paddingBottom: "4px",
                  marginTop: "28px",
                }}
              >
                {MENU_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMenu(tab)}
                    style={{
                      padding: "9px 16px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: 700,
                      border: "none",
                      background: activeMenu === tab ? PRIMARY : G[100],
                      color: activeMenu === tab ? "#fff" : G[600],
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontFamily: "inherit",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "18px",
                  marginTop: "20px",
                }}
              >
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => goTo("menu-detail")}
                    style={{
                      border: `1px solid ${G[200]}`,
                      borderRadius: "18px",
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Img
                        h="220px"
                        label={item.name}
                        style={{ width: "100%", borderRadius: 0, border: "none" }}
                      />

                      {item.rank && (
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: PRIMARY,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 900,
                          }}
                        >
                          {item.rank}
                        </div>
                      )}

                      {item.ai && (
                        <div
                          style={{
                            position: "absolute",
                            right: "12px",
                            bottom: "12px",
                            padding: "5px 8px",
                            borderRadius: "8px",
                            background: AI_COLOR,
                            color: "#fff",
                            fontSize: "11px",
                            fontWeight: 800,
                          }}
                        >
                          AI추천
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "18px" }}>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: G[900] }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "13px", color: G[500], marginTop: "4px" }}>
                        {item.option}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: G[600],
                          marginTop: "10px",
                          lineHeight: 1.5,
                          minHeight: "42px",
                        }}
                      >
                        {item.desc}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                          marginTop: "16px",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "18px", fontWeight: 900, color: G[900] }}>
                            {formatPrice(item.price)}원
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              marginTop: "6px",
                            }}
                          >
                            <Stars v={4.5} size={11} />
                            <span style={{ fontSize: "12px", color: G[500] }}>
                              {item.reviews}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item);
                          }}
                          style={{
                            border: "none",
                            background: PRIMARY,
                            color: "#fff",
                            borderRadius: "10px",
                            padding: "10px 14px",
                            fontSize: "13px",
                            fontWeight: 800,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            flexShrink: 0,
                          }}
                        >
                          담기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "32px 16px",
                    borderRadius: "14px",
                    background: G[100],
                    color: G[600],
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  이 카테고리에 등록된 메뉴가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {totalCount > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(1200px, calc(100% - 40px))",
            display: "flex",
            justifyContent: "flex-end",
            pointerEvents: "none",
          }}
        >
          <button
            onClick={() => goTo("cart")}
            style={{
              pointerEvents: "auto",
              border: "none",
              background: PRIMARY,
              color: "#fff",
              borderRadius: "14px",
              padding: "16px 22px",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 10px 24px rgba(49,130,246,0.25)",
            }}
          >
            장바구니 {totalCount}개 · {formatPrice(totalPrice)}원
          </button>
        </div>
      )}
    </div>
  );
}

export default Store;