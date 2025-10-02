import { Request } from 'express';

export const cleanIP = (ip: any) => {
  if (!ip) ip = '';
  if (ip.substr(0,7) == '::ffff:') ip = ip.substr(7);
  return ip;
};

export const getIP = (req: Request) => {
  let ip: any = req.ip;

  // и вот здесь мы теоретически могли сделать так:
  //
  //const forwarded = req.headers['x-forwarded-for'];
  //if (forwarded) {
  //  ip = forwarded.split(',')[0].trim();
  //}
  //
  // но мне такое не нравится, потому что заголовок можно и подделать,
  // поэтому я не буду сам парсить x-forwarded-for, а вместо этого сделал так:
  //
  // app.set('trust proxy', '127.0.0.1');
  //
  // это позволяет доверять именно reverse proxy запущенному на нашем же IP, 
  // а не всяким подделкам.
  // я это проверил и вроде работает,
  // подделку кушать отказывается, а локальный nginx норм
  //
  // конфиг nginx такой:
  //  location / {
  //      proxy_pass http://127.0.0.1:8080;
  //      proxy_set_header Host $host;
  //      proxy_set_header X-Real-IP $remote_addr;
  //      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  //      proxy_set_header X-Forwarded-Proto $scheme;
  //  }
  //
  // а в своем продакшновом проекте, где был nginx, я просто использовал нестандартный заголовок x-my-real-ip, это безопаснее

  ip = cleanIP(ip);
  return ip;
};

export function limitOffset(limit = 20, offset = 0, maxLimit = 1000, maxOffset = 0) {
  if (maxLimit) limit = Math.min(limit, maxLimit);
  if (maxOffset) offset = Math.min(offset, maxOffset);
  return { limit, offset };
};

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
};
