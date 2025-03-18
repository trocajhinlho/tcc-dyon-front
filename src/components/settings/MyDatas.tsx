export default function MyDatas() {
    return (
        <div className="shadow-lg flex-grow rounded-xl px-8 py-5 mb-12">
            <div>
                <form action="#" method="post" className="flex justify-between gap-10 pb-2 px-3 flex-col">
                    <div className="w-full">
                        <h1 className="text-3xl font-semibold text-[#2D3436] mb-8 border-b border-b-[#ddd] pb-3">E-mail</h1>
                        <div className="flex flex-col w-full px-3">
                            <label htmlFor="email" className="text-base font-semibold mb-1">E-mail</label>
                            <input type="email" name="email" id="email" placeholder="e-mail" value={"gabrieladossie@email.com"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-full" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <h1 className="text-3xl font-semibold text-[#2D3436] mb-8 border-b border-b-[#ddd] pb-3">Dados Gerais</h1>
                        <div className="flex flex-col w-full px-3 mb-3">
                            <label htmlFor="cpf" className="text-base font-semibold mb-1">CPF</label>
                            <input type="text" name="cpf" id="cpf" placeholder="CPF" value={"999.999.999-99"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-full" />
                        </div>
                        <div className="flex flex-col w-full px-3 mb-3">
                            <label htmlFor="cpf" className="text-base font-semibold mb-1">Data de nascimento</label>
                            <input type="date" name="date" id="date" value={"12/12/1994"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-full" />
                        </div>
                        <div className="flex flex-col w-full px-3 mb-3">
                            <label htmlFor="gender" className="text-base font-semibold mb-1">Gênero</label>
                            <select name="gender" id="gender" className="bg-[#EEEEEE]  rounded-lg  w-[320px] h-[40px] outline-[#7F529F] font-medium p-2" >
                                <option selected >Outros</option>
                                <option >Masculino</option>
                                <option >Feminino</option>
                                <option >Prefiro não dizer</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-3xl font-semibold text-[#2D3436] mb-8 border-b border-b-[#ddd] pb-3">Endereço</h1>
                        <div className="flex w-full flex-wrap">

                            <div className="flex flex-col px-3 mt-2">
                                <label htmlFor="cep" className="text-base font-semibold mb-1">CEP</label>
                                <input type="text" name="cep" id="cep" placeholder="CEP" value={"99999-999"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-full" />
                            </div>
                            <div className="flex flex-col px-3 mt-2">
                                <label htmlFor="state" className="text-base font-semibold mb-1">Estado</label>
                                <select name="state" id="state" className="bg-[#EEEEEE]  rounded-lg  w-[320px] h-[40px] outline-[#7F529F] font-medium p-2" >
                                    <option selected >Estado</option>
                                    <option >São paulo</option>
                                    <option >Rio de Janeiro</option>
                                </select>
                            </div>
                            <div className="flex flex-col px-3 mt-2">
                                <label htmlFor="city" className="text-base font-semibold mb-1">Cidade</label>
                                <input type="text" name="city" id="city" placeholder="Cidade" value={"Santo André"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-[384px]" />
                            </div>
                            <div className="flex flex-col px-3 mt-2">
                                <label htmlFor="logradouro" className="text-base font-semibold mb-1">Logradouro</label>
                                <input type="text" name="logradouro" id="logradouro" placeholder="Logradouro" value={"José pinheral"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-full" />
                            </div>
                            <div className="flex flex-col px-3 mt-2">
                                <label htmlFor="bairro" className="text-base font-semibold mb-1">Bairro</label>
                                <input type="text" name="bairro" id="bairro" placeholder="Bairro" value={"Casaquistão"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-[384px]" />
                            </div>
                            <div className="flex flex-col px-3 mt-2">
                                <label htmlFor="number" className="text-base font-semibold mb-1">Número</label>
                                <input type="number" name="number" id="number" placeholder="Número" value={"999"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-[96px]" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button className="bg-[#EFEFEF] w-24 py-2 px-4 rounded-lg  text-[#333333] font-bold text-base items-center justify-center flex">Cancelar</button>
                        <button className="bg-[#7F529F] w-24 py-2 px-4 rounded-lg  text-white font-bold text-base items-center justify-center flex">Salvar</button>
                    </div>
                </form>
            </div>

        </div>

    )
}