import { Address } from "../types/interface";

export function useAddress(address: Address) {
    const { logradouro, bairro, cidade, cep, numero, uf, complemento } = address;
    const fullAddress = `${logradouro}, ${numero} - ${bairro}, ${cidade} - ${uf}, ${cep} ${complemento ? "," + complemento : ""}`;
    return fullAddress[0].toLocaleUpperCase() + fullAddress.slice(1);
}