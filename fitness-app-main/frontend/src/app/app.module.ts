import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule} from "@angular/material/expansion";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatGridTile} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { ErrorInterceptor } from './error/error-interceptor';
import { BmiComponent } from './bmi/bmi.component';
import { UploadSrcComponent } from './uploads/upload-src/upload-src.component';
import { UploadSrcListComponent } from './uploads/upload-src-list/upload-src-list.component';
import { UploadViewAllComponent } from './upload-view-all/upload-view-all.component';


//store
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatSelectModule} from '@angular/material/select';
import { MealsComponent } from './meals/meals.component';
import { AddFoodComponent } from './meals/add-food/add-food.component'
import { EditFoodComponent } from './meals/edit-food/edit-food.component';
import { ResultPaneComponent } from './meals/result-pane/result-pane.component';
import { FooterComponent } from './meals/footer/footer.component';
import { FilterPipe } from './meals/filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { VideoLibraryComponent } from './video-library/video-library.component';
import { Landingpage2Component } from './landingpage2/landingpage2.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

import { CommentComponent } from './comment/comment.component';
import { Header2Component } from './header2/header2.component';

import { VideoDetailComponent } from './video-detail/video-detail.component';

import { MealCreateComponent } from './meal-create/meal-create.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealItemComponent } from './meal-item/meal-item.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { LittleGameComponent } from './little-game/little-game.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    LandingComponent,
    BmiComponent,
    UploadSrcComponent,
    UploadSrcListComponent,
    UploadViewAllComponent,
    MealsComponent,
    AddFoodComponent,
    EditFoodComponent,
    ResultPaneComponent,
    FooterComponent,
    FilterPipe,
    ProfileComponent,
    ErrorComponent,
    HomeComponent,
    VideoLibraryComponent,
    Landingpage2Component,
    ViewDetailsComponent,
    CommentComponent,
    Header2Component,
    VideoDetailComponent,
    Header2Component,
    MealCreateComponent,
    MealEditComponent,
    MealItemComponent,
    MealListComponent,
    LittleGameComponent,
    

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    
    // Here is configuration for set up of store module
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    MatSelectModule,
  !environment.production ? StoreDevtoolsModule.instrument({ name: 'Fitness Dev Tools'}) : []
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
