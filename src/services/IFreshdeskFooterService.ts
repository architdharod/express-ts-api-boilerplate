export interface IFreshdeskFooterService {
  getFooterByID(id: number): Promise<string>;

  getFooterByEmail(email: string): Promise<string>;

  getAllFooters(): Promise<string>;
  //getsAgentFooter(email: string): Promise<string>;
  //getAllFooters<T>(): Promise<T>;
  //putAgentFooter(): Promise<string>;
  //putAllFooters(footerHTML: string): Promise<string>;
}
