import { Route } from '@angular/router';
import { FilmsListComponent } from './filmslists/filmslists.component';
import { PeopleListComponent } from './peoplelists/peoplelists.component';
import { VehiclesListComponent } from './vehiculeslists/vehiculeslists.component';

export const appRoutes: Route[] = [

   { path: 'films', component: FilmsListComponent },
  { path: 'people', component: PeopleListComponent },
  { path: 'vehicles', component: VehiclesListComponent },
  ];
