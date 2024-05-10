import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';


const BASIC_URL = ["http://localhost:8081"];
@Injectable({
  providedIn: 'root'
})


export class CustomerService {

  

  constructor( private http : HttpClient) { }

  getAllCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/cars", {
      headers : this.createAuthorizationHeader()
    })
  }

  getCarById(carId : number ): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/" + carId, {
      headers : this.createAuthorizationHeader()
    })
  }
  bookACar(carId:any ,bookACarDto : any ): Observable<any> {
    return this.http.post<[]>(`${BASIC_URL}/api/customer/car/book/${carId}`, bookACarDto, {
      headers : this.createAuthorizationHeader(),
    });
  }

  searchCar(searchCarDto:any): Observable<any>{
    return this.http.post(BASIC_URL + "/api/customer/car/search" , searchCarDto , {
      headers: this.createAuthorizationHeader()
    });
  }


  getBookingsByUserId( ): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/bookings/" + StorageService.getUserId(), {
      headers : this.createAuthorizationHeader()
    })
  } 
  /* to get the token from our local storage */
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
  
    
    console.log('Token from storage:', StorageService.getToken());


  
    
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
