export interface IFreshdeskFooterService {
    getFooterByID(id: number): Promise<string>;

    getFooterByEmail(email: string): Promise<string>;

    getAllFooters(): Promise<string>;

    putAgentFooter(agentId: number, signature: string): Promise<void>;

    putAllFooters(footer: string): Promise<any>;
}
