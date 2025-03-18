import { useDebounce } from 'use-debounce';
import { useState, useEffect } from "react";
import { fetchCEP } from '../api/location';
import { ViaCEP } from '../types/external';

const useCep = (onSuccess: (data: ViaCEP) => void, onError: () => void):
    [string, React.Dispatch<React.SetStateAction<string>>, ViaCEP | null] => {
    const [cep, setCep] = useState("");
    const [debouncedCep] = useDebounce(cep, 1000);
    const [cepInfo, setCepInfo] = useState<ViaCEP | null>(null);
    useEffect(() => {
        const value = cep.trim();
        if(value.length > 0 )
        fetchCEP(value)
            .then(({ data }) => {
                if(data.erro)
                    throw new Error();
                else {
                    setCepInfo(data);
                    onSuccess(data);
                }
            })
            .catch(err => {
                setCepInfo(null);
                onError();
            });
    }, [debouncedCep]);

    return [cep, setCep, cepInfo];
}

export default useCep;