import { app } from 'electron';
import * as Sentry from '@sentry/electron/main';
import path from 'path';
import fs from 'fs';
import { getAppDataDir } from './utils/paths';

function getQuickConfig() {
  try {
    const configPath = path.join(getAppDataDir(), 'gui_config.json');
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(content);
      // Default to false (privacy by default)
      return config.error_reporting_enabled;
    }
  } catch (e) {
    console.error('Failed to read config for Sentry init:', e);
  }
  return false;
}

if (getQuickConfig()) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: `antigravity-manager@${app.getVersion()}`,
    beforeSend(event) {
      if (event.exception?.values?.[0]?.value) {
        event.exception.values[0].value = event.exception.values[0].value.replace(
          /Users\\\\[^\\\\]+/g,
          'Users\\\\***',
        );
      }
      return event;
    },
  });
}
