"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserType = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUserType = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user['type'][0];
});
//# sourceMappingURL=get-current-user-type.decorator.js.map