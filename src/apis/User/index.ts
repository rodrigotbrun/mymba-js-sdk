import BaseApi from '../_BaseApi';
import { User } from '../../interfaces'

export default class UsersAPI extends BaseApi<User> {

    constructor() {
        super('usuarios');
    }

    public Me(): Promise<User> {
        return this.Api().send('GET', 'v1', this.route('me'));
    }

}