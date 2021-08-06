import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  faPencilAlt,
  faPenFancy,
  faTrash,
  faTrashRestore,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Tampil = ({id, kontakItem, navigation, removeData}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Detail', {id: id})}>
      <View>
        <Text style={styles.nama}>{kontakItem.nama}</Text>
        <Text style={styles.noHP}>Email : {kontakItem.noHP}</Text>
      </View>
      <View style={styles.icon}>
        <FontAwesomeIcon
          icon={faPencilAlt}
          color={'black'}
          size={25}
          onPress={() => navigation.navigate('Edit', {id: id})}
        />
        <FontAwesomeIcon
          icon={faTrashRestore}
          color={'black'}
          size={25}
          onPress={() => removeData(id)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Tampil;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#FFFACD',
  },
  nama: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noHP: {
    fontSize: 12,
    color: 'gray',
  },
  icon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
