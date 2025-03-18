import estadosEnum from "./statesEnum";
import { UserType, generoEnum } from "./types";

export interface Address {
    cep: string;
    uf: string;
    cidade: string;
    logradouro: string;
    bairro: string;
    numero: string;
    referencia?: string;
    complemento?: string;
}

export interface EventPeriod {
    _id: string;
    inicio: Date;
    termino: Date;
    inscricoes: number;
    inscricoesMaximo?: number;
    cancelado: boolean;
}

export interface UserIdentification {
    nome: string;
    idUsuario?: string;
    username?: string;
}

export interface EventIdentification {
    titulo: string;
    rotaPublica: string;
    idEvento: string;
    endereco?: Address;
    banner?: string;
    instituicao?: UserIdentification;
}

export interface CategoryVM {
    _id: string;
    titulo: string;
}

export interface CategoryPicture extends CategoryVM {
    image: string
};

export interface EventSearchQuery {
    search?: string;
    uf?: string;
    category?: string;
}

export interface AuthInfo {
    accessToken: string;
    nome: string;
    username: string
    fotoPerfil: string | null;
    id: string;
    tipo: UserType;
}

export interface OperatorHomeInfo {
    name: string;
    organization: string;
}

export interface LocalStorageUserInfo {
    name: string;
    picture: string | null;
    type: UserType;
    lastUpdated: string;
    username: string;
}

export interface EventInfo {
    _id: string;
    _publicId: string;
    slug: string;
    titulo: string;
    descricao: string;
    banner?: string;
    endereco: Address;
    inscricoesInicio: string;
    inscricoesTermino: string;
    inscricoesAbertas: boolean;
    periodosOcorrencia: EventPeriod[];
    cancelado: boolean,
    visivel: boolean,
    categorias: CategoryVM[];
    inscricoes: number,
    instituicao: UserIdentification;
}

export interface EventCardInfo {
    banner?: string;
    titulo: string;
    _publicId: string;
    slug: string;
    criador: UserIdentification;
    periodosOcorrencia: EventPeriod[];
    endereco: Pick<Address, "cidade" | "uf">;
}

export interface EventOperatorCardInfo {
    id: string;
    titulo: string;
    banner: string;
    criador: UserIdentification;
    periodo: {
        id: string;
        inicio: string;
        termino: string;
    };
    endereco: Address;
}

export interface SubscriptionInfo {
    _id: string,
    periodo: Pick<EventPeriod, "inicio" | "termino" | "cancelado">;
    confirmada: boolean,
    evento: EventIdentification;
}

export interface FullSubscriptionInfo extends SubscriptionInfo {
    qrCode: string;
}

export interface ProfileInfo {
    username: string;
    tipo: string;
    quantiaEventos: number;
    createdAt: string;
}

export interface OrganizationProfileInfo extends ProfileInfo {
    nomeFantasia: string;
    eventos: EventInfo[];
    avaliacaoMedia: string;
    categoriasRamo: {
        slug: string;
        titulo: string;
    }[];
    avaliacoes: never[];
}

export interface ParticipantProfileInfo extends ProfileInfo {
    nomeCompleto: string;
    inscricoes: SubscriptionInfo[];
    categoriasFavoritas: {
        slug: string;
        titulo: string;
    }[];
    acompanhando: EventInfo[];
    configuracoes: {
        exibirInscricoes: boolean;
        exibirCategorias: boolean;
        exibirSeguindo: boolean;
        exibirHistorico: boolean;
    };
    quantiaEventos: number;
}

export interface OperatorSelectInfo {
    _id: string
    nomeCompleto: string;
}

export interface OperatorInfo {
    _id: string;
    nomeCompleto: string;
    email: string;
    ativo: boolean;
    confirmado: boolean;
    telefone: string;
}

export interface SubscriptionHistoryInfo {
    _id: string;
    evento: EventIdentification;
    participante: UserIdentification;
    dataParticipacao: string;
    avaliado: boolean;
}

export interface ReviewInfo {
    _id: string;
    autor: UserIdentification;
    nota: number;
    comentario: string;
    evento: EventIdentification;
}

export interface ParticipantRegistrationData {
    email: string;
    senha: string,
    nomeCompleto: string,
    documento: string,
    dataNascimento: string,
    genero: generoEnum,
    endereco: {
        cep: string,
        uf: estadosEnum,
        cidade: string,
        bairro: string,
        logradouro: string,
    },
    categoriasFavoritas: Array<CategoryVM>
}

export interface OrganizationRegistrationData {
    email: string;
    senha: string,
    nomeFantasia: string,
    documento: string,
    endereco: {
        cep: string,
        uf: estadosEnum,
        cidade: string,
        bairro: string,
        logradouro: string,
    },
    categoriasFavoritas: Array<CategoryVM>
}