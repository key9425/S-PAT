import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL as string; // 실제 API 엔드포인트

// 특허 데이터 인터페이스 정의
export interface Patent {
  applicationNumber: string;
  title: string;
  abstract: string;
  majorCode: string;
  middleCode: string;
  smallCode: string;
  majorTitle: string;
  middleTitle: string;
  smallTitle: string;
}

// API 응답 인터페이스 정의
export interface PatentResponse {
  patents: Patent[];
}

/**
 * 특허 분류 데이터를 가져오는 함수
 */
export const fetchPatentClassifications = async (): Promise<PatentResponse> => {
  try {
    // 로컬 스토리지에서 sessionId 가져오기
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      throw new Error("세션 ID가 없습니다.");
    }

    const response = await axios.get<PatentResponse>(
      `${BASE_URL}/user/${sessionId}/classification`
    );

    return response.data;
  } catch (error) {
    console.error("특허 분류 데이터 가져오기 실패:", error);
    throw error;
  }
};

/**
 * 특허 분류 데이터를 엑셀 파일로 다운로드하는 함수
 */
export const fetchPatentClassificationsExcel = async (): Promise<Blob> => {
  try {
    // 로컬 스토리지에서 sessionId 가져오기
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      throw new Error("세션 ID가 없습니다.");
    }

    // 응답 타입을 blob으로 설정하여 파일 데이터 가져오기
    const response = await axios.get(
      `${BASE_URL}/user/${sessionId}/classification/excel`,
      {
        responseType: "blob",
      }
    );

    // Blob 형태의 데이터 반환
    return response.data;
  } catch (error) {
    console.error("특허 분류 엑셀 데이터 가져오기 실패:", error);
    throw error;
  }
};
