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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/decorators");
const document_service_1 = require("./document.service");
const create_document_dto_1 = require("./dto/create-document.dto");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    create(createDocumentDto, userId) {
        return this.documentService.create(createDocumentDto, userId);
    }
    getSharedDocs(userId) {
        return this.documentService.getSharedDocs(userId);
    }
    findAll() {
        return this.documentService.findAll();
    }
    findOne(id) {
        return this.documentService.findOne(id);
    }
    remove(id, userId) {
        return this.documentService.remove(id, userId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_dto_1.CreateDocumentDto, String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/shared'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "getSharedDocs", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "remove", null);
DocumentController = __decorate([
    (0, swagger_1.ApiTags)('Document'),
    (0, common_1.Controller)('document'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map