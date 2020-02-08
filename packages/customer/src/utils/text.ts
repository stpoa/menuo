export const truncate = (n: number) => (s: string) =>
  s.length > n ? s.slice(0, n) + '…' : s
