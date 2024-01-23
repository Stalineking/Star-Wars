
import { Component, OnInit, Input } from '@angular/core';
import { GraphQLService } from '../graphql.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './filmslists.component.html',
  styleUrls: ['./filmslists.component.css']
})
export class FilmsListComponent implements OnInit {
  @Input() films: any[] = [];
  errorMessage: string = ''; 
  constructor(private graphqlService: GraphQLService) {}

  ngOnInit(): void {
    this.graphqlService.getAllFilms().subscribe((result: any) => {
      console.log('GraphQL Films Result:', result);
      this.films = result?.data?.allFilms?.edges?.map((edge: any) => edge.node) || [];
    },   (error: any) => {
      console.error('GraphQL Error:', error);
      this.errorMessage = 'Error fetching films. Please try again later.';
    });
  }
}
