import { IFreshdeskApiService } from './IFreshdeskApiService';
import { z } from 'zod';
import axios from 'axios';
import { FreshdeskAgentSchema } from '../config/types';
import { freshdesk_api_base_url, freshdeskAuth, freshdeskHeaders } from '../config/freshdeskApiConfig';
import { FreshdeskAgent } from '../config/types';

export class FreshdeskApiService implements IFreshdeskApiService {
  async getAllAgents(): Promise<FreshdeskAgent[]> {
    try {
      const response = await axios.get(`${freshdesk_api_base_url}/api/v2/agents?per_page=100`, {
        headers: freshdeskHeaders,
        auth: freshdeskAuth,
      });

      //response validation check!
      const agentsJson = response.data;
      const agents = z.array(FreshdeskAgentSchema).safeParse(agentsJson);

      if (!agents.success) {
        throw new Error('Invalid agent data received from the API!');
      }

      return agents.data;
    } catch (error) {
      throw error;
    }
  }

  async getAgentIDByEmail(email: string): Promise<number> {
    //TODO: check if email is of a valid format
    try {
      const response = await axios.get(`${freshdesk_api_base_url}/api/v2/agents?email=${email}`, {
        headers: freshdeskHeaders,
        auth: freshdeskAuth,
      });
      if (!('id' in response.data)) {
        throw new Error('Response data does not have an id field');
      }
      return response.data.id;
    } catch (error) {
      //do a better error handeling and logging here!
      throw error;
    }
  }

  async putSignature(agentId: number, signature: { signature: string }): Promise<FreshdeskAgent[]> {
    const response = await axios.put(`${freshdesk_api_base_url}/api/v2/agents/${agentId}`, signature, {
      headers: freshdeskHeaders,
      auth: freshdeskAuth,
    });

    const responseJson = response.data;
    const parseResponse = z.array(FreshdeskAgentSchema).safeParse(responseJson);

    if (!parseResponse.success) {
      throw new Error('Invalid response from the API');
    }

    return parseResponse.data;
  }
}
