import { Context } from './Context';
declare class CustomTempMailError extends Error {
    isCustomTempMailError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CustomTempMailError };
