export interface IFreshdeskFooterService {
  //TODO: the id type should be a number.
  getAgentFooter(id: number): Promise<string>;

  //getAllFooters<T>(): Promise<T>;
  //putAgentFooter(): Promise<string>;
  //putAllFooters(footerHTML: string): Promise<string>;
}
