import { FacebookLogo, InstagramLogo, TiktokLogo, TwitterLogo } from "phosphor-react";
import { Link } from "react-router-dom";

interface FooterLinkProps {
    to: string;
    text: string;
}

interface FooterTitleProps {
    text: string;
}


const FooterLink = ({to, text}: FooterLinkProps) => (
    <Link className="text-[#CDCDCD] mb-2 block hover:underline" to={to}>{text}</Link>
)

const FooterTitle = ({text}: FooterTitleProps) => (
    <h1 className="text-white mb-9 text-2xl font-bold font-footer-title">{text}</h1>
)

export function Footer() {
    return (
        <footer className="bg-[#422855] w-full pt-16 lg:px-24 md:px-12 px-3">
            <div className="flex gap-10 pb-3 flex-col items-center sm:items-start sm:flex-row">
                <div className="text-center sm:text-left">
                    <FooterTitle text="EVENTOS" />
                    <FooterLink text="Mais Recentes" to="/eventos" />
                    <FooterLink text="Em Destaque" to="/eventos" />
                    <FooterLink text="Mais aguardados" to="/eventos" />
                    <FooterLink text="Recomendados" to="/eventos" />
                </div>
                <div className="text-center sm:text-left">
                    <FooterTitle text="CATEGORIAS" />
                    <FooterLink text="Lazer" to="/eventos?category=lazer" />
                    <FooterLink text="Negócios" to="/eventos?category=negocios" />
                    <FooterLink text="Palestra" to="/eventos?category=palestra" />
                    <FooterLink text="Infantil" to="/eventos?category=infantil" />
                    <FooterLink text="Religioso" to="/eventos?category=religioso" />
                    <FooterLink text="Esportes" to="/eventos?category=esportes" />
                    <FooterLink text="Entretenimento" to="/eventos?category=entretenimento" />
                    <FooterLink text="Animais" to="/eventos?category=animais" />
                </div>
                <div className="text-center sm:text-left">
                    <FooterTitle text="AJUDA" />
                    <FooterLink text="Sobre Dyon" to="/sobre" />
                    <FooterLink text="Termos de Uso e Serviço" to="/termos-de-servico" />
                    <FooterLink text="Política de Privacidade" to="/politica-de-privacidade" />
                </div>
            </div>
            <div className="mt-4 border-t-2 border-[#cdcdcd80] py-6" id="footer">
                <div className="flex gap-3">
                    <InstagramLogo size={34} color={"#CDCDCD"} className="hover:cursor-pointer"><a href="#"></a></InstagramLogo>
                    <FacebookLogo size={34} color={"#CDCDCD"} className="hover:cursor-pointer"><a href="#"></a></FacebookLogo>
                    <TwitterLogo size={34} color={"#CDCDCD"} className="hover:cursor-pointer"><a href="#"></a></TwitterLogo>
                    <TiktokLogo size={34} color={"#CDCDCD"} className="hover:cursor-pointer"><a href="#"></a></TiktokLogo>
                </div>
                <p className="text-[#cdcdcd80]">Dyon © Copyright 2022-{new Date().getUTCFullYear()}</p>
            </div>
        </footer>
    )
}