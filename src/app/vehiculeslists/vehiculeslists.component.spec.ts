import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclesListComponent } from './vehiculeslists.component';
import { GraphQLService } from '../graphql.service';
import { of, throwError } from 'rxjs';

describe('VehiclesListComponent', () => {
  let component: VehiclesListComponent;
  let fixture: ComponentFixture<VehiclesListComponent>;
  let mockGraphQLService: jasmine.SpyObj<GraphQLService>;

  beforeEach(() => {
    mockGraphQLService = jasmine.createSpyObj('GraphQLService', ['getAllVehicles']);

    TestBed.configureTestingModule({
      declarations: [VehiclesListComponent],
      providers: [{ provide: GraphQLService, useValue: mockGraphQLService }],
    });

    fixture = TestBed.createComponent(VehiclesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch vehicles on init', () => {
    const mockVehicles = [
      { name: 'Sand Crawler' },
      { name: 'T-16 skyhopper' },
    ];

    mockGraphQLService.getAllVehicles.and.returnValue(of({ data: { allVehicles: { edges: mockVehicles.map(node => ({ node })) } } } as any));

    component.ngOnInit();

    expect(mockGraphQLService.getAllVehicles).toHaveBeenCalled();
    expect(component.vehicles).toEqual(mockVehicles);
    expect(component.errorMessage).toEqual('Error fetching vehicle. Please try again later.');
  });

  it('should handle error when fetching vehicles', () => {
    const errorMessage = 'Error fetching vehicle. Please try again later.';
    mockGraphQLService.getAllVehicles.and.returnValue(throwError({ message: errorMessage }));

    component.ngOnInit();

    expect(mockGraphQLService.getAllVehicles).toHaveBeenCalled();
    expect(component.vehicles).toEqual([]);
    expect(component.errorMessage).toEqual(errorMessage);
  });
});
