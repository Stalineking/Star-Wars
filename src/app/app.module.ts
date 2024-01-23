import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FilmsListComponent } from './filmslists/filmslists.component';
import { PeopleListComponent } from './peoplelists/peoplelists.component';
import { VehiclesListComponent } from './vehiculeslists/vehiculeslists.component';
import { GraphQLService } from './graphql.service';
import { appRoutes } from './app.routes'; 
import { RouterModule } from '@angular/router';




const uri = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

export function createApollo(httpLink: HttpLink): any {
  return {
    cache: new InMemoryCache(),
    link: httpLink.create({ uri }),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    FilmsListComponent,
    PeopleListComponent,
    VehiclesListComponent,
  ],
  imports: [CommonModule, BrowserModule, HttpClientModule, ApolloModule,RouterModule.forRoot(appRoutes),],
  providers: [
    GraphQLService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
