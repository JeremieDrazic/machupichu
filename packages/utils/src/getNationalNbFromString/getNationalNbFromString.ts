export const nationalNbRegex = /\d{4}/
export type GetNationalNbFromString = (inputString: string) => string | null

export const getNationalNbFromString: GetNationalNbFromString = inputString => {
  const match = nationalNbRegex.exec(inputString)

  if (match && match[0].length === 4) return match[0]

  return null
}
