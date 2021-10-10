import {MatomoTracker} from '@ngx-matomo/tracker';

export class ExtMatomoTracker {
  constructor(readonly matomo: MatomoTracker) {
  }

  trackEvent(category: string, action: string, name?: string, value?: number) {
    this.matomo.trackEvent(category, category + '_' + action, name, value);
  }
}
