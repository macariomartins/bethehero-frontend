import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history     = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        if (id) {
            try {
                const response = await api.post('sessions', { id });

                localStorage.setItem('ong_id', id);
                localStorage.setItem('ong_name', response.data.name);

                history.push('/profile');
            } catch (err) {
                alert('Falha no login. Tente novamente.');
            }
        } else {
            alert('Insira seu ID para entrar.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        type="text"
                    />

                    <button className="button" type="submit">Entrar</button>
                </form>

                <Link to="/register" className="bethehero-link">
                    <FiLogIn size={16} color="#e02041" />
                    Não tenho cadastro
                </Link>    
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}