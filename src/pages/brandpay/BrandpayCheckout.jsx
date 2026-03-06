import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
const customerId = window.btoa(Math.random().toString()).slice(0, 20);

export function BrandpayCheckoutPage() {
  const [brandpay, setBrandpay] = useState(null);

  useEffect(() => {
    async function fetchBrandpay() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        const brandpay = tossPayments.brandpay({
          "customerKey": customerId,
          redirectUrl: "/",
        });

        setBrandpay(brandpay);
      } catch (error) {
        console.error("Error fetching brandpay:", error);
      }
    }

    fetchBrandpay();
  }, []);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#brandpayrequestpayment
  async function requestPayment() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    

    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    await brandpay.requestPayment({
      amount: {
        currency: "KRW",
        value: 1000,
      },
      orderId: "33d35f5f-e4e1-4515-aefd-a35db95b2345", // 고유 주문번호
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + `/brandpay/success?customerId=${customerId}&`, // 결제 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
  }

  async function addPaymentMethod() {
    await brandpay.addPaymentMethod();
  }

  async function changeOneTouchPay() {
    await brandpay.changeOneTouchPay();
  }

  async function changePassword() {
    await brandpay.changePassword();
  }

  async function isOneTouchPayEnabled() {
    const result = await brandpay.isOneTouchPayEnabled();

    alert(result);
  }

  async function openSettings() {
    await brandpay.openSettings();
  }

  return (
    <div className="wrapper">
      <div
        className="box_section"
        style={{
          padding: "40px 30px 50px 30px",
          marginTop: "30px",
          marginBottom: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className="button" style={{ marginTop: "30px" }} onClick={requestPayment}>
          결제하기
        </button>
        <button className="button" style={{ marginTop: "30px" }} onClick={addPaymentMethod}>
          결제수단추가
        </button>
        <button className="button" style={{ marginTop: "30px" }} onClick={changeOneTouchPay}>
          원터치페이설정변경
        </button>
        <button className="button" style={{ marginTop: "30px" }} onClick={changePassword}>
          비밀번호변경
        </button>
        <button className="button" style={{ marginTop: "30px" }} onClick={isOneTouchPayEnabled}>
          원터치결제사용가능여부 조회
        </button>
        <button className="button" style={{ marginTop: "30px" }} onClick={openSettings}>
          브랜드페이 설정 열기
        </button>
      </div>
    </div>
  );
}