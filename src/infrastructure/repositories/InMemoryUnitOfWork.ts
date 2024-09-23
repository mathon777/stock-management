import { UnitOfWork } from "../../domain/repositories/UnitOfWork";

export type InMemorySession = null;
export class InMemoryUnitOfWork implements UnitOfWork<InMemorySession> {
  async start(): Promise<void> {}

  async commit(): Promise<void> {}

  async rollback(): Promise<void> {}

  getSession(): InMemorySession {
    return null;
  }
}
