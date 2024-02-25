export interface PromiseWrapper<T> {
  before?: () => void;
  result?: (t: T) => void;
  finally?: () => void;
  error?: (e: any) => void;
}

const promiseUtil = {
  promisify: function <T>(work: () => T) {
    return new Promise<T>((resolve, reject) => {
      try {
        resolve(work());
      } catch (e) {
        reject(e);
      }
    })
  },
  log: function <T>(promise: Promise<T>, before: string = "", after: string = ""): Promise<T> {
    return this.wrap(promise, {
      before: () => console.log(new Date(), before),
      result: t => console.log(new Date(), after, ":", t),
      error: e => console.log(new Date(), after, ":", e)
    });
  },
  delay: function <T>(data: T, delay: number) {
    return new Promise<T>(resolve => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  },
  wrap: function <T>(promise: Promise<T>, wrapper: PromiseWrapper<T>) {
    return new Promise<T>((resolve, reject) => {
      if (wrapper.before) wrapper.before();
      promise
      .then(res => {
        if (wrapper.result) wrapper.result(res);
        if (wrapper.finally) wrapper.finally();
        resolve(res);
      })
      .catch(e => {
        if (wrapper.error) wrapper.error(e);
        if (wrapper.finally) wrapper.finally();
        reject(e);
      });
    });

  }
}

export default promiseUtil;