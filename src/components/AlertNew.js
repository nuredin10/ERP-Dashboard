import React from 'react'
import { useSnackbar } from 'notistack';

function AlertNew({ message, variant }) {
    const { enqueueSnackbar } = useSnackbar();
    const alert = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant
        })
    }
    return alert(message, variant)
}
export default AlertNew
