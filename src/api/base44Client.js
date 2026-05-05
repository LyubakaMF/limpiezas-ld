import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, functionsVersion, appBaseUrl } = appParams;

// IMPORTANT: Do NOT pass token at init time.
// The Base44 SDK fires /User/me and /track/batch automatically when a token is present.
// These block the critical render path and hurt LCP/TBT on mobile.
// Token is read lazily by base44.auth.me() inside AuthContext after page load.
export const base44 = createClient({
  appId,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});