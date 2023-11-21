import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ColorCodeService } from 'src/app/service/masters/color-code.service';

import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { OrganizationDialogComponent } from '../organization-dialog/organization-dialog.component';
import { OrganizationService } from 'src/app/service/organization/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {
  displayedColumns: string[] = ['id','organizationName', 'visitorTechType', 'employeeTechType', 'createdOn', 'logo','isActive','Action', ];
  dataSource!: MatTableDataSource<any>;
  data: any[] = [];
  formGroup!: FormGroup;
  isActiveList: any;
  value!: any[];
  actionName:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;


  constructor(private formBuilder: FormBuilder, private storageEncryptionService: StorageEncryptionService, private service: OrganizationService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {

    this.formGroup = this.formBuilder.group({
      isActiveId:['']
    })

    // const actionName = String(localStorage.getItem("cl"));
    // this.actionName = this.storageEncryptionService.decryptData(actionName);

    // // Conversion of string array to number array
    // const stringArrayAction: string[] = this.actionName;
    // const numberArrayAction: string[] = stringArrayAction[0].split(',');

    // for(let i=0; i < numberArrayAction.length;i++){
    //   if(numberArrayAction[i] == 'Insert'){
    //     this.Insert = true;
    //   }
    // }

    // for(let i=0; i < numberArrayAction.length;i++){
    //   if(numberArrayAction[i] == 'Update'){
    //     this.Update = true;
    //   }
    // }

    // for(let i=0; i < numberArrayAction.length;i++){
    //   if(numberArrayAction[i] == 'Delete'){
    //     this.Delete = true;
    //   }
    // }

    // for(let i=0; i < numberArrayAction.length;i++){
    //   if(numberArrayAction[i] == 'Select'){
    //     this.Select = true;
    //   }
    // }
    await this.getAllOrganisation();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(OrganizationDialogComponent, {
      width: '50%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllOrganisation();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(OrganizationDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllOrganisation();
      }
    })
  }

  getAllOrganisation() {
    this.service.getAllOrganisation()
      .subscribe({
        next: (res) => {
          debugger
          this.data=res.data;
          this.dataSource = new MatTableDataSource(this.data.filter((item:any)=>item.isActive=='Active'));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (res) => {
          this.alertify.error("Error While fetching The Records!!")
        }
      })
  }

  getAllStatus() {
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

  selectStatus(event: any) {
    const value = this.formGroup.value.isActiveId;

    if(value==0){
      this.value = this.data;
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }
    else
    {
      this.value = this.data.filter((item: any) => item.isActive === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }

  }

  deleteData(id: number) {
    this.alertify.confirm('Delete color code', 'Are sure to delete color code ',
      () => {
        this.service.deleteOrganizationDetails(id)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllOrganisation();
              }
              else {
                this.alertify.error(res.message);
              }
            },
            error: (res) => {
              this.alertify.error("500 Internal Server Error");
            }
          })
      },
      () => {
        this.alertify.error('Cancel');
      })

  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(); // Initialize the dataSource object
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

