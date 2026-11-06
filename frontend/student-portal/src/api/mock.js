// ─── Mock Data Seed ──────────────────────────────────────────────────────────
// 1 student (roll 2025KUCP1032, password "test123")
// 3 exams: one upcoming, one live, one ended/submitted
// 1 paper with 12 JEE-like questions

const MOCK_STUDENT = {
  id: 'stu-001',
  name: 'Arjun Sharma',
  rollNo: '2025KUCP1032',
};

const INITIAL_EXAMS = [
  {
    id: 'exam-01',
    title: 'CS301: Design & Analysis of Algorithms',
    durationMinutes: 90,
    totalMarks: 48,
    negativeMarks: 1,
    examStatus: 'upcoming',
    attemptStatus: 'none',
    attemptId: null,
  },
  {
    id: 'exam-02',
    title: 'IT204: Object-Oriented Systems & C++ Lab',
    durationMinutes: 90,
    totalMarks: 48,
    negativeMarks: 0,
    examStatus: 'live',
    attemptStatus: 'none',
    attemptId: null,
  },
  {
    id: 'exam-03',
    title: 'CS102: Python Programming Fundamentals',
    durationMinutes: 60,
    totalMarks: 48,
    negativeMarks: 0,
    examStatus: 'ended',
    attemptStatus: 'submitted',
    attemptId: 'attempt-exam-03',
  },
];

const MOCK_PAPER = {
  attempt: {
    id: 'attempt-exam-02',
    status: 'in_progress',
    endsAt: new Date(Date.now() + 80 * 60 * 1000).toISOString(),
    serverNow: new Date().toISOString(),
  },
  exam: {
    title: 'IT204: Object-Oriented Systems & C++ Lab',
    totalMarks: 48,
    negativeMarks: 0,
  },
  questions: [
    {
      id: 'q01', type: 'mcq_single', marks: 4,
      text: 'A particle moves in a straight line such that its displacement x (in metres) at time t (in seconds) is given by x = t³ − 6t² + 9t + 4. The velocity of the particle is zero at t =',
      options: [
        { key: 'A', text: 't = 1 s and t = 3 s' },
        { key: 'B', text: 't = 2 s and t = 4 s' },
        { key: 'C', text: 't = 0 and t = 3 s' },
        { key: 'D', text: 't = 1 s only' },
      ],
    },
    {
      id: 'q02', type: 'mcq_single', marks: 4,
      text: 'If the sum of the series 1 + 2 + 3 + … + n equals 5050, then the value of n is',
      options: [
        { key: 'A', text: '99' },
        { key: 'B', text: '100' },
        { key: 'C', text: '101' },
        { key: 'D', text: '50' },
      ],
    },
    {
      id: 'q03', type: 'mcq_multi', marks: 4,
      text: 'Which of the following statements about simple harmonic motion (SHM) are correct? (Select ALL that apply)',
      options: [
        { key: 'A', text: 'Acceleration is always directed towards the mean position' },
        { key: 'B', text: 'Velocity is maximum at the extreme position' },
        { key: 'C', text: 'Kinetic energy is maximum at the mean position' },
        { key: 'D', text: 'Time period depends on amplitude' },
      ],
    },
    {
      id: 'q04', type: 'numerical', marks: 4,
      text: 'Two bodies of masses 4 kg and 6 kg are connected by a light inextensible string over a frictionless pulley. The acceleration of the system (in m/s²) is: (Take g = 10 m/s²)',
      options: [],
    },
    {
      id: 'q05', type: 'mcq_single', marks: 4,
      text: 'The number of distinct real roots of the equation x⁴ − 5x² + 4 = 0 is',
      options: [
        { key: 'A', text: '0' },
        { key: 'B', text: '2' },
        { key: 'C', text: '4' },
        { key: 'D', text: '1' },
      ],
    },
    {
      id: 'q06', type: 'mcq_single', marks: 4,
      text: 'A projectile is fired at 45° to the horizontal. If the range is R, then the maximum height attained is',
      options: [
        { key: 'A', text: 'R/4' },
        { key: 'B', text: 'R/2' },
        { key: 'C', text: 'R' },
        { key: 'D', text: '2R' },
      ],
    },
    {
      id: 'q07', type: 'mcq_multi', marks: 4,
      text: 'Which of the following are properties of an ideal gas? (Select ALL that apply)',
      options: [
        { key: 'A', text: 'No intermolecular forces of attraction' },
        { key: 'B', text: 'The volume of molecules is negligible' },
        { key: 'C', text: 'Collisions between molecules are perfectly elastic' },
        { key: 'D', text: 'The gas obeys the van der Waals equation' },
      ],
    },
    {
      id: 'q08', type: 'numerical', marks: 4,
      text: 'The focal length (in cm) of a convex mirror whose radius of curvature is 30 cm is',
      options: [],
    },
    {
      id: 'q09', type: 'mcq_single', marks: 4,
      text: 'If log₂(x) + log₂(x − 2) = 3, then the value of x is',
      options: [
        { key: 'A', text: '4' },
        { key: 'B', text: '2' },
        { key: 'C', text: '1' },
        { key: 'D', text: '8' },
      ],
    },
    {
      id: 'q10', type: 'mcq_single', marks: 4,
      text: 'The electric potential at a distance r from a point charge q in vacuum is proportional to',
      options: [
        { key: 'A', text: 'r²' },
        { key: 'B', text: '1/r' },
        { key: 'C', text: 'r' },
        { key: 'D', text: '1/r²' },
      ],
    },
    {
      id: 'q11', type: 'numerical', marks: 4,
      text: 'The value of ∫₀¹ (3x² + 2x + 1) dx is',
      options: [],
    },
    {
      id: 'q12', type: 'mcq_multi', marks: 4,
      text: 'Which of the following operations on a stack are O(1) time complexity? (Select ALL that apply)',
      options: [
        { key: 'A', text: 'Push' },
        { key: 'B', text: 'Pop' },
        { key: 'C', text: 'Search for minimum element' },
        { key: 'D', text: 'Peek (top element)' },
      ],
    },
  ],
  answers: {},
};

