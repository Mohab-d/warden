interface IInvalidSchemaContext {
  details: {
    message: string;
    valueName: string;
    invalidValue: any;
    path: string;
  }[];
}

export default IInvalidSchemaContext;
