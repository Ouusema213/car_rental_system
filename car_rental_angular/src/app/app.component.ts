import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car_rental_angular';

  isCustomerLoggedIn : boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn() ; 

  constructor (private router: Router) {}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn() ;
      }
    })
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