// ─── LocalStorage Keys ────────────────────────────────────────────────────────
const SESSION_KEY = 'examlan_student_session';
const ANSWERS_KEY = 'examlan_answers';
const ATTEMPTS_KEY = 'examlan_attempts';
const EXAMS_OVERRIDE_KEY = 'examlan_exams_override';

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function setStoredSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearStoredSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getStoredExamsOverride() {
  try {
    return JSON.parse(localStorage.getItem(EXAMS_OVERRIDE_KEY)) || {};
  } catch {
    return {};
  }
}

function setStoredExamsOverride(overrides) {
  localStorage.setItem(EXAMS_OVERRIDE_KEY, JSON.stringify(overrides));
}

function getStoredAttempts() {
  try {
    return JSON.parse(localStorage.getItem(ATTEMPTS_KEY)) || {};
  } catch {
    return {};
  }
}

function setStoredAttempts(attempts) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

// ─── API Implementations ──────────────────────────────────────────────────────

export async function mockLogin({ rollNo, rollNumber, password }) {
  await delay(250);
  const roll = (rollNo || rollNumber || '').trim();
  if (roll === MOCK_STUDENT.rollNo && password === 'test123') {
    setStoredSession(MOCK_STUDENT);
    return MOCK_STUDENT;
  }
  const err = new Error('Invalid roll number or password.');
  err.status = 401;
  throw err;
}

export async function mockMe() {
  await delay(100);
  const user = getStoredSession();
  if (!user) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
  return user;
}

export async function mockLogout() {
  await delay(100);
  clearStoredSession();
  return { ok: true };
}

export async function mockGetExams() {
  await delay(200);
  if (!getStoredSession()) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  const overrides = getStoredExamsOverride();
  const attempts = getStoredAttempts();

  return INITIAL_EXAMS.map((base) => {
    const override = overrides[base.id] || {};
    const examStatus = override.examStatus || base.examStatus;

    // Check if an attempt exists
    let attemptStatus = base.attemptStatus;
    let attemptId = base.attemptId;

    // Find attempt for this exam
    const foundAttempt = Object.values(attempts).find((a) => a.examId === base.id);
    if (foundAttempt) {
      attemptStatus = foundAttempt.status;
      attemptId = foundAttempt.id;
    } else if (override.attemptStatus) {
      attemptStatus = override.attemptStatus;
      attemptId = override.attemptId || attemptId;
    }

    return {
      ...base,
      ...override,
      examStatus,
      attemptStatus,
      attemptId,
    };
  });
}

export async function mockJoinExam(examId) {
  await delay(250);
  if (!getStoredSession()) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  const exams = await mockGetExams();
  const exam = exams.find((e) => e.id === examId);
  if (!exam) throw new Error('Exam not found.');
  if (exam.examStatus !== 'live') throw new Error('Exam is not live.');

  const attempts = getStoredAttempts();
  let attempt = Object.values(attempts).find((a) => a.examId === examId);

  if (!attempt) {
    const attemptId = `attempt-${examId}`;
    attempt = {
      id: attemptId,
      examId,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      extraSeconds: 0,
      durationMinutes: exam.durationMinutes,
      endsAt: new Date(Date.now() + exam.durationMinutes * 60 * 1000).toISOString(),
    };
    attempts[attemptId] = attempt;
    setStoredAttempts(attempts);
  } else if (attempt.status === 'terminated') {
    throw new Error('Your session was terminated by the teacher.');
  }

  return { attemptId: attempt.id };
}

