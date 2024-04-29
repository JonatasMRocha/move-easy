import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { PropertyService } from 'src/app/property.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {


  ngOnInit() {
  }
  
  @Input() property: any;
  private authSubscription: Subscription | null = null;

  bookingForm!: FormGroup;

  // bookingForm = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   phoneNumber: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[+]?[(]?[0-9]{1,4}[)]?[-s./0-9]*$') // Regex for validating phone numbers
  //   ]),
  //   message: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(10), // Assuming you want a minimum message length
  //     Validators.maxLength(500) // And a maximum
  //   ])
  // });

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private propertyService: PropertyService,
    private authService: AuthenticationService,
    private alertController : AlertController) {

      this.bookingForm = this.formBuilder.group({
        name: [''],
        phoneNumber: [''],
        message: [''],
        
      })
    }

      async onSubmit() {
        if (this.bookingForm.valid) {
          // Subscribe to the auth state to get the user object
          this.authSubscription = this.authService.getAuthState()
          .subscribe(
            async (user) => {
              if (user) {
                const enquiryDetails = {
                  ...this.bookingForm.value,
                  propertyId: this.property?.id,
                  dateSubmitted: new Date(),
                  userId: user.uid // Current user's ID
                };
      
                // Call the service method to add the enquiry
                try {
                  await this.propertyService.addEnquiry(enquiryDetails);
                  console.log('Enquiry successfully submitted:', enquiryDetails);
      
                  const alert = await this.alertController.create({
                    header: 'Success!',
                    message: 'Your enquiry has been successfully submitted.',
                    buttons: ['OK']
                  });
      
                  await alert.present();
                  this.modalController.dismiss(enquiryDetails, 'confirm');
      
                } catch (error) {
                  console.error('Error submitting enquiry:', error);
                  const alert = await this.alertController.create({
                    header: 'Error',
                    message: 'There was an error submitting your enquiry. Please try again later.',
                    buttons: ['OK']
                  });
      
                  await alert.present();
                }
              } else {
                console.error('No user logged in');
                // Handle the case where there is no user logged in
              }
            },
            (error) => {
              console.error('Error fetching auth state:', error);
            }
          );
        } else {
          Object.keys(this.bookingForm.controls).forEach(field => {
            const control = this.bookingForm.get(field);
            control?.markAsTouched({ onlySelf: true });
          });
        }
      }
      
      // Remember to unsubscribe in the ngOnDestroy lifecycle hook
      ngOnDestroy() {
        if (this.authSubscription) {
          this.authSubscription.unsubscribe();
        }
      }
      
    
      close() {
        this.modalController.dismiss(null, 'cancel');
      }
 

}
