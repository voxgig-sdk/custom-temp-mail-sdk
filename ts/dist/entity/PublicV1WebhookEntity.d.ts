import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { PublicV1Webhook, PublicV1WebhookListMatch, PublicV1WebhookCreateData, PublicV1WebhookRemoveMatch } from '../CustomTempMailTypes';
declare class PublicV1WebhookEntity extends CustomTempMailEntityBase<PublicV1Webhook> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: PublicV1WebhookEntity): PublicV1WebhookEntity;
    list(this: any, reqmatch?: PublicV1WebhookListMatch, ctrl?: Control): Promise<PublicV1WebhookEntity[]>;
    create(this: any, reqdata?: PublicV1WebhookCreateData, ctrl?: Control): Promise<PublicV1WebhookEntity>;
    remove(this: any, reqmatch?: PublicV1WebhookRemoveMatch, ctrl?: Control): Promise<PublicV1WebhookEntity>;
}
export { PublicV1WebhookEntity };
