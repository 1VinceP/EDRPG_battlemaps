import _ from 'lodash';

let context = require.context('../assets/tokens', true, /\.(png)$/)
let files = {}

context.keys().forEach( filename => {
    let key = filename.split(/[^A-Za-z_1-9]/)[2]
    files[ _.camelCase( key ) ] = context(filename);
})

export default {
    maps: [
        'Space-main', 'Land-main', 'Mixed-main'
    ],

    names: [
        'Select a Spaceship', 'Alliance Chieftain', 'Adder', 'Anaconda', 'Asp Explorer', 'Asp Scout', 'Beluga', 'Cobra Mk III', 'Cobra Mk IV', 'Diamondback Explorer', 'Diamondback Scout', 'Dolphin', 'Eagle Mk II', 'Federal Assault Ship', 'Federal Corvette', 'Federal Dropship', 'Federal Gunship', 'Fer de Lance', 'Hauler', 'Imperial Clipper', 'Imperial Courier', 'Imperial Cutter', 'Imperial Eagle', 'Keelback', 'Krait', 'Orca', 'Python', 'Sidewinder', 'Thargoid Scout', 'Type 6', 'Type 7', 'Type 9', 'Type 10', 'Viper Mk III', 'Viper Mk IV', 'Vulture'
    ],

    spaceships:{
        allianceChieftain: {
            name: 'Alliance Chieftain',
            image: files.allianceChieftain,
            height: '134px',
            width: '112px',
            size: 'm'
        },
        adder: {
            name: 'Adder',
            image: files.adder,
            height: '60px',
            width: '50px',
            size: 's'
        },
        anaconda: {
            name: 'Anaconda',
            image: files.anaconda,
            height: '208px',
            width: '91px',
            size: 'l'
        },
        aspExplorer: {
            name: 'Asp Explorer',
            image: files.aspExplorer,
            height: '100px',
            width: '82px',
            size: 'm'
        },
        aspScout: {
            name: 'Asp Scout',
            image: files.aspScout,
            height: '100px',
            width: '106px',
            size: 'm'
        },
        beluga: {
            name: 'Beluga',
            image: files.beluga,
            height: '275px',
            width: '161px',
            size: 'l'
        },
        cobraMkIii: {
            name: 'Cobra Mk III',
            image: files.cobraMk3V2,
            height: '50px',
            width: '76px',
            size: 'm'
        },
        cobraMkIv: {
            name: 'Cobra Mk IV',
            image: files.cobraMk4,
            height: '54px',
            width: '78px',
            size: 'm'
        },
        diamondbackExplorer: {
            name: 'Diamondback Explorer',
            image: files.diamondbackExplorer,
            height: '70px',
            width: '39px',
            size: 's'
        },
        diamondbackScout: {
            name: 'Diamondback Scout',
            image: files.diamondbackScout,
            height: '66px',
            width: '36px',
            size: 's'
        },
        dolphin: {
            name: 'Dolphin',
            image: files.dolphin,
            height: '125px',
            width: '51px',
            size: 's'
        },
        eagleMkIi: {
            name: 'Eagle Mk II',
            image: files.eagleMk2,
            height: '60px',
            width: '59px',
            size: 's'
        },
        federalAssaultShip: {
            name: 'Federal Assault Ship',
            image: files.federalAssaultShip,
            height: '130px',
            width: '82px',
            size: 'm'
        },
        federalCorvette: {
            name: 'Federal Corvette',
            image: files.federalCorvette,
            height: '242px',
            width: '129px',
            size: 'l'
        },
        federalDropship: {
            name: 'Federal Dropship',
            image: files.federalDropship,
            height: '130px',
            width: '107px',
            size: 'm'
        },
        federalGunship: {
            name: 'Federal Gunship',
            image: files.federalGunship,
            height: '130px',
            width: '86px',
            size: 'm'
        },
        ferDeLance: {
            name: 'Fer de Lance',
            image: files.ferDeLance,
            height: '114px',
            width: '88px',
            size: 'm'
        },
        imperialCutter: {
            name: 'Imperial Cutter',
            image: files.imperialCutter,
            height: '260px',
            width: '145px',
            size: 'l'
        },
        sidewinder: {
            name: 'Sidewinder',
            image: files.sidewinder,
            height: '26px',
            width: '34px',
            size: 's'
        },
    },

    vehicles: {

    }
}