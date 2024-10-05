import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalVariableService {
    private globalVar: string;

    setVariable(value: string) {
        this.globalVar = value;
    }

    getVariable(): string {
        return this.globalVar;
    }
}
