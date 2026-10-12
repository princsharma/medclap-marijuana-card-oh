// Official Ohio registry details, from the Division of Cannabis Control's own pages. Checked 13 Oct 2026.
export const registry = {
  loginUrl: 'https://ohiomedicalmarijuanaregistry.com/logins/sign_in', // linked from com.ohio.gov Patient & Caregiver Registry page
  helpline: '1-833-464-6627', // DCC toll-free helpline
  email: 'MMCPRegistry@com.ohio.gov', // DCC renewing-registration page
  passwordHelpUrl: 'https://medicalmarijuanaregistry.zendesk.com/hc/en-us/articles/4410461740051', // linked from DCC renewal page
  registryPage: 'https://com.ohio.gov/divisions-and-programs/cannabis-control/patients-caregivers/patient-and-caregiver-registry',
  renewalPage: 'https://com.ohio.gov/divisions-and-programs/cannabis-control/patients-caregivers/patient-and-caregiver-registry/renewing-patient-registration',
  obtainPage: 'https://com.ohio.gov/divisions-and-programs/cannabis-control/patients-caregivers/obtain-medical-marijuana',
} as const;
