import { Component, OnInit } from '@angular/core';
import { GraphQLService } from './graphql.service';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  selector: 'app-root',
 templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
 

  
})
export class AppComponent implements OnInit {


  constructor(private graphqlService: GraphQLService) {}

  ngOnInit(): void {

}}
