type ValidationResult<T> = {
    pass:boolean,
    message?:string,
    data?:T
}

type Poll = {
    fid:number  | undefined,
    question:string  | undefined,
    options:string  | undefined,
    validatedOptions:ValidationResult<string[]> | undefined
}