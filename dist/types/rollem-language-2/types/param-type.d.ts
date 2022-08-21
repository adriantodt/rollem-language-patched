/** For generating parameter types for containers. */
export declare type ParamType<T> = Omit<ExceptOfType<T, Function>, "depth" | "dice">;
/** Constructs valid object depending on condition. */
export declare type ExceptOfType<Base, Condition> = Pick<Base, ExceptOfTypeAllowedKeys<Base, Condition>>;
/** Constructs valid object depending on condition. */
export declare type OnlyOfType<Base, Condition> = Pick<Base, OnlyOfTypeAllowedKeys<Base, Condition>>;
/** Selects valid Keys depending on condition. */
declare type ExceptOfTypeAllowedKeys<Base, Condition> = ExceptOfTypeFilter<Base, Condition>[keyof Base];
/** Selects valid Keys depending on condition. */
declare type OnlyOfTypeAllowedKeys<Base, Condition> = OnlyOfTypeFilter<Base, Condition>[keyof Base];
/** Sets Base[Key] types to `never` depending on condition. */
declare type OnlyOfTypeFilter<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
/** Sets Base[Key] types to `never` depending on condition. */
declare type ExceptOfTypeFilter<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
};
export {};
