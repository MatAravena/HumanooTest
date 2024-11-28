import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookManagerComponent } from './components/book-manager/book-manager.component';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/book.reducer';
import { EffectsModule, USER_PROVIDED_EFFECTS } from '@ngrx/effects';
import { BookEffects } from './store/book.effects';
// import * as bookEffects from './store/book.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookManagerComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forRoot({ books: bookReducer }),
    EffectsModule.forRoot([BookEffects]),
    // HttpClientModule,
    //EffectsModule.forRoot([BookEffects, bookEffects]),
    // BookEffects,
    // {
    //   provide: USER_PROVIDED_EFFECTS,
    //   multi: true,
    //   useValue: [BookEffects],
    // },
    StoreDevtoolsModule.instrument({ maxAge: 25 }) 
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
