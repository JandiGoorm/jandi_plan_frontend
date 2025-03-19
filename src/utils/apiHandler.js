/**
 * API 호출을 처리하고 성공/실패 시 토스트 메시지를 표시하는 유틸리티 함수입니다.
 *
 * @param {Function} fetchFunction - 실행할 API 호출 함수
 * @param {string} successMessage - API 호출 성공 시 표시할 토스트 메시지
 * @param {string} errorMessage - API 호출 실패 시 표시할 토스트 메시지
 * @param {Function} createToast - 토스트 메시지를 생성하는 함수
 * @param {Function} [onSuccess] - API 호출 성공 시 실행할 콜백 함수 (선택적)
 * @param {Function} [onError] - API 호출 실패 시 실행할 콜백 함수 (선택적)
 * @returns {Promise} - API 호출 결과를 반환하는 Promise
 */

export const handleApiCall = async (
  fetchFunction,
  successMessage,
  errorMessage,
  createToast,
  onSuccess,
  onError
) => {
  try {
    const response = await fetchFunction();

    if (successMessage) {
      createToast({ text: successMessage, type: "success" });
    }

    if (onSuccess) {
      await onSuccess(response);
    }

    return response;
  } catch (error) {
    if (errorMessage) {
      createToast({ text: errorMessage, type: "error" });
    }

    if (onError) {
      await onError(error);
    }

    throw error;
  }
};
