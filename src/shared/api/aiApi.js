import api from "../../config/api"; // 이전에 설정한 axios 인스턴스

/**
 * AI 리뷰 답글 생성 요청
 * @param {string} reviewId - 리뷰의 UUID
 * @param {string} tone - 원하는 말투 (예: "친절하게", "단호하게")
 */
export const generateAiReviewReply = async (reviewId, tone) => {
  // 백엔드: @PostMapping("/review-reply")
  const response = await api.post("/api/ai/review-reply", {
    reviewId: reviewId,
    tone: tone
  });
  
  // 백엔드 응답 구조: BaseResponse { success: true, data: { aiGeneratedReply: "..." } }
  return response.data.data; 
};