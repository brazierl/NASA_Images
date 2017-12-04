import { Collection } from './collection';

export class DmcaRequest {
    _id: string;
    image_collection: Collection;
    body: String;
    subject: String;
    from: String;
    date: Date;
}
