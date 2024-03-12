export const validateOptions = (inputText:string): ValidationResult<string[]>=>{
    const transformed = inputText.trim().split(process.env.FC_POLL_SEPARATOR as string).map((val:string)=>val.trim()).filter((val:string)=>val.length > 0);
    if(transformed.length < 2 || transformed.length > 9){
        return {
            pass:false,
            message: "Inadequate poll options. Please provide Min. 2 or Max.9 options to create a poll."
        }
    }

    return {
        pass:true,
        data:transformed
    }
}