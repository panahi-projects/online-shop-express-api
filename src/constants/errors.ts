type ErrorCodeType = {
    message: string;
    code: number;
};

class ErrorCodeClass {
    [errorID: number]: ErrorCodeType;
}

export let errorCodes = new ErrorCodeClass();

errorCodes = {
    300: { message: "INVALID_INPUT(ID_OR_PARAMETERS)", code: 400 },
    301: { message: "NO_FILE_UPLOADED", code: 400 },
    302: { message: "INAPPROPRIATE_FORMAT", code: 400 },
    303: { message: "MONGO_SERVER_ERROR:INSERT_UNIQUE_PARAMETERS", code: 400 },
    304: { message: "INVALID_CATEGORY_ID", code: 400 },
    305: { message: "VALIDATION_ERROR:INSERT_VALID_PARAMETERS", code: 400 },
    306: { message: "INVALID_INPUT", code: 400 },
    307: { message: "FILE_IS_TOO_LARGE", code: 400 },
    308: { message: "TOKEN_EXPIRED", code: 400 },
    309: { message: "NO_SUCH_FILE_OR_DIRECTORY_EXIST", code: 400 },
    310: { message: "INCORRECT_PERMISSION_LIST", code: 400 },
    311: { message: "INCORRECT_ROLE_OR_USERID", code: 400 },
    312: { message: "THIS_ROLE_CANT_BE_UPDATED", code: 400 },
    313: { message: "THIS_ROLE_CANT_BE_DELETED", code: 400 },
    314: { message: "INCORRECT_ROLE", code: 400 },
    315: { message: "INVALID_TOKEN", code: 400 },
    316: { message: "NO_PERMISSION", code: 400 },
    317: { message: "EMAIL_OR_PASSWORD_IS_WRONG", code: 400 },
    318: { message: "EMAIL_IS_NOT_VERIFIED", code: 400 },
    319: { message: "EMAIL_IS_VERIFIED", code: 400 },
    320: { message: "INCORRECT_VERIFICATION_CODE", code: 400 },
    321: { message: "WAIT_TO_USE_THIS_SERVICE_AGAIN", code: 400 },
    322: { message: "CURRENT_PASSWORD_IS_INCORRECT", code: 400 },
    323: { message: "NEW_PASSWORD_IS_INCORRECT", code: 400 },
    324: { message: "SMTP_SERVER_ERROR", code: 400 },
    325: { message: "THIS_ID_IS_DISABLE", code: 400 },
    326: { message: "THIS_ID_IS_ENABLE", code: 400 },
    327: { message: "TOKEN_EXPIRED", code: 400 },
    328: { message: "UNAUTORIZED_REQUEST", code: 400 },
    329: { message: "PRODUCT_DOES_NOT_EXIST_IN_CART", code: 400 },
    330: { message: "INVALID_PAYMENT_AOUTORITY", code: 400 },
    331: { message: "EMPTY_CART", code: 400 },
    332: { message: "ERROR_IN_PAYMENT_OPERATION", code: 400 },
    333: { message: "PRODUCT_UNAVAILABLE", code: 400 },
    334: { message: "UNPAID_ORDER", code: 400 },
    335: { message: "NOT_ENOUGH_CREDIT", code: 400 },
};
