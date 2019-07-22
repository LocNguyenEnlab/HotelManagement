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
    DxButtonModule, DxDataGridModule,
    DxDateBoxModule,
    DxFormModule, DxNumberBoxModule,
    DxPopupModule, DxScrollViewModule,
    DxTabPanelModule,
    DxTextAreaModule,
    DxTextBoxModule, DxValidatorModule
} from 'devextreme-angular';
import {FormsModule} from '@angular/forms';
import {DxoTitleModule} from 'devextreme-angular/ui/nested/title';
import {DxoScrollBarModule} from 'devextreme-angular/ui/nested/scroll-bar';
import { BookedClientsListComponent } from './booked-clients-list/booked-clients-list.component';

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        RoomListComponent,
        BookedClientsListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: RoomListComponent},
            {path: 'booked-clients-list', component: BookedClientsListComponent},
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
        DxNumberBoxModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
