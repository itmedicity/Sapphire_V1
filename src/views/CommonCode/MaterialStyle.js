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
    horizondalScroll: {
        overflowX: 'auto'
    },

    inputColor: {
        height: "1.6rem",
    },

    cutomSelectFeild: {
        height: "1rem"
    },
    customInputFeild: {
        height: '1.6rem',
        paddingLeft: '0px',
        paddingBottom: '0.3rem'
    },

}));
