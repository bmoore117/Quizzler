import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { QuizComponent } from './components/home/quiz/quiz.component';
import { ResultComponent } from './components/home/result/result.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          { path: 'quiz', component: QuizComponent },
          { path: 'result', component: ResultComponent }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
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
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
