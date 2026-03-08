import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { TopBar, Btn, Divider, G, PRIMARY } from "../components/UI";

const SAMPLE_STORES = [
  {
    name: "맛있는 한식당",
    items: [
      { name: "김치찌개", opt: "공기밥 포함", price: 8000, qty: 1 },
      { name: "불고기 정식", opt: "밥+국+반찬3종", price: 12000, qty: 2 },
    ],
    fee: 2000,
  },
  {
    name: "엄마손 분식",
    items: [{ name: "떡볶이", opt: "매운맛", price: 5000, qty: 1 }],
    fee: 1000,
  },
];

export default function Cart() {
  const navigate = useNavigate();
  const [stores] = useState(SAMPLE_STORES);
  const [checked, setChecked] = useState(stores.map(() => true));
  const [itemChecked, setItemChecked] = useState(
    stores.map((s) => s.items.map(() => true))
  );

  const toggleStore = (si) => {
    const nextChecked = [...checked];
    nextChecked[si] = !nextChecked[si];
    setChecked(nextChecked);

    setItemChecked((prev) =>
      prev.map((group, i) =>
        i === si ? group.map(() => nextChecked[si]) : group
      )
    );
  };

  const toggleItem = (si, ii) => {
    setItemChecked((prev) =>
      prev.map((group, i) =>
        i === si ? group.map((v, j) => (j === ii ? !v : v)) : group
      )
    );
  };

  const totalGoods = useMemo(
    () =>
      stores.reduce(
        (acc, store, si) =>
          acc +
          store.items.reduce(
            (sum, item, ii) =>
              sum +
              (itemChecked[si] && itemChecked[si][ii]
                ? item.price * item.qty
                : 0),
            0
          ),
        0
      ),
    [stores, itemChecked]
  );

  const totalFee = useMemo(
    () =>
      stores.reduce(
        (acc, store, si) => acc + (checked[si] ? store.fee : 0),
        0
      ),
    [stores, checked]
  );

  const handleOrderAll = () => {
    if (totalGoods === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }

    navigate("/order");
  };

  return (
    <PageLayout contentStyle={{ padding: 0 }}>
      <TopBar title="🛒 장바구니" go={(p) => navigate(`/${p}`)} backTo="home" />

      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {stores.map((store, si) => (
          <div
            key={si}
            style={{
              border: `1px solid ${checked[si] ? PRIMARY : G[200]}`,
              borderRadius: 12,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <div
              style={{
                padding: "12px 14px",
                background: checked[si] ? `${PRIMARY}12` : G[50],
                borderBottom: `1px solid ${G[200]}`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <input
                type="checkbox"
                checked={checked[si]}
                onChange={() => toggleStore(si)}
                style={{ accentColor: PRIMARY, width: 16, height: 16 }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: checked[si] ? PRIMARY : G[700],
                  flex: 1,
                }}
              >
                {store.name}
              </span>
              <span style={{ fontSize: 13, color: G[500] }}>
                배달비 {store.fee.toLocaleString()}원
              </span>
            </div>

            <div
              style={{
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                background: "#fff",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {store.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    opacity:
                      !checked[si] || !itemChecked[si][ii] ? 0.45 : 1,
                    width: "100%",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={itemChecked[si][ii]}
                    onChange={() => toggleItem(si, ii)}
                    style={{
                      accentColor: PRIMARY,
                      width: 15,
                      height: 15,
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: G[500], marginTop: 2 }}>
                      {item.opt}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        marginTop: 6,
                      }}
                    >
                      {(item.price * item.qty).toLocaleString()}원
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      border: `1px solid ${G[300]}`,
                      borderRadius: 8,
                      padding: "5px 8px",
                      flexShrink: 0,
                    }}
                  >
                    <button
                      onClick={() =>
                        alert("수량 조절은 샘플에서 비활성화 되어 있습니다.")
                      }
                      style={qtyButtonStyle(G[500])}
                    >
                      −
                    </button>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        minWidth: 20,
                        textAlign: "center",
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() =>
                        alert("수량 조절은 샘플에서 비활성화 되어 있습니다.")
                      }
                      style={qtyButtonStyle(PRIMARY)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            padding: 16,
            background: `${PRIMARY}08`,
            borderRadius: 12,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={summaryRowStyle}>
            <span>상품금액</span>
            <span>{totalGoods.toLocaleString()}원</span>
          </div>

          <div style={{ ...summaryRowStyle, marginBottom: 8 }}>
            <span>배달비</span>
            <span>{totalFee.toLocaleString()}원</span>
          </div>

          <Divider />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              fontWeight: 900,
              marginTop: 8,
            }}
          >
            <span>결제예정</span>
            <span style={{ color: PRIMARY }}>
              {(totalGoods + totalFee).toLocaleString()}원
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, width: "100%" }}>
          <Btn
            variant="outline"
            style={{ flex: 1 }}
            onClick={() => {
              localStorage.removeItem("cart");
              alert("샘플 장바구니를 초기화했습니다.");
            }}
          >
            비우기
          </Btn>

          <Btn
            variant="primary"
            full
            size="lg"
            onClick={handleOrderAll}
            style={{ flex: 1 }}
          >
            전체 주문하기
          </Btn>
        </div>
      </div>
    </PageLayout>
  );
}

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 12,
  color: G[600],
  marginBottom: 6,
};

const qtyButtonStyle = (color) => ({
  fontSize: 15,
  cursor: "pointer",
  color,
  background: "transparent",
  border: "none",
  userSelect: "none",
});