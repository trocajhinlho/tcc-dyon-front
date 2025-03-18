export interface ViaCEP {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: true;
}

export type IBGECity = {
    id: string;
    nome: string;
}[] | IBGEError

export interface IBGEError {
    statusCode: number;
    message: string;
}

export const isIBGEError = (res: IBGECity): res is IBGEError => (res as IBGEError).statusCode !== undefined;