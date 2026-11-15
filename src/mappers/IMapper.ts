export interface IMapper<T, U> {
  map(data: T): U;
  reverseMap(data: U): Record<string, unknown>;
}
