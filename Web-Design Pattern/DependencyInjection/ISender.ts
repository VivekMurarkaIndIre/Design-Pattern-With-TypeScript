

export interface ISender {
    send(to:string, message:string):Promise<void>;
};