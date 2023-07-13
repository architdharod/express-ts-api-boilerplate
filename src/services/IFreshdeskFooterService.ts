import { FreshdeskAgent } from '../config/types';

export interface IFreshdeskFooterService {
    getFooterByID(id: number): Promise<string>;

    getFooterByEmail(email: string): Promise<string>;

    getAllFooters(): Promise<FreshdeskAgent[]>;

    putAgentFooter(agentId: number, signature: string): Promise<void>;

    putAllFooters(NewFooter: string): Promise<void>;
}
