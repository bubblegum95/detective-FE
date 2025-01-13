export function passwordEngCheck(password: string) {
  let reg = /(?=.*?[a-z])(?=.*?[A-Z])/;
  return reg.test(password);
}

export function passwordNumSpcCheck(password: string) {
  let reg = /(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  return reg.test(password);
}

export function passwordLengthCheck(password: string) {
  let reg = /^.{8,16}$/;
  return reg.test(password);
}

export function phoneNumberCheck(phone: any) {
  let reg = /^[0-9]*$/;
  return reg.test(phone);
}

export function comparePassword(password: string, pwConfirm: string) {
  console.log('compare pw 랜더링 중...');

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
