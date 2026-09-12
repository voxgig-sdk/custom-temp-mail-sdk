import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { Domain, DomainListMatch } from '../CustomTempMailTypes';
declare class DomainEntity extends CustomTempMailEntityBase<Domain> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: DomainEntity): DomainEntity;
    list(this: any, reqmatch?: DomainListMatch, ctrl?: Control): Promise<DomainEntity[]>;
}
export { DomainEntity };
