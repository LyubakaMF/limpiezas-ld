import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, functionsVersion, appBaseUrl } = appParams;

// Temporarily hide the token from localStorage so SDK doesn't auto-fire
// /User/me and /track/batch during createClient() — these block LCP on mobile.
// We restore the token and inject it lazily in AuthContext after page paint.
const TOKEN_KEY = 'base44_access_token';
const savedToken = typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
if (savedToken) {
  localStorage.removeItem(TOKEN_KEY);
}

export const base44 = createClient({
  appId,
  functionsVersion,
  appBaseUrl,
  requiresAuth: false,
});

// Expose the saved token so AuthContext can restore it lazily
export const savedAuthToken = savedToken || appParams.token || null;