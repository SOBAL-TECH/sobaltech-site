-- =============================================================================
-- SobalTech — Supabase Schema
-- Schema: sobaltech
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================================================

-- ─── Create schema ────────────────────────────────────────────────────────────
CREATE SCHEMA IF NOT EXISTS sobaltech;

-- ─── Updated-at trigger function ──────────────────────────────────────────────
-- Prisma manages updatedAt from the app layer, but this trigger ensures
-- the column is correct if any rows are modified outside of Prisma.
CREATE OR REPLACE FUNCTION sobaltech.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE sobaltech."UserRole" AS ENUM (
  'SUPER_ADMIN',
  'ADMIN',
  'EDITOR'
);

CREATE TYPE sobaltech."ProjectStatus" AS ENUM (
  'IN_PROGRESS',
  'COMPLETED',
  'ARCHIVED'
);

CREATE TYPE sobaltech."PostStatus" AS ENUM (
  'DRAFT',
  'PUBLISHED',
  'ARCHIVED'
);

CREATE TYPE sobaltech."SubmissionStatus" AS ENUM (
  'NEW',
  'IN_REVIEW',
  'RESPONDED',
  'CLOSED'
);

CREATE TYPE sobaltech."ApplicationStatus" AS ENUM (
  'NEW',
  'REVIEWING',
  'SHORTLISTED',
  'INTERVIEWED',
  'OFFERED',
  'REJECTED'
);

-- =============================================================================
-- AUTH TABLES
-- =============================================================================

