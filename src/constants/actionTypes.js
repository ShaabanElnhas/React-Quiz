/**
 * Quiz action types for the useReducer dispatch.
 * Centralized here to avoid magic strings and enable autocomplete.
 */
export const ACTION_TYPES = {
  DATA_RECEIVED: "dataReceived",
  DATA_FAILED: "dataFailed",
  START: "start",
  NEW_ANSWER: "newAnswer",
  NEXT_QUESTION: "nextQuestion",
  FINISH: "finish",
  RESTART: "restart",
  TICK: "tick",
  SET_DIFFICULTY: "setDifficulty",
  TOGGLE_REVIEW: "toggleReview",
  SET_REVIEW_INDEX: "setReviewIndex",
};
