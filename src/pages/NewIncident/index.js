import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle]             = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue]             = useState('');
    const history                       = useHistory();
    
    async function handleNewIncident(e) {
        e.preventDefault();

        if (title && description && value) {
            const ong_id = localStorage.getItem('ong_id');
            const data = {
                title,
                description,
                value
            };

            try {
                await api.post('incidents', data, {
                    headers: {
                        Authorization: ong_id
                    }
                });

                history.push('/profile');
            } catch (err) {
                alert('Falha ao cadastrar o caso. Tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }        
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="bethehero-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                    />

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        type="text"
                    />
                    
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}