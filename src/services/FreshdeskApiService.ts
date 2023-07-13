import { IFreshdeskApiService } from './IFreshdeskApiService';
import { z } from 'zod';
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

    async getAllAgents(): Promise<FreshdeskAgent[]> {
        const response = await axios.get(`${freshdesk_api_base_url}/api/v2/agents?per_page=100`, {
            headers: freshdeskHeaders,
            auth: freshdeskAuth,
        });

        //response validation check!
        const agentsJson = response.data;
        const agents = z.array(FreshdeskAgentSchema).safeParse(agentsJson);

        if (!agents.success) {
            throw new HtmlError('Invalid agent data received from the API!', 500);
        }
        return agents.data;
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

    async putSignature(agentId: number, signature: { signature: string }): Promise<FreshdeskAgent[]> {
        const response = await axios.put(`${freshdesk_api_base_url}/api/v2/agents/${agentId}`, signature, {
            headers: freshdeskHeaders,
            auth: freshdeskAuth,
        });

        const responseJson = response.data;
        const parseResponse = z.array(FreshdeskAgentSchema).safeParse(responseJson);

        //FIXME: Edge case: Footers for certain agents might not get successful. The script should still work for all others!
        if (!parseResponse.success) {
            throw new HtmlError('Internal Server error: Freshdesk Response did not match the Object Blueprint', 500);
        }

        return parseResponse.data;
    }
}
