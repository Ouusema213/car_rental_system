import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent {

  searchCarForm! : FormGroup;
  listofoption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "white", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  isSpinning= false ;
  cars:any=[];

  constructor( private fb : FormBuilder ,
    private service : CustomerService){

    this.searchCarForm = this.fb.group({
      brand : [null],
      type : [null],
      transmission : [null],
      color : [null],
    })

  }

  searchCar() { 
    this.isSpinning = true ;
    console.log(this.searchCarForm.value);
    this.service.searchCar(this.searchCarForm.value).subscribe((res) => {
      console.log(res);
      res.carDtoList.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'assets/audi.jpeg';
        this.cars.push(element);
        
        
      });
      this.isSpinning = false ;
    })
  }
}
