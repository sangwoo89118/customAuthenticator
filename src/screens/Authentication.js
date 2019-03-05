import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
            modalVisible: false,
            selectedIndex: 0,
        };

        this.buttons = ['Sign Up', 'Sign In']
    }

    updateIndex = () => {
        // If selectedIndex was 0, make it 1.  If it was 1, make it 0
        const newIndex = this.state.selectedIndex === 0 ? 1 : 0
        this.setState({ selectedIndex: newIndex })
    }

    handleSignUp = () => {
        // alert(JSON.stringify(this.state));
        const { email, password, confirmPassword } = this.state;

        if (password === confirmPassword) {
            Auth.signUp({
                username: email,
                password,
                attributes: { email },
            })
            .then(() => this.setState({ modalVisible: true }))
            .catch(err => console.log(err))
        } else {
            alert('Password do not match.');
        }
    }

    handleConfirmationCode = () => {
        const { email, confirmationCode } = this.state;
        Auth.confirmSignUp(email, confirmationCode, {})
            .then(() => {
                this.setState({ modalVisible: false });
                this.props.navigation.navigate('Home')
            })
            .catch(err => console.log(err));
    }

    signUpUI = () => {
        return (
            <View style={styles.form}>
                <Input
                        label="Email"
                        placeholder="my@email.com"
                        onChangeText={(value) => this.setState({ email: value})}
                />
                <Input
                    label="Password"
                    placeholder="p@ssw0rd123"
                    onChangeText={(value) => this.setState({ password: value})}
                    secureTextEntry
                />
                <Input
                    label="Confirm Password"
                    placeholder="p@ssw0rd123"
                    onChangeText={(value) => this.setState({ confirmPassword: value})}
                    secureTextEntry
                />
                <Button style={styles.button} 
                    title="Submit" 
                    onPress={ this.handleSignUp }
                />

                <Modal visible={this.state.modalVisible}>
                    <View style={styles.container}>
                        <Input 
                            label="Confirmation Code"
                            onChangeText={(value) => this.setState({ confirmationCode: value})}
                        />
                        <Button title="Submit" onPress={ this.handleConfirmationCode }/>
                    </View>
                </Modal>            
            </View>
        );
    } 

    signInUI = () => {
        return (
            <View style={styles.form}>
                <Input
                    label="Email"
                    onChangeText={
                        (value) => this.setState({ email: value })
                    }
                    placeholder="my@email.com"
                />
                <Input
                    label="Password"
                    onChangeText={
                        (value) => this.setState({ password: value })
                    }
                    placeholder="p@ssw0rd123"
                    secureTextEntry
                />
                <Button
                    title='Submit'
                    onPress={ this.handleSignIn }
                />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        React Native
                    </Text>
                    <Text style={styles.text}>
                        with AWS Amplify
                    </Text>
                    <Text style={styles.text}>
                        Custom Authentication
                    </Text>
                </View> 
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={ this.buttons }
                /> 
                { this.state.selectedIndex === 0 ? this.signUpUI() : this.signInUI()}      
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 40,
    },
    form: {
        width: '90%',
    },
    text: {
        fontSize: 20,
    },
    button: {
        marginTop: 10,
    },
});
