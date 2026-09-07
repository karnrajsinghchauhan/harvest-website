/**
 * Every outbound destination in one place.
 *
 * ---------------------------------------------------------------------------
 * TO GO LIVE WITH THE DOCS, CHANGE TWO LINES:
 *
 *   1. DOCS_LIVE  -> true
 *   2. DOCS_BASE  -> the real published base, including the variant segment,
 *                    e.g. "https://harvest-docs.gitbook.io/harvest"
 *                    or   "https://docs.<yourdomain>.com"
 *
 * Nothing else needs touching. Every link below is already mapped to its real
 * page path in the GitBook space, so the whole site switches over at once.
 * ---------------------------------------------------------------------------
 *
 * Until then DOCS_LIVE stays false and every docs link falls back to the
 * source repository, so the site never ships a dead link.
 *
 * Note the variant segment: the GitBook space is currently titled "HAREVST",
 * which puts the published pages under /harevst. Rename the space to HARVEST
 * before publishing — renaming afterwards breaks every URL below.
 */

export const SITE_URL = "https://harvest-website-delta.vercel.app";

export const DOCS_LIVE = true;

export const DOCS_BASE = "https://harvest-3.gitbook.io/harvest-docs";
export const DOCS_REPO = "https://github.com/karnrajsinghchauhan/harvest-docs";

/**
 * Real page paths in the GitBook space, verified against the live structure.
 *
 * Only pages intended to be public appear here. The internal set — the target
 * account list, sales playbook, NVIDIA strategy, buyer analysis, outreach,
 * unit economics, risk register, innovation backlog, offering economics and
 * regulatory yield — is deliberately absent, and should move to a separate
 * unpublished space before the docs site goes live.
 */
export const DOC = {
  home: "",

  // The data business
  pipeline: "/the-data-business/data-business",
  captureStack: "/the-data-business/capture-stack",
  deliveryFormat: "/the-data-business/delivery-format",
  pricing: "/the-data-business/pricing-licensing",
  scaling: "/the-data-business/scaling",

  // Platform
  platform: "/platform/platform",
  complianceRisk: "/platform/compliance-risk",

  // Capacity (throughput model only — unit economics stays internal)
  capacity: "/capacity/capacity",

  // Capital structures
  machineShares: "/capital-structures/machine-shares",
  stakeToCollect: "/capital-structures/stake-to-collect",
  investorGuide: "/capital-structures/investor-guide",
  comparableModels: "/capital-structures/comparable-models",

  // Agents
  agents: "/ai-agents-and-autonomy/ai-agents",
  humanInTheLoop: "/ai-agents-and-autonomy/human-in-the-loop",

  // Trust surface — the pages a buyer's legal and security reviewers open
  security: "/security/security",
  dataLicence: "/legal-and-corporate/data-license-agreement",
  operatorAgreement: "/legal-and-corporate/operator-agreement",
  terms: "/legal-and-corporate/terms-of-service",
  privacy: "/legal-and-corporate/privacy-policy",
  exportControl: "/legal-and-corporate/export-control",

  // Appendix
  faq: "/appendix/faq",
  glossary: "/appendix/glossary",
  roadmap: "/appendix/roadmap",
} as const;

export type DocKey = keyof typeof DOC;

/** Resolve a doc page to a URL. Falls back to the repo while unpublished. */
export const doc = (key: DocKey) => (DOCS_LIVE ? `${DOCS_BASE}${DOC[key]}` : DOCS_REPO);

/** The docs entry point, for nav and footer. */
export const DOCS = DOCS_LIVE ? DOCS_BASE : DOCS_REPO;

export const X_URL = "https://x.com/harvest";
