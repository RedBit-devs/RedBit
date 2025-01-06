type CustomErrorMessage = {
    espectedFrom: string;
    reason: CustomErrorReasons;
    table?: string;
    target?: unknown;
}