-- ─── users ───────────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.users (
  id              TEXT        NOT NULL,
  name            TEXT,
  email           TEXT        NOT NULL,
  "emailVerified" TIMESTAMP(3),
  image           TEXT,
  password        TEXT,
  role            sobaltech."UserRole" NOT NULL DEFAULT 'ADMIN',
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX users_email_key ON sobaltech.users (email);

CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON sobaltech.users
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- ─── accounts ─────────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.accounts (
  id                  TEXT    NOT NULL,
  "userId"            TEXT    NOT NULL,
  type                TEXT    NOT NULL,
  provider            TEXT    NOT NULL,
  "providerAccountId" TEXT    NOT NULL,
  refresh_token       TEXT,
  access_token        TEXT,
  expires_at          INTEGER,
  token_type          TEXT,
  scope               TEXT,
  id_token            TEXT,
  session_state       TEXT,

  CONSTRAINT accounts_pkey PRIMARY KEY (id),
  CONSTRAINT accounts_userId_fkey
    FOREIGN KEY ("userId") REFERENCES sobaltech.users (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX accounts_provider_providerAccountId_key
  ON sobaltech.accounts (provider, "providerAccountId");

-- ─── sessions ─────────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.sessions (
  id             TEXT        NOT NULL,
  "sessionToken" TEXT        NOT NULL,
  "userId"       TEXT        NOT NULL,
  expires        TIMESTAMP(3) NOT NULL,

  CONSTRAINT sessions_pkey PRIMARY KEY (id),
  CONSTRAINT sessions_userId_fkey
    FOREIGN KEY ("userId") REFERENCES sobaltech.users (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX sessions_sessionToken_key ON sobaltech.sessions ("sessionToken");

-- ─── verification_tokens ──────────────────────────────────────────────────────
CREATE TABLE sobaltech.verification_tokens (
  identifier TEXT        NOT NULL,
  token      TEXT        NOT NULL,
  expires    TIMESTAMP(3) NOT NULL
);

CREATE UNIQUE INDEX verification_tokens_token_key
  ON sobaltech.verification_tokens (token);

CREATE UNIQUE INDEX verification_tokens_identifier_token_key
  ON sobaltech.verification_tokens (identifier, token);

-- =============================================================================
-- CONTENT TABLES
-- =============================================================================

-- ─── services ─────────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.services (
  id            TEXT     NOT NULL,
  title         TEXT     NOT NULL,
  slug          TEXT     NOT NULL,
  description   TEXT     NOT NULL,
  content       TEXT     NOT NULL,
  icon          TEXT,
  image         TEXT,
  features      TEXT[]   NOT NULL DEFAULT ARRAY[]::TEXT[],
  "order"       INTEGER  NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN  NOT NULL DEFAULT TRUE,
  "seoTitle"    TEXT,
  "seoDesc"     TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT services_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX services_slug_key ON sobaltech.services (slug);

CREATE TRIGGER services_set_updated_at
  BEFORE UPDATE ON sobaltech.services
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- ─── products ─────────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.products (
  id            TEXT     NOT NULL,
  title         TEXT     NOT NULL,
  slug          TEXT     NOT NULL,
  description   TEXT     NOT NULL,
  content       TEXT     NOT NULL,
  icon          TEXT,
  image         TEXT,
  features      TEXT[]   NOT NULL DEFAULT ARRAY[]::TEXT[],
  price         TEXT,
  "ctaLabel"    TEXT     NOT NULL DEFAULT 'Request Demo',
  "ctaHref"     TEXT     NOT NULL DEFAULT '/request-quote',
  "order"       INTEGER  NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN  NOT NULL DEFAULT TRUE,
  "seoTitle"    TEXT,
  "seoDesc"     TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT products_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX products_slug_key ON sobaltech.products (slug);

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON sobaltech.products
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- ─── projects ─────────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.projects (
  id            TEXT        NOT NULL,
  title         TEXT        NOT NULL,
  slug          TEXT        NOT NULL,
  summary       TEXT        NOT NULL,
  description   TEXT        NOT NULL,
  "coverImage"  TEXT,
  images        TEXT[]      NOT NULL DEFAULT ARRAY[]::TEXT[],
  tags          TEXT[]      NOT NULL DEFAULT ARRAY[]::TEXT[],
  client        TEXT,
  "liveUrl"     TEXT,
  "githubUrl"   TEXT,
  status        sobaltech."ProjectStatus" NOT NULL DEFAULT 'COMPLETED',
  "isFeatured"  BOOLEAN     NOT NULL DEFAULT FALSE,
  "order"       INTEGER     NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN     NOT NULL DEFAULT TRUE,
  "completedAt" TIMESTAMP(3),
  "seoTitle"    TEXT,
  "seoDesc"     TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT projects_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX projects_slug_key ON sobaltech.projects (slug);

CREATE TRIGGER projects_set_updated_at
  BEFORE UPDATE ON sobaltech.projects
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- ─── blog_posts ───────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.blog_posts (
  id            TEXT      NOT NULL,
  title         TEXT      NOT NULL,
  slug          TEXT      NOT NULL,
  excerpt       TEXT      NOT NULL,
  content       TEXT      NOT NULL,
  "coverImage"  TEXT,
  tags          TEXT[]    NOT NULL DEFAULT ARRAY[]::TEXT[],
  author        TEXT      NOT NULL DEFAULT 'SobalTech Team',
  "authorImage" TEXT,
  status        sobaltech."PostStatus" NOT NULL DEFAULT 'DRAFT',
  "isFeatured"  BOOLEAN   NOT NULL DEFAULT FALSE,
  "readTime"    INTEGER   NOT NULL DEFAULT 5,
  views         INTEGER   NOT NULL DEFAULT 0,
  "seoTitle"    TEXT,
  "seoDesc"     TEXT,
  "publishedAt" TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT blog_posts_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX blog_posts_slug_key ON sobaltech.blog_posts (slug);

CREATE TRIGGER blog_posts_set_updated_at
  BEFORE UPDATE ON sobaltech.blog_posts
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- ─── testimonials ─────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.testimonials (
  id            TEXT     NOT NULL,
  name          TEXT     NOT NULL,
  role          TEXT     NOT NULL,
  company       TEXT     NOT NULL,
  avatar        TEXT,
  content       TEXT     NOT NULL,
  rating        INTEGER  NOT NULL DEFAULT 5,
  "isFeatured"  BOOLEAN  NOT NULL DEFAULT FALSE,
  "isPublished" BOOLEAN  NOT NULL DEFAULT TRUE,
  "order"       INTEGER  NOT NULL DEFAULT 0,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);

CREATE TRIGGER testimonials_set_updated_at
  BEFORE UPDATE ON sobaltech.testimonials
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- ─── team_members ─────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.team_members (
  id            TEXT     NOT NULL,
  name          TEXT     NOT NULL,
  role          TEXT     NOT NULL,
  bio           TEXT,
  avatar        TEXT,
  email         TEXT,
  "linkedIn"    TEXT,
  twitter       TEXT,
  github        TEXT,
  "order"       INTEGER  NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN  NOT NULL DEFAULT TRUE,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT team_members_pkey PRIMARY KEY (id)
);

CREATE TRIGGER team_members_set_updated_at
  BEFORE UPDATE ON sobaltech.team_members
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- =============================================================================
-- CONTACT & QUOTES
-- =============================================================================

-- ─── contact_submissions ──────────────────────────────────────────────────────
CREATE TABLE sobaltech.contact_submissions (
  id          TEXT        NOT NULL,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  company     TEXT,
  subject     TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  status      sobaltech."SubmissionStatus" NOT NULL DEFAULT 'NEW',
  notes       TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT contact_submissions_pkey PRIMARY KEY (id)
);

CREATE TRIGGER contact_submissions_set_updated_at
  BEFORE UPDATE ON sobaltech.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- ─── quote_requests ───────────────────────────────────────────────────────────
CREATE TABLE sobaltech.quote_requests (
  id            TEXT        NOT NULL,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT,
  company       TEXT,
  "projectType" TEXT        NOT NULL,
  budget        TEXT,
  timeline      TEXT,
  description   TEXT        NOT NULL,
  services      TEXT[]      NOT NULL DEFAULT ARRAY[]::TEXT[],
  status        sobaltech."SubmissionStatus" NOT NULL DEFAULT 'NEW',
  notes         TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT quote_requests_pkey PRIMARY KEY (id)
);

CREATE TRIGGER quote_requests_set_updated_at
  BEFORE UPDATE ON sobaltech.quote_requests
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- =============================================================================
-- CAREERS
-- =============================================================================

-- ─── job_postings ─────────────────────────────────────────────────────────────
CREATE TABLE sobaltech.job_postings (
  id               TEXT        NOT NULL,
  title            TEXT        NOT NULL,
  slug             TEXT        NOT NULL,
  department       TEXT        NOT NULL,
  type             TEXT        NOT NULL,
  location         TEXT        NOT NULL,
  summary          TEXT        NOT NULL,
  description      TEXT        NOT NULL,
  requirements     TEXT[]      NOT NULL DEFAULT ARRAY[]::TEXT[],
  responsibilities TEXT[]      NOT NULL DEFAULT ARRAY[]::TEXT[],
  "isPublished"    BOOLEAN     NOT NULL DEFAULT TRUE,
  "closingDate"    TIMESTAMP(3),
  "order"          INTEGER     NOT NULL DEFAULT 0,
  "seoTitle"       TEXT,
  "seoDesc"        TEXT,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT job_postings_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX job_postings_slug_key ON sobaltech.job_postings (slug);

CREATE TRIGGER job_postings_set_updated_at
  BEFORE UPDATE ON sobaltech.job_postings
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- ─── job_applications ─────────────────────────────────────────────────────────
CREATE TABLE sobaltech.job_applications (
  id             TEXT        NOT NULL,
  "jobId"        TEXT        NOT NULL,
  name           TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  phone          TEXT,
  "linkedIn"     TEXT,
  "portfolioUrl" TEXT,
  "coverLetter"  TEXT        NOT NULL,
  "resumeUrl"    TEXT,
  status         sobaltech."ApplicationStatus" NOT NULL DEFAULT 'NEW',
  notes          TEXT,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT job_applications_pkey PRIMARY KEY (id),
  CONSTRAINT job_applications_jobId_fkey
    FOREIGN KEY ("jobId") REFERENCES sobaltech.job_postings (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TRIGGER job_applications_set_updated_at
  BEFORE UPDATE ON sobaltech.job_applications
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- =============================================================================
-- SITE SETTINGS
-- =============================================================================

CREATE TABLE sobaltech.site_settings (
  id          TEXT     NOT NULL,
  key         TEXT     NOT NULL,
  value       TEXT     NOT NULL,
  type        TEXT     NOT NULL DEFAULT 'text',
  "group"     TEXT     NOT NULL DEFAULT 'general',
  label       TEXT     NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT site_settings_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX site_settings_key_key ON sobaltech.site_settings (key);

CREATE TRIGGER site_settings_set_updated_at
  BEFORE UPDATE ON sobaltech.site_settings
  FOR EACH ROW EXECUTE FUNCTION sobaltech.set_updated_at();

-- =============================================================================
-- GRANT access to authenticated Supabase roles
-- (adjust if using service_role only)
-- =============================================================================

GRANT USAGE ON SCHEMA sobaltech TO anon, authenticated, service_role;

GRANT ALL ON ALL TABLES IN SCHEMA sobaltech TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA sobaltech TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA sobaltech TO anon, authenticated, service_role;
