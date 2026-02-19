type Logger = {
  error: (message: string, details?: unknown) => void
  warn: (message: string, details?: unknown) => void
  info: (message: string, details?: unknown) => void
  debug: (message: string, details?: unknown) => void
}

const formatDetails = (details: unknown) => {
  if (details === undefined) {
    return []
  }

  return [details]
}

export const logger: Logger = {
  error: (message, details) => {
    console.error(message, ...formatDetails(details))
  },
  warn: (message, details) => {
    console.warn(message, ...formatDetails(details))
  },
  info: (message, details) => {
    console.info(message, ...formatDetails(details))
  },
  debug: (message, details) => {
    console.debug(message, ...formatDetails(details))
  },
}
