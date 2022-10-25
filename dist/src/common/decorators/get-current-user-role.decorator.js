"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserRole = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUserRole = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user['roles'][0];
});
//# sourceMappingURL=get-current-user-role.decorator.js.map