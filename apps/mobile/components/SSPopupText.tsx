import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { Colors } from '@/styles'

import SSText from './SSText'

type SSSnackbarProps = {
  message: string
  onTimeout: () => void
  isVisible: boolean
  duration?: number
}

export default function SSPopupText({
  message,
  isVisible,
  onTimeout,
  duration = 600
}: SSSnackbarProps) {
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        onTimeout()
      }, duration)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, duration, onTimeout])

  return isVisible ? (
    <View style={styles.container}>
      <SSText style={styles.messageText}>{message}</SSText>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  messageText: {
    backgroundColor: Colors.gray[800],
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 0,
    width: 'auto'
  }
})
