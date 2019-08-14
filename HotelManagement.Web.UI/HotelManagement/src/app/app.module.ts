import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RoomListComponent } from './room-list/room-list.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    DxButtonModule, DxContextMenuModule, DxDataGridModule,
    DxDateBoxModule, DxDropDownBoxModule,
    DxFormModule, DxListModule, DxLookupModule, DxNumberBoxModule, DxPopoverModule,
    DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule,
    DxTabPanelModule,
    DxTextAreaModule,
    DxTextBoxModule, DxValidatorModule
} from 'devextreme-angular';
import {FormsModule} from '@angular/forms';
import {DxoTitleModule} from 'devextreme-angular/ui/nested/title';
import {DxoScrollBarModule} from 'devextreme-angular/ui/nested/scroll-bar';
import { CheckInComponent } from './check-in/check-in.component';
import { BookingComponent } from './booking/booking.component';
import { RoomInfoComponent } from './room-info/room-info.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { ServiceComponent } from './room-service/service.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RoomListComponent,
        CheckInComponent,
        BookingComponent,
        RoomInfoComponent,
        InvoiceListComponent,
        UpdateServiceComponent,
        ServiceComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: RoomListComponent},
            {path: 'check-in', component: CheckInComponent},
            {path: 'room-info', component: RoomInfoComponent},
            {path: 'invoice-list', component: InvoiceListComponent},
            {path: 'update-room-service', component: UpdateServiceComponent},
            {path: 'service', component: ServiceComponent},
        ]),
        DxPopupModule,
        DxTabPanelModule,
        DxFormModule,
        DxTextBoxModule,
        FormsModule,
        DxButtonModule,
        DxDateBoxModule,
        DxTextAreaModule,
        DxDataGridModule,
        DxoTitleModule,
        DxValidatorModule,
        DxScrollViewModule,
        DxoScrollBarModule,
        DxNumberBoxModule,
        DxContextMenuModule,
        DxRadioGroupModule,
        DxDropDownBoxModule,
        DxListModule,
        DxPopoverModule,
        DxLookupModule,
        DxSelectBoxModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
