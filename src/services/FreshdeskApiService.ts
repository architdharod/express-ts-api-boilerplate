import { IFreshdeskApiService } from './IFreshdeskApiService';
import { array, z } from 'zod';
import axios from 'axios';
import { FreshdeskAgentSchema } from '../config/types';
import { freshdesk_api_base_url, freshdeskAuth, freshdeskHeaders } from '../config/freshdeskApiConfig';
import { FreshdeskAgent } from '../config/types';
import { HtmlError } from '../utils/HtmlError';

export class FreshdeskApiService implements IFreshdeskApiService {
    async getAgentFooterByID(id: number): Promise<string> {
        const response = await axios.get(`${freshdesk_api_base_url}/api/v2/agents/${id}`, {
            headers: freshdeskHeaders,
            auth: freshdeskAuth,
        });

        if (!('signature' in response.data)) {
            throw new HtmlError('Response data does not have a signature', 404);
        }
        return response.data.signature;
    }

    async getAllAgents(pages: number): Promise<FreshdeskAgent[]> {
        const response = await axios.get(`${freshdesk_api_base_url}/api/v2/agents?per_page=100&page=${pages}`, {
            headers: freshdeskHeaders,
            auth: freshdeskAuth,
        });

        const agentsJson = response.data;

        return agentsJson;
    }

    async getAgentIDByEmail(email: string): Promise<number> {
        //TODO: check if email is of a valid format

        const response = await axios.get(`${freshdesk_api_base_url}/api/v2/agents?email=${email}`, {
            headers: freshdeskHeaders,
            auth: freshdeskAuth,
        });
        if (!('id' in response.data)) {
            throw new HtmlError('Response data does not have an id field', 500);
        }
        return response.data.id;
    }

    async putSignature(agentId: number, signature: { signature: string }): Promise<void> {
        const response = await axios.put(`${freshdesk_api_base_url}/api/v2/agents/${agentId}`, signature, {
            headers: freshdeskHeaders,
            auth: freshdeskAuth,
        });
    }
}
