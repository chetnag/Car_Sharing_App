import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Search Ride',
      url: '/list',
      icon: 'albums'
    },
    {
      title: 'My Rides',
      url: '/info-post',
      icon: 'filing'
    },
    {
      title: 'Post Ride',
      url: '/info-search',
      icon: 'analytics'
    }
    ,
    {
      title: 'logout',
      url: '/login',
      icon: 'key'
    },
    {
      title: 'map',
      url: '/map',
      icon: 'globe'
    }
  ];

  constructor(
    private router : Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('login');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    //firebase.initializeApp(config);
  }
}
