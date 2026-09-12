import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { Message, MessageLoadMatch } from '../CustomTempMailTypes';
declare class MessageEntity extends CustomTempMailEntityBase<Message> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: MessageEntity): MessageEntity;
    load(this: any, reqmatch?: MessageLoadMatch, ctrl?: Control): Promise<MessageEntity>;
}
export { MessageEntity };
