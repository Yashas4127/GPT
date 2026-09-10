export function getErrorMessage(error) {
  if (!error) return 'Something went wrong. Please try again.'

  if (!error.response) {
    if (error.code === 'ERR_NETWORK') {
      return 'Unable to connect to the server. Check your connection and try again.'
    }
    return error.message || 'Network error. Please try again.'
  }

  const { status, data } = error.response

  const message =
    data?.message ||
    data?.messages ||
    data?.mrssage ||
    null

  if (message) return message

  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.'
    case 401:
      return 'Please sign in to continue.'
    case 403:
      return 'You do not have permission to perform this action.'
    case 404:
      return 'The requested resource was not found.'
    case 409:
      return 'This resource already exists.'
    case 429:
      return 'Token limit reached. Please try again later.'
    case 500:
      return 'Server error. Please try again later.'
    default:
      return `Request failed (${status}). Please try again.`
  }
}
