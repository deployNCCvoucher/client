import { useEffect, useState } from "react"

export const useDebounce = (value: string|undefined, delay: number) => {
    const [debounceValue, setDebounceValue] = useState<string|undefined>(value)

    useEffect(() => {
        const handleTime = setTimeout(() =>{
            setDebounceValue(value)
        }, delay)
        return () => clearTimeout(handleTime)
    }, [value])
    return debounceValue
}