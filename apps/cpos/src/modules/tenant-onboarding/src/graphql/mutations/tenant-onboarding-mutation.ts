import { gql } from 'graphql-request';

export const CREATE_TENANT = gql`
  mutation createTenant(
    $businessName: String!
    $businessType: String!
    $businessLocation: String!
    $website: String!
    $logoUrl: String
    $phone: String!
    $email: String!
    $address1: String!
    $state: String!
    $city: String!
    $fiscalYear: String!
    $baseCurrency: String!
    $timeZone: String!
    $dateFormat: String!
    $language: String!
    $module1: Boolean!
    $module2: Boolean!
  ) {
    createTenant(
      input: {
        businessName: $businessName
        businessType: $businessType
        businessLocation: $businessLocation
        website: $website
        logoUrl: $logoUrl
        phone: $phone
        email: $email
        address1: $address1
        state: $state
        city: $city
        fiscalYear: $fiscalYear
        baseCurrency: $baseCurrency
        timeZone: $timeZone
        dateFormat: $dateFormat
        language: $language
        module1: $module1
        module2: $module2
      }
    ) {
      id
      businessName
      email
      module1
      logoUrl
    }
  }
`;

export interface CreateTenantResponse {
  createTenant: {
    id: number;
    businessName: string;
    email: string;
    module1: boolean;
  };
}

export interface CreateTenantVariables {
  businessName: string;
  businessType: string;
  businessLocation: string;
  website: string;
  logoUrl: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  zip: string;
  fiscalYear: string;
  baseCurrency: string;
  timeZone: string;
  dateFormat: string;
  language: string;
  module1: boolean;
  module2: boolean;
}
