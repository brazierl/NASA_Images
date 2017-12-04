// Image model
import { Collection } from './collection';

export class Image {
    _id: string;
    url: string;
    title: string;
    description: string;
    image_collection: Collection;
}
