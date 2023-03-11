import Toast from 'react-native-root-toast'

export const ToastMessage = (message) => {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true
    });
}