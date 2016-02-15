export const HIDE_USER_SIGN_IN_SUCCESS_MODAL   = "HIDE_USER_SIGN_IN_SUCCESS_MODAL"
export const HIDE_USER_SIGN_IN_ERROR_MODAL     = "HIDE_USER_SIGN_IN_ERROR_MODAL"
export const HIDE_SIGN_OUT_SUCCESS_MODAL       = "HIDE_SIGN_OUT_SUCCESS_MODAL"
export const HIDE_SIGN_OUT_ERROR_MODAL         = "HIDE_SIGN_OUT_ERROR_MODAL"

export function hideUserSignSuccessModal() {
  return { type: HIDE_USER_SIGN_IN_SUCCESS_MODAL }
}

export function hideUserSignErrorModal() {
  return { type: HIDE_SIGN_OUT_ERROR_MODAL }
}

export function hideSignOutSuccessModal() {
  return { type: HIDE_SIGN_OUT_SUCCESS_MODAL }
}

export function hideSignOutErrorModal() {
  return { type: HIDE_SIGN_OUT_ERROR_MODAL }
}
