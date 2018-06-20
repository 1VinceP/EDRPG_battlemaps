import _ from 'lodash';

let context = require.context('../assets/tokens', true, /\.(png)$/)
let files = {}

context.keys().forEach( filename => {
    let key = filename.split(/[^A-Za-z_0-9]/)[2]
    files[ _.camelCase( key ) ] = context(filename);
})

export default {
    maps: [
        'Space-main', 'Land-main', 'Mixed-main'
    ],

    shipNames: [
        'Select a Spaceship', 'STANDARD SHIPS', 'Alliance Chieftain', 'Adder', 'Anaconda', 'Asp Explorer', 'Asp Scout', 'Beluga Liner', 'Cobra Mk III', 'Cobra Mk IV', 'Diamondback Explorer', 'Diamondback Scout', 'Dolphin', 'Eagle Mk II', 'Federal Assault Ship', 'Federal Corvette', 'Federal Dropship', 'Federal Gunship', 'Fer de Lance', 'Hauler', 'Imperial Clipper', 'Imperial Courier', 'Imperial Cutter', 'Imperial Eagle', 'Keelback', 'Krait', 'Mamba Mk II', 'Merlin', 'Orca', 'Python', 'Sidewinder', 'Thargoid Scout', 'Type 6', 'Type 7', 'Type 9 Heavy', 'Type 10 Defender', 'Viper Mk III', 'Viper Mk IV', 'Vulture', 'FIGHTERS', 'Condor', 'Imperial Fighter', 'Taipan'
    ],

    vehicleNames: [
        'Select a Vehicle', 'STANDARD VEHICLES', 'Scarab', 'Garriot Quadbike'
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
        belugaLiner: {
            name: 'Beluga Liner',
            image: files.belugaLiner,
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
            width: '56px',
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
        hauler: {
            name: 'Hauler',
            image: files.hauler,
            height: '58px',
            width: '40px',
            size: 's'
        },
        imperialClipper: {
            name: 'Imperial Clipper',
            image: files.imperialClipper,
            height: '150px',
            width: '133px',
            size: 'l'
        },
        imperialCourier: {
            name: 'Imperial Courier',
            image: files.imperialCourier,
            height: '60px',
            width: '37px',
            size: 's'
        },
        imperialCutter: {
            name: 'Imperial Cutter',
            image: files.imperialCutter,
            height: '260px',
            width: '145px',
            size: 'l'
        },
        imperialEagle: {
            name: 'Imperial Eagle',
            image: files.imperialEagle,
            height: '60px',
            width: '60px',
            size: 's'
        },
        keelback: {
            name: 'Keelback',
            image: files.keelback,
            height: '80px',
            width: '62px',
            size: 'm'
        },
        krait: {
            name: 'Krait',
            image: files.krait,
            height: '60px',
            width: '63px',
            size: 's'
        },
        mambaMkIi: {
            name: 'Mamba Mk II',
            image: files.mambaMk2,
            height: '60px',
            width: '70px',
            size: 's'
        },
        merlin: {
            name: 'Merlin',
            image: files.merlin,
            height: '63px',
            width: '50px',
            size: 's'
        },
        orca: {
            name: 'Orca',
            image: files.orca,
            height: '175px',
            width: '68px',
            size: 'm'
        },
        python: {
            name: 'Python',
            image: files.python,
            height: '140px',
            width: '91px',
            size: 'm'
        },
        sidewinder: {
            name: 'Sidewinder',
            image: files.sidewinder,
            height: '26px',
            width: '34px',
            size: 's'
        },
        type6: {
            name: 'Type 6',
            image: files.type6,
            height: '80px',
            width: '43px',
            size: 'm'
        },
        type7: {
            name: 'Type 7',
            image: files.type7,
            height: '156px',
            width: '87px',
            size: 'l'
        },
        type9Heavy: {
            name: 'Type 9 Heavy',
            image: files.type9Heavy,
            height: '200px',
            width: '194px',
            size: 'l'
        },
        type10Defender: {
            name: 'Type 10 Defender',
            image: files.type10Defender,
            height: '210px',
            width: '226px',
            size: 'l'
        },
        viperMkIii: {
            name: 'Viper Mk III',
            image: files.viperMk3,
            height: '58px',
            width: '44px',
            size: 's'
        },
        viperMkIv: {
            name: 'Viper Mk IV',
            image: files.viperMk4,
            height: '58px',
            width: '44px',
            size: 's'
        },
        vulture: {
            name: 'Vulture',
            image: files.vulture,
            height: '80px',
            width: '58px',
            size: 's'
        },
        condor: {
            name: 'Condor',
            image: files.fighterCondor,
            height: '24px',
            width: '15px',
            size: 'slf'
        },
        imperialFighter: {
            name: 'Imperial Fighter',
            image: files.fighterImperial,
            height: '15px',
            width: '24px',
            size: 'slf'
        },
        taipan: {
            name: 'Taipan',
            image: files.fighterTaipan,
            height: '24px',
            width: '25px',
            size: 'slf'
        }
    },

    vehicles: {

    }
}