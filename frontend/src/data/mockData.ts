import { ComplianceRequirement } from "../types";

export const MOCK_BUSINESS = {
  name: "Sri Lakshmi Textiles",
  description: "Small-scale textile manufacturing unit in Coimbatore.",
  sector: "Manufacturing",
  state: "Tamil Nadu",
  businessSize: "Small",
  businessStage: "Expanding"
};

export const MOCK_COMPLIANCES: ComplianceRequirement[] = [
  {
    id: "FSSAI",
    compliance_id: 1,
    name: "FSSAI Registration",
    required: true,
    department: "Food Safety Department",
    status: "NOT_STARTED",
    description: "Required for any business involved in manufacturing, processing, packaging, storage, transportation, and distribution of food.",
    whyNeeded: "Your business handles and sells food products, so this registration helps ensure compliance with applicable food safety requirements.",
    documents: [
      "Food business details",
      "Identity document",
      "Business address proof"
    ],
    steps: [
      "Gather required documents",
      "Submit application on FOSCOS portal",
      "Pay required fees",
      "Wait for inspection (if applicable)",
      "Download certificate"
    ]
  },
  {
    id: "TRADE",
    compliance_id: 2,
    name: "Trade Licence",
    required: true,
    department: "Local Authority",
    status: "NOT_STARTED",
    description: "A permission issued by the local municipality to carry out a particular trade or business.",
    whyNeeded: "Required by the local municipal corporation to ensure that your business operates according to relevant rules and regulations.",
    documents: [
      "Property tax receipt",
      "Lease agreement",
      "ID proof of owner"
    ],
    steps: [
      "Fill application form",
      "Attach documents",
      "Submit to local municipal office",
      "Pay fees",
      "Receive licence"
    ]
  }
];

export const MOCK_APPLICATIONS = [
  {
    id: 'BC-2026-001',
    businessName: 'Sri Lakshmi Textiles',
    industry: 'Textile Manufacturing',
    applicant: 'Rajesh Kumar',
    submittedDate: '2026-08-12',
    complianceType: 'Factory License',
    department: 'Directorate of Industrial Safety',
    status: 'SUBMITTED'
  },
  {
    id: 'BC-2026-002',
    businessName: 'Kongu Foods Pvt. Ltd.',
    industry: 'Food Processing',
    applicant: 'Senthil Velan',
    submittedDate: '2026-08-14',
    complianceType: 'FSSAI License',
    department: 'Food Safety Department',
    status: 'UNDER_REVIEW'
  },
  {
    id: 'BC-2026-003',
    businessName: 'Coimbatore Tech Solutions',
    industry: 'IT Services',
    applicant: 'Anita Desai',
    submittedDate: '2026-08-10',
    complianceType: 'Shop & Establishment',
    department: 'Labour Department',
    status: 'APPROVED'
  },
  {
    id: 'BC-2026-004',
    businessName: 'GreenHarvest Agro Foods',
    industry: 'Agriculture/Food',
    applicant: 'Vikram Singh',
    submittedDate: '2026-08-20',
    complianceType: 'Trade License',
    department: 'Local Municipal Corporation',
    status: 'SUBMITTED'
  },
  {
    id: 'BC-2026-005',
    businessName: 'Tamil Nadu Garments',
    industry: 'Garment Manufacturing',
    applicant: 'Karthik Raja',
    submittedDate: '2026-08-21',
    complianceType: 'Consent to Establish',
    department: 'Pollution Control Board',
    status: 'UNDER_REVIEW'
  },
  {
    id: 'BC-2026-006',
    businessName: 'Chennai Auto Components',
    industry: 'Auto Parts Manufacturing',
    applicant: 'Murali Krishna',
    submittedDate: '2026-08-05',
    complianceType: 'Fire NOC',
    department: 'Fire & Rescue Services',
    status: 'APPROVED'
  },
  {
    id: 'BC-2026-007',
    businessName: 'Madurai Spice Traders',
    industry: 'Retail',
    applicant: 'Meenakshi Iyer',
    submittedDate: '2026-08-22',
    complianceType: 'GST Registration',
    department: 'Commercial Taxes',
    status: 'SUBMITTED'
  }
];

export const MOCK_DEPARTMENTS = [
  {
    code: 'IND-001',
    name: 'Industries & Commerce Department',
    description: 'Responsible for business and industrial development-related processes.',
    activeApplications: 145,
    pendingApplications: 23,
    assignedOfficers: 12,
    status: 'ACTIVE'
  },
  {
    code: 'LAB-002',
    name: 'Labour Department',
    description: 'Relevant for workforce and labour compliance, including Shops & Establishments.',
    activeApplications: 312,
    pendingApplications: 45,
    assignedOfficers: 18,
    status: 'ACTIVE'
  },
  {
    code: 'ENV-003',
    name: 'Pollution Control Board',
    description: 'Relevant for environmental compliance and pollution-related approvals.',
    activeApplications: 89,
    pendingApplications: 34,
    assignedOfficers: 8,
    status: 'ACTIVE'
  },
  {
    code: 'FIRE-004',
    name: 'Fire & Rescue Services',
    description: 'Relevant for fire safety inspections and issuing No Objection Certificates (NOCs).',
    activeApplications: 120,
    pendingApplications: 15,
    assignedOfficers: 10,
    status: 'ACTIVE'
  },
  {
    code: 'FOOD-005',
    name: 'Food Safety Department',
    description: 'Relevant for food-related businesses, FSSAI registrations, and health compliance.',
    activeApplications: 210,
    pendingApplications: 41,
    assignedOfficers: 15,
    status: 'ACTIVE'
  }
];
