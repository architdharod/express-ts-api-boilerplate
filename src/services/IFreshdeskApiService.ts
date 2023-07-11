import { FreshdeskAgent } from '../config/types';

export interface IFreshdeskApiService {
    getAllAgents(): Promise<FreshdeskAgent[]>;
    getAgentIDByEmail(email: string): Promise<number>;
    getAgentFooterByID(id: number): Promise<string>;
    putSignature(agentId: number, signature: freshdeskSignature): Promise<FreshdeskAgent[]>;
}

type freshdeskSignature = {
    signature: string;
};
