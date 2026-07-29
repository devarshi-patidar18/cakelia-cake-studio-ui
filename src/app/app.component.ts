import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
// import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cakelia-cake-studio-ui';
  private readonly visitEmailSentKey = 'cakelia-visit-email-sent';

  ngOnInit(): void {
    // void this.sendVisitEmail();
  }

  private async sendVisitEmail(): Promise<void> {
    if (!environment.EMAILJS_SERVICE_ID || !environment.EMAILJS_TEMPLATE_ID) {
      return;
    }

    const win: any = window as any;
    const hasAlreadySent = window.localStorage.getItem(this.visitEmailSentKey) === 'true';

    if (hasAlreadySent) {
      return;
    }

    const browserName = this.getBrowserName();
    const message = `Website opened by ${browserName} on ${new Date().toLocaleString()}. Platform: ${navigator.platform}. Resolution: ${window.screen.width}x${window.screen.height}.`;

    const templateParams = {
      name: browserName,
      message,
      browser_name: browserName,
      browser_language: navigator.language,
      browser_platform: navigator.platform,
      browser_user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      page_url: window.location.href,
      referrer: document.referrer || 'Direct visit',
      timestamp: new Date().toLocaleString()
    };

    try {
      await this.loadEmailJs();
      await win.emailjs.send(
        environment.EMAILJS_SERVICE_ID,
        environment.EMAILJS_TEMPLATE_ID,
        templateParams
      );
      window.localStorage.setItem(this.visitEmailSentKey, 'true');
    } catch (error) {
      console.error('Visit email send failed:', error);
    }
  }

  private async loadEmailJs(): Promise<void> {
    const win: any = window as any;

    if (win.emailjs) {
      try {
        win.emailjs.init(environment.EMAILJS_PUBLIC_KEY);
      } catch {
        // ignore init errors and continue
      }
      return;
    }

    try {
      await this.ensureEmailJsLoaded();
      if (environment.EMAILJS_PUBLIC_KEY) {
        try {
          win.emailjs.init(environment.EMAILJS_PUBLIC_KEY);
        } catch {
          // ignore init errors and continue
        }
      }
    } catch (error) {
      console.error('EmailJS script load failed', error);
    }
  }

  private ensureEmailJsLoaded(): Promise<void> {
    const win: any = window as any;

    if (win.emailjs) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-emailjs]');

      if (existing) {
        (existing as HTMLScriptElement).addEventListener('load', () => resolve());
        (existing as HTMLScriptElement).addEventListener('error', () => reject(new Error('EmailJS script failed to load')));
        return;
      }

      const script = document.createElement('script');
      script.setAttribute('data-emailjs', 'true');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('EmailJS script failed to load'));
      document.head.appendChild(script);
    });
  }

  private getBrowserName(): string {
    const userAgent = navigator.userAgent;

    if (/Edg\//.test(userAgent)) {
      return 'Microsoft Edge';
    }

    if (/Chrome\//.test(userAgent) && !/Edg\//.test(userAgent)) {
      return 'Google Chrome';
    }

    if (/Firefox\//.test(userAgent)) {
      return 'Mozilla Firefox';
    }

    if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) {
      return 'Safari';
    }

    if (/OPR\//.test(userAgent) || /Opera/.test(userAgent)) {
      return 'Opera';
    }

    return 'Unknown Browser';
  }
}
