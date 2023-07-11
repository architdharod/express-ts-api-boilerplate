import { injectable, inject } from 'tsyringe';
import { IFreshdeskFooterService } from './IFreshdeskFooterService';
import { IFreshdeskApiService } from './IFreshdeskApiService';

@injectable()
export class FreshdeskFooterService implements IFreshdeskFooterService {
    private _freshdeskApiService: IFreshdeskApiService;

    constructor(@inject('FreshdeskApiService') freshdeskApiService: IFreshdeskApiService) {
        this._freshdeskApiService = freshdeskApiService;
    }

    async putAgentFooter(agentId: number, signature: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async putAllFooters(footer: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getFooterByID = async (id: number): Promise<string> => {
        const footer = await this._freshdeskApiService.getAgentFooterByID(id);
        return footer;
    };
    async getFooterByEmail(email: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
    async getAllFooters(): Promise<string> {
        throw new Error('Method not implemented.');
    }
}
