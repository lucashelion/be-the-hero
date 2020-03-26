import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function efetuarLogin(e){
        e.preventDefault();

        try{
            const result = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', result.data.nome);

            history.push('/perfil');
        }
        catch(erro){
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={efetuarLogin}>
                    <h1>Faça seu login</h1>
                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="btn-app" type="submit">Entrar</button>
                    <Link className="backlink" to="/registrar">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

export default Login;