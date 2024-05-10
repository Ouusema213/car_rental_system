import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent {
  isSpinning = false ;
  carId: number = this.activatedRoute.snapshot.params["id"];
  existingImage : string | null = null ;
  updateForm!:FormGroup;
  listofoption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "white", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute ,
    private fb: FormBuilder,
    private message : NzMessageService,
    private router : Router ){}

  ngOnInit(){
    
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],

    })

    this.getCarById();
  }

  getCarById(){
    this.isSpinning = true ;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      console.log(res);
      this.isSpinning=false;
      const carDto = res ;
      this.existingImage = 'assets/audi.jpeg'
      console.log(carDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    })
  }

  updateCar(){
      this.isSpinning = true ;
      const formData : FormData = new FormData();
      formData.append('brand', this.updateForm.get('brand')?.value || '');
      formData.append('name', this.updateForm.get('name')?.value || '');
      formData.append('type', this.updateForm.get('type')?.value || '');
      formData.append('color', this.updateForm.get('color')?.value || '');
      formData.append('year', this.updateForm.get('year')?.value || '');
      formData.append('transmission', this.updateForm.get('transmission')?.value || '');
      formData.append('description', this.updateForm.get('description')?.value || '');
      formData.append('price', this.updateForm.get('price')?.value || '');
      console.log(formData);
      this.adminService.updateCar(this.carId , formData)
      .subscribe((res) => {
        this.isSpinning= false;

    
        this.message.success("Car Updated Successfully" , {nzDuration: 1000});
        this.router.navigateByUrl("/admin/dashboard");
       console.log(res);
      }, error => {
        this.message.error("Error While Updating Car" , {nzDuration: 1000})
      });
  }



}
