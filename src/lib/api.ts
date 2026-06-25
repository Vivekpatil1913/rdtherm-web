/**
 * Public API client for the R&D Therm website.
 *
 * - Server-side fetch (App Router) against the backend public endpoints.
 * - Always returns a safe fallback on any failure (network/timeout/bad
 *   response) so a page can never crash because the API is unreachable.
 * - `cache: "no-store"` keeps the site in sync with the Admin panel: created,
 *   updated, deactivated and deleted records are reflected on the next request.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://rdtherm-api.sumagodemo.com";
const TIMEOUT_MS = 8000;

type GetOptions = {
  /** ISR window in seconds. Omit for always-fresh (no-store). */
  revalidate?: number;
};

/** GET a public resource, returning `fallback` on any error. */
export async function apiGet<T>(path: string, fallback: T, opts: GetOptions = {}): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api/public${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      ...(opts.revalidate != null
        ? { next: { revalidate: opts.revalidate } }
        : { cache: "no-store" }),
    });
    if (!res.ok) return fallback;
    const json = (await res.json()) as { success?: boolean; data?: unknown };
    if (!json || json.success === false || json.data == null) return fallback;
    return json.data as T;
  } catch {
    return fallback;
  }
}

export interface PostResult<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

/** POST to a public endpoint (e.g. the contact form). */
export async function apiPost<T = unknown>(path: string, body: unknown): Promise<PostResult<T>> {
  try {
    const res = await fetch(`${API_URL}/api/public${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const json = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      data?: T;
      error?: { message?: string; details?: Record<string, string> };
    };
    if (!res.ok || json.success === false) {
      return {
        ok: false,
        error: json.error?.message || "Something went wrong. Please try again.",
        fieldErrors: json.error?.details,
      };
    }
    return { ok: true, data: json.data };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}

/** POST multipart/form-data to a public endpoint (e.g. a file upload). */
export async function apiPostForm<T = unknown>(path: string, form: FormData): Promise<PostResult<T>> {
  try {
    const res = await fetch(`${API_URL}/api/public${path}`, {
      method: "POST",
      headers: { Accept: "application/json" }, // let the browser set the multipart boundary
      body: form,
      signal: AbortSignal.timeout(TIMEOUT_MS * 3), // files take longer
    });
    const json = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      data?: T;
      error?: { message?: string; details?: Record<string, string> };
    };
    if (!res.ok || json.success === false) {
      return {
        ok: false,
        error: json.error?.message || "Something went wrong. Please try again.",
        fieldErrors: json.error?.details,
      };
    }
    return { ok: true, data: json.data };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}

export { API_URL };
