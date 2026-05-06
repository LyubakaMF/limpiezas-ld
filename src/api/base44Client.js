import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, functionsVersion, appBaseUrl } = appParams;

// Only pass token if one actually exists in storage/URL
// This prevents SDK from auto-firing /User/me and /track/batch for anonymous visitors
const storedToken = (
  localStorage.getItem('base44_access_token') ||
  localStorage.getItem('token') ||
  new URLSearchParams(window.location.search).get('access_token')
) || undefined;

export const base44 = createClient({
  appId,
  token: storedToken,
  functionsVersion,
  appBaseUrl,
});

export const hasToken = !!storedToken;