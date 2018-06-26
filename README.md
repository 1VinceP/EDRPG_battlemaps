# EDRPG Battlemaps
This is currently a work in progress. Please open an issue on this repo to report bugs/feature requests

## Usage
### Combat maps
- Change the map type using the map dropdown
- Add a spaceship by using the spaceship dropdown
  - Spaceships spawn in with their own names, but it can be edited to match a player/enemy name
- Spaceship status can be switched from "friendly" to "enemy" (this changes the underline color) and removed from the field
- Spaceships can be dragged around and placed into the "up close" or "at a distance" zones

### Character Creator
- Input character data and experience dynamic updating
- If user is logged in, save completed sheet to database. Otherwise they still have full functionality minus saving


______________________________________________________________________
## Todo
- Update demo

### Combat maps
- Add all remaining ships ( now only missing Huge size ships )
- Add vehicles
- Add vehicle tips

### Character Creator
- Ability to remove backgrounds
- Fix removal of Enhancements
  - Works unless you switch an enhancement bg with another
- Throw alerts when the save button is clicked if skills are over 40 w/o Nat Gen
  - *If confirmed, reduce value down to 40*
  - Natural Genius
- ADD FUNCTIONALITY: Cyborg, partner, Gene Mod Baby, Self Taught, University Graduate
  - Add cyborg options
  - Add partner options
- ADD FUNCTIONALITY: Enhancements from backgrounds
- Add karmic abilities

### Database
- Format height