export default theme => {
   return {
      navShow: {
         extend: navMain,
         opacity: 1,
         transform: 'translateX( 0px )',
      },

      navHide: {
         extend: navMain,
         opacity: 0.3,
         transform: 'translateX( -200px )',
         '@media (max-width: 700px)': {
            transform: 'translateX( -350px )',
         },
      },

      navContainer: {
         height: '100%',
         width: '100%',
         position: 'relative',
         '& .username': {
            width: '100%',
            paddingLeft: 20,
            fontSize: 18,
            color: '#fff'
         },
         '& .spacer': {
            width: '100%',
            height: 30
         },
      },
   };
}

const navMain = {
   height: 'calc(100vh - 10px)',
   width: 200,
   background: '#0a0a0add',
   paddingTop: 36,
   display: 'flex',
   flexDirection: 'column',
   position: 'fixed',
   top: 18,
   boxShadow: [4, 4, 6, '#0009'],
   zIndex: 40,
   transition: ['all', '200ms', 'ease-in-out'],
   '@media (max-width: 700px)': {
      height: 'calc(100vh - 24px)',
      width: 350,
      top: '24px',
      '& button': {
         height: 40
      }
   }
}