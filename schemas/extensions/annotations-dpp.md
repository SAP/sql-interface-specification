

> <span className="feature-status-draft">DRAFT</span>

# Data Protection and Privacy related Annotations

## Introduction

The processing of personal data is key in business processes. SAP's products must enable our customers to operate their applications in compliance with data protection laws. One way of enabling is applying DPP-related annotations. Via those annotations the specific DPP-related behavior can be enabled by the consumers.

## Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## Annotations

### `x-sap-dpp-entitySemantics`

- Type: `string`
- Allowed Values:
  - `sap:DataSubject`
  - `sap:DataSubjectDetails`
  - `sap:Other`
- Used at: `objects:schemas:A_SCHEMA:tableOriented`
- Description: Primary meaning of the personal data in the annotated set. Entities annotated with `x-sap-dpp-entitySemantics` are synonymous to `x-sap-dpp-isPotentiallyPersonal`.

Constraints: OPTIONAL

### `x-sap-dpp-dataSubjectRole`

- Type: `string`
- Used at: `objects:schemas:A_SCHEMA:tableOriented`
- Description: Role of the data subjects in this set (e.g. employee, customer). Values are application-specific.

Constraints: OPTIONAL

### `x-sap-dpp-dataSubjectRoleDescription`

- Type: `string`
- Used at: `objects:schemas:A_SCHEMA:tableOriented`
- Description: Language-dependent description of the role of the data subjects in this set (e.g. employee, customer). Values are application-specific.

Constraints: OPTIONAL

### `x-sap-dpp-fieldSemantics`

- Type: `string`
- Used at: `objects:schemas:A_SCHEMA:tableOriented` 
- Description: Primary meaning of the personal data contained in the annotated property. Changes to values of annotated properties are tracked in the audit log. Use this annotation also on fields that are already marked as contact or address data. Properties annotated with `x-sap-dpp-fieldSemantics` need not be additionally annotated with `x-sap-dpp-isPotentiallyPersonal`.
- Allowed Values:
  - `sap:DataSubjectID`
  - `sap:ConsentID`
  - `sap:PurposeID`
  - `sap:ContractRelatedID`
  - `sap:LegalEntityID` (to be deprecated)
  - `sap:DataControllerID`
  - `sap:UserID`
  - `sap:EndOfBusinessDate`
  - `sap:BlockingDate`
  - `sap:EndOfRetentionDate`

Constraints: OPTIONAL

### `x-sap-dpp-isPotentiallyPersonal`

- Type: `boolean`
- Used at: `objects:schemas:A_SCHEMA:tableOriented` 
- Description: Property contains potentially personal data. Properties annotated with `x-sap-dpp-fieldSemantics` need not be additionally annotated with this extension. Personal data describes any information which is related to an identified or identifiable natural person (data subject). An identifiable person is one who can be identified, directly or indirectly, in particular by a reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person.

Constraints:

- OPTIONAL
- Default: `TRUE`

### `x-sap-dpp-isPotentiallySensitive`

- Type: `boolean`
- Used at: `objects:schemas:A_SCHEMA:tableOriented`
- Description: Property contains potentially sensitive personal data.  Sensitive personal data is a category of personal data that needs special handling. The determination which personal data is sensitive may differ for different legal areas or industries.
  
  Examples of sensitive personal data:
    - Special categories of personal data, such as data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, data concerning health or sex life or sexual orientation.
    - Personal data subject to professional secrecy.
    - Personal data relating to criminal or administrative offenses.
    - Personal data concerning insurances and bank or credit card accounts.

Constraints:

- OPTIONAL
- Default: `TRUE`
