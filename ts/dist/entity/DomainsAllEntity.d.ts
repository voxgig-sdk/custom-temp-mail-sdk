import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { DomainsAll, DomainsAllListMatch } from '../CustomTempMailTypes';
declare class DomainsAllEntity extends CustomTempMailEntityBase<DomainsAll> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: DomainsAllEntity): DomainsAllEntity;
    list(this: any, reqmatch?: DomainsAllListMatch, ctrl?: Control): Promise<DomainsAllEntity[]>;
}
export { DomainsAllEntity };
