import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { Otp, OtpLoadMatch } from '../CustomTempMailTypes';
declare class OtpEntity extends CustomTempMailEntityBase<Otp> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: OtpEntity): OtpEntity;
    load(this: any, reqmatch?: OtpLoadMatch, ctrl?: Control): Promise<OtpEntity>;
}
export { OtpEntity };
