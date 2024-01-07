import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'src/app/service/alertify/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageEncryptionService } from 'src/app/service/encryption/storage-encryption.service';
import { InquiryOrgnizationService } from 'src/app/service/client-details/inquiry-orgnization.service';
import { SiteDetailsDialogComponent } from '../site-details-dialog/site-details-dialog.component';
import { SiteDetailsService } from 'src/app/service/client-details/site-details.service';

@Component({
  selector: 'app-site-details-list',
  templateUrl: './site-details-list.component.html',
  styleUrls: ['./site-details-list.component.css']
})
export class SiteDetailsListComponent implements OnInit {

  displayedColumns: string[] = ['id','organisationName','siteName','countryName','stateName','cityName','isActive', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Insert: boolean = false;
  Update: boolean = false;
  Delete: boolean = false;
  Select: boolean = false;
  data : any[] = [];
  formGroup!: FormGroup;
  isActiveList: any;
  value!: any[];
  actionName:any;
  clientId: any;
  siteId: any;
  roleName: any;

  constructor(private formBuilder: FormBuilder,private storageEncryptionService: StorageEncryptionService, private service:SiteDetailsService, private alertify: AlertifyService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {

    this.formGroup = this.formBuilder.group({
      isActiveId:['']
    })

    const clientId = String(localStorage.getItem("clientId"));
    this.clientId = this.storageEncryptionService.decryptData(clientId);

    const siteId = String(localStorage.getItem("siteId"));
    this.siteId = this.storageEncryptionService.decryptData(siteId);

    const roleName = String(localStorage.getItem("roleName"));
    this.roleName = this.storageEncryptionService.decryptData(roleName);

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

    await this.getAllSiteDetails();
    await this.getAllStatus();
  }

  openDialog() {
    this.dialog.open(SiteDetailsDialogComponent, {
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'SAVE') {
        this.getAllSiteDetails();
      }
    })
  }

  editData(row: any) {
    this.dialog.open(SiteDetailsDialogComponent, {
      data: row,
      width: '100%',
      disableClose:true
    }).afterClosed().subscribe(val => {
      if (val === 'UPDATE') {
        this.getAllSiteDetails();
      }
    })
  }

  getAllSiteDetails() {
    this.service.getAllSiteDetails()
      .subscribe({
        next: (res) => {
          if(this.roleName=="Master Admin"){
            this.data=res.data;
            this.dataSource = new MatTableDataSource(this.data.filter((item:any)=>item.isActive=='Active'));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else if(this.roleName=="Super Admin"){
            this.data=res.data.filter((item:any)=>item.clientId == this.clientId);
            this.dataSource = new MatTableDataSource(this.data.filter((item:any)=>item.isActive=='Active'));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else if(this.roleName=="Site Admin"){
            this.data=res.data.filter((item:any)=>item.clientId == this.clientId && item.siteId == this.siteId);
            this.dataSource = new MatTableDataSource(this.data.filter((item:any)=>item.isActive=='Active'));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
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
    else{
      this.value = this.data.filter((item: any) => item.isActive === value);
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.value;
    }

  }

  deleteData(planId: number) {
    this.alertify.confirm('Delete Role', 'Are you sure to delete role',
      () => {
        this.service.deleteSiteDetails(planId)
          .subscribe({
            next: (res) => {
              if (res.isSuccess == true) {
                this.alertify.success(res.message);
                this.getAllSiteDetails();
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
