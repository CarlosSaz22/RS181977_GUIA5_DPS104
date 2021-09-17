import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView
} from 'react-native';

import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';
import colors from '../src/utils/colors';
const Formulario = ({reservas, setReservas, guardarMostrarForm, guardarReservasStorage}) => {
//variables para el formulario
const [nombre, guardarNombre] = useState('');
const [value, setValue] = React.useState('Fumadores');
const [numeroPersonas, guardarNumeroPersonas] = useState('');
const [fecha, guardarFecha] = useState('');
const [hora, guardarHora] = useState('');
const [seccion, guardarSeccion] = useState('');
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
const showDatePicker = () => {
setDatePickerVisibility(true);
};

const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };
    const confirmarFecha = date => {
    const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
    };
    // Muestra u oculta el Time Picker
    const showTimePicker = () => {
    setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
    setTimePickerVisibility(false);
    };
    const confirmarHora = hora => {
    const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
    guardarHora(hora.toLocaleString('es-ES', opciones));
    hideTimePicker();
    };
    // Crear nueva cita
    const crearNuevaReserva = () => {
    // Validar
    if(nombre.trim() === '' ||
    numeroPersonas.trim() === '' ||
   
    fecha.trim() === '' ||
    hora.trim() === '' 
   )
    {
    // Falla la validación
    mostrarAlerta();
    return;
    }else if(numeroPersonas<=0){
         mostrarAlerta2();
    
    return;
    }
    // Crear una nueva reserva
    const reserva = { nombre, numeroPersonas, seccion, fecha, hora,value };
    reserva.id = shortid.generate();

    // Agregar al state
    const reservasNuevo = [...reservas, reserva];
    setReservas(reservasNuevo);
    // Pasar las nuevas rseservas a storage
    guardarReservasStorage(JSON.stringify(reservasNuevo));
    // Ocultar el formulario
    guardarMostrarForm(false);
    // Resetear el formulario
    guardarNombre('');

    guardarNumeroPersonas('');
guardarSeccion('');
guardarHora('');
guardarFecha('');

}
// Muestra la alerta si falla la validación
const mostrarAlerta = () => {
Alert.alert(
'Error', // Titulo
'Todos los campos son obligatorios', // mensaje
[{
text: 'OK' // Arreglo de botones
}]
)
}

// Muestra la alerta si falla la validación
const mostrarAlerta2 = () => {
Alert.alert(
'Error', // Titulo
'El Número de personas debe ser mayor a 0', // mensaje
[{
text: 'OK' // Arreglo de botones
}]
)
}

return (
<>
<ScrollView style={styles.formulario}>
<View>
<Text style={styles.label}>Nombre:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarNombre(texto) }
/>
</View>
<View>
<Text style={styles.label}>Número de numero Personas:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarNumeroPersonas(texto) }
keyboardType='numeric'
/>
</View>
<View>
<Text style={styles.label} >Selecione la sección:</Text>
  <View>
  <Text style={styles.label} >Sección fumadores</Text>

  <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View>
        <Text>fumadores</Text>
        <RadioButton value="Fumadores" />
      </View>
      <View>
        <Text>No fumadores</Text>
        <RadioButton value="No fumadores" />
      </View>
    </RadioButton.Group>

    </View>
</View>
<View>
<Text style={styles.label}>Fecha:</Text>
<Button title="Seleccionar Fecha" onPress={showDatePicker} />
<DateTimePickerModal
isVisible={isDatePickerVisible}
mode="date"
onConfirm={confirmarFecha}
onCancel={hideDatePicker}
locale='es_ES'
headerTextIOS="Elige la fecha"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{fecha}</Text>

</View>
<View>
<Text style={styles.label}>Hora:</Text>
<Button title="Seleccionar Hora" onPress={showTimePicker} />
<DateTimePickerModal
isVisible={isTimePickerVisible}
mode="time"
onConfirm={confirmarHora}
onCancel={hideTimePicker}
locale='es_ES'
headerTextIOS="Elige una Hora"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{hora}</Text>
</View>

<View>
<TouchableHighlight onPress={ () => crearNuevaReserva() }
style={styles.btnSubmit}>
<Text style={styles.textoSubmit}>Crear Nueva Reserva</Text>
</TouchableHighlight>
</View>
</ScrollView>
</>
);
}
const styles = StyleSheet.create({
formulario: {
backgroundColor: '#FFF',
paddingHorizontal: 20,
paddingVertical: 10,
flex: 1
},
label: {
fontWeight: 'bold',
fontSize: 18,
marginTop: 20
},
input: {
marginTop: 10,
height: 50,
borderColor: '#e1e1e1',
borderWidth: 1,
borderStyle: 'solid'
},
btnSubmit: {
padding: 10,
backgroundColor:colors.BUTTON_COLOR,
marginVertical: 10
},
textoSubmit: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
})
export default Formulario;