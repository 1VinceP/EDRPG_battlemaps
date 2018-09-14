export default (theme, props) => {
    console.log({ theme, props })

    return {
        main: {
            minHeight: '100vh',
            width: '100%',
            background: theme.viewBackground,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },

        lock: {
            width: '200px',
            height: '200px'
        },

        text: {
            color: '#616161',
            marginTop: '60px',
            fontSize: '36px'
        }
    }
};