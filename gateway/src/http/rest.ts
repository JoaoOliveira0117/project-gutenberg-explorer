import { Request, Response } from "express";

export default class Rest {
  protected res;
  public body;
  public query;
  public params;
  public method;
  public headers;
  public user;
  public token;

  constructor(req: Request & { user?: any }, res: Response) {
    this.res = res;
    this.body = req.body;
    this.query = req.query;
    this.params = req.params;
    this.method = req.method;
    this.headers = req.headers;
    this.user = req.user;
    this.token = req.headers.authorization || "";
  }

  getMappedQuery(map: Record<string, (value: string) => Record<string, unknown>>) {
    if (!this.query || typeof this.query !== 'object') {
      return {};
    }

    const filters: Record<string, unknown> = {};
    const iterableQuery = this.query as Record<string, any>;

    for (const key in iterableQuery) {
      if (key === 'page' || key === 'pageSize') {
        continue;
      }

      if (map[key]) {
        const newFilter = map[key](iterableQuery[key]);

        for (const filterKey in newFilter) {
            if (filterKey in filters) {
                filters[filterKey] = {
                    ...(filters[filterKey] as Record<string, unknown>),
                    ...(newFilter[filterKey] as Record<string, unknown>)
                };
            } else {
                filters[filterKey] = newFilter[filterKey];
            }
        }
    }
    }

    return filters;
  }

  getPagination(): { skip?: number, take?: number } {
    if (this.query && typeof this.query === "object" && 'page' in this.query && 'pageSize' in this.query) {
      const page = Number(this.query.page);
      const pageSize = Number(this.query.pageSize);
      
      const skip = (Math.max(page - 1, 0)) * pageSize;

      return { skip, take: pageSize };
    }

    return {};
  }
}