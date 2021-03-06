import React, { Component } from 'react'
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ImageBackground,
  TextInput
} from 'react-native'
import { Font } from 'expo'
import { Input, Button } from 'react-native-elements'

import { connect } from 'react-redux';
import {studentTypeChanged, usernameChanged, emailChanged, passwordChanged,confirmationPasswordChanged } from '../actions'

import Icon from 'react-native-vector-icons/SimpleLineIcons'

const BG_IMAGE = require('../../assets/images/bg_screen1.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const USER_COOL = require('../../assets/images/user-cool.png')
const USER_STUDENT = require('../../assets/images/user-student.png')
const USER_HP = require('../../assets/images/user-hp.png')

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      selectedType: null,
      username: '',
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
      confirmationPasswordValid: true,
    }

    this.setSelectedType = this.setSelectedType.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(
      this,
    )
    this.signup = this.signup.bind(this)
  }

 
  signup() {
    LayoutAnimation.easeInEaseOut()
    const usernameValid = this.validateUsername()
    const emailValid = this.validateEmail()
    const passwordValid = this.validatePassword()
    const confirmationPasswordValid = this.validateConfirmationPassword()
    if (
      emailValid &&
      passwordValid &&
      confirmationPasswordValid &&
      usernameValid
    ) {
      this.setState({ isLoading: true })
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut()
        this.setState({ isLoading: false })
        Alert.alert('🎸', 'You rock')
      }, 1500)
    }
  }

  validateUsername() {
    const { username } = this.state
    const usernameValid = username.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ usernameValid })
    usernameValid || this.usernameInput.shake()
    return usernameValid
  }

  validateEmail() {
    const { email } = this.state
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailValid = re.test(email)
    LayoutAnimation.easeInEaseOut()
    this.setState({ emailValid })
    emailValid || this.emailInput.shake()
    return emailValid
  }

  validatePassword() {
    const { password } = this.state
    const passwordValid = password.length >= 8
    LayoutAnimation.easeInEaseOut()
    this.setState({ passwordValid })
    passwordValid || this.passwordInput.shake()
    return passwordValid
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state
    const confirmationPasswordValid = password === confirmationPassword
    LayoutAnimation.easeInEaseOut()
    this.setState({ confirmationPasswordValid })
    confirmationPasswordValid || this.confirmationPasswordInput.shake()
    return confirmationPasswordValid
  }

  setSelectedType = selectedType =>{
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType })
  }
  
  render() {
    console.log('Student Type: ' + this.props.studentType.studentType);
    console.log('Username: ' + this.props.username.username);
    const {
      isLoading,
      selectedType,
      fontLoaded,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
    } = this.state

    return (
      <ImageBackground source={BG_IMAGE} style={styles.container2}>
    <ScrollView
			scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={styles.formContainer}
          >
            <Text style={styles.signUpText}>Sign up</Text>
            <Text style={styles.whoAreYouText}>WHO YOU ARE ?</Text>
            <View style={styles.userTypesContainer}>
              <UserTypeItem
                label="FRESHMAN"
                labelColor="#ECC841"
                image={USER_COOL}
                onPress={() => this.props.studentTypeChanged({studentType: 'freshman'})}
                selected={this.props.studentType.studentType === 'freshman'}
              />
              <UserTypeItem
                label="SOPHOMORE"
                labelColor="#2CA75E"
                image={USER_STUDENT}
                onPress={() => this.props.studentTypeChanged({studentType: 'sophomore'})}
                selected={this.props.studentType.studentType === 'sophomore'}
              />
              <UserTypeItem
                label="JUNIOR"
                labelColor="#36717F"
                image={USER_HP}
                onPress={() => this.props.studentTypeChanged({studentType: 'junior'})}
                selected={this.props.studentType.studentType === 'junior'}
              />
            </View>
            <View>
              <FormInput
                refInput={input => (this.usernameInput = input)}
                icon="user"
                value={this.props.username.username}
                onChangeText={username => this.props.usernameChanged({ username })}
                placeholder="Username"
                returnKeyType="next"
                displayError={!usernameValid}
                errorMessage="Your username can't be blank"
                onSubmitEditing={() => {
                  this.validateUsername()
                  this.emailInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.emailInput = input)}
                icon="envelope"
                value={email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                displayError={!emailValid}
                errorMessage="Please enter a valid email address"
                onSubmitEditing={() => {
                  this.validateEmail()
                  this.passwordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.passwordInput = input)}
                icon="lock"
                value={password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                secureTextEntry
                returnKeyType="next"
                displayError={!passwordValid}
                errorMessage="Please enter at least 8 characters"
                onSubmitEditing={() => {
                  this.validatePassword()
                  this.confirmationPasswordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.confirmationPasswordInput = input)}
                icon="lock"
                value={confirmationPassword}
                onChangeText={confirmationPassword =>
                  this.setState({ confirmationPassword })}
                placeholder="Confirm Password"
                secureTextEntry
                displayError={!confirmationPasswordValid}
                errorMessage="The password fields are not identics"
                returnKeyType="go"
                onSubmitEditing={() => {
                  this.validateConfirmationPassword()
                  this.signup()
                }}
              />
            </View>
            <Button
              loading={isLoading}
              text="SIGNUP"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              ViewComponent={require('expo').LinearGradient}
              linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              textStyle={styles.signUpButtonText}
              onPress={this.signup}
              disabled={isLoading}
            />
          </KeyboardAvoidingView>
          <View style={styles.loginHereContainer}>
            <Text style={styles.alreadyAccountText}>
              Already have an account.
            </Text>
            <Button
              text="Login here"
              textStyle={styles.loginHereText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              underlayColor="transparent"
              onPress={() => Alert.alert('🔥', 'You can login here')}
            />
          </View>
        </ScrollView>
        </ImageBackground>
        )
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props
  return (
    <Input
      {...otherProps}
      ref={refInput}
      containerStyle={styles.inputContainer}
      icon={<Icon name={icon} color="#7384B4" size={18} />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#7384B4"
    />
  )
}

//If you want to add background image, just change backgroundColor of container to transparent
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,

  },
  whoAreYouText: {
    color: '#7384B4',

    fontSize: 14,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',

    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',

    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {

    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {

    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontSize: 12,
  },
  container2: {
    flex: 1,
    position: 'relative',
  },
})

const mapStateToProps = ({authResponse}) => {
  
  const { studentType, username, email, password, confirmationPassword } = authResponse;
  return { studentType, username, email, password, confirmationPassword};
};

export default connect(mapStateToProps,  { studentTypeChanged, usernameChanged, emailChanged, passwordChanged,confirmationPasswordChanged })(LoginScreen);