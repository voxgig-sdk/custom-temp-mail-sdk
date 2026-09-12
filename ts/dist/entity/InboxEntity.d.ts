import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { Inbox, InboxLoadMatch, InboxCreateData } from '../CustomTempMailTypes';
declare class InboxEntity extends CustomTempMailEntityBase<Inbox> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: InboxEntity): InboxEntity;
    load(this: any, reqmatch?: InboxLoadMatch, ctrl?: Control): Promise<InboxEntity>;
    create(this: any, reqdata?: InboxCreateData, ctrl?: Control): Promise<InboxEntity>;
}
export { InboxEntity };
