import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor() { }

  addEnquiry(enquiryDetails: any) {
    // Assuming you have a collection for enquiries
    // return this.firestore.collection('enquiries').add(enquiryDetails);
  
  }
}
