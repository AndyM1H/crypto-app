export type LiteralType<
  T extends string | number | bigint | boolean | null | undefined
> = `${T}`;
