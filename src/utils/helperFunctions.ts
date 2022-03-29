export const sortFunction = (a: any, b: any) => {
  const dateA = Number(new Date(a.date))
  const dateB = Number(new Date(b.date))
  if (dateA !== dateB) return dateA - dateB;
  const timeA = +a.start_time.replaceAll(":", "")
  const timeB = +b.start_time.replaceAll(":", "")
  return timeA - timeB;
}

export const parseString = (stringToParse: string) => {
  try {
    return JSON.parse(stringToParse)
  } catch (err) {
    return false;
  }
}