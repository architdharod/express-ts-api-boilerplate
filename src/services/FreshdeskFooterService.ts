import { injectable, inject } from 'tsyringe';
import { IFreshdeskFooterService } from './IFreshdeskFooterService';
import { IFreshdeskApiService } from './IFreshdeskApiService';
import { FreshdeskAgent } from '../config/types';
import { HtmlError } from '../utils/HtmlError';
import Debug from 'debug';
const debug: Debug.IDebugger = Debug('Freshdesk Footer Service');

@injectable()
export class FreshdeskFooterService implements IFreshdeskFooterService {
    private _freshdeskApiService: IFreshdeskApiService;

    constructor(@inject('FreshdeskApiService') freshdeskApiService: IFreshdeskApiService) {
        this._freshdeskApiService = freshdeskApiService;
    }

    putAgentFooter = async (agentId: number, signature: string): Promise<void> => {
        throw new Error('Method not implemented.');
    };

    putAllFooters = async (newFooter: string): Promise<void> => {
        // 1. get all agent info (from page 1 through 2. Read Freshdesk API docs for more details)
        const objectArray1 = await this._freshdeskApiService.getAllAgents(1);
        const objectArray2 = await this._freshdeskApiService.getAllAgents(2);
        const allAgentsObject = [...objectArray1, ...objectArray2];

        // 2. extract all the footers
        const parsedInformationObject = this.extractIdAndSignature(allAgentsObject);

        // 3. Check and modify the footers
        if (allAgentsObject.length === parsedInformationObject.successfullyParsedCount) {
            const updatedInformation = parsedInformationObject.idSignatureArray.map((agent: { id: number; signature: string | null }) => {
                console.log('TEST: \n ' + this.modifySignature(agent.signature, newFooter) + '\n \n');
                return {
                    id: agent.id,
                    signature: this.modifySignature(agent.signature, newFooter),
                };
            });

            // 4. perform post requests for every agent in the list!
            await this.performPostRequests(updatedInformation);
        } else {
            throw new HtmlError('Internal server error: Could not update all the signatures', 500);
        }
    };

    getFooterByID = async (id: number): Promise<string> => {
        const footer = await this._freshdeskApiService.getAgentFooterByID(id);
        return footer;
    };

    getFooterByEmail = async (email: string): Promise<string> => {
        throw new Error('Method not implemented.');
    };

    getAllFooters = async (): Promise<FreshdeskAgent[]> => {
        const AgentsObject = await this._freshdeskApiService.getAllAgents(1);
        return AgentsObject;
    };

    //FIXME: where and how should this be implemented for better testing?
    private extractIdAndSignature(agentObject: FreshdeskAgent[]): {
        idSignatureArray: Array<{ id: number; signature: string | null }>;
        successfullyParsedCount: number;
    } {
        try {
            const idSignatureArray = agentObject.map((obj) => {
                return {
                    id: obj.id,
                    signature: obj.signature,
                };
            });

            return {
                idSignatureArray,
                successfullyParsedCount: idSignatureArray.length,
            };
        } catch (error) {
            throw new HtmlError('Internal error', 500);
        }
    }

    //FIXME: where andhow should this be implemented for better testing?
    private modifySignature(oldFooter: string | null, newFooter: string): string {
        if (oldFooter === null) {
            return '<div id="global">' + newFooter + '</div>';
        }

        const globalTag = '<div id="global">';
        const index = oldFooter.indexOf(globalTag);

        if (index !== -1) {
            return oldFooter.slice(0, index + globalTag.length) + newFooter + '</div>';
        } else {
            return oldFooter + ' ' + globalTag + newFooter + '</div>';
        }
    }

    //FIXME: where and how should this be implemented for better testing :)
    private async performPostRequests(updatedInformation: { id: number; signature: string }[]) {
        for (const data of updatedInformation) {
            try {
                const response = await this._freshdeskApiService.putSignature(data.id, { signature: data.signature });
                debug('Request succeeded for ' + data.id);
            } catch (error) {
                console.log(`ERROR in FreshdeskFooterService.performPostRequest()` + error);
            }
        }
    }
}
