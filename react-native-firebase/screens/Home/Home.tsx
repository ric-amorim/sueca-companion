import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Modals from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import {getDBConnection, getSavedGames, saveGame, createTable, deleteTable, deleteGame} from '../../db/db-services';
import { GameProps } from '../../Game';

export default function MenuScreen() {
    const [ModalVisibleNew, setModalVisibleNew] = useState(false);
    const [ModalVisibleLoad, setModalVisibleLoad] = useState(false);

    const toggleModalNew = () => {
        setModalVisibleNew(!ModalVisibleNew);
    }

    const toggleModalLoad = () => {
        setModalVisibleLoad(!ModalVisibleLoad);
    }

    const startGame = () => {
        addGame();
    }

    const addGame = async () => {
        const name = "Sueca";
        const type = 0;
        const score = 0;
        const date = new Date().toISOString();
        const game: GameProps = { name, type, score, date };

        const db = await getDBConnection();
        await createTable(db);
        await saveGame(db, game);
        const games = await getSavedGames(db);
        console.log(games);
    }
    
    const _renderForm = () => {
        return (
            <View style={styles.form}>
            <View style={styles.input}>
              <Input
                name="Name"
                placeholder="Enter the Game Name to be saved"
                autoCapitalize="none"
                keyboardType="default"
              />
            </View>
          </View>
        );
    }

    return (
        <>
        <View style={styles.container}>
            <Text style={styles.title}>Sueca Companion</Text>
            <StatusBar style="auto" />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleModalNew}>
                    <Text style={styles.buttonText}>New Game</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleModalLoad}>
                    <Text style={styles.buttonText}>Load Game</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Tutorial</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>

        <Modals
            visible={ModalVisibleNew}
            modalText="New Game"
            buttonTitle="Start Game"
            onAction={startGame}
            onClose={toggleModalNew}
        >
            {_renderForm()}
        </Modals>

        <Modals
            visible={ModalVisibleLoad}
            modalText="Load Game"
            buttonTitle="Load Game"
            onAction={startGame}
            onClose={toggleModalLoad}
        >
            <Text>Load Game</Text>
        </Modals>
        </>
    );
}

