import IBaseAPIRes from "./IBaseAPIRes";

interface ICustomerSignupRes extends IBaseAPIRes {
  data: {
    token: string;
    tokenExpiryDate: string;
  };
}

export default ICustomerSignupRes;
