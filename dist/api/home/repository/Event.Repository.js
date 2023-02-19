"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Event_1 = require("../../../entities/Event");
const enum_1 = require("../../../shared/enums/enum");
let EventRepository = class EventRepository extends typeorm_1.Repository {
    async selectEvents(isLimit, eventTap) {
        let queryBuilder = await this.createQueryBuilder('event');
        if (eventTap) {
            const isOngoing = eventTap === enum_1.EVENT_TAP.ONGOING;
            queryBuilder = queryBuilder.where(`event.endDate ${isOngoing ? `>` : `<`} NOW()`);
            if (isOngoing) {
                queryBuilder = queryBuilder.orWhere(`event.endDate IS NULL`);
            }
        }
        if (isLimit) {
            queryBuilder = queryBuilder.limit(4);
        }
        return queryBuilder.orderBy('event.startDate', 'DESC').getMany();
    }
};
EventRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(Event_1.Event)
], EventRepository);
exports.EventRepository = EventRepository;
//# sourceMappingURL=Event.Repository.js.map