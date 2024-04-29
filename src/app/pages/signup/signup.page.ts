// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoadingController } from '@ionic/angular';
// import { AuthenticationService } from 'src/app/authentication.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
// })
// export class SignupPage implements OnInit {
//   regForm: FormGroup 

//   constructor(public formBuilder:FormBuilder , public loadingCrtl:LoadingController, public authService:AuthenticationService, public router:Router ) { }

//   ngOnInit() {
//     this.regForm = this.formBuilder.group({
//       fullname:['', [Validators.required]],
//       email: ['', [Validators.required,
//         Validators.email,
//         Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
//       ]],
//       password:['', [
//         Validators.required,
//         Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}')
//       ]]
//     })
//   }

//   get errorControl(){
//     return this.regForm?.controls;
//   }

//   async signUp(){
//     const loading = await this.loadingCrtl.create();
//     await loading.present();
//     if(this.regForm?.valid){
//     const user = await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch((error)=>{
//       console.log(error);
//       loading.dismiss()
//     })  
//     if(user){
//       loading.dismiss()
//       this.router.navigate(['/home'])
//     }else{
//       console.log('provide correct values');
//     }

//     }

//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public loadingCrtl: LoadingController,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: [
        '',
        [
          // Validators.required,
          Validators.email,
          // Validators.pattern("a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          // Add your password pattern here
          // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}"), // Example: Minimum length of 8 characters
        ],
      ],
    });
  }

  ngOnInit() {
  }

  // get errorControl() {
  //   return this.regForm.controls;
  // }

  async signUp() {
    const loading = await this.loadingCrtl.create();
    
    if (this.regForm.valid) {
      loading.present();
      
      const user = await this.authService
        .registerUser(this.regForm.value.email, this.regForm.value.password)
        .catch((error) => {
          console.log(error);
          loading.dismiss();
          // Handle error, e.g., display an error message to the user
        });

      if (user) {
        console.log(user);
        
        // Dismiss loading spinner
        loading.dismiss();
        // Navigate to the home page
        this.router.navigate(['/login']);
      } else {
        console.log('provide correct values');
        // Handle error, e.g., display an error message to the user
      }
    } else {
      console.log("form is invalid");
      // Handle form validation errors, e.g., display an error message to the user
    }
  }

  get emailControl() {
    return this.regForm.get("email") as FormControl
  }

  get fullnameControl() {
    return this.regForm.get("fullname") as FormControl
  }

  get passwordControl() {
    return this.regForm.get("password") as FormControl
  }
}
