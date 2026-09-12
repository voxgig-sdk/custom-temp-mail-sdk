import { CustomTempMailEntityBase } from '../CustomTempMailEntityBase';
import type { CustomTempMailSDK } from '../CustomTempMailSDK';
import type { Control } from '../types';
import type { PublicV1DashboardAnalytics, PublicV1DashboardAnalyticsLoadMatch } from '../CustomTempMailTypes';
declare class PublicV1DashboardAnalyticsEntity extends CustomTempMailEntityBase<PublicV1DashboardAnalytics> {
    constructor(client: CustomTempMailSDK, entopts: any);
    make(this: PublicV1DashboardAnalyticsEntity): PublicV1DashboardAnalyticsEntity;
    load(this: any, reqmatch?: PublicV1DashboardAnalyticsLoadMatch, ctrl?: Control): Promise<PublicV1DashboardAnalyticsEntity>;
}
export { PublicV1DashboardAnalyticsEntity };
