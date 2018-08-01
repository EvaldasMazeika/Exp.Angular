import { Property } from './Property';

export interface MyForm {
    name: string;
    _id?: string;
    items: Array<Property>;
}
