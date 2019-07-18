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
    DxButtonModule,
    DxDateBoxModule,
    DxFormModule,
    DxPopupModule,
    DxTabPanelModule,
    DxTextAreaModule,
    DxTextBoxModule
} from 'devextreme-angular';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        RoomListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: RoomListComponent}
        ]),
        DxPopupModule,
        DxTabPanelModule,
        DxFormModule,
        DxTextBoxModule,
        FormsModule,
        DxButtonModule,
        DxDateBoxModule,
        DxTextAreaModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
