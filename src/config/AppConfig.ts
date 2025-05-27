class AppConfig {
  private _port?: number;
  private _secretKey?: string;
  private _refreshKey?: string;
  private _db?: string;
  private _schemas: any = {};

  public addSchemaPath(field: string, path: string): this {
    this._schemas[field] = path;
    return this;
  }

  public getSchema(): any {
    return this._schemas;
  }
}
