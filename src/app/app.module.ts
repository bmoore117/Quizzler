import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/home/quiz/quiz.component';
import { ResultComponent } from './components/home/result/result.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthHttp } from './services/auth-http.service';
import { AuthService } from './services/auth.service';
import { EventbusService } from './services/eventbus.service';
import { QuestionService } from './services/question.service';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'quiz/:id', component: QuizComponent, canActivate: [AuthGuard]},
      { path: 'result', component: ResultComponent }
    ]
  },
  { path: 'landing', component: LandingComponent },
  { path: 'callback', component: CallbackComponent }, // used when auth0 calls back after authentication
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    ResultComponent,
    CallbackComponent,
    NotFoundComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [AuthGuard, AuthHttp, AuthService, EventbusService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
