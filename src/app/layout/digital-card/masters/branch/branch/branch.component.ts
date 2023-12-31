import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { BranchService } from 'src/app/service/masters/branch.service';
import { CityService } from 'src/app/service/masters/city.service';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  formGroup!: FormGroup;
  actionBtn: string = 'SAVE';
  colorCodeList: any;
  disabled: boolean = true;
  colorCodeListId: any;
  stateList: any;
  stateListId: any;
  cityList: any;
  cityListId: any;
  isActiveList: any;
  isActiveId: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private alertify: AlertifyService, private service: BranchService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<BranchComponent>) {this.dialogRef.disableClose=true }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      branchName: ['', Validators.required],
      branchCode: ['', Validators.required],
      colorCodeId: [''],
      isActive: ['', Validators.required]
    })

    this.formGroup.get('stateId')?.disable();
    this.formGroup.get('branchName')?.disable();
    this.formGroup.get('cityId')?.disable();

    if (this.editData) {
      this.actionBtn = 'UPDATE';
      this.formGroup.controls['stateId'].setValue(this.editData.stateName);
      this.formGroup.controls['cityId'].setValue(this.editData.cityName);
      this.formGroup.controls['branchName'].setValue(this.editData.branchName);
      this.formGroup.controls['branchCode'].setValue(this.editData.branchCode);
      this.formGroup.controls['colorCodeId'].setValue(this.editData.colorCode);
      this.formGroup.controls['isActive'].setValue(this.editData.isActive);
    }


    this.getColorCode();
    this.getState();
    this.getCity();
    this.getIsActive();

  }

  getColorCode() {
    this.service.getColorCode()
      .subscribe({
        next: (res) => {
          this.colorCodeList = res.filter((item:any)=>item.isActive=='Active');
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getState() {
    this.service.getState()
      .subscribe({
        next: (res) => {
          this.stateList = res.filter((item:any)=>item.isActive=='Active');
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getCity() {
    this.service.getCity()
      .subscribe({
        next: (res) => {
          this.cityList = res.filter((item:any)=>item.isActive=='Active');
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getIsActive() {
    this.service.getIsActive()
      .subscribe({
        next: (res) => {
          this.isActiveList = res;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  postData() {

    for (var i = 0; i < this.colorCodeList.length; i++) {
      if (this.colorCodeList[i].colorCode == this.formGroup.get('colorCodeId')?.value) {
        this.colorCodeListId = this.colorCodeList[i].colorCodeId;
      }
    }

    for (var i = 0; i < this.stateList.length; i++) {
      if (this.stateList[i].stateName == this.formGroup.get('stateId')?.value) {
        this.stateListId = this.stateList[i].stateId;
      }
    }

    for (var i = 0; i < this.cityList.length; i++) {
      if (this.cityList[i].cityName == this.formGroup.get('cityId')?.value) {
        this.cityListId = this.cityList[i].cityId;
      }
    }

    for(var i=0; i < this.isActiveList.length;i++){
      if(this.isActiveList[i].isActive == this.formGroup.value.isActive){
        this.isActiveId=this.isActiveList[i].isActiveId;
      }
    }

    let formGroup = {
      "branchName": this.formGroup.get('branchName')?.value,
      "branchCode": this.formGroup.value.branchCode,
      "colorCodeId": this.colorCodeListId,
      "stateId": this.stateListId,
      "cityId": this.cityListId,
      "isActiveId":this.isActiveId
    }

    
    if (!this.editData) {
     if (this.formGroup.valid) {
      this.service.postBranch(formGroup)
        .subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              this.alertify.success(res.message);
              this.formGroup.reset();
              this.dialogRef.close('SAVE');
            }
            else {
              this.alertify.error(res.message);
            }
          },
          error: (res) => {
            this.alertify.error("500 Internal Server Error");
          }
        })
     }
    }
    else {
      this.putData(formGroup);
    }
  }

  putData(formGroup: any) {
   if(this.formGroup.valid){
    this.service.putBranch(formGroup, this.editData.branchId)
    .subscribe({
      next: (res) => {
        if (res.isSuccess == true) {
          this.alertify.success(res.message);
          this.formGroup.reset;
          this.dialogRef.close('UPDATE');
        }
        else {
          alert(res.message);
        }
      },
      error: (res) => {
        this.alertify.error("500 Internal Server Error");
      }
    })
   }
  }  

}
