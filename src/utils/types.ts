type ValidationResultType<T> = {
    pass:boolean,
    message?:string,
    data?:T
}

type PollType = {
    fid:number  | undefined,
    question:string  | undefined,
    options:string  | undefined,
    duration: number | undefined,
    validatedOptions:ValidationResultType<string[]> | undefined
    _id:number | undefined
}