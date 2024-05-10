import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {

  booking: any
  isSpinning = false

  constructor( private service : CustomerService){
     this.getMyBookings(); 
  }

   getMyBookings(){
    this.isSpinning = true ;
    this.service.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false ;
      console.log(res);
      this.booking = res ;
    })
  } 



}
