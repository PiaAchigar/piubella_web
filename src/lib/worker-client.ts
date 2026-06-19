const WORKER_BASE_URL =
  process.env.WORKER_URL ?? process.env.NEXT_PUBLIC_WORKER_URL ?? 'http://localhost:8787'

type NextFetchOptions = RequestInit & { next?: { revalidate?: number } }

export async function workerGet(path: string, fetchOptions?: NextFetchOptions): Promise<unknown> {
  const url = `${WORKER_BASE_URL}${path}`
  const res = await fetch(url, fetchOptions)
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`Worker ${res.status}: ${text}`)
  }
  return res.json()
}
