
import { Component, OnInit , Input} from '@angular/core';
import { GraphQLService } from '../graphql.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehiculeslists.component.html',
  styleUrls: ['./vehiculeslists.component.css']
})
export class VehiclesListComponent implements OnInit {
  @Input() vehicles: any[] = [];
  errorMessage: string = 'Error fetching vehicle. Please try again later.'; 

  constructor(private graphqlService: GraphQLService) {}

  ngOnInit(): void {
    this.graphqlService.getAllVehicles().subscribe((result: any) => {
      console.log('GraphQL Vehicles Result:', result);
      this.vehicles = result?.data?.allVehicles?.edges?.map((edge: any) => edge.node) || [];
    }, (error: any) => {
      console.error('GraphQL Error:', error);
      this.errorMessage = 'Error fetching vehicle. Please try again later.';
    });
  }
}
