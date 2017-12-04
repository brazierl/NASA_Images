// Collection model
import { User } from './user';

export class Collection {
    _id: string;
    name: string;
    description: string;
    visibility: string;
    user: User;
}
