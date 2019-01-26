export default theme => ({
   space: {
      extend: bg,
      background: {
         ...bgStyle,
         image: 'url(https://farm5.staticflickr.com/4898/33002861098_f9dc47a8d3_k.jpg)',

      }
   },
   land: {
      extend: bg,
      background: {
         ...bgStyle,
         image: 'url(https://farm5.staticflickr.com/4817/46153479354_3dd19627d7_k.jpg)'
      }
   },
   mixed: {
      extend: bg,
      background: {
         ...bgStyle,
         image: 'url(https://farm8.staticflickr.com/7913/46153479514_01119bc183_k.jpg)'
      }
   },

   optionDropdown: {
      background: '#000',
      border: 'none'
   },

   selectBox: {
      height: '100%',
      width: 160,
      margin: 'none',
      background: 'none',
      color: '#fff',
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
   },

   combatContent: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .combat-tips': {
         height: '90%',
         width: '94%',
         borderRadius: 3,
         background: 'rgba(0, 0, 0, 0.8)',
         position: 'fixed',
         zIndex: 8
      },
      '& .hide-tips': {
         display: 'none',
      }
   }
});

const bg = {
   height: '100vh',
   width: '100%',
   display: 'flex',
}

const bgStyle = {
   repeat: 'no-repeat',
   position: 'center center',
   size: 'cover',
   attachment: 'fixed'
}