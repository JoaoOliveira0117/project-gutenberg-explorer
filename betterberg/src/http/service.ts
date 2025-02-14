import Cookies from "./cookies";

export default class Service {
  protected static instance: Service;
  protected cookies: Cookies;

  protected constructor(cookies: Cookies) {
    this.cookies = cookies;
  }

  protected static async initialize() {
    const cookies = await Cookies.initialize();
    return new Service(cookies);
  }

  public static async getInstance() {
    if (!Service.instance) {
      Service.instance = await Service.initialize();
    }

    return Service.instance;
  }
}