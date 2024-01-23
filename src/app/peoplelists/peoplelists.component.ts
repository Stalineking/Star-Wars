
import { Component, OnInit, Input } from '@angular/core';
import { GraphQLService } from '../graphql.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './peoplelists.component.html',
  styleUrls: ['./peoplelists.component.css']
})
export class PeopleListComponent implements OnInit {
  @Input() people: any[] = [];
  errorMessage: string = ''; 


  constructor(private graphqlService: GraphQLService) {}

  ngOnInit(): void {
    this.graphqlService.getAllPeople().subscribe((result: any) => {
      console.log('GraphQL People Result:', result);
      this.people = result?.data?.allPeople?.edges?.map((edge: any) => edge.node) || [];
    },
    (error: any) => {
      console.error('GraphQL Error:', error);
      this.errorMessage = 'Error fetching people. Please try again later.';
    });
  }
}
