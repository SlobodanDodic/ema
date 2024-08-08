import { gql } from "@apollo/client";

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: PaymentInput!) {
    createPayment(data: $input) {
      id
      amount
      entryDate
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($id: String!, $data: UpdatePaymentInput!) {
    updatePayment(id: $id, data: $data) {
      id
      amount
    }
  }
`;

export const GET_EMPLOYEE_PAYMENTS = gql`
  query GetPayments($employeeId: String!) {
    paymentsByEmployee(employeeId: $employeeId) {
      id
      amount
      entryDate
    }
  }
`;

export const GET_ALL_PAYMENTS = gql`
  query GetAllPayments {
    getAllPayments {
      amount
      entryDate
      employee {
        id
        fullName
      }
    }
  }
`;
