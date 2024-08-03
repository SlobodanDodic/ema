import { gql } from "@apollo/client";

export const CREATE_LIABILITY = gql`
  mutation CreateLiability($input: LiabilityInput!) {
    createLiability(data: $input) {
      id
      amount
      recordedDate
    }
  }
`;

export const GET_LIABILITIES = gql`
  query GetLiabilities($employeeId: String!) {
    liabilitiesByEmployee(employeeId: $employeeId) {
      id
      amount
      recordedDate
    }
  }
`;

export const GET_ALL_LIABILITIES = gql`
  query GetAllLiabilities {
    getAllLiabilities {
      amount
      recordedDate
      employee {
        id
        fullName
      }
    }
  }
`;
