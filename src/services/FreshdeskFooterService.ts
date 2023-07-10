import { IFreshdeskFooterService } from './IFreshdeskFooterService';

export class FreshdeskFooterService implements IFreshdeskFooterService {
    async getFooterByID(id: number): Promise<string> {
        //validate that input is a string!
        return 'your id was: ' + id + ' (Implementation of IFreshdeskFooterService)';
    }

    async getFooterByEmail(email: string): Promise<string> {
        return 'text' + email;
    }

    async getAllFooters(): Promise<string> {
        return 'So you wanted all the footers? hahah ';
    }
}
