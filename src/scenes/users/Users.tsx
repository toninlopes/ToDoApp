import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, RefreshControl} from 'react-native';
import {User} from './components';
import {fetchUsersAsync} from '../../service/connector';
import {IUser} from '../../types';

const Users = (props: any) => {
  const [users, setUsers] = useState(Array<IUser>());
  const [isRefresing, setRefresh] = useState(false);

  const _keyExtractor = (item: IUser) => item.id.toString();

  const _fetchDataAsync = async () => {
    setRefresh(true);
    const users = await fetchUsersAsync();
    setUsers(users);
    setRefresh(false);
  };

  const _renderItem = ({item}: {item: IUser}) => {
    return (
      <User
        name={item.name}
        email={item.email}
        username={item.username}
        onPress={() => props.navigation.navigate('Tasks', {user: item})}
      />
    );
  };

  useEffect(() => {
    _fetchDataAsync();
  }, []);

  return (
    <FlatList
      data={users}
      refreshing={isRefresing}
      refreshControl={
        <RefreshControl
          refreshing={isRefresing}
          onRefresh={async () => await _fetchDataAsync()}
        />
      }
      extraData={props}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default Users;

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginLeft: 12,
    marginRight: 12,
  },
});
