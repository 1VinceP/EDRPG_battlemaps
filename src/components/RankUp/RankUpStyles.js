export default theme => ({
    portalButton: {
        position: 'relative',
        zIndex: 30
    },

    rankBg: {
        width: '100%',
        height: 'calc(100vh - 18px)',
        position: 'fixed',
        top: 18,
        left: 0,
        background: '#0008',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
    },

    rankModal: {
        height: '80%',
        width: '80%',
        background: '#323231',
        border: `1px solid ${theme.eliteOrange}`,
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        padding: '20px'
    },

    '@media (max-width: 750px)': {

    }
})