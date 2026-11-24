CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  interest TEXT NOT NULL,
  message TEXT NOT NULL,
  received_at INTEGER NOT NULL,
  notification_sent_at INTEGER,
  notification_message_id TEXT,
  notification_next_at INTEGER NOT NULL DEFAULT 0,
  notification_attempts INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS enquiries_received_at ON enquiries(received_at);
CREATE INDEX IF NOT EXISTS enquiries_email_received_at ON enquiries(email, received_at);
CREATE INDEX IF NOT EXISTS enquiries_pending_notification
  ON enquiries(notification_next_at, received_at)
  WHERE notification_sent_at IS NULL;
