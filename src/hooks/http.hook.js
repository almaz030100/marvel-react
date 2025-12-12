import {useCallback, useState} from "react";
import {ofetch} from "ofetch";

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, opts = {}) => {
    try {
      setLoading(true)
      setError(null)
      const res = await ofetch(url, {
        baseURL: 'https://marvel-server-zeta.vercel.app',
        ...opts,
        async onRequest({options}) {
          options.query = options.query || options.params || {}
          options.query.apikey = 'd4eecb0c66dedbfae4eab45d312fc1df'
        }
      })
      if (res.error) {
        throw new Error(`Could not fetch ${url}}`)
      }
      return res
    } catch (e) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {loading, error, request, clearError}

}