import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { VisitingCardScanListComponent } from './visiting-card/visiting-card-scan/visiting-card-scan-list/visiting-card-scan-list.component';
import { VisitingCardScanDialogComponent } from './visiting-card/visiting-card-scan/visiting-card-scan-dialog/visiting-card-scan-dialog.component';
import { VisitingCardShareListComponent } from './visiting-card/visiting-card-share/visiting-card-share-list/visiting-card-share-list.component';
import { VisitingCardShareDialogComponent } from './visiting-card/visiting-card-share/visiting-card-share-dialog/visiting-card-share-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppDownloadListComponent } from './app-download/app-download-list/app-download-list.component';
import { BookingReportComponent } from './booking-report/booking-report.component';
import {MatStepperModule} from '@angular/material/stepper';
import { VisitorDetailsComponent } from './visitor/visitor-details/visitor-details.component';
import { VisitingCardExternalListComponent } from './visiting-card/visiting-card-external-share/visiting-card-external-list/visiting-card-external-list.component';
import { VisitingCardExternalDialogComponent } from './visiting-card/visiting-card-external-share/visiting-card-external-dialog/visiting-card-external-dialog.component';
import { VisitorDetailsDialogComponent } from './visitor/visitor-details-dialog/visitor-details-dialog.component';
import { BrochureShareReportComponent } from './brochure-share-report/brochure-share-report/brochure-share-report.component';


@NgModule({
  declarations: [
    ReportComponent,
    VisitingCardScanListComponent,
    VisitingCardScanDialogComponent,
    VisitingCardShareListComponent,
    VisitingCardShareDialogComponent,
    AppDownloadListComponent,
    BookingReportComponent,
    VisitorDetailsComponent,
    VisitingCardExternalListComponent,
    VisitingCardExternalDialogComponent,
    VisitorDetailsDialogComponent,
    BrochureShareReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,

    FormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableExporterModule,
    MatStepperModule
  ]
})
export class ReportModule { }
