import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  getAllFilms() {
    return this.apollo.query({
      query: gql`
        {
          allFilms {
            edges {
              node {
                id
                title
                releaseDate
                producers
                director
              }
            }
          }
        }
      `,
    });
  }

  getAllPeople() {
    return this.apollo.query({
      query: gql`
        {
          allPeople {
            edges {
              node {
                id
                name
                gender
                homeworld {
                  id
                  name
                  climates
                  population
                }
                eyeColor
                skinColor
              }
            }
          }
        }
      `,
    });
  }

  getAllVehicles() {
    return this.apollo.query({
      query: gql`
        {
          allVehicles {
            edges {
              node {
                id
                name
                model
                vehicleClass
                crew
              }
            }
          }
        }
      `,
    });
  }
}
