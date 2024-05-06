export function baseUrl(path: string) {
  // return `https://api.realworld.io/api${path}`;
  return `http://localhost:3000/api${path}`;
}

export type { UnexpectedErrorDto } from './realworld.types';
