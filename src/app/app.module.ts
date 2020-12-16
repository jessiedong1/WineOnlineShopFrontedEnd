import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwlModule } from 'ngx-owl-carousel';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AboutComponent } from './components/about/about.component';
import { TwitterComponent } from './components/twitter/twitter.component';
import { WineDetailsComponent } from './components/wine-details/wine-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardManagerComponent } from './components/board-manager/board-manager.component';
import { BoardStaffComponent } from './components/board-staff/board-staff.component';
import { BoardCustomerComponent } from './components/board-customer/board-customer.component';
import { authInterceptorProviders } from './common/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import * as Sentry from "@sentry/angular";



const routes: Routes=[
  // {path: 'category/:id', component:ProductListComponent},

  {path: 'shop', component:WineListComponent},
  {path: 'about', component:AboutComponent},
  {path:'search/:keyword', component: WineListComponent},
  {path: 'shop/:keyword', component: WineDetailsComponent},
  {path: 'admin/owner',component: BoardAdminComponent },
  {path: 'admin/manager', component: BoardManagerComponent},
  {path: 'admin/staff', component: BoardStaffComponent},
  {path: 'admin/customer', component: BoardCustomerComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'cart-details', component: CartDetailComponent},
  {path: 'check-out', component: CheckoutComponent},
  {path: 'thankyou', component:ThankyouComponent},
  {path: '',pathMatch: 'full', component: HomeComponent},
  {path: '**',component: PageNotFoundComponent},
  
]
@NgModule({
  declarations: [
    AppComponent,
    WineListComponent,
    HomeComponent, 
    PageNotFoundComponent,
     AboutComponent, 
     TwitterComponent, 
     WineDetailsComponent, 
     CartStatusComponent, 
     SearchComponent, 
     RegisterComponent, 
     ProfileComponent, 
     BoardAdminComponent, 
     BoardManagerComponent, 
     BoardStaffComponent, 
     BoardCustomerComponent, 
     FilterPipe, SortPipe, CheckoutComponent, CartDetailComponent, ThankyouComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
    
  ],
  providers: [authInterceptorProviders,    {
    provide: ErrorHandler,
    useValue: Sentry.createErrorHandler({
      showDialog: true,
    }),
  }, ],
  
  
  
  bootstrap: [AppComponent]
})
export class AppModule { }
