import { FreshdeskAgent } from '../config/types';

export interface IFreshdeskApiService {
    getAllAgents(pages: number): Promise<FreshdeskAgent[]>;
    getAgentIDByEmail(email: string): Promise<number>;
    getAgentFooterByID(id: number): Promise<string>;
    putSignature(agentId: number, signature: freshdeskSignature): Promise<void>;
}

type freshdeskSignature = {
    signature: string;
};
