import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { CustomDomain, CustomDomainListMatch, CustomDomainCreateData, CustomDomainRemoveMatch } from '../CustomTempMailTypes';
declare class CustomDomainEntity extends CustomTempMailEntityBase<CustomDomain> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: CustomDomainEntity): CustomDomainEntity;
    list(this: any, reqmatch?: CustomDomainListMatch, ctrl?: Control): Promise<CustomDomainEntity[]>;
    create(this: any, reqdata?: CustomDomainCreateData, ctrl?: Control): Promise<CustomDomainEntity>;
    remove(this: any, reqmatch?: CustomDomainRemoveMatch, ctrl?: Control): Promise<CustomDomainEntity>;
}
export { CustomDomainEntity };
