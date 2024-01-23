
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GraphQLService } from './graphql.service';  
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    const mockGraphQLService = jasmine.createSpyObj('GraphQLService', ['yourMethod1', 'yourMethod2']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: GraphQLService, useValue: mockGraphQLService },
      ],
      imports: [RouterTestingModule, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Star' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Star');
  });
});
