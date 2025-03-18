import axios from "axios";
import { IBGECity, ViaCEP } from "../types/external";

/**
 * Fetches localization data based on the specified CEP code
 */
export function fetchCEP(cep: string) {
    return axios<ViaCEP>(`https://viacep.com.br/ws/${cep}/json/`, { method: "GET" });
}

export function fetchCities(uf: string) {
    return axios<IBGECity>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`, { method: "GET" });
}