import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { PublicV1Message, PublicV1MessageLoadMatch, PublicV1MessageRemoveMatch } from '../CustomTempMailTypes';
declare class PublicV1MessageEntity extends CustomTempMailEntityBase<PublicV1Message> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: PublicV1MessageEntity): PublicV1MessageEntity;
    load(this: any, reqmatch?: PublicV1MessageLoadMatch, ctrl?: Control): Promise<PublicV1MessageEntity>;
    remove(this: any, reqmatch?: PublicV1MessageRemoveMatch, ctrl?: Control): Promise<PublicV1MessageEntity>;
}
export { PublicV1MessageEntity };
