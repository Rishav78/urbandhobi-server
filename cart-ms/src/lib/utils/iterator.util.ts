import { Injectable } from '@nestjs/common';

@Injectable()
export class Iterator {
  public forEach = async <T = any>(
    data: T[],
    callback: (item: T, index: number, data: T[]) => void | Promise<void> | any,
  ) => {
    const promises: Array<Promise<any> | any> = [];
    for (let i = 0; i < data.length; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            promises.push(callback(data[i], i, data));
            resolve(null);
          } catch (err) {
            reject(err);
          }
        }, 0);
      });
    }
    await Promise.all(promises);
  };

  public map = async <T, Result = any>(
    data: T[],
    callback: (item: T, index: number, data: T[]) => Result | Promise<Result>,
  ): Promise<Result[]> => {
    const promises: Array<Promise<Result> | Result> = [];
    for (let i = 0; i < data.length; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            promises.push(callback(data[i], i, data));
            resolve(null);
          } catch (err) {
            reject(err);
          }
        }, 0);
      });
    }
    return await Promise.all(promises);
  };
}
