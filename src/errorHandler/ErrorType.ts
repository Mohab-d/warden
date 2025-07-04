enum ErrorType {
  // client side errors
  ERR_VALUE_EXIST = "err_value_exist",
  ERR_INVALID_SCHEMA = "err_invalid_schema",
  ERR_NO_Data = "err_no_data",
  ERR_NO_RECORD = "err_no_record",
  ERR_INVALID_TOKEN = "err_invalid_token",
  ERR_INVALID_KEY = "err_invalid_key",

  // internal errors
  ERR_INVALID_OPERATION = "err_invalid_operation",
  ERR_IMPLEMENTATION = "err_implementation",
  ERR_UNKNOWN_DB = "err_unknown_db",
  ERR_UNKNOWN_OPERATION = "err_unknown_operation",
  ERR_OVERFLOW = "err_overflow",
}

export default ErrorType;
