export class HttpException {
  constructor(public message: string, public httpCode: number) {}
}
