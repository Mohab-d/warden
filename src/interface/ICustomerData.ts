interface ICustomerData {
  id?: number;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  username: string;
  email: string;
  phonenumber: string;
  password?: string;
}

export default ICustomerData;
