import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('tvWidgetContainer', { static: false }) tvWidgetContainer!: ElementRef;

  user: any;
  isLoading = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser =
        localStorage.getItem('loggedInUser') ||
        localStorage.getItem('RegisteredUser');
      if (storedUser) {
        try {
      this.user = JSON.parse(storedUser);
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
      // Defer UI change to allow view to update before widget is loaded
      setTimeout(() => {
        this.isLoading = false;
      });
    }
  }

  ngAfterViewInit(): void {
    // Run only after view is initialized and in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Delay script injection until *ngIf has rendered tvWidgetContainer
      const waitForContainer = setInterval(() => {
        if (this.tvWidgetContainer?.nativeElement) {
          clearInterval(waitForContainer);
          this.loadTradingViewWidget();
        }
      }, 50);
    }
  }

  loadTradingViewWidget(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500 Index" },
          { "proName": "FOREXCOM:NSXUSD", "title": "US 100 Cash CFD" },
          { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
          { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "displayMode": "adaptive",
        "colorTheme": "light",
        "locale": "en"
      }
    `;
    this.renderer.appendChild(this.tvWidgetContainer.nativeElement, script);
  }







  logout(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('RegisteredUser');
    this.router.navigate(['/main']);
  }
}
