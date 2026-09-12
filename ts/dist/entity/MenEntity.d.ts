import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { Men, MenLoadMatch } from '../CustomTempMailTypes';
declare class MenEntity extends CustomTempMailEntityBase<Men> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: MenEntity): MenEntity;
    load(this: any, reqmatch?: MenLoadMatch, ctrl?: Control): Promise<MenEntity>;
}
export { MenEntity };
