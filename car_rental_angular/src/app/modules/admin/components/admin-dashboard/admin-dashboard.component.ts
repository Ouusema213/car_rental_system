import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  cars:any=[];
  constructor(private adminService: AdminService ,
    private message : NzMessageService){}

  

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars(){
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res);
     res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'assets/audi.jpeg' ;
        this.cars.push(element);
        
        
      });
    })
  }

 deleteCar(id: number) {
    console.log(id);
    this.adminService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter((car: any) => car.id !== id); // Remove the deleted car from the local array
      this.message.success("Car deleted successfully", { nzDuration: 5000 });
    });
  }

}
