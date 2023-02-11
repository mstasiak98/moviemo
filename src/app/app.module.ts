import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './core/feature/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './state/movies/movies.effects';
import { moviesReducer } from './state/movies/movies.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ movies: moviesReducer }, {}),
    EffectsModule.forRoot([MoviesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
