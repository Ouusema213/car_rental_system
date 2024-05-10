import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {

  constructor( private service: CustomerService){}
  
  cars: any = [];

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars(){
    this.service.getAllCars().subscribe((res) => {
      console.log(res);
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'assets/audi.jpeg' ;
        
        
        this.cars.push(element);
      })
    })
  }

}
