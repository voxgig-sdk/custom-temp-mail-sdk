import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { CustomDomainVerify, CustomDomainVerifyCreateData } from '../CustomTempMailTypes';
declare class CustomDomainVerifyEntity extends CustomTempMailEntityBase<CustomDomainVerify> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: CustomDomainVerifyEntity): CustomDomainVerifyEntity;
    create(this: any, reqdata?: CustomDomainVerifyCreateData, ctrl?: Control): Promise<CustomDomainVerifyEntity>;
}
export { CustomDomainVerifyEntity };
