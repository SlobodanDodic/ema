import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query GetJobs {
    getJobs {
      id
      value
    }
  }
`;
