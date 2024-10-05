import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { GlobalVariableService } from 'src/helper/globalVar';

@Injectable()
export class SwitchDbMiddleware implements NestMiddleware {
    private connections: Map<string, DataSource> = new Map();

    constructor(
        @InjectDataSource('nest_j') private readonly primaryDataSource: DataSource,
        @InjectDataSource('adit') private readonly secondaryDataSource: DataSource,
        private readonly globalVar: GlobalVariableService
    ) {
        // Store initial connections in the map
        this.connections.set('nest_j', this.primaryDataSource);
        this.connections.set('adit', this.secondaryDataSource);
    }

    async use(req: Request, res: Response, next: Function) {
        // Determine the connection name based on the URL path
        let connectionName = 'nest_j';
        if (req.path.startsWith('/database/switch/adit')) {
            connectionName = 'adit';
        }

        // Set the global variable for later use
        this.globalVar.setVariable(connectionName);

        // Get the appropriate connection from the map
        const connection = this.connections.get(connectionName);

        if (!connection) {
            return res.status(500).send('Database connection not found');
        }

        // Ensure the connection is initialized
        if (!connection.isInitialized) {
            await connection.initialize();
        }

        // Proceed to the next request handler
        next();
    }
}