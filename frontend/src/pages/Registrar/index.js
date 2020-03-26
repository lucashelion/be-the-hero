import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

function Registrar(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function fazerCadastro(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        };

        try{
            const result = await api.post('ongs', data);
            alert('Seu ID de acesso é: ' + result.data.id);
            history.push('/');
        }
        catch(erro){
            alert('Erro no cadastro. Tente novamente.');
        }
    }

    return(
        <div className="registrar-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>
                        Faça o seu cadastro, entre na plataforma e ajude pessoas a 
                        encontrarem os casos da sua ONG.
                    </p>
                    <Link className="backlink" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={fazerCadastro}>
                    <input placeholder="Nome da ONG" value={nome} onChange={e => setNome(e.target.value)} />
                    <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    <div className="input-group">
                        <input placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                        <input placeholder="UF" style={{ width: 80 }} value={uf} onChange={e => setUf(e.target.value)} />
                    </div>

                    <button className="btn-app" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Registrar;