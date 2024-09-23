export interface UnitOfWork<SessionResponse = unknown> {
  start(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getSession(): SessionResponse;
}
