import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(data: $input) {
      id
      fullName
      jobTitle
      phoneNumber
      birthday
      contract
      eyes
      safety
      fire
      firstAid
      cumulativeLiabilities
      lastCalculation
      healthCareMembers {
        id
        name
        insurance
        category
        start
        end
      }
      fitpassMembers {
        id
        name
        category
        start
        end
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: String!, $input: EmployeeInput!) {
    updateEmployee(id: $id, data: $input) {
      id
      fullName
      jobTitle
      phoneNumber
      birthday
      contract
      eyes
      safety
      fire
      firstAid
      cumulativeLiabilities
      lastCalculation
      healthCareMembers {
        id
        name
        insurance
        category
        start
        end
      }
      fitpassMembers {
        id
        name
        category
        start
        end
      }
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query findAllEmployees {
    findAllEmployees {
      id
      fullName
      jobTitle
      phoneNumber
      birthday
      contract
      eyes
      safety
      fire
      firstAid
      cumulativeLiabilities
      lastCalculation
      healthCareMembers {
        id
        name
        insurance
        category
        start
        end
      }
      fitpassMembers {
        id
        name
        category
        start
        end
      }
    }
  }
`;
