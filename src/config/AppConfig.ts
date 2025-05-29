class AppConfig {
  private _port?: number;
  private _secretKey?: string;
  private _refreshKey?: string;
  private _db?: string;
  private _schemas: any = {};

  public addSchemaPath(type: string, schema: object): this {
    this._schemas[type] = schema;
    return this;
  }

  public getSchema(type: string | undefined): any {
    if (!type) return this._schemas;
    return this._schemas[type];
  }
}

export default AppConfig;
