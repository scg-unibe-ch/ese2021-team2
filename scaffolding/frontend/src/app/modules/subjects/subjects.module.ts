import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { SubjectsGridComponent } from './components/subjects-grid/subjects-grid.component';

const routes: Routes = [
    {
        path: '',
        component: SubjectsComponent
    }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectsGridComponent
  ],
  imports: [
    CommonModule,
    routing
  ]
})
export class SubjectsModule { }