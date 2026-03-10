// 기존 코드: import api from "../../config/api"; (에러 발생)
import {apiFetch} from "../../shared/api/apiClient";
/**
 * AI 리뷰 답글 생성 요청
 * @param {string} reviewId - 리뷰의 UUID
 * @param {string} tone - 원하는 말투 (예: "친절하게", "단호하게")
 */
export const generateAiReviewReply = async (reviewId, tone) => {
  // 백엔드: @PostMapping("/review-reply")
  const response = await apiFetch("/api/ai/review-reply", {
    reviewId: reviewId,
    tone: tone
  });
  
  // 백엔드 응답 구조: BaseResponse { success: true, data: { aiGeneratedReply: "..." } }
  return response.data.data; 
};