import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { StudentCreateComponent } from "./components/pages/student-create/student-create.component";
import { StudentEditComponent } from "./components/pages/student-edit/student-edit.component";
import { StudentListComponent } from "./components/pages/student-list/student-list.component";
import { UserCreateComponent } from './components/pages/user-create/user-create.component';
import { TeacherCreateComponent } from './components/pages/teacher-create/teacher-create.component';
import { TeacherEditComponent } from './components/pages/teacher-edit/teacher-edit.component';
import { TeacherListComponent } from './components/pages/teacher-list/teacher-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'student-create', component: StudentCreateComponent },
  { path: 'student-edit/:id', component: StudentEditComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'teacher-create', component: TeacherCreateComponent },
  { path: 'teacher-edit/:id', component: TeacherEditComponent },
  { path: 'teacher-list', component: TeacherListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
