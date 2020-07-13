export declare const useStatus: <T extends object, K extends keyof T, M extends { [P in K]: string; }, S extends (state: M) => M>(config: T) => [M, (cb: S) => M];
export default useStatus;
