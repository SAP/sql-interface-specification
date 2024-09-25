

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

Example:

```
sqlapi: 1.0.1
info:
  version: 2.18.0
  title: TPC-H Benchmark
  …
servers:
  - …
objects:
  schemas:
    TPC-H:
      tableOriented:
        CUSTOMER:
          description: Customer data
          kind: view
          x-sap-dpp-entitySemantics: sap:DataSubject
          …
        LINEITEM:
          …
        ORDERS:
          …
        …
      procedures:
        CREATE_ORDER:
          …
        …
```
### `x-sap-dpp-dataSubjectRole`

- Type: `string`
- Used at: `objects:schemas:A_SCHEMA:tableOriented`
- Description: Role of the data subjects in this set (e.g. employee, customer). Values are application-specific.

Constraints: OPTIONAL

Example:
```
sqlapi: "1.0.1"
info:
  version: 2.18.0
  title: TPC-H Benchmark
  …
servers:
  - …
objects:
  schemas:
    TPC-H:
      tableOriented:
        CUSTOMER:
          description: Customer data
          kind: view
          x-sap-dpp-entitySemantics: sap:DataSubject
          x-sap-dpp-dataSubjectRole: sap:Customer
          …
        LINEITEM:
          …
        ORDERS:
          …
        …
      procedures:
        CREATE_ORDER:
          …
        …
```

### `x-sap-dpp-dataSubjectRoleDescription`

- Type: `string`
- Used at: `objects:schemas:A_SCHEMA:tableOriented`
- Description: Language-dependent description of the role of the data subjects in this set (e.g. employee, customer). Values are application-specific.

Constraints: OPTIONAL

Example:
```
sqlapi: "1.0.1"
info:
  version: 2.18.0
  title: TPC-H Benchmark
  …
servers:
  - …
objects:
  schemas:
    TPC-H:
      tableOriented:
        CUSTOMER:
          description: Customer data
          kind: view
          x-sap-dpp-entitySemantics: sap:DataSubject
          x-sap-dpp-dataSubjectRole: Customer
          x-sap-dpp-dataSubjectRoleDescription: Customer Reference
          …
        LINEITEM:
          …
        ORDERS:
          …
        …
      procedures:
        CREATE_ORDER:
          …
        …
```

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

Example:
```
Sqlapi: "1.0.1"
info:
  version: 2.18.0
  title: TPC-H Benchmark
  …
servers:
  - …
objects:
  schemas:
    TPC-H:
      tableOriented:
        CUSTOMER:
          description: Customer data
          kind: view
          x-sap-dpp-entitySemantics: sap:DataSubject
          x-sap-dpp-dataSubjectRole: Customer
          x-sap-dpp-dataSubjectRoleDescription: Customer Reference
          columns:
          - name: C_CUSTKEY
            type:
             $ref: "#/components/types/atomic/INT4-INT4"
            notNull: true
            x-sap-dpp-fieldSemantics: sap:DataSubjectID          
          …
        LINEITEM:
          …
        ORDERS:
          …
        …
      procedures:
        CREATE_ORDER:
          ...
        ...
```

### `x-sap-dpp-isPotentiallyPersonal`

- Type: `boolean`
- Used at: `objects:schemas:A_SCHEMA:tableOriented` 
- Description: Property contains potentially personal data. Properties annotated with `x-sap-dpp-fieldSemantics` need not be additionally annotated with this extension.

Constraints:

- OPTIONAL
- Default: `TRUE`

Example:
```
Sqlapi: "1.0.1"
info:
  version: 2.18.0
  title: TPC-H Benchmark
  …
servers:
  - …
objects:
  schemas:
    TPC-H:
      tableOriented:
        CUSTOMER:
          description: Customer data
          kind: view
          x-sap-dpp-entitySemantics: sap:DataSubject
          x-sap-dpp-dataSubjectRole: Customer
          x-sap-dpp-dataSubjectRoleDescription: Customer Reference
          columns:
          - name: C_CUSTKEY
            type:
             $ref: "#/components/types/atomic/INT4-INT4"
            notNull: true
            x-sap-dpp-fieldSemantics: sap:DataSubjectID
          - name: C_NAME
            type:
             $ref: "#/components/types/atomic/CHAR(25)-CHAR"
            notNull: false
            x-sap-dpp-isPotentiallyPersonal: TRUE
          …
        LINEITEM:
          …
        ORDERS:
          …
        …
      procedures:
        CREATE_ORDER:
          ...
        ...
```

### `x-sap-dpp-isPotentiallySensitive`

- Type: `boolean`
- Used at: `objects:schemas:A_SCHEMA:tableOriented`
- Description: Property contains potentially sensitive personal data.

Constraints:

- OPTIONAL
- Default: `TRUE`

Example:
```
Sqlapi: "1.0.1"
info:
  version: 2.18.0
  title: TPC-H Benchmark
  …
servers:
  - …
objects:
  schemas:
    TPC-H:
      tableOriented:
        CUSTOMER:
          description: Customer data
          kind: view
          x-sap-dpp-entitySemantics: sap:DataSubject
          x-sap-dpp-dataSubjectRole: Customer
          x-sap-dpp-dataSubjectRoleDescription: Customer Reference
          columns:
          - name: C_CUSTKEY
            type:
             $ref: "#/components/types/atomic/INT4-INT4"
            notNull: true
            x-sap-dpp-fieldSemantics: sap:DataSubjectID
          - name: C_GENDER
            type:
             $ref: "#/components/types/atomic/CHAR(25)-CHAR"
            notNull: false
            x-sap-dpp-isPotentiallySensitive: TRUE
          …
        LINEITEM:
          …
        ORDERS:
          …
        …
      procedures:
        CREATE_ORDER:
          ...
        ...

```