export class ResponseDto {
    status: number;
    error: boolean;
    message: string[];
    data: Record<string, any>;


    constructor(entity: Partial<ResponseDto>) {
        Object.assign(this, entity);
    }
}