import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tickets',
        loadChildren: () =>
          import('../tickets/tickets.module')
            .then(m => m.TicketsModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module')
            .then(m => m.UsersModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module')
            .then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
