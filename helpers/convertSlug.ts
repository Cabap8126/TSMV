import unidecode from "unidecode"
export const convertSlug = (text : String) : string =>{
    const unidecodeText = unidecode(text.trim());
    const slug : string = unidecodeText.replace(/\s +/g,"-");
    return slug
}