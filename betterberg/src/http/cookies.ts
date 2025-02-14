import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export default class Cookies {
  private static instance: Cookies;
  private cookieJar;

  private constructor(cookieJar: ReadonlyRequestCookies) {
    this.cookieJar = cookieJar;
  }

  static async initialize() {
    const cookieJar = await cookies()
    return new Cookies(cookieJar);
  }

  public getValue(name: string) {
    return this.cookieJar.get(name)?.value;
  }

  public setValue(name: string, value: string) {
    return this.cookieJar.set(name, value)
  }

  public deleteValue(name: string) {
    return this.cookieJar.delete(name)
  }
}