const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(0.5),
        },
    },
    empRecordStyle: {
        '& .MuiTextField-root': {
            margin: theme.spacing(0.5),
        },
    },
    inputFeild: {
        margin: '2rem',
        padding: '0rem'
    },
    customInputFeild: {
        height: '1.8rem',

        paddingLeft: '0px'
    }
}));
