import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmsListComponent } from './filmslists.component';
import { GraphQLService } from '../graphql.service';
import { of, throwError } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client';

describe('FilmsListComponent', () => {
  let component: FilmsListComponent;
  let fixture: ComponentFixture<FilmsListComponent>;
  let mockGraphQLService: jasmine.SpyObj<GraphQLService>;

  beforeEach(() => {
    mockGraphQLService = jasmine.createSpyObj('GraphQLService', ['getAllFilms']);
    
    TestBed.configureTestingModule({
      declarations: [FilmsListComponent],
      providers: [{ provide: GraphQLService, useValue: mockGraphQLService }],
    });

    fixture = TestBed.createComponent(FilmsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch films on init', () => {
    const mockFilms = [{ title: 'A New Hope' }, { title: 'Return of the Jedi' }];
    mockGraphQLService.getAllFilms.and.returnValue(of({ data: { allFilms: { edges: mockFilms.map(film => ({ node: film })) } } }as unknown as ApolloQueryResult<any>
      ));

    component.ngOnInit();

    expect(mockGraphQLService.getAllFilms).toHaveBeenCalled();
    expect(component.films).toEqual(mockFilms);
  });

  it('should handle error when fetching films', () => {
    const errorMessage = 'Error fetching films. Please try again later.';
    mockGraphQLService.getAllFilms.and.returnValue(throwError({ message: errorMessage }));

    component.ngOnInit();

    expect(mockGraphQLService.getAllFilms).toHaveBeenCalled();
    expect(component.films).toEqual([]);
    expect(component.errorMessage).toEqual(errorMessage);
  });

  it('should handle empty films list', () => {
    mockGraphQLService.getAllFilms.and.returnValue(of({ data: { allFilms: { edges: [] } } }as unknown as ApolloQueryResult<any>
      ));

    component.ngOnInit();

    expect(mockGraphQLService.getAllFilms).toHaveBeenCalled();
    expect(component.films).toEqual([]);
  });
});

