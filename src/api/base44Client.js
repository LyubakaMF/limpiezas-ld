import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Check if there's an auth token BEFORE creating the client
// Anonymous visitors (no token) should not trigger /User/me or /track/batch
const hasToken = !!(
  token ||
  localStorage.getItem('base44_access_token') ||
  localStorage.getItem('token')
);

export const base44 = createClient({
  appId,
  // Only pass token if one exists — prevents SDK from auto-firing auth requests
  token: hasToken ? token : undefined,
  functionsVersion,
  appBaseUrl,
  // Disable analytics tracking for anonymous visitors to prevent /track/batch
  ...(hasToken ? {} : { disableAnalytics: true }),
});

export { hasToken };