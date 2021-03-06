import React, {useState} from 'react';

import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native';

import api from '../services/api';

function Cep (){

    let [cep, setCep] = useState ('');
    let [cepUsuario, setCepUsuario] = useState (null);

async function buscarCep(){

    if(cep == ''){
        alert ("Digite um cep válido!");
        setCep('');
        setCepUsuario(null);
    }
    try{
        const response = await api.get('/'+cep+'/json/');
        console.log(response.data);
        setCepUsuario(response.data);
       Keyboard.dismiss();
    } 
    catch(erro){
        setCepUsuario(null);
        alert("o cep não foi encontrado");
    }
}

    return(
<View style={styles.container}>
    <Image
    source = {{uri: 'https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-47-512.png'}}
    style={{width:128, height:128, marginTop:50}}
    resizeMode='cover'
    />
<Text style={styles.titulo}> Busca de Cep
</Text>
<TextInput style={styles.busca}
keyboardType='numeric'
placeholder='Digite um Cep (ex:18133400)'
value={cep}
onChangeText={(valor) => setCep(valor)}
/>

<TouchableOpacity style={styles.botao} onpress={buscarCep}>
    <Text style={styles.textoBotao}> Pesquisar</Text>

</TouchableOpacity>

{
cepUsuario &&

<View style={styles.resultado}>
    <Text style={styles.textoResulatdo}> Cep: {cepUsuario.cep}</Text>
    <Text style={styles.textoResulatdo}> Rua:{cepUsuario.logradouro}</Text>
    <Text style={styles.textoResulatdo}> Bairro:{cepUsuario.bairro}</Text>
    <Text style={styles.textoResulatdo}> Cidade:{cepUsuario.localidade} </Text>
    <Text style={styles.textoResulatdo}> uf:{cepUsuario.uf} </Text>

  </View>
}

</View>

    )

}

export default Cep;

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#0099CC',
        flex:1,
        alignItems:'center'
    },
    titulo:{
        marginTop:25,
        color:'white',
        marginBottom:15,
        fontSize:25,
        fontWeight:'bold'
    },
    busca:{
        fontSize:20,
        color: '#FFF',
        width: '90%',
        padding:20,
        borderColor:'white',
        borderWidth:1
    },
    botao:{
        backgroundColor:'#333399',
        height:50,
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:20,
        marginTop:20
    },
    textoBotao:{
        fontSize:15,
        color:'#FFF'
    },
    resultado:{
        marginTop:50,
        marginLeft:20,
        alignItems:'center'
    },
    textoBotao:{
        fontSize:20,
        color:'#FFF'
    }
});