import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { Plan, PlanLoadMatch } from '../CustomTempMailTypes';
declare class PlanEntity extends CustomTempMailEntityBase<Plan> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: PlanEntity): PlanEntity;
    load(this: any, reqmatch?: PlanLoadMatch, ctrl?: Control): Promise<PlanEntity>;
}
export { PlanEntity };
