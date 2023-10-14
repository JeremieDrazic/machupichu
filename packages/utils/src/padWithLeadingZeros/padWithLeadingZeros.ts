export type PadWithLeadingZerosSignature = (num: number, totalLength?: number) => string

export const padWithLeadingZeros: PadWithLeadingZerosSignature = (num, totalLength = 4) =>
  String(num).padStart(totalLength, '0')