export async function mockGetPaper(attemptId) {
  await delay(250);
  if (!getStoredSession()) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  const attempts = getStoredAttempts();
  const attempt = attempts[attemptId] || {
    id: attemptId,
    status: 'in_progress',
    endsAt: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
    serverNow: new Date().toISOString(),
  };

  const storedAnswers = JSON.parse(localStorage.getItem(ANSWERS_KEY) || '{}')[attemptId] || {};

  return {
    ...MOCK_PAPER,
    attempt: {
      id: attempt.id,
      status: attempt.status,
      endsAt: attempt.endsAt || new Date(Date.now() + 90 * 60 * 1000).toISOString(),
      serverNow: new Date().toISOString(),
    },
    answers: storedAnswers,
  };
}

export async function mockSaveAnswer(attemptId, questionId, answer, state = 'answered') {
  await delay(50);
  const allAnswers = JSON.parse(localStorage.getItem(ANSWERS_KEY) || '{}');
  if (!allAnswers[attemptId]) allAnswers[attemptId] = {};
  allAnswers[attemptId][questionId] = { answer, state };
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(allAnswers));
  return { ok: true };
}

export async function mockHeartbeat(attemptId) {
  await delay(50);
  const attempts = getStoredAttempts();
  const attempt = attempts[attemptId];
  const now = new Date().toISOString();

  if (!attempt) {
    return {
      status: 'in_progress',
      endsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      serverNow: now,
    };
  }

  return {
    status: attempt.status,
    endsAt: attempt.endsAt,
    serverNow: now,
  };
}

export async function mockLogViolation(attemptId, type) {
  await delay(50);
  console.log(`[mock proctor] Violation logged for ${attemptId}: ${type}`);
  return { ok: true };
}

export async function mockSubmit(attemptId) {
  await delay(200);
  const attempts = getStoredAttempts();
  if (attempts[attemptId]) {
    attempts[attemptId].status = 'submitted';
    setStoredAttempts(attempts);
  }
  return { status: 'submitted' };
}

// ─── Dev helpers on window.__mock ─────────────────────────────────────────────
export function installMockDevHelpers() {
  const helpers = {
    setExamLive(id) {
      const overrides = getStoredExamsOverride();
      // Allow searching by exact ID or partial/alias (e.g. 'exam-01' or 'exam-upcoming')
      const targetId = id === 'exam-upcoming' ? 'exam-01' : id === 'exam-live' ? 'exam-02' : id;
      overrides[targetId] = { ...(overrides[targetId] || {}), examStatus: 'live' };
      setStoredExamsOverride(overrides);
      console.log(`[mock] Exam "${targetId}" is now LIVE. Poll will pick it up.`);
    },

    setExamEnded(id) {
      const overrides = getStoredExamsOverride();
      const targetId = id === 'exam-upcoming' ? 'exam-01' : id === 'exam-live' ? 'exam-02' : id;
      overrides[targetId] = { ...(overrides[targetId] || {}), examStatus: 'ended' };
      setStoredExamsOverride(overrides);
      console.log(`[mock] Exam "${targetId}" set to ENDED.`);
    },

    terminate(attemptId) {
      const attempts = getStoredAttempts();
      const id = attemptId || 'attempt-exam-02';
      if (!attempts[id]) attempts[id] = { id, status: 'terminated' };
      else attempts[id].status = 'terminated';
      setStoredAttempts(attempts);
      console.log(`[mock] Attempt "${id}" is now TERMINATED.`);
    },

    addExtraTime(attemptId, seconds) {
      const attempts = getStoredAttempts();
      const id = attemptId || 'attempt-exam-02';
      if (attempts[id]) {
        const curEnd = new Date(attempts[id].endsAt || Date.now()).getTime();
        attempts[id].endsAt = new Date(curEnd + seconds * 1000).toISOString();
        attempts[id].extraSeconds = (attempts[id].extraSeconds || 0) + seconds;
        setStoredAttempts(attempts);
        console.log(`[mock] Added ${seconds}s to ${id}. New endsAt: ${attempts[id].endsAt}`);
      } else {
        console.warn(`[mock] Attempt "${id}" not found.`);
      }
    },

    state() {
      return {
        session: getStoredSession(),
        examsOverride: getStoredExamsOverride(),
        attempts: getStoredAttempts(),
        answers: JSON.parse(localStorage.getItem(ANSWERS_KEY) || '{}'),
      };
    },

    reset() {
      clearStoredSession();
      localStorage.removeItem(EXAMS_OVERRIDE_KEY);
      localStorage.removeItem(ATTEMPTS_KEY);
      localStorage.removeItem(ANSWERS_KEY);
      console.log('[mock] Cleared all stored mock state.');
    },
  };

  window.__mock = helpers;
}
