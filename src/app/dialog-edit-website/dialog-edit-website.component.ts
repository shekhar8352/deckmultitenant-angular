import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-dialog-edit-website',
  templateUrl: './dialog-edit-website.component.html',
  styleUrls: ['./dialog-edit-website.component.scss']
})
export class DialogEditWebsiteComponent {
  data = {
    id: '',
    website: '',
  };// Update data type as per your tenant model

  firstname: String = '';
  lastname: String = '';
  isSaving: boolean = false;
  isDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogEditWebsiteComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private tenantsService: TenantsService,
    private toast: HotToastService
  ) {
    // Clone the existing data to avoid modifying the original data
    this.data = { ...dialogData };
  }

  onNoClick() {
    this.dialogRef.close();
  }

  async submitData() {
    if (this.formValidator()) {
      this.isSaving = true;

      // Call the API for updating tenant website
      const website = this.data.website/* Set the desired website value */;

      this.tenantsService.updateWebsite(this.data.id, website).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
          this.dialogRef.close(); // Close the dialog after a successful update
          this.toast.success('The website has been updated');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        (error) => {
          console.log(error);
          this.isSaving = false;
          this.toast.error('Failed to update tenant website!');
        }
      );
    } else {
      this.toast.error('Please complete the form with valid data!');
    }
  }

  formValidator() {
    let valid = true;

    return valid;
  }
}
