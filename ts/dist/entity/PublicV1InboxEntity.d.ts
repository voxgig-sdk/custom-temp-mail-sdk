import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { PublicV1Inbox, PublicV1InboxCreateData, PublicV1InboxRemoveMatch } from '../CustomTempMailTypes';
declare class PublicV1InboxEntity extends CustomTempMailEntityBase<PublicV1Inbox> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: PublicV1InboxEntity): PublicV1InboxEntity;
    create(this: any, reqdata?: PublicV1InboxCreateData, ctrl?: Control): Promise<PublicV1InboxEntity>;
    remove(this: any, reqmatch?: PublicV1InboxRemoveMatch, ctrl?: Control): Promise<PublicV1InboxEntity>;
}
export { PublicV1InboxEntity };
