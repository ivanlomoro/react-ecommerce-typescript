import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,inicialValue: T | (() => T)) {
    const [value, setValue] = useState<T> (() =>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if (typeof inicialValue === "function"){
            return (inicialValue as () => T)()
        }else{
            return inicialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key,value])

    return [value, setValue] as [typeof value, typeof setValue]
}