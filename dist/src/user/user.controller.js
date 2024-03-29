"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/decorators");
const get_current_user_role_decorator_1 = require("../common/decorators/get-current-user-role.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers(role) {
        return this.userService.getUsers(role);
    }
    getOrganisations(role) {
        return this.userService.getOrganisations(role);
    }
    getMe(userId) {
        return this.userService.getMe(userId);
    }
    findDocuments(userId) {
        return this.userService.getUserDocuments(userId);
    }
    getHome(userId) {
        return this.userService.getHome(userId);
    }
    getProfile(handle, userId, role) {
        return this.userService.getProfile(handle, userId, role);
    }
    update(id, updateUserDto, userId) {
        return this.userService.update(id, updateUserDto, userId);
    }
    remove(id, role) {
        return this.userService.remove(id, role);
    }
};
__decorate([
    (0, common_1.Get)('/admin/users'),
    __param(0, (0, get_current_user_role_decorator_1.GetCurrentUserRole)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/admin/organisations'),
    __param(0, (0, get_current_user_role_decorator_1.GetCurrentUserRole)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOrganisations", null);
__decorate([
    (0, common_1.Get)('/me'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)('/documents'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findDocuments", null);
__decorate([
    (0, common_1.Get)('/home'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getHome", null);
__decorate([
    (0, common_1.Get)('/profile/:handle'),
    __param(0, (0, common_1.Param)('handle')),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, get_current_user_role_decorator_1.GetCurrentUserRole)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_current_user_role_decorator_1.GetCurrentUserRole)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map