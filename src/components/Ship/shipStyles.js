export default theme => ({
   enemy: {
      transform: 'rotate( 90deg )',
      borderBottom: [1, 'solid', '#f00'],
      cursor: 'grab',
      // '&:hover $shipChange': {
      //    extend: showButtons,
      // }
   },

   friendly: {
      borderBottom: [1, 'solid', '#0f0'],
      cursor: 'grab',
      // '&:hover $shipChange': {
      //    extend: showButtons
      // }
   },

   shipDeleted: {
      display: 'none',
   },

   shipChange: {
      opacity: 0,
      border: 'none',
      overflow: 'hidden',
      transition: ['opacity', '200ms', 'ease-in-out'],
      '&:hover': {
         extend: showButtons,
      },
   },

   style: props => {
      const { ship } = props;
      return {
         height: ship.height,
         width: ship.width,
         color: 'white',
         position: 'absolute',
         top: '30px',
         left: '30px',
         zIndex: 1,
         paddingBottom: '3px',
      };
   },

   styleBg: props => {
      const { ship } = props;
      return {
         height: '100%',
         width: '100%',
         background: `url( ${ship.image} ) no-repeat`,
         backgroundSize: 'contain'
      };
   },

   styleButton: props => {
      const { inputWidth, inputOffset } = getSize(props);
      return {
         height: '18px',
         width: inputWidth,
         marginLeft: inputOffset,
         background: 'rgba(0, 0, 0, 0.6)',
         outline: 'none',
         color: '#ccc',
         borderRadius: 3,
      };
   },

   styleInput: props => {
      const { inputWidth, inputOffset } = getSize(props);
      return {
         height: '18px',
         width: inputWidth,
         marginTop: '3px',
         marginLeft: inputOffset,
         background: 'none',
         border: 'none',
         outline: 'none',
         borderBottom: props.ship.side === 'friendly' ? '1px solid #0f0' : '1px solid #f00',
         color: '#fff',
         textAlign: 'center',
         fontSize: '12px',
      }
   }
});

const showButtons = {
   display: 'block',
   cursor: 'pointer',
   opacity: 1,
   transition: ['opacity', '200ms', 'ease-in-out'],
}

function getSize({ ship }) {
   return {
      inputWidth:
         ship.size === 's' || ship.size === 'slf' ? '200%' : '130%',
      inputOffset:
         ship.size === 's' || ship.size === 'slf' ? '-50%' : '-15%',
   }
}