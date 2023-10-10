const originalFetch = require('isomorphic-fetch');
const fetchRetry = require('fetch-retry')(originalFetch)

export function catGirlFetch (url, init = {}) {
  init.retryOn = function(attempt, error) {
    if (attempt > 10) return false // Stop retry after 10 attempt

    if (error !== null) {
      console.log(`Oh fuck, retrying, attempt number ${attempt + 1}`);
      return true // Retry every fucking error
    }
  }

  init.retryDelay = function(attempt, error, response) {
    return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000
  }



  return fetchRetry(url, init)
}
