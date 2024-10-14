import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
    private userId: string;
    private dbList: string[]

    setUserId(userId: string) {
        this.userId = userId;
    }

    getUserId() {
        return this.userId;
    }

    setDbList(dbList: string[]) {
        this.dbList = dbList
    }

    getDbList() {
        return this.dbList
    }

}