import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm! : FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private message:NzMessageService){}
    ngOnInit(){
      this.loginForm = this.fb.group({
        email: [null , [Validators.email , Validators.required]],
        password : [ null , [Validators.required]]
      })

    }
    login() {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.userId != null) { 
            const user = {
              id: res.userId,
              role: res.userRole
            };
            StorageService.saveUser(user);
            StorageService.saveToken(res.jwt);
            if (StorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl("/admin/dashboard");
            } else if (StorageService.isCustomerLoggedIn()) {
              this.router.navigateByUrl("customer/dashboard");
            } else {
              this.message.error("Bad credentials", { nzDuration: 5000 }); // Reduce duration to 5 seconds
            }
          }
        },
        error: (error) => {
          console.error(error);
          // Handle error here, such as displaying an error message to the user
          this.message.error("Failed to log in. Please try again later.", { nzDuration: 5000 });
        }
      });
    }
    



  

}
