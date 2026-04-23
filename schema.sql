-- Initial Schema for Signflo D1 Database

DROP TABLE IF EXISTS agreements;
CREATE TABLE agreements (
    id TEXT PRIMARY KEY,
    schema_json TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_email TEXT
);

DROP TABLE IF EXISTS submissions;
CREATE TABLE submissions (
    id TEXT PRIMARY KEY,
    agreement_id TEXT NOT NULL,
    data_json TEXT NOT NULL,
    signature_url TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(agreement_id) REFERENCES agreements(id)
);
