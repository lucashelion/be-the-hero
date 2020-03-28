import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

function Casos(){
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetalhes(caso){
        navigation.navigate('Detalhes', { caso });
    }

    async function carregarCasos(){
        if(loading) return;

        if(total > 0 && casos.length == total) return;

        setLoading(true);

        const response = await api.get('casos', { params: { page } });
        setCasos([... casos, ... response.data]);
        setTotal(response.headers['X-Total-Count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        carregarCasos();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList 
                data={casos}
                style={styles.casosList}
                keyExtractor={caso => { return String(caso.id) }}
                showsVerticalScrollIndicator={false}
                onEndReached={carregarCasos}
                onEndReachedThreshold={0.2}
                renderItem={( { item: caso } ) => {return (
                    <View style={styles.caso}>
                        <Text style={styles.casoPropriedade}>ONG:</Text>
                        <Text style={styles.casoValor}>{caso.nome}</Text>

                        <Text style={styles.casoPropriedade}>CASO:</Text>
                        <Text style={styles.casoValor}>{caso.titulo}</Text>

                        <Text style={styles.casoPropriedade}>Valor:</Text>
                        <Text style={styles.casoValor}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                                }).format(caso.valor)}
                        </Text>

                        <TouchableOpacity style={styles.btnDetalhes} onPress={() => navigateToDetalhes(caso)}>
                            <Text style={styles.btnDetalhesText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}} 
            />
        </View>
    );
}

export default Casos;