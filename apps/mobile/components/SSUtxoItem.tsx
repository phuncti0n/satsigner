import { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import SSHStack from '@/layouts/SSHStack'
import SSVStack from '@/layouts/SSVStack'
import { i18n } from '@/locales'
import { usePriceStore } from '@/store/price'
import { Colors } from '@/styles'
import { Utxo } from '@/types/models/Utxo'
import {
  formatAddress,
  formatDate,
  formatLabel,
  formatNumber
} from '@/utils/format'

import { SSIconPlus, SSIconX } from './icons'
import SSText from './SSText'
import SSUtxoSizeMeter from './SSUtxoSizeMeter'

type SSUtxoItemProps = {
  utxo: Utxo
  selected: boolean
  largestValue: number
  onToggleSelected(utxo: Utxo): void
}

export default function SSUtxoItem({
  utxo,
  selected,
  largestValue,
  onToggleSelected
}: SSUtxoItemProps) {
  const priceStore = usePriceStore()

  const selectIconStyle = useMemo(() => {
    return StyleSheet.compose(styles.selectIconBase, {
      ...(selected
        ? { backgroundColor: Colors.error }
        : { backgroundColor: Colors.gray[500] })
    })
  }, [selected])

  const label = formatLabel(utxo.label || '').label

  return (
    <View>
      <TouchableOpacity onPress={() => onToggleSelected(utxo)}>
        <SSHStack
          style={{
            paddingHorizontal: '5%',
            paddingVertical: 16
          }}
          justifyBetween
        >
          <SSHStack>
            <View style={selectIconStyle}>
              {selected ? (
                <SSIconX height={8} width={8} />
              ) : (
                <SSIconPlus height={8} width={8} />
              )}
            </View>
            <SSVStack gap="xs">
              <SSHStack gap="xs" style={{ alignItems: 'baseline' }}>
                <SSText size="md" color="white">
                  {formatNumber(utxo.value)}
                </SSText>
                <SSText size="xs" color="muted">
                  {i18n.t('bitcoin.sats').toLowerCase()}
                </SSText>
              </SSHStack>
              <SSHStack gap="xs" style={{ alignItems: 'baseline' }}>
                <SSText color="white">
                  {formatNumber(priceStore.satsToFiat(utxo.value), 2)}
                </SSText>
                <SSText color="muted">{priceStore.fiatCurrency}</SSText>
              </SSHStack>
              <SSText>{label && `${i18n.t('bitcoin.memo')}: ${label}`}</SSText>
            </SSVStack>
          </SSHStack>
          <SSVStack gap="xs" style={{ alignSelf: 'flex-start' }}>
            <SSText>
              {utxo.addressTo ? formatAddress(utxo.addressTo) : ''}
            </SSText>
            <SSText style={{ color: Colors.gray[100], alignSelf: 'flex-end' }}>
              {utxo.timestamp ? formatDate(utxo.timestamp) : ''}
            </SSText>
          </SSVStack>
        </SSHStack>
      </TouchableOpacity>
      <SSUtxoSizeMeter
        size={utxo.value}
        largestSize={largestValue}
        selected={selected}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  selectIconBase: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
    height: 20,
    width: 20,
    borderRadius: 10,
    marginTop: 2
  }
})
