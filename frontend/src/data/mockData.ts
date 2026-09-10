import { ComplianceRequirement } from "../types";

export const MOCK_BUSINESS = {
  name: "ABC Bakery",
  description: "I want to start a small bakery in Coimbatore.",
  sector: "Food",
  state: "Tamil Nadu",
  businessSize: "Small",
  businessStage: "Starting"
};

export const MOCK_COMPLIANCES: ComplianceRequirement[] = [
  {
    id: "FSSAI",
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
  },
  {
    id: "GST",
    name: "GST Registration",
    required: false,
    department: "CBIC",
    status: "NOT_STARTED",
    description: "Goods and Services Tax registration for businesses.",
    whyNeeded: "Applicable based on business criteria. Typically required if turnover exceeds the threshold limit.",
    documents: [
      "PAN Card",
      "Aadhaar Card",
      "Proof of business registration",
      "Bank account details"
    ],
    steps: [
      "Visit GST portal",
      "Fill Part A of registration form",
      "Receive TRN",
      "Fill Part B with details",
      "Submit with documents"
    ]
  },
  {
    id: "FIRE",
    name: "Fire Safety Compliance",
    required: true,
    department: "State Fire Service",
    status: "NOT_STARTED",
    description: "No Objection Certificate from the fire department.",
    whyNeeded: "Required where applicable, especially for commercial premises where public visits are expected.",
    documents: [
      "Building plan",
      "Details of fire safety measures",
      "Application form"
    ],
    steps: [
      "Submit application",
      "Inspection by fire officer",
      "Compliance of recommendations",
      "Issue of NOC"
    ]
  },
  {
    id: "POLLUTION",
    name: "Pollution-related clearance",
    required: false,
    department: "State Pollution Control Board",
    status: "NOT_STARTED",
    description: "Consent to Establish and Consent to Operate.",
    whyNeeded: "Applicable based on activity. Check if your specific bakery activities fall under the purview of pollution control regulations.",
    documents: [
      "Site plan",
      "Details of process",
      "Pollution control measures"
    ],
    steps: [
      "Submit application to SPCB",
      "Inspection",
      "Approval"
    ]
  }
];
