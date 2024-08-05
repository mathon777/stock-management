import { MongoClient, ClientSession } from "mongodb";
import { UnitOfWork } from "../../domain/repositories/UnitOfWork";

export class MongoUnitOfWork implements UnitOfWork<ClientSession> {
  private session: ClientSession | null = null;

  constructor(private client: MongoClient) {}

  async start(): Promise<void> {
    this.session = this.client.startSession();
    this.session.startTransaction();
  }

  async commit(): Promise<void> {
    if (!this.session) {
      throw new Error("No active session to commit.");
    }
    await this.session.commitTransaction();
    await this.session.endSession();

    this.session = null;
  }

  async rollback(): Promise<void> {
    if (!this.session) {
      throw new Error("No active session to rollback.");
    }
    await this.session.abortTransaction();
    await this.session.endSession();

    this.session = null;
  }

  getSession(): ClientSession {
    if (!this.session) {
      throw new Error(
        "Session not started. Call start() before getting the session.",
      );
    }
    return this.session;
  }
}
