import { Address, AuthInfo, EventPeriod } from "./interface";
import estadosEnum from "./statesEnum";

export type APIResponse<T> = {
    msg: string;
    erro?: boolean;
    dados: T | undefined;
    detalhes?: APIValidationError[];
    redirect?: string;
}

export type APIValidationError = {
    value: string;
    msg: string;
    param: string;
}

export type AccessTokenResponse = APIResponse<{ accessToken: string }>;

export type HTTPMethod = "POST" | "PUT" | "PATCH" | "DELETE" | "GET";

// -----------------------------------

export type AuthInfoContext = {
    auth: AuthInfo | null;
    setAuth: (data: any) => any;
    setAccessToken: (token: string) => void;
}

export type UserType = "Participante" | "Instituicao" | "Operador";

//-----------------------------------

export type SubscriptionPageState = {
    periods: EventPeriod[];
    banner: string;
    eventInfo: {
        titulo: string;
        banner?: string;
        endereco: Address;
    }
} | null;
export type CheckoutPageState = {
    subscriptionId: string;
    pageTitle: string;
} | null;

export type ScanResult = {
    msg: string;
    error: boolean;
} | null;

export type ImageFile = File & { preview: string; };

export enum generoEnum {
    masculino ="Masculino",
    feminino ="Feminino",
    outro = "Outro",
}


export type ParticipantBasicStepFormData = {
    cpf:string
    name: string;
    email: string;
    senha: string;
    dateBirth: Date;
    genero:generoEnum;
};

export type OrganizationBasicStepFormData = {
    documento:string
    nomeFantasia: string;
    email: string;
    senha: string;
};

export type LocationStepFormData = {
    cep: string;
    uf: estadosEnum;
    cidade: string;
    bairro: string;
    logradouro:string
};