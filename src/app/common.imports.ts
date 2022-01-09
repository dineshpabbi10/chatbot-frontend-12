import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//     bgsColor: "red",
//     bgsPosition: POSITION.bottomCenter,
//     bgsSize: 40,
//     bgsType: SPINNER.rectangleBounce, // background spinner type
//     fgsType: SPINNER.chasingDots, // foreground spinner type
//     pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
//     pbThickness: 5, // progress bar thickness
// };

@NgModule({
    exports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule,
        NgxUiLoaderModule,
        NgMultiSelectDropDownModule
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({}),
        NgxUiLoaderModule,
        NgMultiSelectDropDownModule
    ], providers: [ToastrService, DatePipe]

})
export class CommonImport { }
