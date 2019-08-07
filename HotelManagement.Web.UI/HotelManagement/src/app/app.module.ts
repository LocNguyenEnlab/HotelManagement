import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RoomListComponent } from './room-list/room-list.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    DxButtonModule, DxContextMenuModule, DxDataGridModule,
    DxDateBoxModule, DxDropDownBoxModule,
    DxFormModule, DxListModule, DxNumberBoxModule,
    DxPopupModule, DxRadioGroupModule, DxScrollViewModule,
    DxTabPanelModule,
    DxTextAreaModule,
    DxTextBoxModule, DxValidatorModule
} from 'devextreme-angular';
import {FormsModule} from '@angular/forms';
import {DxoTitleModule} from 'devextreme-angular/ui/nested/title';
import {DxoScrollBarModule} from 'devextreme-angular/ui/nested/scroll-bar';
import { BookedClientsListComponent } from './booked-clients-list/booked-clients-list.component';
import { CheckInComponent } from './check-in/check-in.component';
import { BookingComponent } from './booking/booking.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { UpdateServiceComponent } from './update-service/update-service.component';

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        RoomListComponent,
        BookedClientsListComponent,
        CheckInComponent,
        BookingComponent,
        CheckOutComponent,
        InvoiceListComponent,
        UpdateServiceComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: RoomListComponent},
            {path: 'booked-clients-list', component: BookedClientsListComponent},
            {path: 'check-in', component: CheckInComponent},
            {path: 'check-out', component: CheckOutComponent},
            {path: 'invoice-list', component: InvoiceListComponent},
            {path: 'update-service', component: UpdateServiceComponent},
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
