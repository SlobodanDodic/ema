import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation SignUp($input: SignUpInput!) {
    signup(signUpInput: $input) {
      accessToken
      refreshToken
      user {
        email
        username
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      id
      username
      email
      isActivated
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SignIn($input: SignInInput!) {
    signin(signInInput: $input) {
      accessToken
      refreshToken
      user {
        email
        username
      }
    }
  }
`;

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
