import BaseApi from '../_BaseApi';
import { User } from '../../interfaces';
export default class UsersAPI extends BaseApi<User> {
    constructor();
    Me(): Promise<User>;
}
