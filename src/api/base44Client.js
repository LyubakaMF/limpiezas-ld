import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Create client — pass token only if it exists so SDK doesn't fire tracking on anonymous visits
export const base44 = createClient({
  appId,
  ...(token ? { token } : {}),
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});