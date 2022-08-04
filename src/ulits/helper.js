import {VALIDATE_EMAIL_REGEX, VALIDATE_PHONE_REGEX_RULE} from "./constants";

export const isValidEmail = (email) => {
  let result =  false
  if (email && typeof email === 'string') {
    const regex = RegExp(VALIDATE_EMAIL_REGEX);
    result = regex.test(email.trim())
  }
  return result
}

export const isValidPhone = (phone) => {
  let result = false

  if (phone && typeof phone === 'string') {
    let trimPhone = phone.trim()

    if (trimPhone) {
      const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE);

      let ruleMatchs = trimPhone.match(regexRule);

      if (ruleMatchs && ruleMatchs.length > 0) {
        result = (ruleMatchs[0] === trimPhone)
      }
    }
  }

  return result
}

export const formatMoney = (money) => {
  return money.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}



export const formatMoneyShow = (price) => {
  return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

export const formatStringtoNumber = (string) => {
  let result = string

  if (typeof string === 'string') {
    result = Number(string.replace(new RegExp(",","gm"),''))
  }
  return result
}
