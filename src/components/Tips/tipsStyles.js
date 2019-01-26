export default theme => ({
   tipsBox: {
      height: '100%',
      width: '100%',
      padding: [10, 0],
      display: 'flex',
   },

   tipsCol: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      color: '#eee',
      padding: [0, 10],
      overflowY: 'scroll',
      '& h1': {
         width: '30%',
         height: 20,
         position: 'fixed',
         background: '#000',
         textAlign: 'center',
      },
      '& .tip': {
         '& h2': { textDecoration: 'underline' },
         '& h2, h3': { marginTop: 10 },
         '& p': { fontSize: 12 },
      },
      // '&:nth-child(-n+2)': {
      //    borderRight: [1, 'solid', '#fff'],
      // },
      '&::-webkit-scrollbar': { width: 8 },
   },

   green: {
      extend: format,
      marginTop: 10,
      borderLeft: [1, 'solid', '#0f0'],
      '& h2': { color: '#0f0' },
      '& h3': { color: '#45be45' },
   },

   periwinkle: {
      extend: format,
      borderLeft: [1, 'solid', '#66f'],
      '& h2': { color: '#66f' },
      '& h3': { color: '#9191b6' },
   },

   magenta: {
      extend: format,
      borderLeft: [1, 'solid', '#f0f'],
      '& h2': { color: '#f0f' },
      '& h3': { color: '#b45eb4' },
   },

   cyan: {
      extend: format,
      borderLeft: [1, 'solid', '#0ff'],
      '& h2': { color: '#0ff' },
      '& h3': { color: '#4fb6b6' },
   },

   orange: {
      extend: format,
      borderLeft: [1, 'solid', theme.eliteOrange],
      '& h2': { color: theme.eliteOrange },
      '& h3': { color: '#ddaa4c' },
   },

   red: {
      extend: format,
      borderLeft: [1, 'solid', '#f00'],
      '& h2': { color: '#f00' },
      '& h3': { color: '#ce5a5a' },
   },
});

const format = {
   marginLeft: -10,
   paddingLeft: 10,
}