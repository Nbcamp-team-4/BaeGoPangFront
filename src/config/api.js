import axios from "axios";

// 기본 백엔드 URL은 필요에 따라 환경변수로 바꿀 수 있습니다.
export const BACKEND_CONFIRM_URL = "http://localhost:8080/api/payments/confirm";

// axios 인스턴스를 생성하여 공통 설정을 관리합니다.
const api = axios.create({
baseURL: "/api", 
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
