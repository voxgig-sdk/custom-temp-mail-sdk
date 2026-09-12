import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { Usage, UsageLoadMatch } from '../CustomTempMailTypes';
declare class UsageEntity extends CustomTempMailEntityBase<Usage> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: UsageEntity): UsageEntity;
    load(this: any, reqmatch?: UsageLoadMatch, ctrl?: Control): Promise<UsageEntity>;
}
export { UsageEntity };
