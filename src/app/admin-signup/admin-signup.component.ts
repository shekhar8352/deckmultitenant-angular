import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent {
  adminData = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    companyIdentifier: '',
  };

  isSaving: boolean = false;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<AdminSignupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private tenantsService: TenantsService,
    private toast: HotToastService,
  ) {
    console.log("admin-comp", dialogData.companyIdentifier);
    // this.adminData.companyIdentifier = dialogData.companyIdentifier.replace(/^"|"$/g, '');
    this.adminData.companyIdentifier = dialogData.companyIdentifier;

    // console.log(this.adminData.companyIdentifier);

  } // Replace ApiService with your actual service

  onNoClick() {
    this.dialogRef.close();
  }

  submitForm() {
    const tenantId = this.dialogData.id
    console.log(this.adminData);
    if(this.formValidator())
      {
        this.tenantsService.registerAdmin(tenantId, this.adminData).subscribe(
          (response) => {
            console.log(response);
            this.dialogRef.close(); // Close the dialog after a successful increase
            // Handle the response as needed
            this.toast.success('Admin added successfully!')
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
          (error) => {
            console.error(error);
            this.toast.error('Error: ' + error.error)
            // Handle errors as needed
          }
        );
      }
      else 
      {
        this.toast.error('Error: All fields are mandatory!')
      }
  }

  formValidator() {
    let valid = true;
    for (const key in this.adminData) {
      if (this.adminData.hasOwnProperty(key) && key !== 'id' && key !== 'showFooterlogo') {
        if (typeof this.adminData[key as keyof typeof this.adminData] === 'string' && this.adminData[key as keyof typeof this.adminData].trim() === '') {
          valid = false;
          break;
        }
      }
    }
    return valid;
  }
  
}
