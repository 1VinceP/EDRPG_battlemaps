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
        padding: '20px',
        '& .character-name': {
            fontSize: 26,
            marginBottom: 40
        },
        '& .main-increase': {
            width: '60%',
            display: 'flex',
            justifyContent: 'space-between',
            '& .endurance': {
                padding: [3, 6],
                borderLeft: `1px solid ${theme.enduringRed}`,
                borderBottom: `1px solid ${theme.enduringRed}`,
                borderRadius: theme.radius,
            },
            '& .karma': {
                padding: [3, 6],
                borderRight: `1px solid ${theme.karmicPurple}`,
                borderBottom: `1px solid ${theme.karmicPurple}`,
                borderRadius: theme.radius
            }
        },
    },


    '@media (max-width: 750px)': {

    }
})