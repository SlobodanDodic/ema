import { gql } from "@apollo/client";

export const GET_FITPASS_BENEFITS = gql`
  query GetAllFitpassData {
    getAllFitpassData {
      id
      value
      price
      employeeDiscount
    }
  }
`;

export const GET_HEALTHCARE_BENEFITS = gql`
  query GetAllHealthcareData {
    getAllHealthcareData {
      id
      value
      price
      employeeDiscount
    }
  }
`;
