import { useEffect, useState } from "react";
import { getOrders } from "../api/order/orderApi";
import PageLayout from "../components/PageLayout";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [rawData, setRawData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders("11111111-1111-1111-1111-111111111111");
        console.log("주문 목록 응답:", data);
        setRawData(data);

        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else if (Array.isArray(data.data)) {
          setOrders(data.data);
        } else if (Array.isArray(data.content)) {
          setOrders(data.content);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("주문 목록 조회 실패", error);
        setErrorMessage("주문 목록을 불러오지 못했습니다.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <PageLayout>
      <h1>내 주문 목록</h1>

      {errorMessage && <p>{errorMessage}</p>}

      <h2>원본 응답 확인</h2>
      <pre
        style={{
          background: "#f5f5f5",
          padding: "16px",
          borderRadius: "8px",
          overflowX: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {JSON.stringify(rawData, null, 2)}
      </pre>

      <h2>주문 목록</h2>

      {orders.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={order.orderId ?? order.id ?? order.orderNo ?? index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "12px",
            }}
          >
            <p><strong>orderId:</strong> {order.orderId ?? "-"}</p>
            <p><strong>id:</strong> {order.id ?? "-"}</p>
            <p><strong>orderNo:</strong> {order.orderNo ?? "-"}</p>
            <p><strong>storeName:</strong> {order.storeName ?? "-"}</p>
            <p><strong>status:</strong> {order.status ?? "-"}</p>
            <p><strong>totalAmount:</strong> {order.totalAmount ?? "-"}</p>
            <p><strong>requestMemo:</strong> {order.requestMemo ?? "-"}</p>
            <p><strong>orderDate:</strong> {order.orderDate ?? "-"}</p>
            <p><strong>createdAt:</strong> {order.createdAt ?? "-"}</p>
            <p><strong>paymentStatus:</strong> {order.paymentStatus ?? "-"}</p>

            <details style={{ marginTop: "12px" }}>
              <summary>이 주문 JSON 보기</summary>
              <pre
                style={{
                  background: "#fafafa",
                  padding: "12px",
                  borderRadius: "6px",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {JSON.stringify(order, null, 2)}
              </pre>
            </details>
          </div>
        ))
      )}
    </PageLayout>
  );
}