import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

function Detalhes(){
    const navigation = useNavigation();
    const route = useRoute();

    const caso = route.params.caso;
    const mensagem = "Olá " + caso.nome + ", estou entrando em contato para ajudar no caso: " + 
        caso.titulo + " com o valor de " + 
        Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor);

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: 'Herói do caso: ' + caso.titulo,
            recipients: [caso.email],
            body: mensagem,
        });

        console.log('Email enviado');
    }

    function sendWhatsapp(){
        Linking.openURL('whatsapp://send?phone=55' + caso.whatsapp + '&text=' + mensagem);
    }

    return(
        <View style={styles.content}>
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.caso}>
                <Text style={[styles.casoPropriedade, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.casoValor}>{caso.nome} de {caso.cidade}/{caso.uf}</Text>

                <Text style={styles.casoPropriedade}>CASO:</Text>
                <Text style={styles.casoValor}>{caso.titulo}</Text>

                <Text style={styles.casoPropriedade}>Valor:</Text>
                <Text style={styles.casoValor}>{caso.valor}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Detalhes;