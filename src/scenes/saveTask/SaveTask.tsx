import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import {AppContext, Actions} from '../../hooks';
import {ITask, IUser} from '../../types';

const SaveTask = (props: any) => {
  const [_, dispatcher]: any = useContext(AppContext);
  const [value, setValue] = useState<string>();

  const {user}: {user: IUser} = props.route.params;

  const _addTask = () => {
    if (value !== undefined && value?.length > 0) {
      const newTask: ITask = {
        id: Math.random(),
        userId: user.id,
        title: value,
        completed: false,
      };
      dispatcher(Actions.TaskActions.addNewTask(newTask));
    }
    props.navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View style={styles.inner}>
          <TextInput
            style={styles.textInput}
            autoFocus
            placeholder="Type your new task"
            returnKeyLabel="Save"
            returnKeyType="done"
            onChangeText={(text) => setValue(text)}
            onSubmitEditing={() => _addTask()}
          />
          <TouchableWithoutFeedback onPress={() => _addTask()}>
            <Text>{'Save'}</Text>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SaveTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inner: {
    padding: 24,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
