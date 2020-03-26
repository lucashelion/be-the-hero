import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

function Perfil(){
    const [casos, setCasos] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');

    useEffect(() => {
        api.get('perfil', {
            headers: { Authorization: ongId }
        }).then(result => { 
            setCasos(result.data);
        });
    }, [ongId]);

    async function efetuarDeleteCaso(id){
        try{
            await api.delete('casos/' + id, {
                headers: { Authorization: ongId }
            });

            const casosAtualizado = casos.filter(caso => { return caso.id !== id });
            setCasos(casosAtualizado);
        }   
        catch(erro){
            alert('Erro ao deletar caso. Tente novamente.');
        }
    }

    function efetuarLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="perfil-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongNome}</span>

                <Link className="btn-app" to="/casos/novo">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick={efetuarLogout} size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso => { return(
                    <li key={caso.id}>
                        <strong>CASO:</strong>
                        <p>{caso.titulo}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{caso.descricao}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}</p>

                        <button onClick={() => efetuarDeleteCaso(caso.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                );})}
            </ul>
        </div>
    );
}

export default Perfil;