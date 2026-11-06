/**
 * src/api/index.js
 * Contract matching docs/STUDENT_PORTAL_PROMPTS.md Section 2
 */

import {
  mockLogin,
  mockMe,
  mockLogout,
  mockGetExams,
  mockJoinExam,
  mockGetPaper,
  mockSaveAnswer,
  mockHeartbeat,
  mockLogViolation,
  mockSubmit,
  installMockDevHelpers,
} from './mock.js';

export const USE_MOCK = true;

// Expose dev helpers in window.__mock
if (typeof window !== 'undefined') {
  installMockDevHelpers();
}

async function apiFetch(method, path, body) {
  const opts = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(path, opts);
  if (!res.ok) {
    if (res.status === 401 && !path.includes('/login')) {
      window.location.href = '/login';
    }
    const errData = await res.json().catch(() => ({}));
    const error = new Error(errData.error || errData.message || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export function login(credentials) {
  if (USE_MOCK) return mockLogin(credentials);
  return apiFetch('POST', '/api/student/login', credentials);
}

export function me() {
  if (USE_MOCK) return mockMe();
  return apiFetch('GET', '/api/student/me');
}

export function logout() {
  if (USE_MOCK) return mockLogout();
  return apiFetch('POST', '/api/student/logout');
}

export function getExams() {
  if (USE_MOCK) return mockGetExams();
  return apiFetch('GET', '/api/student/exams');
}

export function joinExam(examId) {
  if (USE_MOCK) return mockJoinExam(examId);
  return apiFetch('POST', `/api/student/exams/${examId}/join`);
}

export function getPaper(attemptId) {
  if (USE_MOCK) return mockGetPaper(attemptId);
  return apiFetch('GET', `/api/student/attempts/${attemptId}/paper`);
}

export function saveAnswer(attemptId, questionId, answer, state = 'answered') {
  if (USE_MOCK) return mockSaveAnswer(attemptId, questionId, answer, state);
  return apiFetch('PUT', `/api/student/attempts/${attemptId}/answer`, { questionId, answer, state });
}

export function heartbeat(attemptId) {
  if (USE_MOCK) return mockHeartbeat(attemptId);
  return apiFetch('POST', `/api/student/attempts/${attemptId}/heartbeat`);
}

export function logViolation(attemptId, type) {
  if (USE_MOCK) return mockLogViolation(attemptId, type);
  return apiFetch('POST', `/api/student/attempts/${attemptId}/violation`, { type });
}

export function submit(attemptId) {
  if (USE_MOCK) return mockSubmit(attemptId);
  return apiFetch('POST', `/api/student/attempts/${attemptId}/submit`);
}
