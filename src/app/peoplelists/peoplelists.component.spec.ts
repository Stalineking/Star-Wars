import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleListComponent } from './peoplelists.component';
import { GraphQLService } from '../graphql.service';
import { of, throwError } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;
  let mockGraphQLService: jasmine.SpyObj<GraphQLService>;

  beforeEach(() => {
    mockGraphQLService = jasmine.createSpyObj('GraphQLService', ['getAllPeople']);
    
    TestBed.configureTestingModule({
      declarations: [PeopleListComponent],
      providers: [{ provide: GraphQLService, useValue: mockGraphQLService },Apollo]
    });

    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch people on init', () => {
    const mockPeople = [{ name: 'Luke Skywalker' }, { name: 'Leia Organa' }];
    mockGraphQLService.getAllPeople.and.returnValue(of({ data: { allPeople: { edges: mockPeople.map(node => ({ node })) } } } as ApolloQueryResult<any>));

    component.ngOnInit();

    expect(mockGraphQLService.getAllPeople).toHaveBeenCalled();
    expect(component.people).toEqual(mockPeople);
  });

  it('should handle error when fetching people', () => {
    const errorMessage = 'Error fetching people. Please try again later.';
    mockGraphQLService.getAllPeople.and.returnValue(throwError({ message: errorMessage }));

    component.ngOnInit();

    expect(mockGraphQLService.getAllPeople).toHaveBeenCalled();
    expect(component.people).toEqual([]);
    expect(component.errorMessage).toEqual(errorMessage);
  });

  it('should handle empty people list', () => {
    mockGraphQLService.getAllPeople.and.returnValue(of({ data: { allPeople: { edges: [] } } } as ApolloQueryResult<any>));

    component.ngOnInit();

    expect(mockGraphQLService.getAllPeople).toHaveBeenCalled();
    expect(component.people).toEqual([]);
  });
});

