export function checkPasswordEng(password: string) {
  let reg = /(?=.*?[a-z])(?=.*?[A-Z])/;
  return reg.test(password);
}

export function checkPasswordNum(password: string) {
  let reg = /(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  return reg.test(password);
}

export function checkPasswordLength(password: string) {
  let reg = /^.{8,16}$/;
  return reg.test(password);
}

export function verifyPassword(password: string) {
  const useEng = checkPasswordEng(password);
  const useNum = checkPasswordNum(password);
  const adjustLen = checkPasswordLength(password);

  const errors: string[] = [];

  if (!useEng) errors.push('영어 소문자 / 대문자');
  if (!useNum) errors.push('숫자 / 특수문자');
  if (!adjustLen) errors.push('8 ~ 16자');
  return { useEng, useNum, adjustLen, errors };
}

export function comparePassword(password: string, pwConfirm: string) {
  let isCompared: boolean;
  let comparedMsg: string;
  if (password === pwConfirm) {
    isCompared = true;
    comparedMsg = '';
  } else {
    isCompared = false;
    comparedMsg = '비밀번호가 일치하지 않습니다.';
  }
  return { isCompared, comparedMsg };
}

export function checkPhoneNumber(phone: any) {
  let reg = /^[0-9]*$/;
  return reg.test(phone);
}

export function checkSpecialChar(input: string) {
  const reg = /[!@#$%^&*(),.?":{}|<>]/; // 특수문자 확인 정규식
  return reg.test(input);
}

export function checkWhitespace(input: string) {
  const reg = /\s/; // 공백 확인 정규식
  return reg.test(input);
}

export function veryfiyNickname(nickname: string) {
  const useSpecial = checkSpecialChar(nickname);
  const isWhite = checkWhitespace(nickname);

  let errors = [];
  if (useSpecial || isWhite) {
    errors.push('공백 또는 특수문자는 사용할 수 없습니다.');
  }
  return { useSpecial, isWhite, errors };
}
