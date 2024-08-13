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

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: String!) {
    deleteEmployee(id: $id) {
      id
      fullName
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query getAllEmployees {
    getAllEmployees {
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

export const GET_EMPLOYEE = gql`
  query getOneEmployee($id: String!) {
    getOneEmployee(id: $id) {
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

export const GET_EMPLOYEE_JOB_AND_MEMBERS = gql`
  query getAllEmployees {
    getAllEmployees {
      jobTitle
      healthCareMembers {
        category
        insurance
      }
      fitpassMembers {
        category
      }
    }
  }
`;

export const GET_EMPLOYEES_HEALTHCARE_STATS = gql`
  query GetEmployeesHealthcareStats {
    getEmployeesHealthcareStats {
      MediGroup
      DDOR
      WithoutHC
      totalEmployees
    }
  }
`;

export const GET_EMPLOYEES_FITPASS_STATS = gql`
  query GetEmployeesFitpassStats {
    getEmployeesFitpassStats {
      Fitpass
      Without
      totalEmployees
    }
  }
`;

export const GET_JOB_TITLES = gql`
  query GetJobTitleCounts {
    getJobTitleCounts {
      totalEmployees
      getJobTitleCounts {
        jobTitle
        count
      }
    }
  }
`;

export const GET_ALL_FITPASS_STATS = gql`
  query GetFitpassCategories {
    getFitpassCategories {
      totalMembers
      getFitpassCounts {
        category
        count
      }
      getFitpassAllCounts {
        category
        count
      }
    }
  }
`;

export const GET_ALL_HEALTHCARE_STATS = gql`
  query GetHealthcareCategories {
    getHealthcareCategories {
      totalMembers
      getHealthcareCounts {
        category
        count
      }
      getHealthcareInsurances {
        category
        count
      }
      getHealthcareAllCounts {
        category
        count
      }
    }
  }
`;
