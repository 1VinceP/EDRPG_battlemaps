export default theme => {
   const { eliteOrange } = theme;

   return {
      button: props => ({
         extend: base(theme, props),
         width: props.size.w || 100,
         height: props.size.h || 30,
         border: [[1, 'solid', props.border || eliteOrange]],
      }),

      navButton: props => ({
         extend: base(theme, props),
         width: props.size.w || '100%',
         height: props.size.h ||  30,
         borderTop:
            [[1, 'solid', props.border || eliteOrange]],
         borderBottom:
            [[1, 'solid', props.border || eliteOrange]],
         borderRight: 'none',
         borderLeft: 'none',
         marginTop: -1,
         display: 'flex',
         paddingLeft: 20,
      })
   };
}

const base = (theme, props) => ({
   background: 'none',
   color: props.color || theme.eliteOrange,
   outline: 'none',
   cursor: 'pointer',
});