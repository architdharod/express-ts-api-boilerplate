import envVar from './environmentVariables';
export const freshdesk_api_base_url = 'https://pflanzmich.freshdesk.com';

export const freshdeskHeaders = {
  Accept: 'application/json;charset=UTF-8',
  'Content-Type': 'application/json;charset=UTF-8',
};

export const freshdeskAuth = {
  username: envVar.freshdeskApiUsername,
  password: envVar.freshdeskApiPassword,
};
