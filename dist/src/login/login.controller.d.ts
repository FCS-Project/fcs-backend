import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
}
