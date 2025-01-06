import { useEffect, useState } from "react"

export const useDebounce = (value, delay = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            //use timeout to wait delay then setDebouncedValue to new value
            setDebouncedValue(value);
        },delay)

        return () => clearTimeout(timeout);
    },[value, delay]);
    // when value changes it will fire the useEffect
    // if value changes before timeout finishes and function fires..
    // it will return clearTimeout and set a new timeout

    return debouncedValue;
};