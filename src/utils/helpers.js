import en from "./i18n";

export function validateEmail(email) {
  if (!email) {
    return en.ERRORS.EMPTY_EMAIL;
  }
  //Check email regex
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return en.ERRORS.INVALID_EMAIL;
  }
}

export function validatePassword(password) {
  if (!password) {
    return en.ERRORS.EMPTY_PASSWORD;
  }
}

export function validateEmailPassword(email, password) {
  const msg = validateEmail(email);

  if (msg) {
    return msg;
  }

  return validatePassword(password);
}
