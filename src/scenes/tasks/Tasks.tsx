import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  LayoutAnimation,
  UIManager,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Task} from './components';
import {fetchTasksAsync} from '../../service/connector';
import {ITask, IUser} from '../../types';
import {AppContext, IStates, Actions} from '../../hooks';

const Tasks = (props: any) => {
  const [states, dispatcher]: any = useContext(AppContext);
  const {taskStates} = states as IStates;
  const [isRefresing, setRefresh] = useState(true);
  const [animatedOnLoad, setAnimatedOnLoad] = useState(false);

  const {user}: {user: IUser} = props.route.params;

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    dispatcher(Actions.TaskActions.addTasks(new Array<ITask>()));
    fetchTasksAsync(user.id)
      .then((tasks) => {
        dispatcher(Actions.TaskActions.addTasks(tasks));
      })
      .finally(() => setRefresh(false));
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Task of ${user.name}`,
    });
  }, [props.navigation]);

  return (
    <>
      <FlatList
        data={taskStates.tasks}
        extraData={props}
        refreshing={isRefresing}
        refreshControl={<RefreshControl refreshing={isRefresing} />}
        keyExtractor={(item: ITask) => item.id.toString()}
        ListEmptyComponent={() => {
          if (isRefresing) {
            return <></>;
          }
          return (
            <Text style={styles.emptyText}>{`No tasks for ${user.name}`}</Text>
          );
        }}
        renderItem={({item}: {item: ITask}) => (
          <Task
            title={item.title}
            isCompleted={item.completed}
            animate={!animatedOnLoad && taskStates.tasks[0] === item}
            onAnimated={() => setAnimatedOnLoad(true)}
            onDelete={() => {
              dispatcher(Actions.TaskActions.deleteTask(item));
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            }}
            onDone={() => {
              dispatcher(Actions.TaskActions.setDone(item));
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('SaveTask', {user: user})}>
          <Text>{'New Task'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'gray',
  },
  emptyText: {
    fontSize: 32,
    marginTop: 40,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginLeft: 12,
    marginRight: 12,
  },
});
