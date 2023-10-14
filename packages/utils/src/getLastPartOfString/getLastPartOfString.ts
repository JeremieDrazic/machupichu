export type GetLastPartOfStringSignature = (inputString: string, delimiter?: string) => string

export const getLastPartOfString: GetLastPartOfStringSignature = (inputString, delimiter = '') => {
  const stringArray = inputString.split(delimiter)
  const stringArrayLength = stringArray.length

  if (stringArrayLength > 0) return stringArray[stringArrayLength - 1]

  return inputString
}
