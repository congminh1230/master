export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_PHONE_REGEX_RULE = /((^0|^84|^\+84|^\(\+84\))+([0-9]{2}))+([0-9]{7}|[0-9]{1}\.[0-9]{3}\.[0-9]{3}|[0-9]{1}-[0-9]{3}-[0-9]{3}|[0-9]{1}\s[0-9]{3}\s[0-9]{3}$)/
export const STATUS = new Array()
STATUS['WAIT'] = 0
STATUS['CONFIRM_STEP_1'] = 1
STATUS['CONFIRM_STEP_2'] = 2

export const TYPE = new Array()
TYPE['RECEIPT'] = 1
TYPE['PAYMENT'] = 2

export const PAYMENT_TYPE = new Array()
PAYMENT_TYPE['CAST'] = 0
PAYMENT_TYPE['TRANSFER'] = 1

export const IS_CANCEL = new Array()
IS_CANCEL['CANCEL'] = 0
IS_CANCEL['UNCANCEL'] = 1

export const IS_ADMIN = new Array()
IS_ADMIN['ADMIN'] = 1

export const IS_MANAGER = new Array()
IS_MANAGER['MANAGER'] = 1
IS_MANAGER['EMPLOYEE'] = 0

export const TYPE_REQUEST = new Array()
TYPE_REQUEST['OT'] = 0
TYPE_REQUEST['REST'] = 1
TYPE_REQUEST['EARLY'] = 2
TYPE_REQUEST['LATE'] = 3

export const STATUS_REQUEST = new Array()
STATUS_REQUEST['WAIT'] = 0
STATUS_REQUEST['CONFIRM'] = 1
STATUS_REQUEST['CANCEL'] = 2

export const SHIFT = new Array()
SHIFT['MORNING'] = 0
SHIFT['AFTERNOON'] = 1

export const SHIFT_TEXT = new Array()
SHIFT_TEXT['MORNING'] = "AM"
SHIFT_TEXT['AFTERNOON'] = "PM"

export const IS_FULL = new Array()
IS_FULL['FULL'] = 1
IS_FULL['PART'] = 0

export const TYPE_SHIFT = new Array()
TYPE_SHIFT['FULL_TIME'] = 0
TYPE_SHIFT['PART_TIME'] = 1
