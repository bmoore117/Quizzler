import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/home/quiz/quiz.component';
import { ResultComponent } from './components/home/result/result.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthHttp } from './services/auth-http.service';
import { AuthService } from './services/auth.service';
import { QuestionService } from './services/question.service';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},
      { path: 'result', component: ResultComponent }
    ]
  },
  { path: 'callback', component: LoginComponent },
  { path: '', redirectTo: 'home/quiz', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    ResultComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [AuthGuard, AuthHttp, AuthService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
