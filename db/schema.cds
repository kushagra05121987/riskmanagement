namespace riskmanagement;

using {
    managed,
    cuid
} from '@sap/cds/common';

using {API_BUSINESS_PARTNER as external} from '../srv/external/API_BUSINESS_PARTNER.csn';

entity BusinessPartners as projection on external.A_BusinessPartner {
    key BusinessPartner,
    LastName,
    FirstName
}

entity Risks : managed, cuid {
    title       : String(100);
    owner       : String;
    prio        : String(5);
    descr       : String;
    miti        : Association to Mitigations;
    impact      : Integer;
    bp          : Association to BusinessPartners;
    // You will need this definition in a later step
    criticality : Integer;
}

entity Mitigations : managed, cuid {
    descr    : String;
    owner    : String;
    timeline : String;
    risks    : Association to many Risks
                   on risks.miti = $self;
}
