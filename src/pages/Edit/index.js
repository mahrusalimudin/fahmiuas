import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import {InputData} from '../../components';
import FIREBASE from '../../config/FIREBASE';

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      nomorHP: '',
      alamat: '',
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('Kontak/' + this.props.route.params.id)
      .once('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let kontakItem = {...data};

        this.setState({
          nama: kontakItem.nama,
          nomorHP: kontakItem.nomorHP,
          alamat: kontakItem.alamat,
        });
      });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    if (this.state.nama && this.state.nomorHP && this.state.alamat) {
      const kontakReferensi = FIREBASE.database().ref(
        'Kontak/' + this.props.route.params.id,
      );

      const kontak = {
        nama: this.state.nama,
        nomorHP: this.state.nomorHP,
        alamat: this.state.alamat,
      };

      kontakReferensi
        .update(kontak)
        .then(data => {
          Alert.alert('Sukses', 'Data Terupdate');
          this.props.navigation.replace('Home');
        })
        .catch(error => {
          console.log('Error : ', error);
        });
    } else {
      Alert.alert('Error', 'Nama Aplikasi, Email, dan Password wajib diisi');
    }
  };

  render() {
    return (
      <View style={styles.pages}>
        <InputData
          label="Nama Aplikasi"
          placeholder="Masukkan Nama Aplikasi"
          onChangeText={this.onChangeText}
          value={this.state.nama}
          namaState="nama"
        />
        <InputData
          label="Email"
          placeholder="Masukkan Email "
          onChangeText={this.onChangeText}
          value={this.state.nomorHP}
          namaState="nomorHP"
        />

        <InputData
          label="Password"
          placeholder="Masukkan Password"
          isTextArea={true}
          onChangeText={this.onChangeText}
          value={this.state.alamat}
          namaState="alamat"
        />

        <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
          <Text style={styles.textTombol}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  tombol: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
