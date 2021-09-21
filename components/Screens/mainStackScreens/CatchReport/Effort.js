import React, { useContext, useEffect, useState } from 'react'
import CircularPicker from 'react-native-circular-picker'
import { Text } from 'react-native'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'

const Effort = () => {
	const { effortHrs, setEffortHrs } = useContext(LCRContext)
	const handleChange = v => setEffortHrs((v * 0.24).toFixed(0))

	return (
		<CircularPicker
			size={270}
			strokeWidth={40}
			steps={[4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100]}
			gradients={{
				0: ['#2c385e', '#2c385e'],
				25: ['rgb(255, 204, 0)', 'rgb(255, 214, 10)'],
				50: ['rgb(52, 199, 89)', 'rgb(48, 209, 88)'],
				75: ['rgb(0, 122, 255)', 'rgb(10, 132, 255)'],
			}}
			onChange={handleChange}
		>
			<Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', marginBottom: 8 }}>{effortHrs} hr(s)</Text>
		</CircularPicker>
	)
}
export default Effort
