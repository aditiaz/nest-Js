import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

@Injectable()
export class DynamicDatabaseService {
    private readonly database_list: string[];
    private activeDataSource: DataSource;

    constructor(private readonly configService: ConfigService) {
        this.database_list = [
            this.configService.getOrThrow("DATABASE_NAME1"),
            this.configService.getOrThrow("DATABASE_NAME2"),
        ];
    }

    getDatabaseList(): string[] {
        return this.database_list;
    }

    async switchConnection(connectionName: string): Promise<DataSource> {
        // Mengecek apakah ada koneksi aktif
        if (this.activeDataSource && this.activeDataSource.isInitialized) {
            if (this.activeDataSource.options.database === connectionName) {
                return this.activeDataSource; // Koneksi yang sama, tidak perlu diubah
            }
            await this.activeDataSource.destroy(); // Hentikan koneksi sebelumnya
        }

        // Membuat koneksi baru
        this.activeDataSource = new DataSource({
            type: 'postgres', // atau jenis database lain yang kamu gunakan
            host: this.configService.getOrThrow('HOST'),
            port: this.configService.getOrThrow('PORT'),
            username: this.configService.getOrThrow('USERNAME'),
            password: this.configService.getOrThrow('PASSWORD'),
            database: connectionName, // Nama database yang dipilih
        });

        // Inisialisasi koneksi baru
        return await this.activeDataSource.initialize();
    }

    getCurrentDatabase(): string {
        // Memastikan activeDataSource sudah diinisialisasi sebelum mengakses options
        if (!this.activeDataSource) {
            throw new Error("No active database connection");
        }
        return this.activeDataSource.options.database as string; // Mengembalikan nama database aktif
    }
}
