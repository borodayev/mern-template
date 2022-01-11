export default interface Connection<ConnectionType> {
  getConnection(): Promise<ConnectionType>;
  connect(): Promise<ConnectionType>;
  disconnect(): Promise<void>;
}
