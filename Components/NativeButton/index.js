import React from 'react'
import { Pressable, TouchableOpacity, StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native'
// import { ms, s, vs } from 'react-native-size-matters/extend'

const NativeButton = props => {
  const {
    title,
    children,
    variant = 'default',
    buttonStyle = {},
    titleStyle = {},
    buttonProps = {},
    titleProps = {},
    wrapperStyle={},
    onPress,
    height,
    width,
    rippleRadius = undefined,
    rippleColor = "#aaa",
    borderless = false,
    isLoading = false,
    disabled = false,
  } = props

  const style = {
    button: disabled
      ? [styles.disabledButton, buttonStyle]
      : variant === 'primary'
        ? [styles.primaryButton, buttonStyle]
        : variant === 'secondary'
          ? [styles.secondaryButton, buttonStyle]
          : [styles.defaultButton,buttonStyle],
    title:
      variant === 'primary'
        ? [styles.primaryText, titleStyle]
        : variant === 'secondary'
          ? [styles.secondaryText, titleStyle]
          : [titleStyle],
  }
  const content = (
    title
      ? (isLoading
        ? <ActivityIndicator animating color={"#FFFFFF"} />
        : <Text style={style.title}
          {...titleProps}
        > {title}</Text >
      ) : children
  )
  const android_ripple = { color: rippleColor, borderless: borderless}

  const Wrapper = () => {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={onPress}
          disabled={disabled || isLoading}
          {...buttonProps}
        >
          {content}
        </TouchableOpacity>
      )
    } else {
      return (
        <Pressable
          style={style.button}
          onPress={onPress}
          disabled={disabled || isLoading}
          android_ripple={android_ripple}
          {...buttonProps}
        >
          {content}
        </Pressable>
      )
    }
  }

  return (
    <View
      style={{
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        ...wrapperStyle
      }}
    >
      <Wrapper />
    </View>
  )
}

const styles = StyleSheet.create({
  primaryButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f00"
  },
  disabledButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity:0.5,
    // backgroundColor: "#999"
  },
  secondaryButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#0f0"
  },
  defaultButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.95,
    color: '#FFFFFF',
  },
  secondaryText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.95,
    color: '#000000',
  }
})

export default NativeButton;
