export interface IFreshdeskFooterService {
  getFooterByID(id: number): Promise<string>;

  getFooterByEmail(email: string): Promise<string>;

  getAllFooters(): Promise<string>;

  //putAgentFooter(): Promise<string>;
  //putAllFooters(footerHTML: string): Promise<string>;
}
