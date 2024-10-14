import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { DynamicEndPointsService } from "src/dynamic_enpoints/dynamic.endpoints.service";
import { RequestService } from "src/request.service";


@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AuthenticationMiddleware.name)

    constructor(private readonly requestService: RequestService,
        private readonly databaseService: DynamicEndPointsService) { }

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(AuthenticationMiddleware.name)
        const userId = 'sayaHaxouerEy Ay earDone! 🤣'
        const dbList = this.databaseService.getDatabaseList();
        this.requestService.setDbList(dbList)
        console.log(dbList)
        this.requestService.setUserId(userId);
        this.logger.log("ada orang ngakunya KANG bikin website 🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣 ")
        this.logger.log("LAPTOP ANDA KENA HEX BY EY AY HAXOUR CILIMOUSE EARDONE 🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣 ")
        next();
    }
}